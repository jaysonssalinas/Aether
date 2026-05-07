'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Spotlight } from './ui/Spotlight';

interface DivisionCardProps {
  href: string;
  icon: string;
  iconColor: string;
  iconBorder: string;
  hoverBorder: string;
  hoverBg: string;
  title: string;
  description: string;
  tags: string[];
  tagColor: string;
  tagBg: string;
  tagBorder: string;
  ctaColor: string;
  ctaLabel: string;
  spotlightColor?: string;
}

export function DivisionCard({
  href, icon, iconColor, iconBorder, hoverBorder, hoverBg, title, description,
  tags, tagColor, tagBg, tagBorder, ctaColor, ctaLabel,
  spotlightColor = 'rgba(255, 20, 147, 0.06)',
}: DivisionCardProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduce ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className="group block p-10 rounded-lg transition-all duration-300"
        style={{ background: '#ffffff', border: '1px solid #e8e0f5', display: 'block' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = hoverBorder;
          e.currentTarget.style.background = hoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e8e0f5';
          e.currentTarget.style.background = '#ffffff';
        }}
      >
        <Spotlight color={spotlightColor} radius={300}>
          <div className="flex flex-col gap-6">
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl"
              style={{ background: iconColor, border: `1px solid ${iconBorder}` }}
            >
              {icon}
            </div>
            <div>
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a', lineHeight: '1.3', letterSpacing: '-0.01em' }}
              >
                {title}
              </h2>
              <p className="text-sm" style={{ color: '#666666', lineHeight: '1.7', letterSpacing: '0.01em' }}>{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: tagBg, color: tagColor, border: `1px solid ${tagBorder}` }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="text-sm font-medium inline-flex items-center gap-2 transition-all duration-200 group-hover:translate-x-1"
              style={{ color: ctaColor }}
            >
              {ctaLabel} →
            </span>
          </div>
        </Spotlight>
      </Link>
    </motion.div>
  );
}
