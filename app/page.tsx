import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { DishCard } from '@/components/dish-card';
import { JsonLd } from '@/components/json-ld';
import { CATEGORIES, CATEGORY_DETAILS, featuredProducts, products } from '@/lib/menu';
import {
  BUSINESS_NODE,
  INSTAGRAM_URL,
  ORDER_GREETING,
  SITE_NAME,
  SOCIAL_IMAGE,
  SOCIAL_IMAGE_ALT,
  WEBSITE_NODE,
  webPageNode,
  whatsappUrl,
} from '@/lib/site';

const PAGE_TITLE = `Nigerian food in Surulere, Lagos | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  "Enjoy freshly prepared Nigerian food from Enny's Kitchen in Surulere, Lagos. Browse the menu and order Egusi, Efo Riro, rice, swallow, plantain and more on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: SOCIAL_IMAGE_ALT }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const HOW_STEPS = [
  {
    title: 'Pick your food',
    text: 'Browse the menu and add the dishes and portions you want to your bag.',
  },
  {
    title: 'Review your bag',
    text: 'Check quantities, choose delivery or pickup and add your details.',
  },
  {
    title: 'Send it on WhatsApp',
    text: 'Your order opens as a ready-made message. We confirm and get cooking.',
  },
];

export default function HomePage() {
  const featured = featuredProducts.slice(0, 6);

  return (
    <>
      <JsonLd
        graph={[
          BUSINESS_NODE,
          WEBSITE_NODE,
          webPageNode({ path: '/', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
        ]}
      />

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">
            <i aria-hidden="true" /> Home-cooked Nigerian food
          </span>
          <h1>
            Comfort food,
            <br />
            <em>straight from</em>
            <br />
            our kitchen.
          </h1>
          <p>
            The flavours you grew up loving, made fresh to order and ready to make your
            day a little better.
          </p>
          <div className="heroActions">
            <Link href="/menu" className="btn btn-primary btn-lg">
              Explore the menu <ArrowRight size={18} />
            </Link>
            <a
              className="btn btn-secondary btn-lg"
              href={whatsappUrl(ORDER_GREETING)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Order on WhatsApp
            </a>
          </div>
          <ul className="heroMeta">
            <li>
              <Sparkles size={15} /> {products.length} dishes, made to order
            </li>
            <li>
              <MapPin size={15} /> Surulere, Lagos
            </li>
            <li>
              <Heart size={15} /> Made with care
            </li>
          </ul>
        </div>

        <div className="heroVisual">
          <div className="heroPhoto">
            <Image
              src="/images/Egusi.jpg"
              alt="A bowl of rich Nigerian egusi soup, freshly prepared at Enny's Kitchen"
              fill
              sizes="(max-width: 700px) 85vw, 40vw"
              preload
            />
            <div className="photoCaption">
              <span>The house favourite</span>
              <strong>Egusi soup</strong>
            </div>
          </div>
          <div className="heroStamp" aria-hidden="true">
            <span>Real food</span>
            <b>
              Made
              <br />
              fresh
            </b>
          </div>
          <div className="heroMiniPhoto">
            <Image
              src="/images/plantain.jpeg"
              alt="Golden fried plantain slices"
              fill
              sizes="(max-width: 700px) 30vw, 14vw"
            />
          </div>
        </div>
      </section>

      <div className="trustStrip" aria-label="What to expect">
        <span>Freshly prepared</span>
        <i aria-hidden="true">✳</i>
        <span>Made to order</span>
        <i aria-hidden="true">✳</i>
        <span>Authentic Nigerian flavour</span>
        <i aria-hidden="true">✳</i>
        <span>Easy WhatsApp ordering</span>
      </div>

      <section className="section" aria-labelledby="favourites-title">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">A good place to start</span>
            <h2 id="favourites-title" className="sectionTitle">
              The dishes people
              <br />
              keep coming back for.
            </h2>
          </div>
          <p className="sectionLead">
            Add them straight to your bag from here, or head to the full menu to see
            everything we cook.
          </p>
        </div>

        <div className="dishGrid">
          {featured.map((product, index) => (
            <DishCard key={product.id} product={product} preload={index < 3} />
          ))}
        </div>

        <div className="sectionActions">
          <Link href="/menu" className="btn btn-secondary">
            See the full menu <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section tinted" aria-labelledby="categories-title">
        <div className="sectionHead centered">
          <span className="eyebrow">Browse by craving</span>
          <h2 id="categories-title" className="sectionTitle">
            What are you in the mood for?
          </h2>
        </div>

        <div className="categoryTiles">
          {CATEGORIES.map((category) => {
            const details = CATEGORY_DETAILS[category];
            const count = products.filter((product) => product.category === category).length;
            return (
              <Link
                key={category}
                href={`/menu?category=${encodeURIComponent(category)}`}
                className="categoryTile"
              >
                <div className="categoryImage">
                  <Image
                    src={details.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 50vw, 20vw"
                  />
                </div>
                <div className="categoryBody">
                  <h3>{category}</h3>
                  <p>{details.blurb}</p>
                  <span>
                    {count} {count === 1 ? 'dish' : 'dishes'} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section split" aria-labelledby="about-title">
        <div className="splitVisual">
          <div className="videoFrame">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/659129063_18080135552421924_3207266206275304446_n.jpg"
              aria-label="A short video from inside Enny's Kitchen"
            >
              <source
                src="/videos/AQP8P4lSG5gsCDWWCc-C1r8_u1KYT1jW-QEysvKa8BsVc2NhjWpgkQoMamtqVvLjEERe4G6o8Bc1lfmfzvUSiyDaS8z8QohmoLlInVY.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML video.
            </video>
          </div>
          <div className="badgeFloat">
            <Heart size={15} fill="currentColor" /> From our kitchen to your table
          </div>
        </div>

        <div className="splitCopy">
          <span className="eyebrow">A little about us</span>
          <h2 id="about-title" className="sectionTitle">
            Good food has a way of bringing us together.
          </h2>
          <p>
            Enny&apos;s Kitchen is all about bringing comforting Nigerian meals to your
            table. From everyday rice and beans to rich Egusi and Efo Riro, every portion
            is prepared to feel like a good meal at home.
          </p>
          <div className="heroActions">
            <Link href="/about" className="btn btn-secondary">
              Meet the kitchen <ArrowRight size={17} />
            </Link>
            <a className="textLink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              See what&apos;s cooking on Instagram <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section tinted" aria-labelledby="how-title">
        <div className="sectionHead centered">
          <span className="eyebrow">Good food, just a few taps away</span>
          <h2 id="how-title" className="sectionTitle">
            How to order
          </h2>
        </div>

        <ol className="steps">
          {HOW_STEPS.map((step, index) => (
            <li className="step" key={step.title}>
              <b className="stepNum">0{index + 1}</b>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="sectionActions">
          <Link href="/how-to-order" className="textLink">
            Delivery, pickup and FAQs <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
