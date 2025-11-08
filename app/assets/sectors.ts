export type Sector = {
  slug: string;
  title: string;
  image: string;
};

export const sectors: Sector[] = [
  {
    slug: 'all',
    title: 'All',
    image: '/sectors/all.jpg',
  },
  {
    slug: 'arts-and-entertainment',
    title: 'Arts & Entertainment',
    image: '/sectors/arts_and_entertainment.jpg',
  },
  {
    slug: 'athletics',
    title: 'Athletics',
    image: '/sectors/athletics.jpg',
  },
  {
    slug: 'business-corporate',
    title: 'Business & Corporate',
    image: '/sectors/business_corporate.jpg',
  },
];
