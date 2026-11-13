import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from '../icons';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  route: string;
  onOpenEnquiry: (subject?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: 'Why order flow', href: '#/why-order-flow' },
  { label: 'Terminal', href: '#/terminal' },
  { label: 'Mentor', href: '#/mentor' },
  { label: 'Curriculum', href: '#/curriculum' },
  { label: 'Campus', href: '#/campus' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, route }) => {
  const [open, setOpen] = useState(false);
  const active = '#' + route;
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-[#0A0A0A] focus:text-white focus:px-3 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: reduce ? 0 : -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-6 rounded-2xl border border-[#E4E4E1] bg-white/70 backdrop-blur-xl shadow-sm pl-3 pr-2 py-2 w-full max-w-fit">
          <a href="#/" className="flex items-center gap-2 no-underline" aria-label="Marketex Pro home">
            <span className="w-8 h-8 rounded-lg bg-[#F5F5F4] border border-[#E4E4E1] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#9A7420]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 18L10 9L15 14L20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-base font-semibold text-[#0A0A0A]">
              Marketex <span className="text-[#9A7420]">Pro</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.href ? 'true' : undefined}
                className={`relative text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                  active === l.href ? 'text-[#0A0A0A]' : 'text-[#666666] hover:text-[#0A0A0A]'
                }`}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-0 rounded-lg bg-[#EDEDEB]"
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton variant="primary" onClick={() => onOpenEnquiry('Flagship Course Enrollment')} className="!text-sm">
              <span>Apply for cohort</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          {/* Animated menu toggle: two lines morph into a cross */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] rounded-lg hover:bg-[#F5F5F4] transition-colors duration-300"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`block w-5 h-[2px] bg-[#0A0A0A] rounded transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span className={`block w-5 h-[2px] bg-[#0A0A0A] rounded transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Full height mobile panel with staggered link entrance */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl pt-28 px-6 flex flex-col"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((l, idx) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.06, 0.4), ease: EASE }}
                  className="heading-4 text-[#0A0A0A] py-3 border-b border-[#E4E4E1]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              className="mt-8"
            >
              <MagneticButton
                variant="primary"
                onClick={() => { setOpen(false); onOpenEnquiry('Malayalam Cohort Admission'); }}
                className="w-full"
              >
                Apply for next cohort
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
