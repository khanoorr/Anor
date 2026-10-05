"use client";

import React, { useState } from "react";
import { useLenis } from "@/lib/lenis";
import { Preloader } from "@/components/loading/Preloader";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { StatsCounterSection } from "@/components/sections/StatsCounterSection";
import { SystemDiagramSection } from "@/components/sections/SystemDiagramSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PerformanceDashboardSection } from "@/components/sections/PerformanceDashboardSection";
import { ExperimentationLabSection } from "@/components/sections/ExperimentationLabSection";
import { CreativeShowcaseSection } from "@/components/sections/CreativeShowcaseSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyAnorSection } from "@/components/sections/WhyAnorSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { ROICalculatorSection } from "@/components/sections/ROICalculatorSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/sections/Footer";
import { ContactModal } from "@/components/ui/ContactModal";

export default function Home() {
  useLenis();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0B0B10] text-[#F7F7F5] selection:bg-[#246BFF] selection:text-white">
      {/* Global 10-Step Vector Preloader */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Main Experience Film */}
      <div className={loadingComplete ? "opacity-100 transition-opacity duration-700" : "opacity-0"}>
        <Navbar onOpenContact={() => setContactOpen(true)} />

        <HeroSection
          preloaderFinished={loadingComplete}
          onOpenContact={() => setContactOpen(true)}
        />

        <ProblemSection />

        <StatsCounterSection />

        <SystemDiagramSection />

        <ServicesSection />

        <PerformanceDashboardSection />

        <ExperimentationLabSection />

        <CreativeShowcaseSection />

        <ProcessSection />

        <WhyAnorSection />

        <SocialProofSection />

        <CaseStudiesSection onOpenContact={() => setContactOpen(true)} />

        <ROICalculatorSection onOpenContact={() => setContactOpen(true)} />

        <FAQSection onOpenContact={() => setContactOpen(true)} />

        <FinalCTASection onOpenContact={() => setContactOpen(true)} />

        <Footer onOpenContact={() => setContactOpen(true)} />
      </div>

      {/* Global Contact Drawer Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
}
