import type { MetadataRoute } from 'next';
import { products } from '@/lib/menu';
import { SITE_URL, SOCIAL_IMAGE, absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const menuImages = products.map((product) => absoluteUrl(encodeURI(product.image)));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [absoluteUrl(SOCIAL_IMAGE)],
    },
    {
      url: `${SITE_URL}/menu`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: menuImages,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/how-to-order`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
