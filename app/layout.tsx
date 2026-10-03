import type { Metadata } from 'next';
import './globals.css';
import { INSTAGRAM_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Enny's Kitchen | Nigerian food, made with love",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: "Enny's Kitchen | Nigerian food, made with love",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/social-share.jpg',
        alt: "Enny's Kitchen social share image featuring freshly prepared Egusi soup",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Enny's Kitchen | Nigerian food, made with love",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/social-share.jpg',
        alt: "Enny's Kitchen social share image featuring freshly prepared Egusi soup",
      },
    ],
  },
  other: {
    'instagram:site': '@ennyskitchen2',
    'og:see_also': INSTAGRAM_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
