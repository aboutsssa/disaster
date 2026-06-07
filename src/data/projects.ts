import type { LocalizedText } from './site';

export type ProjectEntry = {
  id: string;
  year: string;
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  tags: string[];
  thumbnail: 'typology' | 'observatory';
};

export const projectEntries: ProjectEntry[] = [
  {
    id: 'recovery-typology',
    year: '2026',
    title: {
      en: 'Typology of Post-Disaster Recovery Trajectories',
      zh: '灾后恢复轨迹类型学'
    },
    description: {
      en:
        'A conceptual framework for comparing recovery outcomes through material reconstruction and relational reassembly across social, ecological, multispecies, and cultural-symbolic dimensions.',
      zh:
        '一个用于比较灾后恢复结果的概念框架，关注物质重建与社会、生态、多物种、文化-象征关系重组之间的交互。'
    },
    href: '/projects/recovery-typology/',
    tags: ['recovery theory', 'typology', 're-inhabitability'],
    thumbnail: 'typology'
  },
  {
    id: 'global-disaster-map',
    year: '2026',
    title: {
      en: 'Global Disaster and ReSpace Observatory',
      zh: '全球灾害与复原空间观测平台'
    },
    description: {
      en:
        'An interactive atlas for comparing global hazards, population exposure, live earthquake events, and future recovery layers through a MapLibre-based public interface.',
      zh:
        '一个交互式地图集，用 MapLibre 公共界面比较全球灾害、人口暴露、实时地震事件与未来恢复图层。'
    },
    href: '/projects/global-disaster-map/',
    tags: ['interactive atlas', 'disaster data', 'MapLibre'],
    thumbnail: 'observatory'
  }
];
