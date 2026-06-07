const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

export type LocalizedText = {
  en: string;
  zh: string;
};

export const site = {
  name: {
    en: 'ReSpace Lab',
    zh: 'ReSpace Lab'
  },
  owner: {
    en: 'Resilient Space and Post-Disaster Recovery Lab',
    zh: '恢复空间实验室'
  },
  affiliation: {
    en: 'Post-Disaster Recovery, Resilient Spatial Governance, and Re-Space',
    zh: '灾后恢复、韧性空间治理与复原空间研究'
  },
  email: 'liqiushan@scu.edu.cn',
  location: {
    en: 'Chengdu, CN',
    zh: '中国成都'
  }
};

export const navItems = [
  { href: '/', label: { en: 'Home', zh: '首页' } },
  { href: '/research/', label: { en: 'Research', zh: '研究' } },
  {
    href: '/copresent-places/',
    label: { en: 'Copresent Places', zh: '共时之地' }
  },
  { href: '/projects/', label: { en: 'Projects', zh: '项目' } },
  { href: '/people/', label: { en: 'People', zh: '团队' } },
  { href: '/publications/', label: { en: 'Publications', zh: '成果' } },
  { href: '/news/', label: { en: 'News', zh: '动态' } },
  { href: '/photos/', label: { en: 'Photos', zh: '照片' } }
];

export const researchThemes = [
  {
    title: {
      en: 'Recovery Equity and Spatial Inequality',
      zh: '恢复公平性与空间不平等机制识别'
    },
    eyebrow: { en: 'Equity', zh: '公平' },
    description: {
      en:
        'Build a spatial causal-inference framework linking recovery performance, policy intervention, and nested geographic contexts.',
      zh:
        '构建“恢复绩效-政策干预-地理嵌套”的空间因果推断框架，识别灾后恢复中的公平性差异与空间不平等机制。'
    }
  },
  {
    title: {
      en: 'Cultural Landscapes and Habitat Recovery',
      zh: '文化景观与人居环境的复原建构'
    },
    eyebrow: { en: 'Landscape', zh: '景观' },
    description: {
      en:
        'Connect climate-adaptive spatial design with sustainable planning for traditional settlements and everyday living environments.',
      zh:
        '推动气候适应型空间设计与传统聚落可持续规划融合，关注灾后文化连续性、地方意义与人居环境重建。'
    }
  },
  {
    title: {
      en: 'Regional Resilience Pathway Modeling',
      zh: '区域韧性演化路径建模'
    },
    eyebrow: { en: 'Resilience', zh: '韧性' },
    description: {
      en:
        'Develop transferable recovery-adaptation-synergy system models for post-disaster land use and spatial planning decisions.',
      zh:
        '发展可推广的“恢复-适应-协同”系统动力模型，支撑灾后土地利用、城乡空间治理与规划决策。'
    }
  },
  {
    title: {
      en: 'Spatial Science and Public Participation',
      zh: '空间科学与公众参与方法'
    },
    eyebrow: { en: 'Methods', zh: '方法' },
    description: {
      en:
        'Integrate PPGIS, remote sensing, systems modeling, and causal inference into a research platform that combines data-driven analysis with public participation.',
      zh:
        '融合参与式GIS、遥感技术、系统建模与因果推断，建设数据驱动与公众参与并重的灾后治理研究平台。'
    }
  }
];

export const researchProjects = [
  {
    title: {
      en: 'Post-Disaster Monitoring Slide Deck',
      zh: '灾后监测演示文稿'
    },
    eyebrow: { en: 'Slides', zh: '演示' },
    description: {
      en:
        'A presentation that turns the Wenchuan synthetic-control results and Himalayan extension into a concise research narrative.',
      zh:
        '将汶川合成控制结果与喜马拉雅区域拓展转化为一套清晰的研究叙事。'
    },
    href: '/slides/'
  },
  {
    title: {
      en: 'Global Disaster and Recovery Map',
      zh: '全球灾害与复原空间地图'
    },
    eyebrow: { en: 'Map', zh: '地图' },
    description: {
      en:
        'An interactive globe for comparing live earthquake events, population exposure, flood risk, heat, fire, and future recovery layers.',
      zh:
        '用于比较实时地震、人口暴露、洪水风险、高温、火点与未来恢复图层的交互式地球。'
    },
    href: '/map/'
  },
  {
    title: {
      en: 'Wenchuan Recovery Atlas',
      zh: '汶川恢复图谱'
    },
    eyebrow: { en: 'SCM Atlas', zh: '合成控制图谱' },
    description: {
      en:
        'A county-level 2000-2020 Sichuan panel application that compares actual recovery against synthetic counterfactual paths.',
      zh:
        '基于 2000-2020 年四川县域面板数据，比较真实恢复路径与合成反事实路径。'
    },
    href: '/wenchuan/'
  },
  {
    title: {
      en: 'Earth Engine Layer Roadmap',
      zh: 'Earth Engine 图层路线图'
    },
    eyebrow: { en: 'Project Notes', zh: '项目说明' },
    description: {
      en:
        'A working plan for publishing browser-ready remote-sensing layers from Earth Engine into the public observatory.',
      zh:
        '规划如何将 Earth Engine 生成的遥感图层发布为公共观测平台可直接加载的浏览器图层。'
    },
    href: '/projects/global-disaster-map/'
  }
] as const;

