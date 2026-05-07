'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AetherLogo } from './AetherLogo';
import { fadeUp, fadeIn, staggerContainerSlow } from '../lib/motion';

export function Footer() {
  const shouldReduce = useReducedMotion();

  return (
    <footer style={{ background: '#f8f5ff', borderTop: '1px solid #e8e0f5' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={shouldReduce ? undefined : staggerContainerSlow}
          initial={shouldReduce ? undefined : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="flex flex-col gap-4"
            variants={shouldReduce ? undefined : fadeUp}
          >
            <AetherLogo size="sm" />
            <p className="text-sm leading-relaxed" style={{ color: '#888888', maxWidth: '240px' }}>
              Where digital meets celebration. Serving Philippine businesses with precision and heart.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            variants={shouldReduce ? undefined : fadeUp}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: '#aaaaaa' }}>
              Divisions
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/digital', label: 'Aether Digital' },
                { href: '/celebrations', label: 'Aether Celebrations' },
                { href: '/about', label: 'Our Story' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: '#888888' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#1a1a1a')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#888888')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            variants={shouldReduce ? undefined : fadeUp}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: '#aaaaaa' }}>
              Contact
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contact@aether.com.ph"
                className="text-sm transition-colors duration-200"
                style={{ color: '#888888' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ff1493')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#888888')}
              >
                contact@aether.com.ph
              </a>
              <a href="tel:09669873475" className="text-sm" style={{ color: '#888888' }}>
                0966 987 3475
              </a>
              <p className="text-sm" style={{ color: '#888888' }}>
                Dasmarinas, Cavite, Philippines
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #e0d7f0' }}
          variants={shouldReduce ? undefined : fadeIn}
          initial={shouldReduce ? undefined : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs" style={{ color: '#aaaaaa' }}>
            © 2026 Aether. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#aaaaaa' }}>
            The Essence of Possibility
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
