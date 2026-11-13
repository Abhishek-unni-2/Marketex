import { SplitHeading, Tilt } from './Motion';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, Eyebrow } from './Reveal';
import { Sparkles, ArrowRight } from '../icons';

const STEPS = [
  {
    n: '01',
    title: 'Learn the auction',
    body: 'Value Area, Point of Control, and acceptance versus rejection, taught in Malayalam from the first session with real market examples.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Trader studying market profile theory on laptop',
    tag: 'AUCTION MARKET THEORY',
  },
  {
    n: '02',
    title: 'Read the tape live',
    body: 'Study TPO structure and footprint imbalances on live Nifty and Banknifty sessions with Dr. Sherlymon from 09:15 AM to 03:30 PM.',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Multi-screen live trading desk with order flow charts',
    tag: 'LIVE MARKET DISSECTION',
  },
  {
    n: '03',
    title: 'Trade with a risk plan',
    body: 'Apply the setups across markets, review your own trades with Dr. Sherlymon, and build strict mathematical position sizing you can repeat.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Trader analytics dashboard and risk management plan',
    tag: 'RISK ARCHITECTURE',
  },
];

export const HowItWorks: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <SplitHeading text={`Three steps from lagging indicators to institutional reading.`} className="heading-3 max-w-2xl mb-12" />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <Tilt max={4} className="h-full">
                <div className="h-full rounded-3xl border border-[#E4E4E1] overflow-hidden bg-white transition-all duration-500 hover:shadow-xl hover:border-[#9A7420]/40 flex flex-col justify-between">
                  <div>
                    {/* Step Visual Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
                      <img
                        src={s.imageUrl}
                        alt={s.imageAlt}
                        className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.92] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Floating Step Number */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="w-9 h-9 rounded-xl bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold font-tabular">
                          {s.n}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-mono font-semibold text-white tracking-wider">
                          {s.tag}
                        </span>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.span
                          initial={{ scaleX: reduce ? 1 : 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformOrigin: 'left' }}
                          className="h-[2px] w-12 bg-[#9A7420]"
                        />
                        <span className="text-xs font-mono text-[#9A7420]">PHASE {s.n}</span>
                      </div>
                      <h3 className="title-1 mb-2 text-[#0A0A0A]">{s.title}</h3>
                      <p className="body-6 text-[#666666] leading-relaxed">{s.body}</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-[#E4E4E1]/60 flex items-center justify-between text-xs font-mono text-[#666666]">
                    <span>Step {s.n} of 03</span>
                    <span className="text-[#9A7420] font-medium flex items-center gap-1">
                      Explore phase <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
