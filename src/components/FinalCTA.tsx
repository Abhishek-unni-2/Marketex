import { SplitHeading } from './Motion';
import React from 'react';
import { ArrowUpRight, PhoneCall, Sparkles, ShieldCheck } from '../icons';
import { Reveal } from './Reveal';

interface Props { onOpenEnquiry: (subject?: string) => void }

export const FinalCTA: React.FC<Props> = ({ onOpenEnquiry }) => (
  <section className="py-24 md:py-32 bg-white relative">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white px-6 py-20 md:py-28 text-center shadow-2xl border border-white/10">
          {/* Atmospheric Background Image with Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1600&auto=format&fit=crop"
              alt="Trading floor background"
              className="w-full h-full object-cover filter contrast-[1.2] brightness-[0.22] scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#9A7420]/20 via-transparent to-transparent" />
          </div>

          {/* Animated Auction Curves SVG */}
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" fill="none" aria-hidden>
            <path d="M0 240 C 200 240, 320 180, 500 200 C 680 220, 800 80, 1000 120 C 1200 160, 1320 40, 1440 60" stroke="#C9A24B" strokeWidth="1.5" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
            <path d="M0 260 C 300 260, 600 140, 900 180 C 1200 220, 1350 90, 1440 80" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
          </svg>

          {/* Content */}
          <div className="relative max-w-[720px] mx-auto z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-xs font-mono text-[#C9A24B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63] animate-pulse" />
              <span>HiLITE Business Park Calicut & Live Online Cohort</span>
            </div>

            <SplitHeading text={`The market speaks in volume. Learn the language.`} className="heading-2 mb-6 text-white" />
            
            <p className="body-3 text-[#CFCFCB] mb-8 leading-relaxed max-w-xl mx-auto">
              Join 1,000+ traders trained in Market Profile and Order Flow Footprint by Dr. Sherlymon Abraham. Physical seats at HiLITE Business Park are strictly capped to maintain 1-on-1 mentorship quality.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => onOpenEnquiry('Direct Batch Admission')}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold rounded-xl px-5 py-3 bg-white text-[#0A0A0A] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:bg-[#EDEDEB] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-lg"
              >
                <span>Apply for Malayalam cohort</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919846000000"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold rounded-xl px-5 py-3 border border-white/30 text-white transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white backdrop-blur-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#C9A24B]" />
                <span>Call the Calicut desk</span>
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-[#A0A0A0]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0E8A63]" />
                SEBI & AMT Compliant Principles
              </span>
              <span>•</span>
              <span>16+ Yrs Track Record</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
export default FinalCTA;
