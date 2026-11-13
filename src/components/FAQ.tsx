import { SplitHeading, Tilt } from './Motion';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, PhoneCall, CheckCircle2, Sparkles, MessageCircle } from '../icons';
import { Reveal, Eyebrow } from './Reveal';

const FAQS = [
  { q: 'Is the course taught in Malayalam?', a: 'Yes. Sessions are taught in pure Malayalam, with standard English market terms kept intact so you can read international charts and institutional research comfortably.' },
  { q: 'Do I need prior trading experience?', a: 'Basic familiarity with candlestick charts helps. The syllabus starts from the fundamental physics of Auction Market Theory, so you do not need to know Market Profile beforehand.' },
  { q: 'Can I join online?', a: 'Yes. There is an online live cohort with real-time market dissection via interactive live stream, as well as our physical trading lab at HiLITE Business Park in Calicut.' },
  { q: 'How long is the programme?', a: 'Six weeks of intensive structured learning, followed by three months of daily live pre-market analysis and ongoing community trade reviews.' },
  { q: 'How many students are in a batch?', a: 'Batches are capped at 25 participants to guarantee direct trade critique and personal review sessions with Dr. Sherlymon Abraham.' },
  { q: 'Which markets does it cover?', a: 'Nifty and Banknifty futures and options, global Forex pairs (EUR/USD, GBP/USD), MCX commodities (Gold, Crude Oil), and Bitcoin.' },
  { q: 'What do I get besides the live classes?', a: 'Licensed footprint chart settings, Bookmap & Sierra Chart templates, daily morning Malayalam auction roadmaps, session recordings, and alumni co-working access in Calicut.' },
  { q: 'What is the fee, and how do I apply?', a: 'Admission is by application only to ensure batch quality. Click "Apply for Malayalam Cohort" to submit your details; our desk will reach out with the syllabus and fee structure.' },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F5F5F4] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
        {/* Left Column: Heading & Visual Advisory Support Card */}
        <Reveal className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <Eyebrow>Questions & Answers</Eyebrow>
            <SplitHeading text={`Before you apply`} className="heading-3 mb-6" />
            <p className="body-3 text-[#666666] mb-8 leading-relaxed">
              Everything you need to know about our Malayalam auction mentorship, offline Calicut lab access, and cohort schedules.
            </p>
          </div>

          {/* Visual Advisor Card */}
          <Tilt max={4}>
            <div className="rounded-3xl bg-white border border-[#E4E4E1] p-5 shadow-sm overflow-hidden">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-[#0A0A0A]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Marketex Pro student advisory team at Calicut desk"
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.92]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63] animate-pulse" />
                  <span>Calicut Desk Online</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-mono text-[#C9A24B]">Direct Desk Support</p>
                  <p className="text-sm font-semibold">Have a specific question?</p>
                </div>
              </div>

              <p className="body-6 text-[#666666] mb-4">
                Our team at HiLITE Business Park can walk you through batch dates, offline seat availability, or technical software requirements.
              </p>

              <a
                href="tel:+919846000000"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A0A0A] text-white text-xs font-mono font-semibold transition-all hover:bg-[#2A2A2A] shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Call the Calicut Desk</span>
              </a>
            </div>
          </Tilt>
        </Reveal>

        {/* Right Column: FAQ Accordion */}
        <div className="lg:col-span-8 space-y-3.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className={`rounded-2xl transition-all border ${
                  isOpen ? 'bg-white border-[#9A7420]/50 shadow-md' : 'bg-white border-[#E4E4E1] hover:border-[#666666]/30'
                }`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left rounded-2xl"
                  >
                    <span className={`title-2 font-medium ${isOpen ? 'text-[#0A0A0A] font-semibold' : 'text-[#2A2A2A]'}`}>
                      {f.q}
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-[#9A7420] text-white rotate-45' : 'bg-[#F5F5F4] text-[#666666]'
                    }`}>
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="body-3 text-[#666666] px-5 pb-5 leading-relaxed border-t border-[#E4E4E1]/50 pt-3">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FAQ;
