/**
 * Single source of truth for business facts and site-wide constants.
 * Everything that mentions the brand, address or contact details reads from here.
 */

export const SITE_URL = 'https://www.ennyskitchen.com';
export const SITE_NAME = "Enny's Kitchen";
export const SITE_TAGLINE = 'Home-cooked Nigerian food, made with love';
export const SITE_DESCRIPTION =
  "Freshly prepared Nigerian meals from Enny's Kitchen in Surulere, Lagos. Order rice, soups, swallow, sides and chicken on WhatsApp.";

export const SOCIAL_IMAGE = '/images/social-share.jpg';
export const SOCIAL_IMAGE_ALT =
  "Enny's Kitchen social share image featuring freshly prepared Egusi soup";
export const LOGO_IMAGE = '/images/Ennys Kitchen-logo.png';

export const INSTAGRAM_URL = 'https://www.instagram.com/ennyskitchen2/';
export const INSTAGRAM_HANDLE = '@ennyskitchen2';

/** Published business line in E.164 format. */
export const BUSINESS_PHONE = '+2348061542075';

/**
 * WhatsApp number as digits only, which is the format wa.me expects.
 * NEXT_PUBLIC_WHATSAPP_NUMBER may override it at build time; any "+", spaces
 * or dashes are stripped so a formatted value still works.
 */
export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS_PHONE
).replace(/\D/g, '');

export const ADDRESS_LINES = [
  '33 Nnobi Street',
  'Opposite Ikate Baptist Church, Kilo Bus-Stop',
  'Surulere, Lagos, Nigeria',
] as const;

export const ADDRESS_TEXT = ADDRESS_LINES.join(', ');

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Enny's Kitchen, ${ADDRESS_TEXT}`,
)}`;

export const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '33 Nnobi Street, Opposite Ikate Baptist Church, Kilo Bus-Stop',
  addressLocality: 'Surulere',
  addressRegion: 'Lagos',
  addressCountry: 'NG',
} as const;

export const NAV_LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'Our kitchen' },
  { href: '/how-to-order', label: 'How to order' },
  { href: '/contact', label: 'Contact' },
] as const;

export const ORDER_GREETING =
  "Hello Enny's Kitchen! I'd like to place an order.";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Formats +2348061542075 as "+234 806 154 2075" for display. */
export function formatPhone(e164: string) {
  const digits = e164.replace(/\D/g, '');
  if (digits.startsWith('234') && digits.length === 13) {
    return `+234 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return e164;
}

/** Schema.org FoodEstablishment node shared by every page's JSON-LD graph. */
export const BUSINESS_NODE = {
  '@type': 'FoodEstablishment',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: absoluteUrl(SOCIAL_IMAGE),
  logo: absoluteUrl(encodeURI(LOGO_IMAGE)),
  description: SITE_DESCRIPTION,
  telephone: BUSINESS_PHONE,
  address: BUSINESS_ADDRESS,
  servesCuisine: ['Nigerian'],
  sameAs: [INSTAGRAM_URL],
  hasMenu: `${SITE_URL}/menu`,
  priceRange: '₦₦',
} as const;

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'en-NG',
  publisher: { '@id': `${SITE_URL}/#business` },
} as const;

type Crumb = { name: string; path: string };

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map(
      (crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      }),
    ),
  };
}

export function webPageNode(input: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    inLanguage: 'en-NG',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    primaryImageOfPage: absoluteUrl(SOCIAL_IMAGE),
  };
}
