import fs from 'node:fs';

const input = 'data/scm_panel_sichuan_wenchuan_2000_2020_clean_cal.csv';
const output = 'public/data/wenchuan-scm-results.json';

const outcomes = [
  {
    id: 'real_gdp_pc',
    label: 'GDP per capita',
    zh: '人均 GDP',
    hi: 'प्रति व्यक्ति GDP',
    format: 'usd',
    unit: 'current-year USD per person',
    unitZh: '当年美元/人',
    unitHi: 'प्रति व्यक्ति वर्तमान-वर्ष USD',
    sourceUnit: 'yuan per person'
  },
  { id: 'ndvi', label: 'NDVI', zh: 'NDVI', hi: 'NDVI', format: 'decimal', unit: 'index', unitZh: '指数', unitHi: 'सूचकांक' },
  {
    id: 'esv',
    label: 'Ecosystem service value',
    zh: '生态系统服务价值',
    hi: 'पारिस्थितिकी सेवा मूल्य',
    format: 'decimal',
    unit: 'source-unit value',
    unitZh: '原始口径数值',
    unitHi: 'स्रोत-इकाई मान'
  },
  { id: 'pm10', label: 'PM10', zh: 'PM10', hi: 'PM10', format: 'decimal', unit: 'µg/m³', unitZh: 'µg/m³', unitHi: 'µg/m³' },
  { id: 'urban', label: 'Urbanization', zh: '城镇化率', hi: 'शहरीकरण', format: 'percent', unit: 'share of population', unitZh: '人口占比', unitHi: 'जनसंख्या अनुपात' },
  {
    id: 'land_impervious_share',
    label: 'Impervious surface',
    zh: '不透水面占比',
    hi: 'अभेद्य सतह अनुपात',
    format: 'percent',
    unit: 'share of land area',
    unitZh: '土地面积占比',
    unitHi: 'भूमि क्षेत्र अनुपात'
  }
];

const preYears = Array.from({ length: 8 }, (_, index) => 2000 + index);
const years = Array.from({ length: 21 }, (_, index) => 2000 + index);
const rmbPerUsd = {
  2000: 8.27850416666666,
  2001: 8.27706833333333,
  2002: 8.2769575,
  2003: 8.27703666666666,
  2004: 8.27680083333333,
  2005: 8.19431666666666,
  2006: 7.97343833333333,
  2007: 7.6075325,
  2008: 6.948655,
  2009: 6.83141605176666,
  2010: 6.77026902870939,
  2011: 6.46146132655007,
  2012: 6.31233282683186,
  2013: 6.19575834608231,
  2014: 6.14343409448867,
  2015: 6.22748867298454,
  2016: 6.6444778294468,
  2017: 6.75875508633597,
  2018: 6.61595717735439,
  2019: 6.90838500992901,
  2020: 6.90076726944924
};

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

const projectToSimplex = (values) => {
  const sorted = [...values].sort((a, b) => b - a);
  let cumulative = 0;
  let rho = 0;
  for (let index = 0; index < sorted.length; index += 1) {
    cumulative += sorted[index];
    const theta = (cumulative - 1) / (index + 1);
    if (sorted[index] - theta > 0) rho = index + 1;
  }
  const theta = (sorted.slice(0, rho).reduce((sum, value) => sum + value, 0) - 1) / rho;
  return values.map((value) => Math.max(value - theta, 0));
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
  const lipschitz = donor.reduce((sum, series) => sum + series.reduce((inner, value) => inner + value ** 2, 0), 0);
  const step = 1 / (2 * lipschitz || 1);

  for (let iteration = 0; iteration < 3500; iteration += 1) {
    const synth = preYears.map((_, yearIndex) =>
      donor.reduce((sum, series, donorIndex) => sum + weights[donorIndex] * series[yearIndex], 0)
    );
    const gradients = donor.map((series) =>
      2 * series.reduce((sum, value, yearIndex) => sum + (synth[yearIndex] - target[yearIndex]) * value, 0)
    );
    weights = projectToSimplex(weights.map((weight, index) => weight - step * gradients[index]));
  }

  return normalize(weights);
};

const buildScm = (treatedCounty, outcome) => {
  const weights = solveWeights(treatedCounty, donors, outcome);
  const actual = years.map((year) => valueFor(treatedCounty, year, outcome));
  const synthetic = years.map((year) =>
    donors.reduce((sum, donor, index) => sum + weights[index] * valueFor(donor, year, outcome), 0)
  );
  const displayActual = actual.map((value, index) => displayValue(value, years[index], outcome));
  const displaySynthetic = synthetic.map((value, index) => displayValue(value, years[index], outcome));
  const gap = displayActual.map((value, index) => value - displaySynthetic[index]);
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

  return { actual: displayActual, synthetic: displaySynthetic, gap, preRmse, postGap, topDonors };
};

const displayValue = (value, year, outcome) => {
  if (outcome === 'real_gdp_pc') return value / rmbPerUsd[year];
  return value;
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
    exchangeRate: {
      source: 'World Bank PA.NUS.FCRF, official exchange rate (LCU per US$, period average), China',
      rmbPerUsd
    },
    method:
      'County-level synthetic controls are estimated against the 42 unaffected counties using 2000-2007 pre-treatment outcome trajectories. GDP per capita is fitted in original yuan per person and displayed as current-year USD per person using annual average RMB/USD exchange rates. Group effects average county-level treatment gaps.'
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
