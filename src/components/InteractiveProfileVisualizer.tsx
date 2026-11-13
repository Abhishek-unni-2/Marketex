import { SplitHeading, ScrollTilt3D } from './Motion';
import React, { useState } from 'react';
import { Layers, Activity, Eye, Info, Sparkles } from '../icons';


interface ProfileLevel {
  price: string;
  type: 'VAH' | 'POC' | 'VAL' | 'SINGLE_PRINT' | 'NORMAL';
  tpoLetters: string;
  volume: string;
  delta: string;
  isPositive: boolean;
  institutionNote: string;
  retailTrap: string;
  actionRule: string;
}

const PROFILE_LEVELS: ProfileLevel[] = [
  {
    price: '24,260',
    type: 'SINGLE_PRINT',
    tpoLetters: 'A',
    volume: '2,140',
    delta: '-890',
    isPositive: false,
    institutionNote: 'Unfair High / Single Prints. Fast rejection by other timeframe sellers.',
    retailTrap: 'FOMO breakout buyers chased green candle into illiquid air.',
    actionRule: 'No long trades here. Await test of Value Area High or short rejection.',
  },
  {
    price: '24,240',
    type: 'VAH',
    tpoLetters: 'AB',
    volume: '8,920',
    delta: '-1,450',
    isPositive: false,
    institutionNote: 'Value Area High (VAH). Upper boundary of 70% institutional consensus.',
    retailTrap: 'Retail expects immediate breakout beyond the morning high.',
    actionRule: 'If rejected, fade back towards POC. If accepted with volume, look for initiative expansion.',
  },
  {
    price: '24,210',
    type: 'NORMAL',
    tpoLetters: 'ABCDEF',
    volume: '16,400',
    delta: '+2,100',
    isPositive: true,
    institutionNote: 'Balanced rotational trading. Facilitating two-way business.',
    retailTrap: 'Choppy whipsaw for indicator traders waiting on 5-minute moving average crossovers.',
    actionRule: 'Scalp within the value area; reduce risk sizing.',
  },
  {
    price: '24,180',
    type: 'POC',
    tpoLetters: 'ABCDEFGHIJ',
    volume: '34,850',
    delta: '+5,420',
    isPositive: true,
    institutionNote: 'Point of Control (POC). Highest volume transacted today. Fair price attractor.',
    retailTrap: 'Retail trades aggressively here expecting sudden explosive trend.',
    actionRule: 'Primary mean-reversion magnet. High probability target for day trades.',
  },
  {
    price: '24,150',
    type: 'NORMAL',
    tpoLetters: 'BCDEGHI',
    volume: '14,200',
    delta: '+3,890',
    isPositive: true,
    institutionNote: 'Responsive buyer accumulation step.',
    retailTrap: 'Panic selling on minor red pullbacks.',
    actionRule: 'Favorable risk-to-reward long entry if delta holds positive.',
  },
  {
    price: '24,120',
    type: 'VAL',
    tpoLetters: 'BCDE',
    volume: '11,300',
    delta: '+4,820',
    isPositive: true,
    institutionNote: 'Value Area Low (VAL). Heavy passive limit bid absorption of market sell orders.',
    retailTrap: 'Retail breakdown short sellers caught at the exact daily low.',
    actionRule: 'Prime institutional long location with tight stop below single print floor.',
  },
];

