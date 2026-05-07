'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AetherLogo } from './AetherLogo';

interface NavBarProps {
  siteName?: string;
  links?: { label: string; href: string }[];
}

const defaultLinks = [
  { label: 'About', href: '/about' },
  { label: 'Digital', href: '/digital' },
  { label: 'Celebrations', href: '/celebrations' },
  { label: 'Contact', href: '/contact' },
];

export function NavBar({ siteName, links = defaultLinks }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 60],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.92)']
  );
  const navBorder = useTransform(
    scrollY,
    [0, 60],
    ['rgba(232,224,245,0)', 'rgba(232,224,245,1)']
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navBg,
        borderBottomColor: navBorder,
        backdropFilter: 'blur(20px)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
      }}
      initial={shouldReduce ? undefined : { y: -16, opacity: 0 }}
      animate={shouldReduce ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
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
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: '#888888', fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#1a1a1a')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#888888')}
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
              background: '#1a1a1a',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#1a1a1a',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#1a1a1a',
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduce ? undefined : { opacity: 0, height: 0 }}
            animate={shouldReduce ? undefined : { opacity: 1, height: 'auto' }}
            exit={shouldReduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden px-6 pb-6 flex flex-col gap-4 overflow-hidden"
            style={{ borderTop: '1px solid #e8e0f5', background: '#ffffff' }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide py-2"
                style={{ color: '#888888', fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
