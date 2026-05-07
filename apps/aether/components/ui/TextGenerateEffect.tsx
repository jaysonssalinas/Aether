'use client';

import { useEffect, useState, useRef } from 'react';

interface TextGenerateEffectProps {
  text: string;
  wordDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

export function TextGenerateEffect({
  text,
  wordDelay = 60,
  className = '',
  style,
  once = true,
}: TextGenerateEffectProps) {
  const words = text.split(' ');
  const [visibleCount, setVisibleCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisibleCount(words.length);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasTriggered)) {
          setHasTriggered(true);
          setVisibleCount(0);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleCount(i);
            if (i >= words.length) clearInterval(interval);
          }, wordDelay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [words.length, wordDelay, once, hasTriggered]);

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? 'translateY(0)' : 'translateY(6px)',
            display: 'inline-block',
            transition: `opacity 0.35s ease ${i * (wordDelay / 2)}ms, transform 0.35s ease ${i * (wordDelay / 2)}ms`,
            marginRight: '0.25em',
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
