import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion';

const LINES = [
  'Price shows you what happened.',
  'Volume shows you who made it happen.',
  'Learn to read the auction in Malayalam.',
];

const Word: React.FC<{ word: string; index: number; total: number; progress: MotionValue<number> }> = ({ word, index, total, progress }) => {
  const start = (index / total) * 0.8;
  const opacity = useTransform(progress, [start, start + 0.8 / total + 0.05], [0.3, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-3">{word}</motion.span>;
};

/** Mandatory tagline reveal: each word moves from muted to full colour as it crosses the trigger line. */
export const TaglineReveal: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] });
  const total = LINES.join(' ').split(' ').length;
  let i = -1;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="heading-2 max-w-4xl text-[#0A0A0A]">
          {LINES.map((line) => (
            <span key={line} className="block">
              {line.split(' ').map((w) => {
                i += 1;
                return reduce ? (
                  <span key={i} className="inline-block mr-3">{w}</span>
                ) : (
                  <Word key={i} word={w} index={i} total={total} progress={scrollYProgress} />
                );
              })}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};
