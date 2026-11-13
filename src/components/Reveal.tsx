import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Scroll reveal: rises 32px and fades in once, on the base curve. */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-sm font-medium text-[#9A7420] mb-4">
    <span className="w-2 h-2 rounded-full bg-[#9A7420]" />
    {children}
  </p>
);
