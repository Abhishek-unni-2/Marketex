import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { institutionalEase } from '../utils/motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);
  const [showCandles, setShowCandles] = useState(false);

  useEffect(() => {
    // Check if user visited in this session
    const hasVisited = sessionStorage.getItem('marketex_pro_loaded');
    const totalDuration = hasVisited ? 1200 : 2300;

    const candleTimer = setTimeout(() => {
      setShowCandles(true);
    }, totalDuration * 0.35);

    const wordmarkTimer = setTimeout(() => {
      setShowWordmark(true);
    }, totalDuration * 0.65);

    const finishTimer = setTimeout(() => {
      setIsFinished(true);
      sessionStorage.setItem('marketex_pro_loaded', 'true');
      setTimeout(() => {
        onComplete();
      }, 600); // Allow mask wipe exit animation
    }, totalDuration);

    return () => {
      clearTimeout(candleTimer);
      clearTimeout(wordmarkTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    sessionStorage.setItem('marketex_pro_loaded', 'true');
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader-container"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.7, ease: institutionalEase }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFFFF] select-none overflow-hidden"
        >
          {/* Subtle background ambient pulse */}

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 text-xs font-mono text-[#666666] hover:text-[#9A7420] transition-colors px-3 py-2 rounded-lg border border-[#E4E4E1]/60 hover:border-[#9A7420]/30"
          >
            SKIP [ESC]
          </button>

          <div className="w-full max-w-lg px-8 flex flex-col items-center">
            {/* Price Chart Line Drawing */}
            <div className="relative w-full h-32 mb-8">
              <svg
                viewBox="0 0 400 120"
                className="w-full h-full overflow-visible"
                fill="none"
              >
                {/* Reference baseline */}
                <line
                  x1="0"
                  y1="90"
                  x2="400"
                  y2="90"
                  stroke="#E4E4E1"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Main animated chart path */}
                <motion.path
                  d="M 10 90 L 70 82 L 120 88 L 170 54 L 210 68 L 260 38 L 310 44 L 350 22 L 390 14"
                  stroke="#9A7420"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: institutionalEase }}
                />

                {/* Subtle Candlestick Ticks appearing along the line */}
                {showCandles && (
                  <>
                    {/* Tick 1: Value Area test (emerald) */}
                    <motion.g
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.35, ease: institutionalEase }}
                      style={{ transformOrigin: '170px 54px' }}
                    >
                      <line x1="170" y1="42" x2="170" y2="70" stroke="#0E8A63" strokeWidth="1" />
                      <rect x="167" y="47" width="6" height="15" fill="#0E8A63" rx="0.5" />
                    </motion.g>

                    {/* Tick 2: POC Absorption (gold) */}
                    <motion.g
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.35, delay: 0.2, ease: institutionalEase }}
                      style={{ transformOrigin: '260px 38px' }}
                    >
                      <line x1="260" y1="28" x2="260" y2="52" stroke="#9A7420" strokeWidth="1" />
                      <rect x="257" y="32" width="6" height="14" fill="#9A7420" rx="0.5" />
                    </motion.g>

                    {/* Tick 3: Institutional expansion */}
                    <motion.g
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.35, delay: 0.4, ease: institutionalEase }}
                      style={{ transformOrigin: '350px 22px' }}
                    >
                      <line x1="350" y1="12" x2="350" y2="34" stroke="#0E8A63" strokeWidth="1" />
                      <rect x="347" y="16" width="6" height="13" fill="#0E8A63" rx="0.5" />
                    </motion.g>
                  </>
                )}

                {/* Pulsing leading head on chart line */}
                <motion.circle
                  cx="390"
                  cy="14"
                  r="3.5"
                  fill="#9A7420"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.4, 1] }}
                  transition={{ delay: 1.5, duration: 1.2, repeat: Infinity }}
                />
              </svg>
            </div>

            {/* Wordmark appearing at ~70% of draw with letter-spacing transition */}
            <motion.div
              initial={{ opacity: 0, y: 10, letterSpacing: '0.35em' }}
              animate={showWordmark ? { opacity: 1, y: 0, letterSpacing: '0.18em' } : {}}
              transition={{ duration: 0.6, ease: institutionalEase }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="w-1.5 h-1.5 rounded-lg-full bg-[#9A7420] inline-block" />
                <h1 className="text-xl md:text-2xl font-sans font-semibold text-[#0A0A0A] ">
                  MARKETEX <span className="text-[#9A7420] font-medium">PRO</span>
                </h1>
                <span className="w-1.5 h-1.5 rounded-lg-full bg-[#0E8A63] inline-block" />
              </div>
              <p className="mt-2 text-xs font-mono text-[#666666] ">
                Order Flow & Market Profile • Kerala
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
