'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AetherLogo } from './AetherLogo';

interface NavBarProps {
  siteName?: string;
  links?: { label: string; href: string }[];
}

const defaultLinks = [
  { label: 'About', href: '/about' },
  { label: 'Digital', href: process.env.NEXT_PUBLIC_DIGITAL_URL || 'http://localhost:3001' },
  { label: 'Celebrations', href: process.env.NEXT_PUBLIC_CELEBRATIONS_URL || 'http://localhost:3002' },
  { label: 'Contact', href: '/contact' },
];

export function NavBar({ siteName, links = defaultLinks }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1e1e1e',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <AetherLogo size="sm" subtitle={siteName} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide transition-colors duration-200"
              style={{ color: '#999999', fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f5f5f0')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#999999')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#f5f5f0',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#f5f5f0',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#f5f5f0',
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: '1px solid #1e1e1e' }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide py-2"
              style={{ color: '#999999', fontFamily: "'Inter', sans-serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
