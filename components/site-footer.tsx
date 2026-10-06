import Image from 'next/image';
import Link from 'next/link';
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  ADDRESS_LINES,
  BUSINESS_PHONE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOGO_IMAGE,
  MAPS_URL,
  NAV_LINKS,
  ORDER_GREETING,
  SITE_NAME,
  SITE_TAGLINE,
  formatPhone,
  whatsappUrl,
} from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerGrid">
        <div className="footerBrand">
          <Link href="/" className="brand" aria-label={`${SITE_NAME} home`}>
            <Image
              className="brandLogo"
              src={LOGO_IMAGE}
              alt={SITE_NAME}
              width={535}
              height={404}
            />
          </Link>
          <p>{SITE_TAGLINE}. Freshly prepared in Surulere, Lagos and ordered in a few taps on WhatsApp.</p>
          <a
            className="btn btn-primary btn-sm"
            href={whatsappUrl(ORDER_GREETING)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> Order on WhatsApp
          </a>
        </div>

        <div className="footerCol">
          <h2>Explore</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footerCol">
          <h2>Find us</h2>
          <address>
            <a href={MAPS_URL} target="_blank" rel="noreferrer">
              <MapPin size={15} />
              <span>
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="addressLine">
                    {line}
                  </span>
                ))}
              </span>
            </a>
            <a href={`tel:${BUSINESS_PHONE}`}>
              <Phone size={15} />
              <span>{formatPhone(BUSINESS_PHONE)}</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram size={15} />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
          </address>
        </div>
      </div>

      <div className="footerBottom">
        <small>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</small>
        <small>Prices and availability are confirmed when you order.</small>
      </div>
    </footer>
  );
}
