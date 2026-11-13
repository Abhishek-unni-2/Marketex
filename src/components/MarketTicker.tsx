import React from 'react';

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  percent: string;
  isPositive: boolean;
  metricLabel: string;
  metricVal: string;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    symbol: 'NIFTY 50 FUT',
    price: '24,185.25',
    change: '+142.20',
    percent: '+0.59%',
    isPositive: true,
    metricLabel: 'POC STATUS',
    metricVal: '24,140 Acceptance',
  },
  {
    symbol: 'BANKNIFTY FUT',
    price: '51,890.00',
    change: '+385.10',
    percent: '+0.75%',
    isPositive: true,
    metricLabel: 'CVD DELTA',
    metricVal: '+18.4K Institutional Buy',
  },
  {
    symbol: 'CRUDE OIL MCX',
    price: '6,145.00',
    change: '-38.00',
    percent: '-0.61%',
    isPositive: false,
    metricLabel: 'VALUE AREA',
    metricVal: 'VAL Test & Reject',
  },
  {
    symbol: 'GOLD (XAU/USD)',
    price: '$2,684.40',
    change: '+8.20',
    percent: '+0.31%',
    isPositive: true,
    metricLabel: 'INITIAL BALANCE',
    metricVal: 'Extension Up (Range 1.4x)',
  },
  {
    symbol: 'EUR/USD',
    price: '1.0844',
    change: '+0.0019',
    percent: '+0.18%',
    isPositive: true,
    metricLabel: 'FOOTPRINT',
    metricVal: 'Passive Bid Absorption',
  },
  {
    symbol: 'BITCOIN PERP',
    price: '$89,420',
    change: '+1,840',
    percent: '+2.10%',
    isPositive: true,
    metricLabel: 'TPO STRUCTURE',
    metricVal: 'Single Prints Defended',
  },
];

export const MarketTicker: React.FC = () => {
  return (
    <div className="w-full bg-[#FFFFFF] border-y border-[#E4E4E1]/80 overflow-hidden py-3 select-none relative z-20">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {/* Double the list for seamless continuous infinite marquee */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 px-6 border-r border-[#E4E4E1]/60 text-xs font-mono whitespace-nowrap"
          >
            <span className="font-semibold text-[#0A0A0A]">{item.symbol}</span>
            <span className="text-[#0A0A0A]">{item.price}</span>
            <span
              className={`text-xs px-1 py-0.5 rounded-lg ${
                item.isPositive
                  ? 'text-[#0E8A63] bg-[#0E8A63]/10'
                  : 'text-[#C4323F] bg-[#C4323F]/10'
              }`}
            >
              {item.change} ({item.percent})
            </span>
            <span className="text-[#8A8A8A] text-xs hidden sm:inline">|</span>
            <span className="text-[#666666] text-xs hidden sm:inline">
              <span className="text-[#8A8A8A]">{item.metricLabel}:</span>{' '}
              <span className="text-[#9A7420]">{item.metricVal}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
