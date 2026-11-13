import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin progress bar fixed to the top edge, driven by scroll position. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#9A7420] z-[70]"
    />
  );
};

/** Heading whose words rise out of a mask one after another when it enters the viewport. */
export const SplitHeading: React.FC<{
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
}> = ({ text, as = 'h2', className = '', delay = 0 }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 },
              show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/** Pointer driven 3D tilt. Only transforms change. */
export const Tilt: React.FC<{ children: React.ReactNode; max?: number; className?: string }> = ({ children, max = 6, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 20 });
  const sy = useSpring(py, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  const move = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { px.set(0); py.set(0); };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
};

/** Image that settles from a slight zoom when scrolled into view. */
export const ZoomIn: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ scale: reduce ? 1 : 1.15, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

/** Panel that starts tilted back in 3D and flattens as it scrolls to the centre of the viewport. */
export const ScrollTilt3D: React.FC<{ children: React.ReactNode; className?: string; from?: number }> = ({ children, className, from = 14 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : from, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [reduce ? 1 : 0.3, 1]);
  return (
    <div ref={ref} style={{ perspective: 1200 }} className={className}>
      <motion.div style={{ rotateX, scale, opacity, transformOrigin: '50% 100%' }}>{children}</motion.div>
    </div>
  );
};

/** Falls back to nothing if WebGL or the 3D bundle fails. */
export class SafeBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
