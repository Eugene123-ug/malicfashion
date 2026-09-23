export interface MegaMenuColumn {
  title: string;
  links: { label: string; to: string }[];
}

export interface NavItem {
  label: string;
  to: string;
  megaMenu?: {
    columns: MegaMenuColumn[];
    promo: { image: string; title: string; cta: string; to: string };
  };
}

export const navItems: NavItem[] = [
  { label: 'New Arrivals', to: '/new-arrivals' },
  {
    label: 'Women',
    to: '/women',
    megaMenu: {
      columns: [
        {
          title: 'Shop',
          links: [
            { label: 'All Women', to: '/women' },
            { label: 'Dresses', to: '/women?cat=dresses' },
            { label: 'Tops', to: '/women?cat=tops' },
            { label: 'Trousers', to: '/women?cat=trousers' },
            { label: 'Jackets', to: '/women?cat=jackets' },
          ],
        },
        {
          title: 'Featured',
          links: [
            { label: 'New Arrivals', to: '/new-arrivals' },
            { label: 'Bestsellers', to: '/women?filter=bestseller' },
            { label: 'Sale', to: '/sale' },
          ],
        },
        {
          title: 'Style',
          links: [
            { label: 'Office', to: '/women?style=office' },
            { label: 'Evening', to: '/women?style=evening' },
            { label: 'Weekend', to: '/women?style=weekend' },
          ],
        },
      ],
      promo: {
        image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600',
        title: 'The Silk Edit',
        cta: 'Shop Now',
        to: '/women',
      },
    },
  },
  {
    label: 'Men',
    to: '/men',
    megaMenu: {
      columns: [
        {
          title: 'Shop',
          links: [
            { label: 'All Men', to: '/men' },
            { label: 'Shirts', to: '/men?cat=shirts' },
            { label: 'T-Shirts', to: '/men?cat=tshirts' },
            { label: 'Trousers', to: '/men?cat=trousers' },
            { label: 'Jackets', to: '/men?cat=jackets' },
          ],
        },
        {
          title: 'Featured',
          links: [
            { label: 'New Arrivals', to: '/new-arrivals' },
            { label: 'Bestsellers', to: '/men?filter=bestseller' },
            { label: 'Sale', to: '/sale' },
          ],
        },
        {
          title: 'Style',
          links: [
            { label: 'Smart Casual', to: '/men?style=smart' },
            { label: 'Streetwear', to: '/men?style=street' },
            { label: 'Office', to: '/men?style=office' },
          ],
        },
      ],
      promo: {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
        title: 'Tailored Essentials',
        cta: 'Shop Now',
        to: '/men',
      },
    },
  },
  {
    label: 'Unisex',
    to: '/unisex',
    megaMenu: {
      columns: [
        {
          title: 'Shop',
          links: [
            { label: 'All Unisex', to: '/unisex' },
            { label: 'T-Shirts', to: '/unisex?cat=tshirts' },
            { label: 'Shirts', to: '/unisex?cat=shirts' },
            { label: 'Accessories', to: '/unisex?cat=accessories' },
          ],
        },
      ],
      promo: {
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600',
        title: 'For Everyone',
        cta: 'Shop Now',
        to: '/unisex',
      },
    },
  },
  {
    label: 'Collections',
    to: '/collections',
    megaMenu: {
      columns: [
        {
          title: 'Collections',
          links: [
            { label: 'New Season', to: '/collections?c=new' },
            { label: 'Made for Ghana', to: '/collections?c=ghana' },
            { label: 'Essentials', to: '/collections?c=essentials' },
            { label: 'Limited Edition', to: '/collections?c=limited' },
          ],
        },
      ],
      promo: {
        image: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=600',
        title: 'Made for Ghana',
        cta: 'Explore',
        to: '/collections',
      },
    },
  },
  { label: 'Sale', to: '/sale' },
];
