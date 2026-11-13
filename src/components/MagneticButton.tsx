import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: 'button' | 'submit';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children, variant = 'primary', onClick, className = '', href, type = 'button',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-4, Math.min(4, v));
    setPos({ x: clamp((e.clientX - left - width / 2) * 0.12), y: clamp((e.clientY - top - height / 2) * 0.12) });
  };

  // Button-md: 8px vertical, 12px horizontal padding
  const base =
    'group relative overflow-hidden inline-flex items-center justify-center gap-2 text-base font-semibold rounded-lg px-3 py-2 select-none transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.98]';
  const variants = {
    primary: 'bg-[#0A0A0A] text-white hover:bg-[#2A2A2A]',
    ghost: 'bg-transparent text-[#0A0A0A] border border-[#E4E4E1] hover:border-[#0A0A0A] hover:bg-[#F5F5F4]',
    secondary: 'bg-[#F5F5F4] text-[#0A0A0A] border border-[#E4E4E1] hover:bg-[#EDEDEB]',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.15 }}
      className="inline-block"
    >
      <span className={`${base} ${variants[variant]} ${className}`}>
        {variant === 'primary' && (
          <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 -translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[500%]" />
        )}
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </span>
    </motion.div>
  );

  const focus = 'rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7420]';
  return href ? (
    <a href={href} onClick={onClick} className={`inline-block no-underline ${focus} ${className.includes('w-full') ? 'w-full' : ''}`}>{content}</a>
  ) : (
    <button type={type} onClick={onClick} className={`inline-block ${focus} ${className.includes('w-full') ? 'w-full' : ''}`}>{content}</button>
  );
};
