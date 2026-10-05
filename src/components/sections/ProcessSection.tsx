"use client";

import React, { useState } from "react";

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "DIAGNOSE",
      what: "Audit pixel setup, CAPI event telemetry, ad account structure, unit economics & historic creative fatigue.",
      delivers: "100-Point Performance Audit & Growth Bottleneck Report",
      next: "MOVE TO ARCHITECTURAL DESIGN",
    },
    {
      num: "02",
      title: "DESIGN",
      what: "Engineer channel media allocation, creative angle matrix, and high-converting lander wireframes.",
      delivers: "Omnichannel Growth System Master Plan",
      next: "MOVE TO HYPOTHESIS TESTING",
    },
    {
      num: "03",
      title: "EXPERIMENT",
      what: "Launch weekly sprint cycles testing 20-40 multi-variant ad hooks, landing pages, and offer combinations.",
      delivers: "Statistical Significance Test Matrix",
      next: "MOVE TO ATTRIBUTION MEASUREMENT",
    },
    {
      num: "04",
      title: "MEASURE",
      what: "Track blended MER, incrementality lift, post-purchase survey attribution, and cohort LTV curves.",
      delivers: "First-Party Attribution Dashboard",
      next: "MOVE TO CAPITAL SCALE",
    },
    {
      num: "05",
      title: "SCALE",
      what: "Re-allocate capital into winning creative angles and high-performing audiences to achieve exponential growth.",
      delivers: "Scalable Growth Engine Locked & Operating",
      next: "EXPAND UNIFIED BRAND IMPACT",
    },
  ];

  return (
    <section
      id="process"
      className="relative w-full bg-[#15151C] text-[#F7F7F5] overflow-hidden py-24"
    >
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-2 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
          <span className="w-2 h-2 rounded-full bg-[#246BFF]" />
          <span>08 / OPERATIONAL PIPELINE</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          FROM SIGNAL TO SCALE.
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        className="mt-14 flex items-stretch gap-6 overflow-x-auto overflow-y-hidden px-6 pb-6 md:px-12 lg:px-20 snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#246BFF_rgba(255,255,255,0.08)]"
      >
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={step.num}
              onMouseEnter={() => setActiveStep(idx)}
              onFocus={() => setActiveStep(idx)}
              tabIndex={0}
              className={`w-[82vw] max-w-[520px] sm:w-[500px] p-8 md:p-12 border transition-colors duration-300 shrink-0 snap-start outline-none ${
                isActive
                  ? "bg-[#0B0B10] border-[#246BFF] shadow-[0_0_35px_rgba(36,107,255,0.25)]"
                  : "bg-[#0B0B10]/40 border-white/10 opacity-70 hover:opacity-100 hover:border-white/25"
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <span
                  className={`font-mono text-3xl font-black ${
                    isActive ? "text-[#246BFF]" : "text-slate"
                  }`}
                >
                  {step.num}
                </span>
                <span className="font-mono text-xs text-slate uppercase tracking-widest">
                  STAGE {idx + 1} OF 5
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                {step.title}
              </h3>

              <p className="text-sm md:text-base text-[#E8E8EC] font-light leading-relaxed mb-8">
                {step.what}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-slate block text-[10px] uppercase">ANOR DELIVERABLE</span>
                  <span className="text-white font-bold">{step.delivers}</span>
                </div>
                <div>
                  <span className="text-[#246BFF] block text-[10px] uppercase">NEXT DECISION NODE</span>
                  <span className="text-white/80 font-medium">{step.next}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Footer Bar */}
      <div className="mt-8 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full flex items-center justify-between gap-6 font-mono text-xs text-slate border-t border-white/10 pt-4">
        <span>PROGRESSION: {activeStep + 1} / 5</span>
        <div className="w-48 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] transition-all duration-300"
            style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};
