import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bike, MessageCircle, ShoppingBag, Store, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import {
  ADDRESS_TEXT,
  BUSINESS_NODE,
  ORDER_GREETING,
  SITE_NAME,
  SITE_URL,
  breadcrumbList,
  webPageNode,
  whatsappUrl,
} from '@/lib/site';

const PAGE_TITLE = 'How to order';
const FULL_TITLE = `How to order | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  "Ordering from Enny's Kitchen takes a few taps: build your bag, send it on WhatsApp and choose delivery or pickup in Surulere, Lagos. Read the FAQs.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/how-to-order' },
  openGraph: { url: '/how-to-order', title: FULL_TITLE, description: PAGE_DESCRIPTION },
  twitter: { title: FULL_TITLE, description: PAGE_DESCRIPTION },
};

const STEPS = [
  {
    icon: UtensilsCrossed,
    title: 'Browse the menu',
    text: 'Filter by category or search for a dish. Everything on the menu is cooked to order.',
  },
  {
    icon: ShoppingBag,
    title: 'Build your bag',
    text: 'Tap Add on each dish and adjust portions. Your bag follows you around the site and is saved on your device.',
  },
  {
    icon: MessageCircle,
    title: 'Send it on WhatsApp',
    text: 'Add your name, choose delivery or pickup, then send. The whole order opens as one tidy message.',
  },
  {
    icon: CheckCircle2,
    title: 'We confirm and cook',
    text: 'We reply to confirm availability, the final total and timing. Then the pots go on.',
  },
];

const FAQS = [
  {
    question: 'Do you deliver?',
    answer:
      'Yes. Send us your address with your order and we will confirm whether we can reach you, the delivery fee and the expected time before anything is cooked.',
  },
  {
    question: 'Can I pick up my order instead?',
    answer: `Of course. Choose Pickup in your bag and collect from the kitchen at ${ADDRESS_TEXT}. We let you know when it is ready.`,
  },
  {
    question: 'Are the prices on the menu final?',
    answer:
      'The prices listed are a guide. Because everything is made fresh, we confirm the current price and your total on WhatsApp when you order.',
  },
  {
    question: 'How do I pay?',
    answer:
      'We share payment details on WhatsApp once your order is confirmed, so you only pay for what we have agreed.',
  },
  {
    question: 'How far ahead should I order?',
    answer:
      'As early as you can. Every dish is made to order, so the sooner we hear from you the sooner we can tell you when it will be ready.',
  },
  {
    question: 'Can you cook for a group or an event?',
    answer:
      'Yes. Message us with the date, the number of people and the dishes you have in mind and we will put a plan together with you.',
  },
];

const faqNode = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/how-to-order#faq`,
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const howToNode = {
  '@type': 'HowTo',
  '@id': `${SITE_URL}/how-to-order#howto`,
  name: `How to order from ${SITE_NAME}`,
  description: PAGE_DESCRIPTION,
  step: STEPS.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.text,
  })),
};

export default function HowToOrderPage() {
  return (
    <>
      <JsonLd
        graph={[
          BUSINESS_NODE,
          howToNode,
          faqNode,
          webPageNode({
            path: '/how-to-order',
            title: FULL_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbList([{ name: 'How to order', path: '/how-to-order' }]),
        ]}
      />

      <PageHero
        eyebrow="How to order"
        crumbs={[{ label: 'How to order' }]}
        title={
          <>
            Good food,
            <br />
            just a few taps away.
          </>
        }
        lead="No app to download and no account to create. Build your bag here, send it on WhatsApp and we take it from there."
      >
        <div className="heroActions">
          <Link href="/menu" className="btn btn-primary">
            Start an order <ArrowRight size={17} />
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="steps-title">
        <div className="sectionHead centered">
          <span className="eyebrow">Four simple steps</span>
          <h2 id="steps-title" className="sectionTitle">
            From craving to confirmed.
          </h2>
        </div>
        <ol className="steps four">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <li className="step" key={title}>
              <span className="stepIcon">
                <Icon size={20} />
              </span>
              <b className="stepNum">0{index + 1}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section tinted" aria-labelledby="fulfilment-title">
        <div className="sectionHead centered">
          <span className="eyebrow">Delivery or pickup</span>
          <h2 id="fulfilment-title" className="sectionTitle">
            Whichever suits your day.
          </h2>
        </div>
        <div className="optionCards">
          <article className="optionCard">
            <span className="valueIcon">
              <Bike size={20} />
            </span>
            <h3>Delivery</h3>
            <p>
              Tell us where you are and we confirm the fee and timing before we cook. Add a
              landmark to help the rider find you quickly.
            </p>
          </article>
          <article className="optionCard">
            <span className="valueIcon">
              <Store size={20} />
            </span>
            <h3>Pickup</h3>
            <p>
              Collect from the kitchen in Surulere. We message you the moment your order
              is packed and ready.
            </p>
            <Link href="/contact" className="textLink">
              Get directions <ArrowRight size={15} />
            </Link>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Questions</span>
            <h2 id="faq-title" className="sectionTitle">
              Things people ask us.
            </h2>
          </div>
          <p className="sectionLead">
            Anything else?{' '}
            <a href={whatsappUrl(ORDER_GREETING)} target="_blank" rel="noreferrer">
              Ask us on WhatsApp
            </a>{' '}
            and we will reply as soon as we can.
          </p>
        </div>
        <div className="faq">
          {FAQS.map((faq) => (
            <details className="faqItem" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
