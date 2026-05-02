import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Aether Celebrations — Turning Moments into Memories',
  description: 'Wedding planning, event coordination, and souvenir design in Dasmarinas, Cavite. Aether Celebrations by Remlyn Salinas.',
  keywords: 'wedding planner Cavite, event coordinator Philippines, wedding souvenirs, Aether Celebrations',
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
