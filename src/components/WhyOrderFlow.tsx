import { SplitHeading, Tilt } from './Motion';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { institutionalEase } from '../utils/motion';
import { ArrowRight, CheckCircle2, XCircle, Sparkles } from '../icons';

interface FeatureCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  malayalamNote: string;
  imageUrl: string;
  imageAlt: string;
  iconSvg: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  subtitle,
  description,
  malayalamNote,
  imageUrl,
  imageAlt,
  iconSvg,
}) => {
  return (
    <Tilt max={4} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: institutionalEase }}
        className="group relative rounded-3xl bg-[#F5F5F4] border border-[#E4E4E1] hover:border-[#9A7420]/40 hover:-translate-y-[2px] transition-all duration-300 flex flex-col justify-between h-full overflow-hidden shadow-sm"
      >
        <div>
          {/* Card Top Image Header */}
          <div className="relative aspect-[16/8] overflow-hidden bg-[#0A0A0A]">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.88] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F4] via-black/30 to-transparent" />
            
            {/* Top Tag & Number */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                {number}
              </span>
              <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-[#E4E4E1] flex items-center justify-center text-[#9A7420] shadow-sm">
                {iconSvg}
              </div>
            </div>

            <div className="absolute bottom-2 left-4 text-xs font-mono text-[#9A7420] font-semibold">
              {subtitle}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7">
            <h3 className="font-sans text-xl sm:text-2xl text-[#0A0A0A] font-normal tracking-tight mb-3 group-hover:text-[#0A0A0A] transition-colors">
              {title}
            </h3>

            <p className="text-sm text-[#666666] leading-relaxed mb-6 font-normal">
              {description}
            </p>
          </div>
        </div>

        {/* Malayalam Context pill */}
        <div className="px-6 py-4 mx-6 mb-6 rounded-2xl bg-white border border-[#E4E4E1] flex items-center justify-between text-xs font-mono text-[#666666]">
          <span className="text-xs text-[#666666]/90 line-clamp-1">{malayalamNote}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#9A7420] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
        </div>
      </motion.div>
    </Tilt>
  );
};

