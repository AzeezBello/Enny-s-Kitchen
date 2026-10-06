import type { Metadata } from 'next';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { MenuExplorer } from '@/components/menu-explorer';
import { PageHero } from '@/components/page-hero';
import { CATEGORIES, products } from '@/lib/menu';
import {
  BUSINESS_NODE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  breadcrumbList,
  webPageNode,
} from '@/lib/site';

const PAGE_TITLE = 'Menu';
const FULL_TITLE = `Menu | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  "The full Enny's Kitchen menu: Jollof, fried rice, Egusi, Efo Riro, Eba, Amala, fried plantain and chicken. Build your order and send it on WhatsApp.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/menu' },
  openGraph: {
    url: '/menu',
    title: FULL_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    title: FULL_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const menuNode = {
  '@type': 'Menu',
  '@id': `${SITE_URL}/menu#menu`,
  name: `${SITE_NAME} menu`,
  url: `${SITE_URL}/menu`,
  inLanguage: 'en-NG',
  hasMenuSection: CATEGORIES.map((category) => ({
    '@type': 'MenuSection',
    name: category,
    hasMenuItem: products
      .filter((product) => product.category === category)
      .map((product) => ({
        '@type': 'MenuItem',
        name: product.name,
        description: product.description,
        image: absoluteUrl(encodeURI(product.image)),
        ...(product.price != null
          ? {
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'NGN',
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
      })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <JsonLd
        graph={[
          BUSINESS_NODE,
          menuNode,
          webPageNode({ path: '/menu', title: FULL_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbList([{ name: 'Menu', path: '/menu' }]),
        ]}
      />

      <PageHero
        eyebrow="The menu"
        crumbs={[{ label: 'Menu' }]}
        title={
          <>
            Made for your kind
            <br />
            of comfort.
          </>
        }
        lead="From a little something on the side to a full plate of your favourites. Add what you like, then send your bag to us on WhatsApp."
      />

      <section className="section menuSection" aria-label="Menu items">
        <MenuExplorer />
        <p className="menuNote">
          Prices are a guide. We confirm availability and the final total when you place
          your order.
        </p>
      </section>

      <CtaBand
        title="Not sure what to pick?"
        text="Message us on WhatsApp and we will help you put a plate together."
      />
    </>
  );
}