export const fundedResearchProjects = [
  {
    period: '2026.01-2027.12',
    title: 'Research on Risk Assessment and Resilience Enhancement Strategies for Disaster Chains in Urban Agglomerations',
    sponsor: 'Sichuan Provincial Department of Science and Technology',
    role: 'Principal Investigator'
  },
  {
    period: '2025.01-2026.12',
    title:
      'How ecological zoning policy benefit post-disaster reconstruction: a study on the synergy between ecological environment and socioeconomic factors',
    sponsor: 'South Asian Network on Development and Environmental Economics',
    role: 'Principal Investigator'
  },
  {
    period: '2024.01-2026.12',
    title:
      'Research on the driving mechanism of poverty caused by natural disasters and the improvement of disaster resilience',
    sponsor: 'Youth Fund for Humanities and Social Sciences of the Ministry of Education',
    role: 'Principal Investigator'
  },
  {
    period: '2021-2022',
    title: 'Research on technologies of protection, repair, inheritance and utilization of traditional settlements',
    sponsor: 'Postdoctoral Funding',
    role: 'Principal Investigator'
  },
  {
    period: '2023.05-2023.08',
    title:
      'Investigation and research on strengthening disaster resilience capacity building in high-risk areas of natural disasters in Sichuan province',
    sponsor: 'Funding from the Provincial Committee of the Jiusan Society',
    role: 'Principal Investigator'
  },
  {
    period: '2022.04-2022.12',
    title: 'Land and space planning of emergency system in eastern new district of Chengdu',
    sponsor: 'Funding from Chengdu Eastern New Area Emergency Safety Administration',
    role: 'Principal Investigator'
  },
  {
    period: '2020.12-2021.04',
    title: 'The 14th five-year plan for the construction of emergency management system in Chenghua district, Chengdu',
    sponsor: 'Funding from Chenghua District Emergency Management Bureau',
    role: 'Principal Investigator'
  },
  {
    period: '2020.12-2021.04',
    title:
      'The 14th five-year plan for comprehensive disaster prevention and mitigation in Chengdu directly managed district, Sichuan Province',
    sponsor: 'Funding from Tianfu New District Emergency Management Bureau',
    role: 'Principal Investigator'
  },
  {
    period: '2020.12-2021.04',
    title:
      'The 14th five-year plan for comprehensive disaster prevention and mitigation in Chengdu directly managed district, Sichuan Province',
    sponsor: 'Funding from Tianfu New District Emergency Management Bureau',
    role: 'Principal Investigator'
  },
  {
    period: '2022.01-2022.06',
    title: 'Compilation of Quantifying Sustainability in the Aftermath of Natural Disasters (QSAND) Guidance manual',
    sponsor: 'Sichuan Red Cross Foundation; Mrs. Chen ZhangMincong Charity Foundation',
    role: 'Cooperative Researcher'
  },
  {
    period: '2022.01-2022.12',
    title: 'Sichuan Province: Safety improvement and security risks reduction solution',
    sponsor: 'Sichuan Emergency Management Department',
    role: 'Cooperative Researcher'
  },
  {
    period: '2021.11-2022.11',
    title:
      'Analysis of ecological space of traditional ethnic minority settlements and research on wisdom inheritance strategies',
    sponsor: 'Key project of Ecological Civilization Construction in Sichuan Province',
    role: 'Cooperative Researcher'
  },
  {
    period: '2018-2019',
    title:
      'Master plan of the Linpan settlement demonstration area in the western Sichuan Dujiangyan Irrigation District and detailed planning of the start-up area',
    sponsor: 'Government of Juyuan Town, Dujiangyan City',
    role: 'Cooperative Researcher'
  }
] as const;

export const recoveryDimensions = [
  { en: 'Social Adaptability', zh: '社会适应力' },
  { en: 'Ecological Carrying Capacity', zh: '生态承载力' },
  { en: 'Cultural Continuity', zh: '文化连续性' },
  { en: 'Spatial Governance Capacity', zh: '空间治理能力' }
];
