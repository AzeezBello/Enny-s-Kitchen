import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Crumb = { label: string; href?: '/' | '/menu' | '/about' | '/how-to-order' | '/contact' };

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  image?: { src: string; alt: string };
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, crumbs, image, children }: PageHeroProps) {
  return (
    <section className={`pageHero${image ? ' withImage' : ''}`}>
      <div className="pageHeroCopy">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label}>
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <span className="eyebrow">
          <i aria-hidden="true" /> {eyebrow}
        </span>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
      {image && (
        <div className="pageHeroImage">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 100vw, 44vw" preload />
        </div>
      )}
    </section>
  );
}
