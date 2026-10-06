'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { LOGO_IMAGE, NAV_LINKS, ORDER_GREETING, SITE_NAME, whatsappUrl } from '@/lib/site';
import { useCart } from './cart/cart-provider';

export function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <Link href="/" className="brand" aria-label={`${SITE_NAME} home`}>
          <Image
            className="brandLogo"
            src={LOGO_IMAGE}
            alt={SITE_NAME}
            width={535}
            height={404}
            preload
          />
        </Link>

        <nav className="mainNav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navLink${isActive(link.href) ? ' isActive' : ''}`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="headerActions">
          <a
            className="btn btn-secondary btn-sm headerWhatsApp"
            href={whatsappUrl(ORDER_GREETING)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>

          <button
            type="button"
            className="bagButton"
            onClick={cart.open}
            aria-label={`Open order bag, ${cart.count} item${cart.count === 1 ? '' : 's'}`}
          >
            <ShoppingBag size={19} />
            <span className="bagLabel">Bag</span>
            {cart.count > 0 && <span className="bagCount">{cart.count}</span>}
          </button>

          <button
            type="button"
            className="menuToggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`mobilePanel${menuOpen ? ' isOpen' : ''}`}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <Link href="/" className={`navLink${pathname === '/' ? ' isActive' : ''}`}>
          Home
        </Link>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navLink${isActive(link.href) ? ' isActive' : ''}`}
            aria-current={isActive(link.href) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
        <a
          className="btn btn-primary"
          href={whatsappUrl(ORDER_GREETING)}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={17} /> Order on WhatsApp
        </a>
      </nav>
    </header>
  );
}
