import type { Metadata } from 'next';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'W11 — The Black Arrow',
  description: 'Engineered to dominate. An independent, interactive documentary exploring the 2020 Mercedes-AMG F1 W11 EQ Performance.',
  openGraph: { title: 'W11 — The Black Arrow', description: 'A machine built for a different level.', images: [{ url: '/media/w11/hero/black-arrow.webp', width: 1672, height: 941 }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
