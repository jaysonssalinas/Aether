import type { Variants } from 'framer-motion';

export const transitionBase = {
  duration: 0.4,
  ease: 'easeOut',
} as const;

export const transitionFast = {
  duration: 0.35,
  ease: 'easeOut',
} as const;

// opacity 0→1, y 20px→0 — used for section headings, body copy, CTA blocks
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
};

// opacity 0→1 only — used for decorative dividers, gradient overlays
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionBase,
  },
};

// scale 0.96→1 + fade — used for form success state
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// parent that staggers children 0.1s apart
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// slower stagger for footer columns and values grid (0.12s between)
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};
