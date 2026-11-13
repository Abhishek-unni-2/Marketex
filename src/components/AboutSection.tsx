import { SplitHeading, Tilt, ZoomIn } from './Motion';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Award, Building2, Users, XCircle, CheckCircle, Shield, Sparkles } from '../icons';
import { Reveal, Eyebrow } from './Reveal';

const Counter: React.FC<{ end: number; suffix?: string }> = ({ end, suffix = '' }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let id = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / 1800, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, end]);
  return <span ref={ref} className="font-tabular">{n.toLocaleString()}{suffix}</span>;
};

const STATS = [
  { icon: Users, value: <Counter end={1000} suffix="+" />, title: 'Traders mentored', body: 'A community across Kerala, India and the Middle East.' },
  { icon: Building2, value: 'Online and offline', title: 'HiLITE Business Park and live stream', body: 'A physical trading lab in Calicut with live Malayalam masterclasses.' },
  { icon: Award, value: 'First in Malayalam', title: 'Auction Market Theory, in your language', body: 'Volume footprint and Market Profile explained in the mother tongue.' },
];

export const AboutSection: React.FC = () => (
  <section id="about" className="py-24 md:py-32 bg-[#F5F5F4] relative">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <Reveal>
        <Eyebrow>The problem and the fix</Eyebrow>
        <SplitHeading text={`Retail tools show you the past. Institutions read the auction as it happens.`} className="heading-3 max-w-3xl mb-12" />
      </Reveal>

      {/* Visual Comparison: Retail Traps vs Institutional Reality */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <Reveal>
          <Tilt max={4} className="h-full">
            <div className="h-full rounded-3xl bg-white border border-[#E4E4E1] overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-black/5">
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
                    alt="Delayed candlestick chart and indicator lag"
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.9]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#C4323F]/90 text-white text-[11px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-sm">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Retail Indicator Trap</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-mono text-[#D04753] block mb-0.5 font-semibold">THE RETAIL FLAW</span>
                    <p className="text-sm font-medium">Lagging RSI, MACD & Breakout Traps</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="title-1 mb-2 text-[#0A0A0A]">What most traders do</h3>
                  <p className="body-3 text-[#666666] leading-relaxed">
                    Draw arbitrary trendlines on delayed candles, follow Telegram call tips, and buy standard breakouts that institutions are actively distributing into. The indicator signal always arrives after the move has finished.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-[#E4E4E1]/60 text-xs font-mono text-[#C4323F] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4323F]" />
                <span>Result: 95% of retail accounts lose capital on whipsaws</span>
              </div>
            </div>
          </Tilt>
        </Reveal>

        <Reveal delay={0.1}>
          <Tilt max={4} className="h-full">
            <div className="h-full rounded-3xl bg-white border border-[#E4E4E1] overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-black/5">
                  <img
                    src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
                    alt="Institutional multi-monitor trading terminals with volume profile"
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.9]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0E8A63]/90 text-white text-[11px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-sm">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Institutional Order Tape</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-mono text-[#28C795] block mb-0.5 font-semibold">THE MARKETEX EDGE</span>
                    <p className="text-sm font-medium">Point of Control, Footprint Delta & Value Area</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="title-1 mb-2 text-[#0A0A0A]">What you will learn here</h3>
                  <p className="body-3 text-[#666666] leading-relaxed">
                    Read where volume accepts or rejects value using TPO structure and order flow footprint. Identify passive iceberg absorption at Value Area Low and trade strictly alongside smart money with defined risk.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-[#E4E4E1]/60 text-xs font-mono text-[#0E8A63] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63]" />
                <span>Result: Systematic rule-based entries with institutional precision</span>
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>

      {/* Cohort Trading Lab Editorial Visual Banner */}
      <Reveal delay={0.15}>
        <div className="relative rounded-3xl overflow-hidden border border-[#E4E4E1] bg-[#0A0A0A] text-white p-6 sm:p-10 mb-10 shadow-lg">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-[#C9A24B] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HiLITE Business Park Calicut • Physical Trading Lab</span>
              </span>
              <h3 className="heading-3 text-white mb-3">
                Experience Auction Dynamics in Live Market Hours
              </h3>
              <p className="text-sm sm:text-base text-[#CFCFCB] leading-relaxed mb-6 max-w-xl">
                Every batch gets access to licensed institutional charting suites (Sierra Chart and Bookmap). Watch Dr. Sherlymon dissect Nifty & Banknifty opening auctions from 09:15 AM to 03:30 PM.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#EDEDEB]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0E8A63]" />
                  Real-time Nifty 50 Futures Tape
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
                  Malayalam Auction Terminology
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
                alt="Cohort members engaged in live trading lab workshop"
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-mono text-white/90">
                Calicut Desk • Classroom Session
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3 Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {STATS.map((s, idx) => (
          <Reveal key={s.title} delay={idx * 0.1}>
            <Tilt max={4} className="h-full">
              <div className="h-full rounded-2xl bg-white border border-[#E4E4E1] p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F4] border border-[#E4E4E1] flex items-center justify-center text-[#9A7420] mb-6">
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="heading-4 mb-2">{s.value}</div>
                <div className="title-3 mb-1">{s.title}</div>
                <p className="body-6 text-[#666666]">{s.body}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
export default AboutSection;
