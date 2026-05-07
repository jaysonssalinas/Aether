interface AetherLogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg';
  subtitle?: string;
  className?: string;
}

export function AetherLogo({
  variant = 'full',
  size = 'md',
  subtitle,
  className = '',
}: AetherLogoProps) {
  const iconSizes = { sm: 32, md: 48, lg: 72 };
  const wordmarkSizes = { sm: 'text-xl', md: 'text-3xl', lg: 'text-5xl' };
  const iconPx = iconSizes[size];

  const icon = (
    <svg
      width={iconPx}
      height={iconPx}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aether-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1493" />
          <stop offset="40%" stopColor="#ff4081" />
          <stop offset="100%" stopColor="#6a4c93" />
        </linearGradient>
        <linearGradient id="aether-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1493" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6a4c93" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Pixel particles (left side, dispersing) */}
      <rect x="2" y="35" width="4" height="4" rx="0.5" fill="url(#aether-grad-2)" opacity="0.9" />
      <rect x="9" y="28" width="3" height="3" rx="0.5" fill="url(#aether-grad-2)" opacity="0.7" />
      <rect x="5" y="48" width="3" height="3" rx="0.5" fill="url(#aether-grad-2)" opacity="0.6" />
      <rect x="12" y="42" width="2" height="2" rx="0.5" fill="url(#aether-grad-2)" opacity="0.5" />
      <rect x="1" y="57" width="2.5" height="2.5" rx="0.5" fill="url(#aether-grad-2)" opacity="0.4" />
      <rect x="8" y="62" width="2" height="2" rx="0.5" fill="url(#aether-grad-2)" opacity="0.3" />
      <rect x="14" y="55" width="1.5" height="1.5" rx="0.5" fill="url(#aether-grad-2)" opacity="0.35" />
      <rect x="3" y="68" width="2" height="2" rx="0.5" fill="url(#aether-grad-2)" opacity="0.2" />

      {/* The "A" shape — two angled legs meeting at a peak */}
      {/* Left leg */}
      <path
        d="M28 85 L50 18 L72 85"
        stroke="url(#aether-grad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Crossbar */}
      <line
        x1="36"
        y1="62"
        x2="64"
        y2="62"
        stroke="url(#aether-grad)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Heart cutout — white to appear as negative space on light backgrounds */}
      <path
        d="M50 52 C50 52 42 45 42 39 C42 35 45 33 48 34 C49 34.5 50 36 50 36 C50 36 51 34.5 52 34 C55 33 58 35 58 39 C58 45 50 52 50 52Z"
        fill="#ffffff"
      />

      {/* Sparkles — purple so they show on light backgrounds */}
      <path d="M75 22 L76.5 19 L78 22 L81 23.5 L78 25 L76.5 28 L75 25 L72 23.5Z" fill="#6a4c93" opacity="0.7" />
      <path d="M22 25 L23 23 L24 25 L26 26 L24 27 L23 29 L22 27 L20 26Z" fill="#ff4081" opacity="0.6" />
      <path d="M80 60 L81 58.5 L82 60 L83.5 61 L82 62 L81 63.5 L80 62 L78.5 61Z" fill="#6a4c93" opacity="0.5" />
    </svg>
  );

  if (variant === 'icon') return <div className={className}>{icon}</div>;

  if (variant === 'wordmark') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span
          className={`font-display font-medium tracking-[0.15em] gradient-text ${wordmarkSizes[size]}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          AETHER
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon}
      <div className="flex flex-col">
        <span
          className={`font-medium tracking-[0.15em] gradient-text ${wordmarkSizes[size]}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          AETHER
        </span>
        {subtitle && (
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: '#888888', fontFamily: "'Inter', sans-serif" }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
