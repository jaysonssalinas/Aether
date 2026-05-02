'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AetherLogo } from './AetherLogo';

const links = [
  { label: 'Galleries', href: '/galleries' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1e1e1e' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/"><AetherLogo size="sm" subtitle="Celebrations" /></Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm tracking-wide transition-colors duration-200" style={{ color: '#999999' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f5f5f0')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#999999')}>{l.label}</Link>
          ))}
          <Link href="/contact" className="text-sm px-4 py-2 rounded-sm transition-opacity hover:opacity-80"
            style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff' }}>
            Book a Consultation
          </Link>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-5 h-px" style={{ background: '#f5f5f0', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none', transition: 'all 0.3s' }} />
          <span className="block w-5 h-px" style={{ background: '#f5f5f0', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
          <span className="block w-5 h-px" style={{ background: '#f5f5f0', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none', transition: 'all 0.3s' }} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ borderTop: '1px solid #1e1e1e' }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm py-2" style={{ color: '#999999' }} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
