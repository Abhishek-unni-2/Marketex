import React from 'react';
import { MapPin, Users, Award } from '../icons';
import { Reveal, Eyebrow } from './Reveal';
import { SplitHeading } from './Motion';

const FACTS = [
  { icon: Award, label: 'First in Malayalam', value: 'Market Profile and Order Flow education' },
  { icon: Users, label: '1,000+ students trained', value: 'Online and offline learning programs' },
  { icon: MapPin, label: 'HiLITE Business Park', value: 'Calicut, Kerala' },
];

export const AboutMarketex: React.FC = () => (
  <section id="about-marketex" className="py-24 md:py-32 bg-white border-t border-[#E4E4E1]">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-7">
        <Reveal>
          <Eyebrow>About Marketex Pro</Eyebrow>
          <SplitHeading
            text="Kerala's pioneering trading education institute"
            className="heading-3 text-[#0A0A0A] max-w-[680px] mb-6"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-4 text-base text-[#666666] max-w-[680px]">
            <p>
              Marketex Pro is a pioneering trading education institute in Kerala, introducing Market Profile and Order Flow education in Malayalam for the first time.
            </p>
            <p>
              With over 1,000 students trained, we are committed to delivering practical, industry focused trading education through both online and offline learning programs.
            </p>
            <p>
              Our flagship course, Market Profile and Order Flow, helps aspiring traders develop a deeper understanding of market structure, price behaviour, and professional trading concepts.
            </p>
            <p>
              Based at HiLITE Business Park, Calicut, Kerala, we aim to make advanced trading education accessible to everyone through expert guidance and structured learning.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
        <img
          src="/images/about.avif"
          alt="Candlestick chart on a tablet in front of live market screens"
          className="w-full h-64 object-cover rounded-2xl border border-[#E4E4E1]"
          loading="lazy"
        />
        {FACTS.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.1}>
            <div className="flex items-center gap-4 rounded-2xl bg-[#F5F5F4] border border-[#E4E4E1] p-6">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-[#E4E4E1] flex items-center justify-center text-[#9A7420]">
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="title-3 text-[#0A0A0A]">{f.label}</div>
                <div className="body-6 text-[#666666]">{f.value}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
