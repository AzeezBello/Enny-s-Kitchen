import type { Metadata } from 'next';
import { ArrowUpRight, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import {
  ADDRESS_LINES,
  BUSINESS_NODE,
  BUSINESS_PHONE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_URL,
  ORDER_GREETING,
  SITE_NAME,
  breadcrumbList,
  formatPhone,
  webPageNode,
  whatsappUrl,
} from '@/lib/site';

const PAGE_TITLE = 'Contact';
const FULL_TITLE = `Contact | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  "Contact Enny's Kitchen in Surulere, Lagos. Order or ask a question on WhatsApp, call us, find us on the map or follow along on Instagram.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: FULL_TITLE, description: PAGE_DESCRIPTION },
  twitter: { title: FULL_TITLE, description: PAGE_DESCRIPTION },
};

const QUICK_MESSAGES = [
  {
    label: 'Place an order',
    text: ORDER_GREETING,
  },
  {
    label: "Ask what's available today",
    text: "Hello Enny's Kitchen! What dishes are available today?",
  },
  {
    label: 'Ask about delivery to my area',
    text: "Hello Enny's Kitchen! Do you deliver to my area? I'm at: ",
  },
  {
    label: 'Order for a group or event',
    text: "Hello Enny's Kitchen! I'd like to order for a group. Date: ... Number of people: ... Dishes: ...",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        graph={[
          BUSINESS_NODE,
          webPageNode({ path: '/contact', title: FULL_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbList([{ name: 'Contact', path: '/contact' }]),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        crumbs={[{ label: 'Contact' }]}
        title={
          <>
            Say hello.
            <br />
            We are quick to reply.
          </>
        }
        lead="WhatsApp is the fastest way to reach us for orders and questions. You can also call, visit the kitchen or follow along on Instagram."
      />

      <section className="section" aria-label="Contact details">
        <div className="contactGrid">
          <a
            className="contactCard primaryCard"
            href={whatsappUrl(ORDER_GREETING)}
            target="_blank"
            rel="noreferrer"
          >
            <span className="valueIcon">
              <MessageCircle size={20} />
            </span>
            <h2>WhatsApp</h2>
            <p>Orders, questions and today&apos;s availability.</p>
            <strong>
              {formatPhone(BUSINESS_PHONE)} <ArrowUpRight size={16} />
            </strong>
          </a>

          <a className="contactCard" href={`tel:${BUSINESS_PHONE}`}>
            <span className="valueIcon">
              <Phone size={20} />
            </span>
            <h2>Call us</h2>
            <p>Prefer to talk? Give the kitchen a ring.</p>
            <strong>
              {formatPhone(BUSINESS_PHONE)} <ArrowUpRight size={16} />
            </strong>
          </a>

          <a className="contactCard" href={MAPS_URL} target="_blank" rel="noreferrer">
            <span className="valueIcon">
              <MapPin size={20} />
            </span>
            <h2>Visit the kitchen</h2>
            <p>
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="addressLine">
                  {line}
                </span>
              ))}
            </p>
            <strong>
              Open in Google Maps <ArrowUpRight size={16} />
            </strong>
          </a>

          <a className="contactCard" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <span className="valueIcon">
              <Instagram size={20} />
            </span>
            <h2>Instagram</h2>
            <p>Daily plates, specials and behind the scenes.</p>
            <strong>
              {INSTAGRAM_HANDLE} <ArrowUpRight size={16} />
            </strong>
          </a>
        </div>
      </section>

      <section className="section tinted" aria-labelledby="quick-title">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Start a chat</span>
            <h2 id="quick-title" className="sectionTitle">
              Pick a message and we fill in the rest.
            </h2>
          </div>
          <p className="sectionLead">
            Each button opens WhatsApp with a ready-made message you can edit before sending.
          </p>
        </div>
        <div className="quickMessages">
          {QUICK_MESSAGES.map((item) => (
            <a
              key={item.label}
              className="quickMessage"
              href={whatsappUrl(item.text)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              <span>{item.label}</span>
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </section>

      <CtaBand title="Ready when you are." text="Browse the menu and send your order in a couple of taps." />
    </>
  );
}
