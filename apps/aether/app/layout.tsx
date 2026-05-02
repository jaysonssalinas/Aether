import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Aether — The Essence of Possibility',
  description:
    'Aether is a Philippine company bringing digital innovation and celebration expertise together. Digital systems that scale. Events that move.',
  keywords: 'Aether, Philippines, web development, events, weddings, software, Cavite',
  openGraph: {
    title: 'Aether — The Essence of Possibility',
    description: 'Digital systems that scale. Events that move.',
    siteName: 'Aether',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <NavBar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
