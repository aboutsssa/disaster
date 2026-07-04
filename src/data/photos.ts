export type PhotoItem = {
  slug: string;
  image: string;
  titleEn: string;
  titleZh: string;
};

export type PhotoAlbum = {
  slug: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  photos: PhotoItem[];
};

export const photoAlbums: PhotoAlbum[] = [
  {
    slug: 'graduation-memory',
    titleEn: 'Graduation Memory Album',
    titleZh: '毕业纪念册',
    descriptionEn: 'Milestones, gatherings, and small moments from ReSpace Lab members.',
    descriptionZh: '记录 ReSpace Lab 成员毕业、相聚与共同成长的瞬间。',
    photos: [
      {
        slug: 'li-rongjia-graduation-dinner-2024',
        image: '/assets/photo/graduation-memory/li-rongjia-graduation-dinner-2024.jpg',
        titleEn: 'Graduation Dinner 2024',
        titleZh: '李荣佳毕业聚餐2024'
      },
      {
        slug: 'chen-yun-graduation',
        image: '/assets/photo/graduation-memory/chen-yun-graduation.jpg',
        titleEn: "Congratulations to Chen Yun on earning her master's degree",
        titleZh: '祝贺陈芸硕士毕业'
      },
      {
        slug: 'li-zhuo-graduation-dinner-2026',
        image: '/assets/photo/graduation-memory/li-zhuo-graduation-dinner-2026.jpg',
        titleEn: 'Zhuo Li Graduation Dinner 2026',
        titleZh: '李卓毕业聚餐'
      }
    ]
  }
];

export const photoItems = photoAlbums.flatMap((album) =>
  album.photos.map((photo) => ({ ...photo, album }))
);
