const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

export const site = {
  name: 'ReSpace Lab',
  owner: '恢复空间实验室',
  affiliation: 'Post-Disaster Recovery, Resilient Spatial Governance, and Re-Space',
  email: 'contact@example.edu',
  location: 'Seattle, WA'
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/research/', label: 'Research' },
  { href: '/projects/global-disaster-map/', label: 'Projects' },
  { href: '/people/', label: 'People' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/contact/', label: 'Contact' }
];

export const researchThemes = [
  {
    title: '恢复公平性与空间不平等机制识别',
    eyebrow: 'Equity',
    description:
      '构建“恢复绩效—政策干预—地理嵌套”的空间因果推断框架，识别灾后恢复中的公平性差异与空间不平等机制。'
  },
  {
    title: '文化景观与人居环境的复原建构',
    eyebrow: 'Landscape',
    description:
      '推动气候适应型空间设计与传统聚落可持续规划融合，关注灾后文化连续性、地方意义与人居环境重建。'
  },
  {
    title: '区域韧性演化路径建模',
    eyebrow: 'Resilience',
    description:
      '发展可推广的“恢复—适应—协同”系统动力模型，支撑灾后土地利用、城乡空间治理与规划决策。'
  },
  {
    title: '空间科学与公众参与方法',
    eyebrow: 'Methods',
    description:
      '融合参与式GIS、遥感技术、系统建模与因果推断，建设数据驱动与公众参与并重的灾后治理研究平台。'
  }
];

export const researchProjects = [
  {
    title: 'Post-Disaster Monitoring Slide Deck',
    eyebrow: 'Slides',
    description:
      'A presentation that turns the Wenchuan synthetic-control results and Himalayan extension into a concise research narrative.',
    href: '/slides/'
  },
  {
    title: 'Global Disaster & ReSpace Map',
    eyebrow: 'Map',
    description:
      'An interactive globe for comparing live earthquake events, population exposure, flood risk, heat, fire, and future recovery layers.',
    href: '/map/'
  },
  {
    title: 'Wenchuan Recovery Atlas',
    eyebrow: 'SCM Atlas',
    description:
      'A county-level 2000-2020 Sichuan panel application that compares actual recovery against synthetic counterfactual paths.',
    href: '/wenchuan/'
  },
  {
    title: 'Earth Engine Layer Roadmap',
    eyebrow: 'Project Notes',
    description:
      'A working plan for publishing browser-ready remote-sensing layers from Earth Engine into the public observatory.',
    href: '/projects/global-disaster-map/'
  }
] as const;

export const recoveryDimensions = [
  '社会适应力',
  '生态承载力',
  '文化连续性',
  '空间治理能力'
];
