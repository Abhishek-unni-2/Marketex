import { SplitHeading, Tilt } from './Motion';
import React from 'react';
import { Download, Check, Calendar, MapPin, Monitor, ArrowUpRight, Sparkles } from '../icons';
import { MagneticButton } from './MagneticButton';
import { Reveal, Eyebrow } from './Reveal';

interface Props { onOpenEnquiry: (subject?: string) => void }

const MODULES = [
  { n: '01', t: 'Auction Market Theory & Value Area', d: 'Why markets move to facilitate two-way trade. Value Area High & Low, Point of Control, acceptance vs rejection.', tag: 'FOUNDATION' },
  { n: '02', t: 'TPO Structure & Initial Balance', d: 'Classify Open Drive, Open Test Drive and Open Rejection Reverse to judge institutional conviction early in the session.', tag: 'MARKET PROFILE' },
  { n: '03', t: 'Order Flow Footprint & Delta', d: 'Read bid & ask executed volume inside each candle, stacked imbalances and cumulative volume delta divergence.', tag: 'ORDER FLOW' },
  { n: '04', t: 'Absorption & Liquidity Traps', d: 'Spot iceberg orders and passive walls that stop retail momentum, and see where breakout traders get trapped.', tag: 'SMART MONEY' },
  { n: '05', t: 'Multi-Market Execution Matrix', d: 'Apply the same auction logic to Nifty and Banknifty, Forex pairs, Gold, Crude Oil and Bitcoin.', tag: 'MULTI-ASSET' },
  { n: '06', t: 'Risk Architecture & Psychology', d: 'Position sizing, drawdown control and the emotional discipline to execute the same way every day.', tag: 'EXECUTION' },
];

export const CourseHighlight: React.FC<Props> = ({ onOpenEnquiry }) => (
  <section id="curriculum" className="py-24 md:py-32 bg-[#F5F5F4] relative">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <Reveal>
        <Eyebrow>Flagship programme</Eyebrow>
        <SplitHeading text={`Market Profile and Order Flow mastery`} className="heading-3 max-w-3xl mb-4" />
        <p className="body-3 text-[#666666] max-w-[680px] mb-12 leading-relaxed">
          Six modules taught by Dr. Sherlymon Abraham in Malayalam and English, built around live market sessions and order tape dissection rather than theoretical slides.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: 6 Modules Grid */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 content-start">
          {MODULES.map((m, i) => (
            <Reveal key={m.n} delay={(i % 2) * 0.08}>
              <Tilt max={4} className="h-full">
                <div className="h-full rounded-2xl bg-white border border-[#E4E4E1] p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-[#9A7420] font-tabular bg-[#9A7420]/10 px-2.5 py-0.5 rounded-lg">
                        MODULE {m.n}
                      </span>
                      <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider font-semibold">
                        {m.tag}
                      </span>
                    </div>
                    <h3 className="title-3 mb-2 text-[#0A0A0A]">{m.t}</h3>
                    <p className="body-6 text-[#666666] leading-relaxed">{m.d}</p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#E4E4E1]/60 text-[11px] font-mono text-[#0E8A63] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Live Market Case Studies Included</span>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* Right: Sticky Cohort Card with Image Header */}
        <Reveal className="lg:col-span-5" delay={0.1}>
          <div className="lg:sticky lg:top-24 rounded-3xl bg-white border border-[#E4E4E1] overflow-hidden shadow-xl">
            {/* Image Header */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0A0A0A]">
              <img
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
                alt="Live trading desk cohort at HiLITE Business Park"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.88]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#0E8A63] text-white text-[11px] font-mono font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Next Cohort Open</span>
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h4 className="font-semibold text-lg">Malayalam Cohort Batch</h4>
                <p className="text-xs text-[#CFCFCB] font-mono">HiLITE Business Park Calicut & Live Online</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="title-1 mb-4 text-[#0A0A0A]">Cohort Structure</h3>
              <ul className="space-y-4 mb-6">
                {[
                  { i: MapPin, t: 'Offline Trading Lab', d: 'HiLITE Business Park, Calicut, Kerala' },
                  { i: Monitor, t: 'Online Live Cohort', d: 'Live Malayalam broadcast with real-time market dissection' },
                  { i: Calendar, t: 'Schedule & Support', d: '6 weeks intensive, then 3 months of daily live pre-market support' },
                ].map((r) => (
                  <li key={r.t} className="flex gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#F5F5F4] border border-[#E4E4E1] flex items-center justify-center text-[#9A7420] shrink-0 mt-0.5">
                      <r.i className="w-4 h-4" />
                    </span>
                    <span>
                      <span className="block title-4 text-[#0A0A0A]">{r.t}</span>
                      <span className="block body-6 text-[#666666]">{r.d}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl bg-[#F5F5F4] p-4 mb-6 border border-[#E4E4E1]">
                <p className="title-4 mb-3 text-[#0A0A0A]">What’s Included</p>
                <ul className="space-y-2">
                  {[
                    'Footprint chart settings & Bookmap/Sierra templates',
                    'Daily morning auction analysis in Malayalam',
                    'Physical desk access at HiLITE Business Park',
                    'Full session recordings & reference archive',
                    '1-on-1 trade reviews with Dr. Sherlymon Abraham',
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2 body-6 text-[#666666]">
                      <Check className="w-4 h-4 text-[#0E8A63] shrink-0" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <MagneticButton
                  variant="primary"
                  className="w-full"
                  onClick={() => onOpenEnquiry('Enrollment Application: Market Profile & Order Flow')}
                >
                  <span>Apply for next cohort</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton
                  variant="ghost"
                  className="w-full"
                  onClick={() => onOpenEnquiry('Syllabus PDF Request')}
                >
                  <Download className="w-4 h-4" />
                  <span>Get full syllabus PDF</span>
                </MagneticButton>
                <p className="caption-4 text-center text-[#666666]">
                  Batches capped at 25 participants to ensure 1-on-1 mentoring.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
export default CourseHighlight;
