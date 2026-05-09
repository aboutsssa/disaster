import fs from 'node:fs';

const input = 'data/scm_panel_sichuan_wenchuan_2000_2020_clean_cal.csv';
const output = 'public/data/wenchuan-scm-results.json';

const outcomes = [
  { id: 'real_gdp_pc', label: 'GDP per capita', zh: '人均 GDP', format: 'number' },
  { id: 'ndvi', label: 'NDVI', zh: 'NDVI', format: 'decimal' },
  { id: 'esv', label: 'Ecosystem service value', zh: '生态系统服务价值', format: 'decimal' },
  { id: 'pm10', label: 'PM10', zh: 'PM10', format: 'decimal' },
  { id: 'urban', label: 'Urbanization', zh: '城镇化率', format: 'percent' },
  { id: 'land_impervious_share', label: 'Impervious surface', zh: '不透水面占比', format: 'percent' }
];

const preYears = Array.from({ length: 8 }, (_, index) => 2000 + index);
const years = Array.from({ length: 21 }, (_, index) => 2000 + index);

const text = fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, '');
const lines = text.trim().split(/\r?\n/);
const headers = lines[0].split(',');
const rows = lines.slice(1).map((line) => {
  const values = line.split(',');
  const row = {};
  headers.forEach((header, index) => {
    const value = values[index];
    const numeric = Number(value);
    row[header] = value !== '' && Number.isFinite(numeric) ? numeric : value;
  });
  return row;
});

const byCounty = new Map();
for (const row of rows) {
  if (!byCounty.has(row.county)) byCounty.set(row.county, []);
  byCounty.get(row.county).push(row);
}
for (const countyRows of byCounty.values()) {
  countyRows.sort((a, b) => a.year - b.year);
}

const countiesByClass = (cls) =>
  [...byCounty.entries()]
    .filter(([, countyRows]) => countyRows[0].disaster_class === cls)
    .map(([county]) => county)
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));

const donors = countiesByClass('未受灾');
const treatedGroups = {
  extreme: { label: 'Extremely affected counties', zh: '极重灾区', className: '极重灾区', counties: countiesByClass('极重灾区') },
  severe: { label: 'Heavily affected counties', zh: '重灾区', className: '重灾区', counties: countiesByClass('重灾区') },
  general: { label: 'Generally affected counties', zh: '一般灾区', className: '一般灾区', counties: countiesByClass('一般灾区') }
};

const valueFor = (county, year, outcome) => byCounty.get(county)?.find((row) => row.year === year)?.[outcome];
const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const normalize = (weights) => {
  const total = weights.reduce((sum, value) => sum + value, 0);
  return weights.map((value) => value / total);
};

const solveWeights = (treatedCounty, donorCounties, outcome) => {
  const targetRaw = preYears.map((year) => valueFor(treatedCounty, year, outcome));
  const donorRaw = donorCounties.map((county) => preYears.map((year) => valueFor(county, year, outcome)));
  const all = [...targetRaw, ...donorRaw.flat()].filter(Number.isFinite);
  const mu = mean(all);
  const sd = Math.sqrt(mean(all.map((value) => (value - mu) ** 2))) || 1;
  const target = targetRaw.map((value) => (value - mu) / sd);
  const donor = donorRaw.map((series) => series.map((value) => (value - mu) / sd));
  const n = donor.length;
  let weights = Array(n).fill(1 / n);
  const eta = 0.055;
  const lambda = 0.0008;

  for (let iteration = 0; iteration < 3200; iteration += 1) {
    const synth = preYears.map((_, yearIndex) =>
      donor.reduce((sum, series, donorIndex) => sum + weights[donorIndex] * series[yearIndex], 0)
    );
    const gradients = donor.map((series, donorIndex) => {
      let gradient = 0;
      for (let yearIndex = 0; yearIndex < preYears.length; yearIndex += 1) {
        gradient += 2 * (synth[yearIndex] - target[yearIndex]) * series[yearIndex];
      }
      return gradient + 2 * lambda * weights[donorIndex];
    });
    const stabilized = gradients.map((gradient) => Math.max(-50, Math.min(50, gradient)));
    weights = weights.map((weight, index) => weight * Math.exp(-eta * stabilized[index]));
    weights = normalize(weights);
  }

  return weights;
};

const buildScm = (treatedCounty, outcome) => {
  const weights = solveWeights(treatedCounty, donors, outcome);
  const actual = years.map((year) => valueFor(treatedCounty, year, outcome));
  const synthetic = years.map((year) =>
    donors.reduce((sum, donor, index) => sum + weights[index] * valueFor(donor, year, outcome), 0)
  );
  const gap = actual.map((value, index) => value - synthetic[index]);
  const preRmse = Math.sqrt(mean(preYears.map((year) => {
    const index = years.indexOf(year);
    return gap[index] ** 2;
  })));
  const postGap = mean(years.filter((year) => year >= 2009).map((year) => gap[years.indexOf(year)]));
  const topDonors = donors
    .map((county, index) => ({ county, weight: weights[index] }))
    .filter((item) => item.weight > 0.015)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 6);

  return { actual, synthetic, gap, preRmse, postGap, topDonors };
};

const averageSeries = (items, key) =>
  years.map((_, yearIndex) => mean(items.map((item) => item[key][yearIndex])));

const result = {
  meta: {
    source: input,
    years,
    preYears,
    treatmentYear: 2008,
    donorPool: donors,
    outcomes,
    method:
      'County-level synthetic controls are estimated against the 42 unaffected counties using 2000-2007 pre-treatment outcome trajectories. Group effects average county-level treatment gaps.'
  },
  groups: {}
};

for (const [groupId, group] of Object.entries(treatedGroups)) {
  result.groups[groupId] = {
    ...group,
    outcomes: {}
  };
  for (const outcome of outcomes) {
    const units = {};
    for (const county of group.counties) {
      units[county] = buildScm(county, outcome.id);
    }
    const unitList = Object.values(units);
    result.groups[groupId].outcomes[outcome.id] = {
      units,
      average: {
        actual: averageSeries(unitList, 'actual'),
        synthetic: averageSeries(unitList, 'synthetic'),
        gap: averageSeries(unitList, 'gap'),
        preRmse: mean(unitList.map((unit) => unit.preRmse)),
        postGap: mean(unitList.map((unit) => unit.postGap))
      }
    };
  }
}

fs.mkdirSync('public/data', { recursive: true });
fs.writeFileSync(output, JSON.stringify(result));
console.log(`Wrote ${output}`);
console.log(`Extreme counties: ${treatedGroups.extreme.counties.join('、')}`);
console.log(`Donor pool: ${donors.length} unaffected counties`);
