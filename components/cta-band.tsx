import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ORDER_GREETING, whatsappUrl } from '@/lib/site';

type CtaBandProps = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = 'Hungry already?',
  text = 'Build your order from the menu or message us directly on WhatsApp. We confirm availability and delivery in minutes.',
}: CtaBandProps) {
  return (
    <section className="ctaBand">
      <div className="ctaInner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="ctaActions">
          <Link href="/menu" className="btn btn-light">
            Browse the menu <ArrowRight size={17} />
          </Link>
          <a
            className="btn btn-outline-light"
            href={whatsappUrl(ORDER_GREETING)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
