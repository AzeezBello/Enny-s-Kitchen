export const CATEGORIES = [
  'Rice & Beans',
  'Sides',
  'Soups',
  'Swallow',
  'Protein',
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategoryFilter = 'All' | Category;

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  /** Price in naira. null means "confirm on WhatsApp". */
  price: number | null;
  image: string;
  imageAlt?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: 'cooked-rice',
    name: 'Cooked/White Rice',
    category: 'Rice & Beans',
    price: 500,
    description:
      'Freshly cooked Nigerian white rice, served hot and ready to enjoy.',
    image: '/images/cooked-rice.jpg',
    featured: true,
  },
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    category: 'Rice & Beans',
    price: 500,
    description:
      'Freshly prepared Nigerian jollof rice, rich with flavour and served hot.',
    image: '/images/jollof-rice.jpg',
    featured: true,
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    category: 'Rice & Beans',
    price: 500,
    description:
      'Flavourful Nigerian fried rice prepared fresh and ready to enjoy.',
    image: '/images/Fried-Rice.webp',
    featured: true,
  },
  {
    id: 'beans',
    name: 'Beans',
    category: 'Rice & Beans',
    price: 500,
    description:
      'Slow-cooked Nigerian beans prepared with rich, homestyle flavour.',
    image: '/images/Beans.jpeg',
  },
  {
    id: 'fried-plantain',
    name: 'Fried Plantain',
    category: 'Sides',
    price: 500,
    description:
      'Golden fried plantain with the perfect sweet and savoury finish.',
    image: '/images/plantain.jpeg',
    featured: true,
  },
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    category: 'Soups',
    price: 500,
    description:
      'Rich Nigerian melon-seed soup prepared with authentic spices and flavour.',
    image: '/images/Egusi.jpg',
    featured: true,
  },
  {
    id: 'efo-riro',
    name: 'Efo Riro',
    category: 'Soups',
    price: 500,
    description:
      'Traditional Yoruba-style spinach stew with a rich, savoury taste.',
    image: '/images/efo-riro.jpg',
    featured: true,
  },
  {
    id: 'eba',
    name: 'Eba',
    category: 'Swallow',
    price: 500,
    description: 'Soft, freshly prepared garri swallow.',
    image: '/images/eba.jpg',
  },
  {
    id: 'amala',
    name: 'Amala',
    category: 'Swallow',
    price: 500,
    description: 'Smooth, freshly prepared Nigerian amala.',
    image: '/images/amala.jpeg',
  },
  {
    id: 'chicken',
    name: 'Chicken Portion',
    category: 'Protein',
    price: 3000,
    description:
      'Tender, flavourful chicken prepared to complement your meal.',
    image: '/images/chicken.jpg',
  },
];

export const CATEGORY_DETAILS: Record<
  Category,
  { blurb: string; image: string }
> = {
  'Rice & Beans': {
    blurb: 'Jollof, fried rice, white rice and slow-cooked beans.',
    image: '/images/jollof-rice.jpg',
  },
  Sides: {
    blurb: 'Golden fried plantain to round off any plate.',
    image: '/images/plantain.jpeg',
  },
  Soups: {
    blurb: 'Egusi and Efo Riro, rich and made to order.',
    image: '/images/Egusi.jpg',
  },
  Swallow: {
    blurb: 'Soft Eba and smooth Amala, freshly prepared.',
    image: '/images/amala.jpeg',
  },
  Protein: {
    blurb: 'Tender chicken portions to complete your meal.',
    image: '/images/chicken.jpg',
  },
};

const productIndex = new Map(products.map((product) => [product.id, product]));

export function getProduct(id: string) {
  return productIndex.get(id);
}

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

export const featuredProducts = products.filter((product) => product.featured);

export function productAlt(product: Product) {
  return product.imageAlt ?? `${product.name}, freshly prepared at Enny's Kitchen`;
}

export function money(amount: number | null) {
  return amount == null
    ? 'Price on request'
    : `₦${amount.toLocaleString('en-NG')}`;
}