export const InteractiveProfileVisualizer: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<ProfileLevel>(PROFILE_LEVELS[3]); // POC default
  const [viewMode, setViewMode] = useState<'profile' | 'footprint'>('profile');

  return (
    <section id="interactive-terminal" className="py-24 md:py-32 bg-[#FFFFFF] border-t border-[#E4E4E1]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-sm font-medium text-[#9A7420] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9A7420]" />
              <span>Interactive Market Architecture</span>
            </div>
            <SplitHeading text={`The Institutional Order Tape`} className="heading-3 text-[#0A0A0A]" />
            <p className="text-sm md:text-base text-[#666666] mt-3 max-w-xl">
              Click any price level below to inspect how institutions accumulate inventory while retail traders get trapped.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="mt-6 md:mt-0 flex items-center p-1 rounded-xl bg-[#F5F5F4] border border-[#E4E4E1] font-mono text-xs shadow-sm">
            <button
              onClick={() => setViewMode('profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                viewMode === 'profile'
                  ? 'bg-[#E4E4E1] text-[#9A7420] font-medium'
                  : 'text-[#666666] hover:text-[#0A0A0A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>TPO Profile</span>
            </button>
            <button
              onClick={() => setViewMode('footprint')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                viewMode === 'footprint'
                  ? 'bg-[#E4E4E1] text-[#9A7420] font-medium'
                  : 'text-[#666666] hover:text-[#0A0A0A]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Order Flow Footprint</span>
            </button>
          </div>
        </div>

        {/* Visualizer Frame */}
        <ScrollTilt3D from={8}><div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-[#F5F5F4] p-6 sm:p-8 rounded-3xl border border-[#E4E4E1]">
          
          {/* Left Chart Panel (7 cols) */}
          <div className="lg:col-span-7">
            {(
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E4E4E1]/70 p-5 font-mono text-xs shadow-sm">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4E4E1] text-xs text-[#666666]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-lg-full bg-[#0E8A63]" />
                <span className="text-[#0A0A0A] font-semibold">NIFTY 50 FUT</span>
                <span className="text-[#8A8A8A]">• 30M AUCTION SESSION</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span>VALUE AREA: <strong className="text-[#9A7420]">70% (24,120 – 24,240)</strong></span>
                <span className="hidden sm:inline">POC: <strong className="text-[#9A7420]">24,180</strong></span>
              </div>
            </div>

            {/* Profile Table / Footprint Rows */}
            <div className="space-y-2">
              {PROFILE_LEVELS.map((level) => {
                const isSelected = selectedLevel.price === level.price;
                const isPOC = level.type === 'POC';
                const isVAH = level.type === 'VAH';
                const isVAL = level.type === 'VAL';

                return (
                  <div
                    key={level.price}
                    onClick={() => setSelectedLevel(level)}
                    className={`cursor-pointer p-3 rounded-lg transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EDEDEB] border-[#9A7420] shadow-[0_0_15px_rgba(154,116,32,0.15)]'
                        : 'bg-[#F5F5F4] border-[#E4E4E1]/60 hover:border-[#666666]/40'
                    }`}
                  >
                    {/* Price and Badge */}
                    <div className="flex items-center gap-3 w-28 sm:w-36 flex-shrink-0">
                      <span className={`font-tabular font-medium text-xs sm:text-sm ${
                        isPOC ? 'text-[#9A7420] font-bold' : isSelected ? 'text-[#0A0A0A]' : 'text-[#666666]'
                      }`}>
                        {level.price}
                      </span>
                      {isPOC && (
                        <span className="text-xs bg-[#9A7420] text-[#FFFFFF] px-1.5 py-0.5 rounded-lg font-bold">
                          POC
                        </span>
                      )}
                      {isVAH && (
                        <span className="text-xs bg-[#E4E4E1] text-[#666666] border border-[#666666]/30 px-1.5 py-0.5 rounded-lg">
                          VAH
                        </span>
                      )}
                      {isVAL && (
                        <span className="text-xs bg-[#E4E4E1] text-[#666666] border border-[#666666]/30 px-1.5 py-0.5 rounded-lg">
                          VAL
                        </span>
                      )}
                    </div>

                    {/* Graphic bar depending on viewMode */}
                    <div className="flex-1 mx-3 hidden sm:flex items-center">
                      {viewMode === 'profile' ? (
                        <div className="flex items-center gap-1 w-full">
                          <span className="text-xs text-[#666666] font-mono">
                            {level.tpoLetters}
                          </span>
                          <div
                            className={`h-2 rounded-lg-md ml-auto transition-all ${
                              isPOC
                                ? 'bg-[#9A7420] w-4/5'
                                : isVAH || isVAL
                                ? 'bg-[#0E8A63]/60 w-3/5'
                                : 'bg-[#E4E4E1] w-2/5'
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full text-xs text-[#666666]">
                          <span className="text-[#666666]">Vol: {level.volume}</span>
                          <span
                            className={`font-semibold px-2 py-0.5 rounded-lg ${
                              level.isPositive ? 'text-[#0E8A63] bg-[#0E8A63]/10' : 'text-[#C4323F] bg-[#C4323F]/10'
                            }`}
                          >
                            Delta: {level.delta}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Volume and Inspection Indicator */}
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-xs font-tabular text-[#666666] hidden sm:inline">
                        {level.volume} lots
                      </span>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#9A7420] text-[#FFFFFF]' : 'text-[#666666]'
                      }`}>
                        <Eye className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom footnote */}
            <div className="mt-4 pt-3 border-t border-[#E4E4E1] flex items-center justify-between text-xs text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#9A7420]" />
                Live Footprint Delta updates every 30-min auction bracket
              </span>
              <span className="text-[#9A7420]">Dr. Sherlymon Model</span>
            </div>
          </div>
            )}
          </div>

          {/* Right Inspection Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Level Badge Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E1]">
                <div>
                  <span className="text-xs font-mono text-[#666666]">Inspecting Level</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-sans text-2xl text-[#0A0A0A] font-normal">
                      {selectedLevel.price}
                    </span>
                    <span className="text-xs font-mono text-[#9A7420] bg-[#9A7420]/10 px-2 py-0.5 rounded-lg">
                      {selectedLevel.type}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <div className="text-xs text-[#666666] ">Net Delta</div>
                  <div className={selectedLevel.isPositive ? 'text-[#0E8A63] font-semibold' : 'text-[#C4323F] font-semibold'}>
                    {selectedLevel.delta} contracts
                  </div>
                </div>
              </div>

              {/* Anatomy details */}
              <div className="space-y-4 my-6">
                
                {/* Institutional Reality */}
                <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#E4E4E1]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0E8A63] mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Institutional Execution</span>
                  </div>
                  <p className="text-xs text-[#0A0A0A] leading-relaxed">
                    {selectedLevel.institutionNote}
                  </p>
                </div>

                {/* The Retail Trap */}
                <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#E4E4E1]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C4323F] mb-1.5">
                    <span>⚠️</span>
                    <span>The Retail Trap</span>
                  </div>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {selectedLevel.retailTrap}
                  </p>
                </div>

                {/* Marketex Execution Playbook */}
                <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#9A7420]/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#9A7420] mb-1.5">
                    <span>⚔️</span>
                    <span>Marketex Pro Action Rule</span>
                  </div>
                  <p className="text-xs text-[#0A0A0A] font-medium leading-relaxed">
                    {selectedLevel.actionRule}
                  </p>
                </div>

              </div>
            </div>

            {/* Malayalam translation callout */}
            <div className="p-3.5 rounded-lg bg-[#F5F5F4] border border-[#E4E4E1] text-xs font-mono text-[#666666]">
              <span className="text-[#9A7420] font-semibold mr-1.5">മലയാളത്തിൽ പഠിക്കുക:</span>
              <span>
                ഓരോ ലെവലിലും നടക്കുന്ന സ്മാർട്ട് മണി കളികൾ കൃത്യമായി വായിച്ചെടുക്കാൻ ഞങ്ങളുടെ മെന്റർഷിപ്പ് നിങ്ങളെ പ്രാപ്തരാക്കുന്നു.
              </span>
            </div>

          </div>

        </div></ScrollTilt3D>

      </div>
    </section>
  );
};
