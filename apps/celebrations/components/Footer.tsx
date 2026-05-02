'use client';

import Link from 'next/link';
import { AetherLogo } from './AetherLogo';

export function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid #1e1e1e' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <AetherLogo size="sm" subtitle="Celebrations" />
            <p className="text-sm leading-relaxed" style={{ color: '#666666', maxWidth: '240px' }}>
              Weddings, events, and souvenirs crafted with love in Dasmarinas, Cavite.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase" style={{ color: '#999999' }}>Services</h4>
            {['Wedding Planning', 'Event Coordination', 'Venue Design', 'Souvenirs & Invitations'].map((s) => (
              <Link key={s} href="/services" className="text-sm" style={{ color: '#666666' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f5f5f0')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#666666')}>{s}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase" style={{ color: '#999999' }}>Contact</h4>
            <a href="mailto:contact@aether.com.ph" className="text-sm" style={{ color: '#666666' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#6a4c93')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#666666')}>contact@aether.com.ph</a>
            <a href="tel:09669873475" className="text-sm" style={{ color: '#666666' }}>0966 987 3475</a>
            <p className="text-sm" style={{ color: '#666666' }}>Dasmarinas, Cavite, Philippines</p>
            <p className="text-xs mt-2" style={{ color: '#444444' }}>Response within 24 hours</p>
          </div>
        </div>
        <div className="mt-16 pt-6 flex justify-between items-center" style={{ borderTop: '1px solid #1e1e1e' }}>
          <p className="text-xs" style={{ color: '#444444' }}>© 2026 Aether Celebrations. All rights reserved.</p>
          <Link href="http://localhost:3000" className="text-xs" style={{ color: '#444444' }}>← Aether Hub</Link>
        </div>
      </div>
    </footer>
  );
}
