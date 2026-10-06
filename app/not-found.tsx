import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="notFound">
      <UtensilsCrossed size={44} strokeWidth={1.4} aria-hidden="true" />
      <span className="eyebrow">404</span>
      <h1>That page is not on the menu.</h1>
      <p>The link may be old or mistyped. The good stuff is still a tap away.</p>
      <div className="heroActions">
        <Link href="/menu" className="btn btn-primary">
          See the menu <ArrowRight size={17} />
        </Link>
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </div>
    </section>
  );
}
