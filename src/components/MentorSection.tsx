import { SplitHeading, ScrollTilt3D, Tilt } from './Motion';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, Stethoscope, TrendingUp, Globe2, BookOpen, Sparkles } from '../icons';
import { MagneticButton } from './MagneticButton';
import { Reveal, Eyebrow } from './Reveal';

interface Props {
  onOpenEnquiry: (subject?: string) => void;
}

const CHIPS = [
  { label: '16+ years in Indian markets', icon: TrendingUp },
  { label: '5+ years in Forex & crypto', icon: Globe2 },
  { label: '1,000+ traders mentored', icon: Award },
  { label: 'MBBS Doctor & Discretionary Trader', icon: Stethoscope },
  { label: 'Gold & MCX Commodities', icon: CheckCircle },
];

const PREVIEWS = [
  {
    id: 'portrait',
    label: 'Dr. Sherlymon',
    title: 'Dr. Sherlymon Abraham',
    subtitle: 'MBBS & Discretionary Market Profile Trader',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop',
    alt: 'Dr. Sherlymon Abraham, MBBS doctor and pioneer market profile mentor',
    badge: '16+ Yrs Trading Experience',
  },
  {
    id: 'desk',
    label: 'Trading Desk',
    title: 'Institutional Multi-Screen Desk',
    subtitle: 'Sierra Chart & Bookmap Order Flow Setup',
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop',
    alt: 'Multi monitor trading floor workstation at HiLITE Business Park Calicut',
    badge: 'Live Calicut Trading Desk',
  },
  {
    id: 'lab',
    label: 'Kerala Cohort',
    title: 'HiLITE Business Park Lab',
    subtitle: 'Malayalam Masterclasses & Real-time Live Market Hours',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
    alt: 'Traders learning market auction theory in person',
    badge: 'Kerala & Middle East Cohort',
  },
];

export const MentorSection: React.FC<Props> = ({ onOpenEnquiry }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const currentPreview = PREVIEWS[activeTab];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -20, reduce ? 0 : 20]);

  return (
    <section id="mentor" ref={ref} className="py-24 md:py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Interactive 3D Holographic Media Card (5 cols) */}
        <div className="lg:col-span-5">
          {/* View Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 mb-4 rounded-xl bg-[#F5F5F4] border border-[#E4E4E1] w-fit font-mono text-xs">
            {PREVIEWS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === idx
                    ? 'bg-[#0A0A0A] text-white font-semibold shadow-sm'
                    : 'text-[#666666] hover:text-[#0A0A0A]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <ScrollTilt3D from={8}>
            <Tilt max={6}>
              <motion.div
                style={{ y }}
                className="group relative rounded-3xl overflow-hidden border border-[#E4E4E1] bg-[#0A0A0A] aspect-[4/5] shadow-2xl shadow-black/10 transition-all duration-500 hover:shadow-black/20"
              >
                {/* Image with Crossfade */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPreview.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={currentPreview.url}
                      alt={currentPreview.alt}
                      className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Holographic light reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-700" />

                {/* Top Live Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63] animate-pulse" />
                    <span>{currentPreview.badge}</span>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#C9A24B]">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Overlay Info Pill */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 p-4 flex items-center justify-between shadow-lg">
                  <div>
                    <div className="title-3 text-[#0A0A0A] font-semibold">{currentPreview.title}</div>
                    <div className="caption-4 text-[#666666] font-mono mt-0.5">{currentPreview.subtitle}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-[#C9A24B] flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Tilt>
          </ScrollTilt3D>
        </div>

        {/* Right Column: Bio & Core Philosophy (7 cols) */}
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>Your mentor</Eyebrow>
            <SplitHeading
              text={`A doctor who reads market auctions the way he reads a clinical diagnosis.`}
              className="heading-3 mb-6"
            />
          </Reveal>

          {/* Chips */}
          <Reveal delay={0.1} className="flex flex-wrap gap-2 mb-6">
            {CHIPS.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#F5F5F4] border border-[#E4E4E1] text-xs sm:text-sm font-medium transition-all duration-300 hover:border-[#9A7420] hover:bg-white"
              >
                <c.icon className="w-4 h-4 text-[#9A7420]" />
                {c.label}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4 body-3 text-[#666666] mb-6 leading-relaxed">
              <p>
                <strong className="text-[#0A0A0A]">Dr. Sherlymon Abraham</strong> is a registered medical doctor (MBBS) who has traded Indian and global derivatives for over 16 years. His scientific, diagnostic approach strips away superstitious indicator lines and replaces them with mathematical auction physics.
              </p>
              <p>
                As Kerala’s first educator to translate <strong className="text-[#0A0A0A]">Auction Market Theory, TPO Profiles, and Footprint Delta</strong> into Malayalam, Dr. Sherlymon mentors traders at the HiLITE Business Park trading lab and across live digital cohorts in India and the GCC.
              </p>
            </div>

            <blockquote className="rounded-2xl bg-[#F5F5F4] border-l-4 border-l-[#9A7420] border border-[#E4E4E1] p-5 mb-8">
              <p className="title-2 text-[#0A0A0A]">
                “In medicine, treating symptoms without diagnosing the underlying physiology is fatal. In trading, buying moving average crossovers without reading institutional volume delta is the exact same fatal mistake.”
              </p>
              <footer className="mt-3 text-xs font-mono text-[#9A7420]">
                — Dr. Sherlymon Abraham, MBBS
              </footer>
            </blockquote>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                variant="primary"
                onClick={() => onOpenEnquiry('Consultation with Dr. Sherlymon Abraham')}
              >
                <span>Request a consultation</span>
              </MagneticButton>
              <MagneticButton variant="ghost" href="#/curriculum">
                <BookOpen className="w-4 h-4" />
                <span>View 6-week syllabus</span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
export default MentorSection;
