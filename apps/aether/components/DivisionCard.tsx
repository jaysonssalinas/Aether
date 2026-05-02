'use client';

import Link from 'next/link';

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
}

export function DivisionCard({
  href, icon, iconColor, iconBorder, hoverBorder, hoverBg, title, description,
  tags, tagColor, tagBg, tagBorder, ctaColor, ctaLabel,
}: DivisionCardProps) {
  return (
    <Link
      href={href}
      className="group block p-10 rounded-lg transition-all duration-300"
      style={{ background: '#111111', border: '1px solid #1e1e1e' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorder;
        e.currentTarget.style.background = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1e1e1e';
        e.currentTarget.style.background = '#111111';
      }}
    >
      <div className="flex flex-col gap-6">
        <div
          className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl"
          style={{ background: iconColor, border: `1px solid ${iconBorder}` }}
        >
          {icon}
        </div>
        <div>
          <h2
            className="text-2xl font-medium mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
          >
            {title}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{description}</p>
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
    </Link>
  );
}
