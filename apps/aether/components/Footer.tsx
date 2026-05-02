'use client';

import Link from 'next/link';
import { AetherLogo } from './AetherLogo';

export function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid #1e1e1e' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <AetherLogo size="sm" />
            <p className="text-sm leading-relaxed" style={{ color: '#666666', maxWidth: '240px' }}>
              Where digital meets celebration. Serving Philippine businesses with precision and heart.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: '#999999' }}>
              Divisions
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: 'http://localhost:3001', label: 'Aether Digital' },
                { href: 'http://localhost:3002', label: 'Aether Celebrations' },
                { href: '/about', label: 'Our Story' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: '#666666' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f5f5f0')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#666666')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: '#999999' }}>
              Contact
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contact@aether.com.ph"
                className="text-sm transition-colors duration-200"
                style={{ color: '#666666' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ff1493')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#666666')}
              >
                contact@aether.com.ph
              </a>
              <a href="tel:09669873475" className="text-sm" style={{ color: '#666666' }}>
                0966 987 3475
              </a>
              <p className="text-sm" style={{ color: '#666666' }}>
                Dasmarinas, Cavite, Philippines
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #1e1e1e' }}
        >
          <p className="text-xs" style={{ color: '#444444' }}>
            © 2026 Aether. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#444444' }}>
            The Essence of Possibility
          </p>
        </div>
      </div>
    </footer>
  );
}
