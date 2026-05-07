'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerContainerSlow } from '../../lib/motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={shouldReduce ? undefined : fadeUp}
      initial={shouldReduce ? undefined : 'hidden'}
      whileInView={shouldReduce ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  slow?: boolean;
}

export function StaggerReveal({ children, className = '', slow = false }: StaggerRevealProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={shouldReduce ? undefined : (slow ? staggerContainerSlow : staggerContainer)}
      initial={shouldReduce ? undefined : 'hidden'}
      whileInView={shouldReduce ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export function StaggerItem({ children, className = '', hoverLift = false }: StaggerItemProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={shouldReduce ? undefined : fadeUp}
      whileHover={hoverLift && !shouldReduce ? { y: -3, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}
    >
      {children}
    </motion.div>
  );
}
