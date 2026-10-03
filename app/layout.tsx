import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Enny's Kitchen | Homemade Nigerian Food",
  description: "Freshly prepared Nigerian meals from Enny's Kitchen. Rice, beans, plantain, Eba, Egusi, Efo Riro, Amala and chicken portions.",
  metadataBase: new URL('https://ennyskitchen.example'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
