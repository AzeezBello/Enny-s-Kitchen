import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Flame, Heart, Leaf } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import {
  BUSINESS_NODE,
  INSTAGRAM_URL,
  SITE_NAME,
  breadcrumbList,
  webPageNode,
} from '@/lib/site';

const PAGE_TITLE = 'Our kitchen';
const FULL_TITLE = `Our kitchen | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  "Meet Enny's Kitchen, a home-style Nigerian kitchen in Surulere, Lagos. See how our meals are made fresh, to order, with care.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', title: FULL_TITLE, description: PAGE_DESCRIPTION },
  twitter: { title: FULL_TITLE, description: PAGE_DESCRIPTION },
};

const VALUES = [
  {
    icon: Leaf,
    title: 'Fresh every day',
    text: 'We cook in small batches and to order, so what reaches you was made for you, not for a display case.',
  },
  {
    icon: Flame,
    title: 'Homestyle recipes',
    text: 'The Egusi, Efo Riro and Jollof taste the way they do at home because that is exactly how we make them.',
  },
  {
    icon: Heart,
    title: 'Served with care',
    text: 'From the first message to the last spoon, we treat every order like it is going to family.',
  },
];

const GALLERY = [
  {
    src: '/images/618636803_18078289760520578_9073600630757071578_n.jpg',
    alt: "A freshly plated meal from Enny's Kitchen",
    tall: true,
  },
  {
    src: '/images/jollof-rice.jpg',
    alt: 'Smoky Nigerian jollof rice',
  },
  {
    src: '/images/660390696_18080137697421924_3302643829288113713_n.jpg',
    alt: "A dish prepared at Enny's Kitchen",
  },
  {
    src: '/images/efo-riro.jpg',
    alt: 'Efo Riro, rich spinach stew',
  },
  {
    src: '/images/rice.webp',
    alt: 'Rice served with sauce and protein',
    tall: true,
  },
  {
    src: '/images/Beans.jpeg',
    alt: 'Slow-cooked Nigerian beans',
  },
];

const VIDEOS = [
  {
    src: '/videos/AQMsxAcTE_o7RmA9p6o6VZWIPFSnAja_7QLnRG4zCsFclwa1BfHw7cTNsfm6CsWiij4eeV611-v58fXA_GHErN7z.mp4',
    label: 'Cooking in the kitchen',
  },
  {
    src: '/videos/AQOI6OFVLPH3I1GMeLP-dCnMzOpuzHgP3iixhNFDjfIk8mnnkDu7znLDnvWt2mZq6bG9QNx3QdYlDTV3hEAm1WO_OuDhMl18MVM0eI0.mp4',
    label: 'Plating up',
  },
  {
    src: '/videos/AQMZZW_Chj4_zg7NJcl2rVvwJjRJBVSwss1jZAq5vu3XZHX_xyUi_Vmhq4fMbmYBFzCpRxRuZDqYuQB1MzScIxKKZKgvb-paTFvONOU.mp4',
    label: 'Ready to go',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        graph={[
          BUSINESS_NODE,
          webPageNode({ path: '/about', title: FULL_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbList([{ name: 'Our kitchen', path: '/about' }]),
        ]}
      />

      <PageHero
        eyebrow="Our kitchen"
        crumbs={[{ label: 'Our kitchen' }]}
        title={
          <>
            Good food has a way of
            <br />
            bringing us together.
          </>
        }
        lead="Enny's Kitchen started with a simple idea: the meals we grew up on deserve to be made properly, every single time, and shared with anyone who misses that taste."
        image={{
          src: '/images/shop.jpg',
          alt: "Inside Enny's Kitchen in Surulere, Lagos",
        }}
      />

      <section className="section" aria-labelledby="story-title">
        <div className="storyGrid">
          <div>
            <span className="eyebrow">The story</span>
            <h2 id="story-title" className="sectionTitle">
              A home kitchen in Surulere, open to everyone.
            </h2>
          </div>
          <div className="storyCopy">
            <p>
              We cook the food we love to eat: pots of Egusi and Efo Riro that simmer
              until the flavour is deep, Jollof with the right amount of smoke, soft Eba
              and Amala, golden plantain and properly seasoned chicken.
            </p>
            <p>
              Every order is prepared when you ask for it. That is why we work on
              WhatsApp. It lets us confirm what is fresh today, agree on portions and
              delivery, and answer any question before a single pot goes on the fire.
            </p>
            <a className="textLink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Follow the kitchen on Instagram <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section tinted" aria-labelledby="values-title">
        <div className="sectionHead centered">
          <span className="eyebrow">What we care about</span>
          <h2 id="values-title" className="sectionTitle">
            Three promises on every plate.
          </h2>
        </div>
        <div className="values">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <article className="valueCard" key={title}>
              <span className="valueIcon">
                <Icon size={20} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-title">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">From the pass</span>
            <h2 id="gallery-title" className="sectionTitle">
              A few recent plates.
            </h2>
          </div>
          <p className="sectionLead">
            Real photos from real orders. No stock food here.
          </p>
        </div>
        <div className="gallery">
          {GALLERY.map((item) => (
            <figure className={`galleryItem${item.tall ? ' tall' : ''}`} key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 50vw, 33vw"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="section tinted" aria-labelledby="videos-title">
        <div className="sectionHead centered">
          <span className="eyebrow">Behind the scenes</span>
          <h2 id="videos-title" className="sectionTitle">
            A little look inside.
          </h2>
        </div>
        <div className="videoGrid">
          {VIDEOS.map((video) => (
            <figure className="videoCard" key={video.src}>
              <video controls playsInline preload="metadata" aria-label={video.label}>
                <source src={video.src} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
              <figcaption>{video.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand title="Taste it for yourself." />
    </>
  );
}
