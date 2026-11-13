import { SplitHeading } from './Motion';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2, Award } from '../icons';
import { Reveal, Eyebrow } from './Reveal';

const T = [
  {
    quote: 'Being a physician myself, Dr. Sherlymon’s diagnostic approach resonated deeply. For years I lost money following tips and retail indicators. Learning Auction Market Theory in Malayalam gave me a clear lens on what the market was doing.',
    author: 'Dr. Rahul Nair',
    role: 'Medical practitioner and discretionary trader',
    loc: 'Dubai and Kozhikode',
    focus: 'Nifty options and global Forex',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    verified: 'Batch 04 Graduate',
  },
  {
    quote: 'Market Profile gives you the macro context and order flow gives you the precise entry. When you see stacked buying delta and absorption at the Value Area Low in real time, you stop panicking on pullbacks.',
    author: 'Mohammed Shafi',
    role: 'Full time index trader',
    loc: 'Ernakulam, Kerala',
    focus: 'Bank Nifty futures and options',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    verified: 'Batch 06 Graduate',
  },
  {
    quote: 'I doubted that advanced auction concepts could be taught properly in Malayalam. The curriculum removed every ambiguity, and the sessions at HiLITE Business Park are rigorous with no indicator filler.',
    author: 'Vishnu Prasad',
    role: 'Senior software engineer',
    loc: 'Trivandrum and Bangalore',
    focus: 'Equities and US tech futures',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    verified: 'Batch 08 Graduate',
  },
  {
    quote: 'Sitting on the physical trading floor and watching the Point of Control act as a price magnet changed how I approach my eight years of commodity trading.',
    author: 'Abdul Majeed',
    role: 'Commodity trader and business owner',
    loc: 'Calicut, Kerala',
    focus: 'MCX Crude Oil and Gold',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    verified: 'Batch 03 Graduate',
  },
];

export const SocialProof: React.FC = () => {
  const [i, setI] = useState(0);
  const c = T[i];
  return (
    <section className="py-24 md:py-32 bg-[#F5F5F4] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Eyebrow>Student words</Eyebrow>
            <SplitHeading text={`Traders who changed how they read the market`} className="heading-3" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setI((i - 1 + T.length) % T.length)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-xl bg-white border border-[#E4E4E1] flex items-center justify-center transition-colors duration-300 hover:border-[#0A0A0A] active:scale-[0.98] shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-[#666666] font-tabular px-2">{i + 1} / {T.length}</span>
            <button
              onClick={() => setI((i + 1) % T.length)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-xl bg-white border border-[#E4E4E1] flex items-center justify-center transition-colors duration-300 hover:border-[#0A0A0A] active:scale-[0.98] shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>

        {/* Student Avatar Selector Bar */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          {T.map((student, idx) => (
            <button
              key={student.author}
              onClick={() => setI(idx)}
              className={`flex items-center gap-3 p-1.5 pr-4 rounded-full border transition-all ${
                i === idx
                  ? 'bg-white border-[#9A7420] shadow-md scale-102'
                  : 'bg-white/60 border-[#E4E4E1] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={student.avatar}
                alt={student.author}
                className="w-9 h-9 rounded-full object-cover filter contrast-[1.05]"
              />
              <div className="text-left font-mono text-xs">
                <span className={`block font-semibold ${i === idx ? 'text-[#0A0A0A]' : 'text-[#666666]'}`}>
                  {student.author}
                </span>
                <span className="text-[10px] text-[#9A7420]">{student.verified}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        <Reveal>
          <div className="relative rounded-3xl bg-white border border-[#E4E4E1] p-6 sm:p-10 min-h-[340px] shadow-sm overflow-hidden">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-[#EDEDEB] opacity-60 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <blockquote className="heading-5 max-w-4xl mb-8 text-[#0A0A0A] leading-relaxed font-normal">
                  “{c.quote}”
                </blockquote>

                <div className="pt-6 border-t border-[#E4E4E1] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={c.avatar}
                      alt={c.author}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#9A7420]/30 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="title-2 text-[#0A0A0A] font-semibold">{c.author}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0E8A63] bg-[#0E8A63]/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{c.verified}</span>
                        </span>
                      </div>
                      <p className="body-6 text-[#666666]">{c.role} • {c.loc}</p>
                    </div>
                  </div>

                  <span className="px-3.5 py-2 rounded-xl bg-[#F5F5F4] border border-[#E4E4E1] text-xs font-mono font-medium text-[#9A7420]">
                    Focus: {c.focus}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
export default SocialProof;
