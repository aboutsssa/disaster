const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

export const site = {
  name: 'Re-Inhabitability Lab',
  owner: 'Dr. Qiushan Lin Research Group',
  affiliation: 'Post-Disaster Reconstruction, Human Geography, and Relational Recovery',
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
    title: 'Relational Recovery',
    eyebrow: 'Theory',
    description:
      'Rethinking disaster recovery as the reassembly of social, ecological, material, multispecies, and symbolic relations rather than the restoration of separate sectors.'
  },
  {
    title: 'Re-Inhabitability',
    eyebrow: 'Framework',
    description:
      'Studying how rebuilt environments become livable, meaningful, and dwellable after disruption, especially when material reconstruction and everyday life do not align.'
  },
  {
    title: 'Post-Disaster Reconstruction',
    eyebrow: 'Practice',
    description:
      'Comparing reconstruction trajectories across contexts to understand how housing, livelihoods, heritage, ecological repair, and community life are reconnected.'
  },
  {
    title: 'More-than-Human Worlds',
    eyebrow: 'Perspective',
    description:
      'Extending disaster studies beyond human-centered recovery to include animals, plants, landscapes, sacred sites, and environmental processes.'
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
    title: 'Global Disaster & Re-Inhabitability Map',
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
  'Social relationality',
  'Ecological embeddedness',
  'Multispecies coexistence',
  'Cultural-symbolic continuity'
];
