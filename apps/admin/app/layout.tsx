import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aether Admin',
  description: 'Internal admin dashboard — Aether Digital & Celebrations',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased" style={{ background: '#070707', color: '#f5f5f0' }}>
        {children}
      </body>
    </html>
  );
}
