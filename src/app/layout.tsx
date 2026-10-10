import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const serifFont = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bloomieee.co'),
  title: 'Bloomieee.co | Handmade Pipe-Cleaner Flowers & Everlasting Bouquets',
  description:
    'Flowers That Stay, Memories That Bloom. Handcrafted pipe-cleaner flower bouquets, custom floral gifts, tulips, roses, and everlasting blooms made with love in India.',
  keywords: [
    'pipe cleaner flowers',
    'handmade flower bouquet',
    'everlasting flowers',
    'bloomieee',
    'floral gifts',
    'custom bouquet',
    'tulip bouquet',
    'aesthetic flowers India',
  ],
  openGraph: {
    title: 'Bloomieee.co | Handmade Pipe-Cleaner Flowers & Everlasting Bouquets',
    description: 'Flowers That Stay, Memories That Bloom. Handcrafted with love.',
    url: 'https://bloomieee.co',
    siteName: 'Bloomieee.co',
    images: [
      {
        url: '/images/brand/bloomieee-logo.png',
        width: 600,
        height: 600,
        alt: 'Bloomieee.co Handmade Floral Boutique',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/images/brand/bloomieee-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} h-full antialiased selection:bg-blush selection:text-olive`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-main">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