export const WhyOrderFlow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'overview'>('overview');

  return (
    <section id="why-order-flow" className="py-28 md:py-36 bg-[#FFFFFF] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-[#9A7420] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9A7420]" />
              <span>The Institutional Advantage</span>
            </div>
            <SplitHeading text={`Why Market Profile & Order Flow?`} className="heading-3 text-[#0A0A0A]" />
            <p className="text-base text-[#666666] mt-4 font-normal max-w-xl leading-relaxed">
              Conventional technical analysis tells you where price went in the past. 
              Auction Market Theory tells you <span className="text-[#0A0A0A] font-semibold">who</span> moved it, 
              <span className="text-[#0A0A0A] font-semibold"> how much volume</span> was transacted, and whether institutions accepted the price.
            </p>
          </div>

          {/* Toggle between Overview and Side-by-Side comparison */}
          <div className="mt-8 md:mt-0 flex items-center p-1 rounded-xl bg-[#F5F5F4] border border-[#E4E4E1] self-start md:self-auto font-mono text-xs shadow-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0A0A0A] text-white font-medium shadow-sm'
                  : 'text-[#666666] hover:text-[#0A0A0A]'
              }`}
            >
              Methodology Pillars
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'comparison'
                  ? 'bg-[#0A0A0A] text-white font-medium shadow-sm'
                  : 'text-[#666666] hover:text-[#0A0A0A]'
              }`}
            >
              Retail vs Institutional
            </button>
          </div>
        </div>

        {/* Tab 1: 4 Feature Cards Grid */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Card 1: Auction Market Theory */}
            <FeatureCard
              number="01 // THEORY"
              title="Auction Market Theory & Value Area"
              subtitle="VAH • POC • VAL Structure"
              description="Markets are dual auctions seeking fair value. Learn to map the 70% Value Area where institutional volume agrees to do business, identifying unfair highs and lows before impulsive moves ignite."
              malayalamNote="മാർക്കറ്റിന്റെ യഥാർത്ഥ ഫെയർ വാല്യൂ തിരിച്ചറിയുക"
              imageUrl="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop"
              imageAlt="Auction market profile setup"
              iconSvg={
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5">
                  <path d="M3 19C7 19 8 5 12 5C16 5 17 19 21 19" strokeLinecap="round" />
                  <line x1="6" y1="12" x2="18" y2="12" strokeDasharray="2 2" stroke="#9A7420" />
                  <circle cx="12" cy="5" r="1.5" fill="#9A7420" />
                </svg>
              }
            />

            {/* Card 2: Order Flow Footprint */}
            <FeatureCard
              number="02 // FOOTPRINT"
              title="Order Flow Footprint & Delta"
              subtitle="Bid x Ask Microstructure"
              description="X-ray each candlestick. Decode aggressive buyer vs seller contracts executed at every price tick, spot diagonal bid/ask imbalances, and track Cumulative Volume Delta (CVD) divergence."
              malayalamNote="ഓരോ കാൻഡിലിനുള്ളിലെയും ഇൻസ്റ്റിറ്റിയൂഷണൽ വോളിയം കാണുക"
              imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
              imageAlt="Order flow footprint microstructure"
              iconSvg={
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5">
                  <rect x="3" y="4" width="7" height="16" rx="1" />
                  <rect x="14" y="4" width="7" height="16" rx="1" stroke="#0E8A63" />
                  <line x1="7" y1="8" x2="17" y2="12" stroke="#9A7420" />
                  <line x1="7" y1="14" x2="17" y2="16" stroke="#C4323F" />
                </svg>
              }
            />

            {/* Card 3: Institutional Absorption */}
            <FeatureCard
              number="03 // LIQUIDITY"
              title="Passive Absorption vs Exhaustion"
              subtitle="Uncovering Hidden Icebergs"
              description="Learn how institutional algorithms absorb aggressive retail selling without allowing price to drop. Spot trapped traders at key inflection zones and enter on the institutional side of the trade."
              malayalamNote="റീട്ടെയിൽ ട്രാപ്പുകൾ ഒഴിവാക്കി സ്മാർട്ട് മണിയോടൊപ്പം ട്രേഡ് ചെയ്യുക"
              imageUrl="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
              imageAlt="Institutional multi-monitor trading terminals"
              iconSvg={
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5">
                  <path d="M4 12H20" strokeLinecap="round" />
                  <path d="M12 4V20" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="6" stroke="#9A7420" strokeDasharray="2 2" />
                  <path d="M9 12L12 9L15 12" stroke="#0E8A63" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            {/* Card 4: Context Over Lagging Indicators */}
            <FeatureCard
              number="04 // FRAMEWORK"
              title="Zero Indicator Lag & Pure Context"
              subtitle="TPO Profile & Initial Balance"
              description="Eliminate RSI, MACD, and moving averages that only calculate delayed historical closes. Master Initial Balance (IB) range expansions, Single Prints, Poor Highs/Lows, and market day types."
              malayalamNote="ലാഗിംഗ് ഇൻഡിക്കേറ്ററുകളില്ലാതെ പ്യുവർ പ്രൈസ് ആക്ഷൻ & കോണ്ടെക്സ്റ്റ്"
              imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
              imageAlt="Pure price analytics without lagging indicators"
              iconSvg={
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5">
                  <line x1="4" y1="6" x2="20" y2="6" strokeDasharray="2 2" />
                  <line x1="4" y1="18" x2="20" y2="18" strokeDasharray="2 2" />
                  <path d="M6 15L10 10L14 13L18 8" stroke="#0E8A63" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="18" y1="8" x2="18" y2="18" stroke="#9A7420" />
                </svg>
              }
            />

          </div>
        )}

        {/* Tab 2: Retail vs Institutional Comparison Table */}
        {activeTab === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: institutionalEase }}
            className="rounded-3xl bg-[#F5F5F4] border border-[#E4E4E1] overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E4E4E1]">
              
              {/* Retail Column */}
              <div className="p-8 md:p-10 bg-[#F5F5F4]/60">
                <div className="relative aspect-[16/8] rounded-2xl overflow-hidden mb-6 bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
                    alt="Retail indicator chart"
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                    <span className="text-[#C4323F] font-bold">RETAIL:</span> Delayed Candles & Blind Breakouts
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#C4323F]/15 text-[#C4323F] flex items-center justify-center">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl text-[#0A0A0A]">Retail Indicator Trading</h3>
                    <p className="text-xs font-mono text-[#666666]">95% of Retail Participants</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-[#666666]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4323F] mt-2 flex-shrink-0" />
                    <span>Relies on delayed mathematical formulas (RSI, Moving Averages, Supertrend) that calculate past candle closes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4323F] mt-2 flex-shrink-0" />
                    <span>Buys standard resistance breakouts, blindly entering where institutions are waiting to distribute liquidity.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4323F] mt-2 flex-shrink-0" />
                    <span>No visibility into aggressive vs passive orders, order book delta, or real-time iceberg executions.</span>
                  </li>
                </ul>
              </div>

              {/* Institutional Column */}
              <div className="p-8 md:p-10 bg-white">
                <div className="relative aspect-[16/8] rounded-2xl overflow-hidden mb-6 bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
                    alt="Institutional trading screen"
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                    <span className="text-[#0E8A63] font-bold">INSTITUTIONAL:</span> Order Flow Depth & Footprint
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#0E8A63]/15 text-[#0E8A63] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl text-[#0A0A0A]">Auction Market Theory</h3>
                    <p className="text-xs font-mono text-[#0E8A63]">Marketex Pro Institutional Method</p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-[#0A0A0A]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63] mt-2 flex-shrink-0" />
                    <span>Zero mathematical delay. You see bids and offers executing in real time inside the active auction.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63] mt-2 flex-shrink-0" />
                    <span>Pinpoints institutional absorption at Value Area High and Low with defined asymmetric risk-to-reward.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63] mt-2 flex-shrink-0" />
                    <span>Full visibility into aggressive market orders hitting passive limit walls before the price explodes.</span>
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
export default WhyOrderFlow;
