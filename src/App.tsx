import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { MarketTicker } from './components/MarketTicker';
import { Hero } from './components/Hero';
import { TaglineReveal } from './components/TaglineReveal';
import { Reveal } from './components/Reveal';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { AboutSection } from './components/AboutSection';
import { AboutMarketex } from './components/AboutMarketex';
import { WhyOrderFlow } from './components/WhyOrderFlow';
import { InteractiveProfileVisualizer } from './components/InteractiveProfileVisualizer';
import { MentorSection } from './components/MentorSection';

import { CourseHighlight } from './components/CourseHighlight';
import { CalicutCampus } from './components/CalicutCampus';
import { SocialProof } from './components/SocialProof';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { ScrollProgress } from './components/Motion';
import { institutionalEase } from './utils/motion';

const KNOWN_ROUTES = ['/', '/why-order-flow', '/terminal', '/mentor', '/curriculum', '/campus'];

const BackToHome: React.FC = () => (
  <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-6">
    <a href="#/" className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-[#0A0A0A] transition-colors duration-300">
      <span aria-hidden="true">←</span> Back to home
    </a>
  </div>
);

const NotFound: React.FC = () => (
  <section className="min-h-[70vh] pt-40 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
    <p className="text-sm font-medium text-[#9A7420] mb-3">Error 404</p>
    <h1 className="heading-2 text-[#0A0A0A] max-w-[680px]">This page could not be found</h1>
    <p className="text-base text-[#666666] mt-4 max-w-[680px]">
      The link may be outdated, or the address may have a typo. Go back to the home page to continue.
    </p>
    <a href="#/" className="inline-flex mt-8 px-3 py-2 rounded-lg bg-[#0A0A0A] text-white text-base font-semibold">
      Back to home
    </a>
  </section>
);

const getRoute = () => {
  const r = window.location.hash.replace(/^#/, '') || '/';
  return r.startsWith('/') ? r : '/';
};

export const App: React.FC = () => {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('Malayalam Cohort Admission');

  const handleOpenEnquiry = (subject?: string) => {
    if (subject) setModalSubject(subject);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0A] relative selection:bg-[#9A7420]/30 selection:text-[#0A0A0A]">
      
      {/* 1. Loading Screen (2-2.5s, skippable via sessionStorage) */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Page Content with smooth scale 1.02 -> 1 exit from loader */}
      <motion.div
        initial={{ opacity: 0.85 }}
        animate={!isLoading ? { opacity: 1 } : { opacity: 0.85 }}
        transition={{ duration: 0.7, ease: institutionalEase }}
        className="w-full relative"
      >
        <ScrollProgress />
        {/* Navigation */}
        <Navbar onOpenEnquiry={handleOpenEnquiry} route={route} />

        <main id="main">
          {route === '/' && (
            <>
              <Hero onOpenEnquiry={handleOpenEnquiry} />
              <MarketTicker />
              <TaglineReveal />
              <AboutMarketex />
              <AboutSection />
              <SocialProof />
              <FAQ />
              <FinalCTA onOpenEnquiry={handleOpenEnquiry} />
            </>
          )}
          {route === '/why-order-flow' && (
            <div className="pt-24"><BackToHome />
              <Reveal><WhyOrderFlow /></Reveal>
              <HowItWorks />
            </div>
          )}
          {route === '/terminal' && (
            <div className="pt-24"><BackToHome />
              <Reveal><InteractiveProfileVisualizer /></Reveal>
            </div>
          )}
          {route === '/mentor' && (
            <div className="pt-24"><BackToHome />
              <MentorSection onOpenEnquiry={handleOpenEnquiry} />
            </div>
          )}
          {route === '/curriculum' && (
            <div className="pt-24"><BackToHome />
              <CourseHighlight onOpenEnquiry={handleOpenEnquiry} />
            </div>
          )}
          {route === '/campus' && (
            <div className="pt-24"><BackToHome />
              <CalicutCampus onOpenEnquiry={handleOpenEnquiry} />
            </div>
          )}
          {!KNOWN_ROUTES.includes(route) && <NotFound />}
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>

      {/* Admission / Syllabus Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultSubject={modalSubject}
      />

    </div>
  );
};

export default App;
