import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Aether Digital — Digital Systems That Scale',
  description: 'Custom websites, POS systems, inventory software, and digital infrastructure for Philippine businesses. Based in Dasmarinas, Cavite.',
  keywords: 'web design Philippines, POS system Cavite, inventory software, SEO Philippines, Aether Digital',
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
