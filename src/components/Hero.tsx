import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from '../icons';
import { MagneticButton } from './MagneticButton';
import { Tilt } from './Motion';


interface HeroProps {
  onOpenEnquiry: (subject?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const TPO_ROWS = [
  { price: '24,240', w: 22, tag: 'VAH' },
  { price: '24,210', w: 52 },
  { price: '24,180', w: 100, tag: 'POC', poc: true },
  { price: '24,150', w: 68 },
  { price: '24,120', w: 30, tag: 'VAL' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [delta, setDelta] = useState(4820);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setDelta((d) => Math.max(4200, Math.min(5400, d + Math.round((Math.random() - 0.4) * 140)))), 1600);
    return () => clearInterval(id);
  }, [reduce]);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);

  // Animated order flow waves on canvas, flat strokes only
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.007;
      const wave = (base: number, color: string, a: number, b: number, speed: number) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.25;
        for (let x = 0; x <= w; x += 8) {
          const y = h * base + Math.sin(x * 0.005 + t * speed) * a + Math.cos(x * 0.012 - t * speed * 0.8) * b;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      wave(0.62, 'rgba(154,116,32,0.28)', 36, 20, 1);
      wave(0.7, 'rgba(14,138,99,0.22)', 26, 15, 1.2);
      wave(0.78, 'rgba(10,10,10,0.10)', 18, 10, 0.7);
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduce]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#FFFFFF]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none bg-grid-subtle opacity-60" aria-hidden>
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div {...rise(0)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#F5F5F4] border border-[#E4E4E1] mb-6">
              <ShieldCheck className="w-4 h-4 text-[#0E8A63]" />
              <span className="text-sm font-medium text-[#666666]">HiLITE Business Park, Calicut and online</span>
            </motion.div>

            <h1 aria-label="Stop guessing retail traps. See what institutions accumulate." className="heading-1 max-w-[680px] mb-6">
              {['Stop guessing retail traps.', 'See what institutions accumulate.'].map((line, i) => (
                <span key={line} aria-hidden className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                  <motion.span
                    className="block text-hero-gradient"
                    initial={{ y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p {...rise(0.2)} className="text-lg text-[#666666] max-w-[680px] mb-8">
              Learn Market Profile and Order Flow in Malayalam from Dr. Sherlymon Abraham. Read volume at the point of control instead of waiting on lagging indicators.
            </motion.p>

            <motion.div {...rise(0.3)} className="flex flex-wrap items-center gap-3 mb-8">
              <MagneticButton variant="primary" onClick={() => onOpenEnquiry('Flagship Program Consultation')}>
                <span>Apply for Malayalam cohort</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton variant="ghost" href="#/curriculum">
                <span>See curriculum</span>
              </MagneticButton>
            </motion.div>

            <motion.p {...rise(0.4)} className="text-sm text-[#666666]">
              <span className="text-[#0A0A0A] font-medium">1,000+ traders mentored</span> across Kerala, India and the Middle East.
            </motion.p>
          </div>

          <div className="lg:col-span-5 relative h-[520px] sm:h-[620px] lg:h-[680px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
              className="absolute inset-0 rounded-3xl overflow-hidden border border-[#E4E4E1]"
            >
              <img
                src="/images/hero.avif"
                alt="Trading workstation with candlestick charts on a monitor, laptop and tablet"
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </motion.div>
            <motion.div
              className="absolute left-0 right-0 sm:left-auto sm:right-0 -bottom-6 sm:bottom-2 w-full sm:w-[72%]"
              initial={{ opacity: 0, y: reduce ? 0 : 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            >
              <Tilt><div className="animate-float motion-reduce:animate-none rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 p-4 shadow-2xl shadow-black/10">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E4E4E1]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-[#0E8A63] opacity-60 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-[#0E8A63]" />
                    </span>
                    <span className="text-sm font-medium text-[#0A0A0A]">Auction market tape</span>
                  </div>
                  <span className="text-xs font-mono text-[#666666]">Calicut desk</span>
                </div>

                <div className="rounded-lg bg-[#FFFFFF] p-3 mb-3">
                  <div className="flex justify-between text-xs font-mono text-[#666666] mb-3">
                    <span>Price profile (TPO)</span>
                    <span className="text-[#9A7420]">Value area 70%</span>
                  </div>
                  <div className="space-y-2">
                    {TPO_ROWS.map((r, idx) => (
                      <div key={r.price} className="flex items-center gap-3 text-xs font-mono">
                        <span className={`w-12 ${r.poc ? 'text-[#9A7420]' : 'text-[#666666]'}`}>{r.price}</span>
                        <div className="flex-1 h-2">
                          <motion.div
                            initial={{ scaleX: reduce ? 1 : 0 }}
                            animate={{ scaleX: reduce || r.poc ? 1 : [1, 0.86 + (idx % 3) * 0.05, 1] }}
                            transition={{
                              scaleX: reduce || r.poc
                                ? { duration: 0.9, delay: 0.7 + idx * 0.1, ease: EASE }
                                : { duration: 4 + idx * 0.7, delay: 1.6 + idx * 0.2, repeat: Infinity, ease: 'easeInOut' },
                            }}
                            style={{ width: `${r.w}%`, transformOrigin: 'left' }}
                            className={`h-2 rounded-md ${r.poc ? 'bg-[#9A7420]' : 'bg-[#CFCFCB]'}`}
                          />
                        </div>
                        <span className="w-8 text-right text-[#666666]">{r.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#FFFFFF] p-3">
                    <div className="text-xs font-mono text-[#666666]">Delta imbalance</div>
                    <div className="text-sm font-semibold text-[#0E8A63] mt-1">+{delta.toLocaleString()} bids</div>
                  </div>
                  <div className="rounded-lg bg-[#FFFFFF] p-3">
                    <div className="text-xs font-mono text-[#666666]">Order book</div>
                    <div className="text-sm font-semibold text-[#9A7420] mt-1">Initiative buy</div>
                  </div>
                </div>
              </div></Tilt>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
