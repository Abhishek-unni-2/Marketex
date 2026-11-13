import { SplitHeading, ScrollTilt3D, Tilt } from './Motion';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, Shield, Coffee, Users } from '../icons';
import { MagneticButton } from './MagneticButton';
import { Reveal, Eyebrow } from './Reveal';

interface Props {
  onOpenEnquiry: (subject?: string) => void;
}

const CAMPUS_VIEWS = [
  {
    id: 'lab',
    label: 'Trading Lab',
    title: 'Multi-Screen Order Flow Lab',
    subtitle: 'Equipped with Sierra Chart & Bookmap depth-of-market feeds',
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Trading terminals and screens at Marketex Pro Calicut lab',
    badge: 'Live Market Hours 09:15 AM – 03:30 PM',
  },
  {
    id: 'building',
    label: 'HiLITE Landmark',
    title: 'HiLITE Business Park, Calicut',
    subtitle: 'Kerala’s premier IT and commercial hub at Poovangal, Kozhikode',
    url: '/images/campus.webp',
    alt: 'HiLITE Business Park building in Calicut',
    badge: 'HiLITE Business Park, Kozhikode',
  },
  {
    id: 'alumni',
    label: 'Alumni Desks',
    title: 'Dedicated Senior Trader Desks',
    subtitle: 'Co-working floor for graduate traders to execute live sessions',
    url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop',
    alt: 'Institutional trading workstation',
    badge: 'Alumni Trading Co-Desk',
  },
  {
    id: 'cohort',
    label: 'Masterclass Room',
    title: 'Malayalam Masterclass Cohort',
    subtitle: 'Intensive weekend and daily post-market debriefing room',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Traders learning in a collaborative environment',
    badge: 'Capped at 25 Traders per Cohort',
  },
];

const FEATURES = [
  { i: Shield, t: 'Multi-Screen Lab', d: 'Dual & ultra-wide monitors running licensed Bookmap, Sierra Chart, and volume footprint feeds.' },
  { i: Clock, t: 'Live Market Sessions', d: 'Dissect the Nifty and Banknifty cash open from 09:15 AM to 03:30 PM IST with Dr. Sherlymon.' },
  { i: Users, t: 'Alumni Trading Co-Desk', d: 'Senior cohort members have physical desk access to trade and collaborate side by side.' },
  { i: Coffee, t: 'HiLITE Business Park', d: 'Central Kozhikode location with fast highway access from Kochi, Malappuram, and Kannur.' },
];

export const CalicutCampus: React.FC<Props> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentView = CAMPUS_VIEWS[activeTab];

  return (
    <section id="campus" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Campus Information (6 cols) */}
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>The offline trading floor</Eyebrow>
            <SplitHeading
              text={`Learn next to institutional screens, not behind a lonely webcam.`}
              className="heading-3 mb-4"
            />
            <p className="body-3 text-[#666666] mb-8 leading-relaxed">
              Our trading laboratory at <strong className="text-[#0A0A0A]">HiLITE Business Park, Kozhikode</strong> puts traders shoulder-to-shoulder with Dr. Sherlymon Abraham as institutional auctions unfold in real time.
            </p>
          </Reveal>

          {/* 4 Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-[#F5F5F4] border border-[#E4E4E1] p-4 transition-all duration-300 hover:border-[#9A7420]/40 hover:-translate-y-1 hover:bg-white shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E4E1] flex items-center justify-center text-[#9A7420] mb-3">
                    <f.i className="w-5 h-5" />
                  </div>
                  <p className="title-4 text-[#0A0A0A] mb-1">{f.t}</p>
                  <p className="body-6 text-[#666666] leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              variant="primary"
              onClick={() => onOpenEnquiry('HiLITE Campus Visit & Offline Batch Registration')}
            >
              <span>Book a campus visit</span>
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href="https://maps.google.com/?q=HiLITE+Business+Park+Calicut"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Interactive Campus Media Deck (6 cols) */}
        <div className="lg:col-span-6">
          {/* View Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 mb-4 rounded-xl bg-[#F5F5F4] border border-[#E4E4E1] font-mono text-xs w-fit">
            {CAMPUS_VIEWS.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === idx
                    ? 'bg-[#0A0A0A] text-white font-semibold shadow-sm'
                    : 'text-[#666666] hover:text-[#0A0A0A]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <ScrollTilt3D from={8}>
            <Tilt max={5}>
              <div className="group rounded-3xl overflow-hidden border border-[#E4E4E1] bg-[#0A0A0A] shadow-2xl shadow-black/10">
                {/* Image Container with Crossfade */}
                <div className="aspect-[16/11] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentView.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full relative"
                    >
                      <img
                        src={currentView.url}
                        alt={currentView.alt}
                        className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Live Pill */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
                    <span className="w-2 h-2 rounded-full bg-[#0E8A63] animate-pulse" />
                    <span>{currentView.badge}</span>
                  </div>

                  {/* Bottom Text Pill inside Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <div className="font-semibold text-lg">{currentView.title}</div>
                    <div className="text-xs text-[#CFCFCB] font-mono mt-0.5">{currentView.subtitle}</div>
                  </div>
                </div>

                {/* Physical Location Card Footer */}
                <div className="p-4 bg-white border-t border-[#E4E4E1] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F4] border border-[#E4E4E1] flex items-center justify-center text-[#9A7420] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="title-4 text-[#0A0A0A]">Marketex Pro Trading Education</p>
                    <p className="body-6 text-[#666666]">
                      HiLITE Business Park, Poovangal, Kozhikode, Kerala 673014
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#0E8A63]/10 text-[#0E8A63] font-mono text-xs font-semibold shrink-0">
                    Desk Open
                  </span>
                </div>
              </div>
            </Tilt>
          </ScrollTilt3D>
        </div>
      </div>
    </section>
  );
};
export default CalicutCampus;
