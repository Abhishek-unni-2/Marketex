import React from 'react';
import { MapPin, Mail, Phone, ExternalLink, ShieldAlert } from '../icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E4E4E1] text-[#666666] text-sm font-sans pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#E4E4E1]">
          
          {/* Col 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#F5F5F4] border border-[#E4E4E1] flex items-center justify-center text-[#9A7420]">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 18L10 9L15 14L20 6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="6" r="1.5" fill="#0E8A63" />
                  </svg>
                </div>
                <span className="font-sans text-lg font-semibold text-[#0A0A0A] ">
                  MARKETEX <span className="text-[#9A7420] font-medium">PRO</span>
                </span>
              </div>

              <p className="text-xs text-[#666666] leading-relaxed max-w-sm mb-6 font-sans">
                Kerala’s pioneering trading education institute. First to teach Market Profile, 
                Order Flow Footprint, and Auction Market Theory in Malayalam. Founded and mentored 
                by Dr. Sherlymon Abraham.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5F4] border border-[#E4E4E1] text-xs text-[#9A7420]">
                <span className="w-1.5 h-1.5 rounded-lg-full bg-[#0E8A63]" />
                <span>HiLITE Business Park • Calicut, Kerala</span>
              </div>
            </div>
          </div>

          {/* Col 2: Educational Programs (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-xs text-[#0A0A0A] font-semibold mb-4">
              Curriculum Modules
            </div>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <a href="#/curriculum" className="hover:text-[#9A7420] transition-colors">
                  Auction Market Theory & POC
                </a>
              </li>
              <li>
                <a href="#/curriculum" className="hover:text-[#9A7420] transition-colors">
                  Order Flow Footprint & CVD
                </a>
              </li>
              <li>
                <a href="#/curriculum" className="hover:text-[#9A7420] transition-colors">
                  TPO Profile & Initial Balance
                </a>
              </li>
              <li>
                <a href="#/curriculum" className="hover:text-[#9A7420] transition-colors">
                  Institutional Absorption Sets
                </a>
              </li>
              <li>
                <a href="#/curriculum" className="hover:text-[#9A7420] transition-colors">
                  Live Malayalam Cohort
                </a>
              </li>
              <li>
                <a href="#/campus" className="hover:text-[#9A7420] transition-colors">
                  Calicut Physical Trading Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Calicut Campus & Contact (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-xs text-[#0A0A0A] font-semibold mb-4">
              Campus & Inquiries
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9A7420] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  HiLITE Business Park, Poovangal, Kozhikode (Calicut), Kerala 673014
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9A7420] flex-shrink-0" />
                <a href="mailto:admissions@marketexpro.in" className="hover:text-[#0A0A0A] transition-colors">
                  admissions@marketexpro.in
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9A7420] flex-shrink-0" />
                <a href="tel:+919846000000" className="hover:text-[#0A0A0A] transition-colors">
                  +91 98460 00000
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Community & Social Channels (2 cols) */}
          <div className="lg:col-span-2">
            <div className="text-xs text-[#0A0A0A] font-semibold mb-4">
              Desk Channels
            </div>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#9A7420] transition-colors">
                  <span>YouTube (Malayalam)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://t.me" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#9A7420] transition-colors">
                  <span>Telegram Community</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#9A7420] transition-colors">
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#9A7420] transition-colors">
                  <span>Twitter / X</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#9A7420] transition-colors">
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Institutional Compliance Disclaimer */}
        <div className="py-8 border-b border-[#E4E4E1] flex items-start gap-3 text-xs text-[#8A8A8A] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-[#666666] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#666666]">Educational Disclosure & Risk Notice:</strong> Marketex Pro is an independent financial education and research institute specializing in Auction Market Theory, Market Profile, and Order Flow Footprint analytics. Marketex Pro does not provide investment advice, buy/sell recommendations, portfolio management services, or guaranteed returns. Trading in Equities, Futures, Options, Forex, and Cryptocurrencies entails substantial financial risk and is not suitable for all investors. Mentorship and educational materials are intended solely for personal knowledge and discretionary skill development.
          </div>
        </div>

        {/* Bottom Bar: Copyright and Kerala pride */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A8A]">
          <div>
            © {new Date().getFullYear()} Marketex Pro. All rights reserved. Pioneering Trading Education in Kerala.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#666666] transition-colors cursor-pointer">Terms of Mentorship</span>
            <span>•</span>
            <span className="hover:text-[#666666] transition-colors cursor-pointer">Privacy & Honor Code</span>
            <span>•</span>
            <span className="hover:text-[#666666] transition-colors cursor-pointer">Calicut Campus Registry</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
