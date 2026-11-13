import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Shield, ArrowRight, Loader2 } from '../icons';
import confetti from 'canvas-confetti';
import { MagneticButton } from './MagneticButton';
import { institutionalEase } from '../utils/motion';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'Malayalam Cohort Admission',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '1-3 years (Looking for Order Flow Edge)',
    modality: 'Hybrid (HiLITE Calicut + Live Stream)',
    market: 'Indian Index Futures & Options (Nifty / Banknifty)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#9A7420', '#0E8A63', '#0A0A0A'],
      });
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#FFFFFF]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: institutionalEase }}
            className="relative w-full max-w-xl bg-[#F5F5F4] border border-[#E4E4E1] rounded-lg shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-[#666666] hover:text-[#0A0A0A] hover:bg-[#E4E4E1] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              /* Success State */
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-lg-full bg-[#0E8A63]/15 text-[#0E8A63] flex items-center justify-center mx-auto mb-5 border border-[#0E8A63]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl text-[#0A0A0A] font-normal mb-2">
                  Application Logged with Desk
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed max-w-md mx-auto mb-6">
                  Thank you, <span className="text-[#0A0A0A] font-medium">{formData.name}</span>. 
                  Our admissions coordinator from the HiLITE Business Park Calicut campus will reach 
                  out via WhatsApp / call at <span className="text-[#9A7420] font-mono">{formData.phone}</span> within 
                  one business day to schedule your pre-cohort consultation with Dr. Sherlymon Abraham.
                </p>

                <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#E4E4E1] text-xs font-mono text-[#666666] mb-6 text-left space-y-1">
                  <div>• Preferred Modality: <span className="text-[#0A0A0A]">{formData.modality}</span></div>
                  <div>• Market Focus: <span className="text-[#0A0A0A]">{formData.market}</span></div>
                  <div>• Delivery Language: <span className="text-[#9A7420]">Malayalam with Institutional Lexicon</span></div>
                </div>

                <MagneticButton variant="primary" onClick={handleReset} className="">
                  Return to Site
                </MagneticButton>
              </div>
            ) : (
              /* Application Form */
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#9A7420] mb-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admissions Intake</span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl text-[#0A0A0A] font-normal">
                    {defaultSubject}
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-mono">
                    HiLITE Business Park, Calicut & Live Malayalam Stream
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-[#666666] text-xs mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E4E4E1] focus:border-[#9A7420] rounded-lg px-3 py-3 text-[#0A0A0A] placeholder-[#8A8A8A] outline-none transition-colors"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#666666] text-xs mb-1.5">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98460 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E4E4E1] focus:border-[#9A7420] rounded-lg px-3 py-3 text-[#0A0A0A] placeholder-[#8A8A8A] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[#666666] text-xs mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="arun@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E4E4E1] focus:border-[#9A7420] rounded-lg px-3 py-3 text-[#0A0A0A] placeholder-[#8A8A8A] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Modality & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#666666] text-xs mb-1.5">
                        Preferred Learning Mode
                      </label>
                      <select
                        value={formData.modality}
                        onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E4E4E1] focus:border-[#9A7420] rounded-lg px-3 py-3 text-[#0A0A0A] outline-none transition-colors"
                      >
                        <option value="Hybrid (HiLITE Calicut + Live Stream)">Hybrid (Calicut + Online)</option>
                        <option value="Offline Desk (HiLITE Business Park Calicut)">Offline Lab (HiLITE Calicut)</option>
                        <option value="Online Live Malayalam Cohort">Online Live Malayalam Cohort</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#666666] text-xs mb-1.5">
                        Trading Experience
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E4E4E1] focus:border-[#9A7420] rounded-lg px-3 py-3 text-[#0A0A0A] outline-none transition-colors"
                      >
                        <option value="Beginner (< 1 Year)">Beginner (&lt; 1 Year)</option>
                        <option value="1-3 years (Looking for Order Flow Edge)">1-3 Years (Looking for Edge)</option>
                        <option value="3+ years (Active Index / F&O Trader)">3+ Years (Active Trader)</option>
                        <option value="NRI / Full-time Investor">NRI / Full-time Investor</option>
                      </select>
                    </div>
                  </div>

                  {/* Market of Interest */}
                  <div>
                    <label className="block text-[#666666] text-xs mb-1.5">
                      Primary Market Focus
                    </label>
                    <select
                      value={formData.market}
                      onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E4E4E1] focus:border-[#9A7420] rounded-lg px-3 py-3 text-[#0A0A0A] outline-none transition-colors"
                    >
                      <option value="Indian Index Futures & Options (Nifty / Banknifty)">Indian Index F&O (Nifty / Bank Nifty)</option>
                      <option value="International Forex (EUR/USD, GBP/USD)">International Forex</option>
                      <option value="MCX Commodities (Crude Oil & Gold)">MCX Commodities (Crude Oil & Gold)</option>
                      <option value="Crypto Derivatives & Equities">Crypto Derivatives & Equities</option>
                    </select>
                  </div>

                  {/* Notes / Questions */}
                  <div>
                    <label className="block text-[#666666] text-xs mb-1.5">
                      Questions for Dr. Sherlymon (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any specific challenges in your trading journey..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E4E4E1] focus:border-[#9A7420] rounded-lg px-3 py-2 text-[#0A0A0A] placeholder-[#8A8A8A] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-lg bg-[#9A7420] text-[#FFFFFF] font-semibold hover:bg-[#7A5A14] transition-all flex items-center justify-center gap-2 font-mono text-xs shadow-[0_4px_20px_rgba(154,116,32,0.2)] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application to Desk</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-center text-[#8A8A8A] pt-1">
                    Direct confidential review. We never share your data. No marketing calls.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
