import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Heart, Instagram, UtensilsCrossed } from 'lucide-react';
import MenuAndCart from './menu-and-cart';
import {
  BUSINESS_ADDRESS,
  BUSINESS_PHONE,
  BUSINESS_WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from './seo';

const PAGE_TITLE = "Nigerian food in Surulere, Lagos | Enny's Kitchen";
const PAGE_DESCRIPTION =
  "Enjoy freshly prepared Nigerian food from Enny's Kitchen in Surulere, Lagos. Browse the menu and order Egusi, Efo Riro, rice, swallow, plantain and more on WhatsApp.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE,
        alt: "Enny's Kitchen social share image featuring freshly prepared Egusi soup",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE,
        alt: "Enny's Kitchen social share image featuring freshly prepared Egusi soup",
      },
    ],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FoodEstablishment',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${SOCIAL_IMAGE}`,
      logo: `${SITE_URL}/images/Ennys%20Kitchen-logo.png`,
      description: SITE_DESCRIPTION,
      telephone: BUSINESS_PHONE,
      address: BUSINESS_ADDRESS,
      servesCuisine: ['Nigerian'],
      sameAs: [INSTAGRAM_URL],
      hasMenu: `${SITE_URL}/#menu`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'en-NG',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: 'en-NG',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#business` },
      primaryImageOfPage: `${SITE_URL}${SOCIAL_IMAGE}`,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Menu',
          item: `${SITE_URL}/#menu`,
        },
      ],
    },
  ],
};

export default function Home() {
  const jsonLd = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <header className="nav">
        <a className="brand" href="#top" aria-label="Enny's Kitchen home">
          <Image
            className="brandLogo"
            src="/images/Ennys Kitchen-logo.png"
            alt="Enny's Kitchen"
            width={535}
            height={404}
            priority
          />
        </a>
        <details className="mobileMenu">
          <summary aria-label="Toggle navigation menu" title="Navigation menu">
            <UtensilsCrossed size={19} />
          </summary>
          <nav className="mobileNavLinks" aria-label="Mobile navigation">
            <a href="#menu">Menu</a>
            <a href="#about">Our kitchen</a>
            <a href="#how">How to order</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a>
          </nav>
        </details>
        <nav className="desktopNav" aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#about">Our kitchen</a>
          <a href="#how">How to order</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a>
        </nav>
        <a className="cartBtn" href="#menu">
          <span>Explore menu</span>
          <ArrowRight size={16} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <span className="eyebrow"><i /> HOME-COOKED NIGERIAN FOOD</span>
          <h1>Comfort food,<br /><em>straight from</em><br />our kitchen.</h1>
          <p>
            The flavours you grew up loving, made fresh and ready to make your day a little
            better.
          </p>
          <div className="heroActions">
            <a className="primary" href="#menu">
              Explore the menu <ArrowRight size={18} />
            </a>
            <a
              className="secondary"
              href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=Hello%20Enny%27s%20Kitchen!%20I%27d%20like%20to%20place%20an%20order.`}
              target="_blank"
              rel="noreferrer"
            >
              Order on WhatsApp
            </a>
          </div>
          <div className="heroNote">
            <Heart size={16} fill="currentColor" />
            <span>Made with care. Served with love.</span>
          </div>
        </div>
        <div className="heroVisual">
          <div className="heroPhoto">
            <img
              src="/images/Egusi.jpg"
              alt="A bowl of rich Nigerian egusi soup, freshly prepared at Enny's Kitchen"
              width="889"
              height="668"
              fetchPriority="high"
            />
            <div className="photoCaption">
              <span>THE HOUSE FAVOURITE</span>
              <strong>Egusi soup</strong>
            </div>
          </div>
          <div className="heroStamp">
            <span>REAL FOOD</span>
            <b>Made<br />fresh</b>
            <i aria-hidden="true">✳</i>
          </div>
          <div className="heroMiniPhoto">
            <img
              src="/images/plantain.jpeg"
              alt="Golden fried plantain slices"
              width="554"
              height="554"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <div className="trustStrip">
        <span>Freshly prepared</span><i aria-hidden="true">✳</i>
        <span>Made to order</span><i aria-hidden="true">✳</i>
        <span>Authentic Nigerian flavour</span><i aria-hidden="true">✳</i>
        <span>Easy WhatsApp ordering</span>
      </div>

      <MenuAndCart />

      <section className="about" id="about">
        <div className="aboutVisual">
          <div className="videoFrame">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/659129063_18080135552421924_3207266206275304446_n.jpg"
              aria-label="A video from Enny's Kitchen"
            >
              <source
                src="/videos/AQP8P4lSG5gsCDWWCc-C1r8_u1KYT1jW-QEysvKa8BsVc2NhjWpgkQoMamtqVvLjEERe4G6o8Bc1lfmfzvUSiyDaS8z8QohmoLlInVY.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML video.
            </video>
            <span className="videoCaption">A LITTLE LOOK INTO OUR KITCHEN</span>
          </div>
          <div className="aboutBadge"><Heart size={16} fill="currentColor" /> From our kitchen to your table</div>
        </div>
        <div className="aboutCopy">
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <h2>Good food has a way of bringing us together.</h2>
          <p>
            Enny&apos;s Kitchen is all about bringing comforting Nigerian meals to your table.
            From everyday rice and beans to rich Egusi and Efo Riro, every portion is prepared
            to feel like a good meal at home.
          </p>
          <p>
            Choose the dishes you love, build your order and send it our way on WhatsApp.
            We&apos;ll help with the rest.
          </p>
          <a className="textLink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            See what&apos;s cooking on Instagram <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="how" id="how">
        <div className="sectionHead centered">
          <span className="eyebrow">GOOD FOOD, JUST A FEW TAPS AWAY</span>
          <h2>How to order</h2>
        </div>
        <div className="steps">
          <div><b>01</b><h3>Pick your food</h3><p>Browse the menu and add the meals and portions you want.</p></div>
          <div><b>02</b><h3>Review your order</h3><p>Open your order bag to check quantities before sending.</p></div>
          <div><b>03</b><h3>Send it our way</h3><p>We&apos;ll confirm availability, pricing, delivery or pickup details with you.</p></div>
        </div>
      </section>

      <footer>
        <div>
          <a className="brand" href="#top">
            <Image
              className="brandLogo"
              src="/images/Ennys Kitchen-logo.png"
              alt="Enny's Kitchen"
              width={535}
              height={404}
            />
          </a>
          <p>Home-cooked Nigerian food, made with love.</p>
        </div>
        <div className="footerLinks">
          <a href="#menu">Menu</a>
          <a href="#about">Our kitchen</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <small>© 2026 Enny&apos;s Kitchen</small>
      </footer>
    </main>
  );
}
