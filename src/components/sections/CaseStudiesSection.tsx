"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  id: string;
  category: string;
  clientType: string;
  timeline: string;
  challenge: string;
  approach: string;
  result: string;
  tags: string[];
  image: string;
  metrics: { label: string; val: string }[];
  deepDive: {
    problemStatement: string;
    strategyDeployed: string[];
    coreWinningAngle: string;
  };
}

export const CaseStudiesSection: React.FC<{ onOpenContact?: () => void }> = ({ onOpenContact }) => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const projects: CaseStudy[] = [
    {
      id: "PROJECT 01",
      category: "DTC CONSUMER BRAND",
      clientType: "Direct-To-Consumer Wellness & Nutrition",
      timeline: "90-Day Sprint",
      challenge:
        "Scaling past $250k/mo plateau while maintaining 3.5x blended ROAS amidst rising CPMs.",
      approach:
        "Engineered 30+ UGC hook variants & deployed bespoke Next.js quiz landing page to capture high-intent buyers.",
      result: "+145% Revenue Scale | 4.2x MER Maintained",
      tags: ["META ADS", "QUIZ LANDER", "CAPI TELEMETRY"],
      image: "/images/case-studies/project-01.jpg",
      metrics: [
        { label: "REVENUE GROWTH", val: "+145%" },
        { label: "BLENDED MER", val: "4.2x" },
        { label: "QUIZ CVR", val: "6.8%" },
      ],
      deepDive: {
        problemStatement:
          "The brand had saturated traditional static catalog ads, driving blended CAC to unsustainable levels ($48 CAC against a $65 AOV).",
        strategyDeployed: [
          "Restructured Meta ad account from 24 fragmented ad sets into 3 consolidated CBO campaigns.",
          "Produced 32 TikTok-native creator hooks focusing on 'problem-first' founder origin narratives.",
          "Built a headless Next.js personalized quiz storefront reducing cart abandonment by 34%.",
        ],
        coreWinningAngle:
          "Founder teardown comparison showing why standard marketplace formulations lack bio-availability.",
      },
    },
    {
      id: "PROJECT 02",
      category: "E-COMMERCE BRAND",
      clientType: "D2C Clean Skincare & Beauty",
      timeline: "60-Day Sprint",
      challenge:
        "High customer acquisition costs (CAC) due to creative fatigue on Meta and low repeat purchase rates.",
      approach:
        "Restructured ad account around high-intent product comparison angles and post-purchase upsells.",
      result: "-32% CAC Reduction | +40% AOV Expansion",
      tags: ["GOOGLE SEARCH", "CRO & OFFER DESIGN", "HYPOTHESIS SPRINTS"],
      image: "/images/case-studies/project-02.jpg",
      metrics: [
        { label: "CAC REDUCTION", val: "-32%" },
        { label: "AOV EXPANSION", val: "+40%" },
        { label: "REPEAT RATE", val: "28%" },
      ],
      deepDive: {
        problemStatement:
          "High reliance on single-product hero ads without bundle upsell mechanics caused severe margin squeeze.",
        strategyDeployed: [
          "Introduced a dynamic 3-tiered bundling offer ('Build Your Regimen') yielding immediate AOV lift.",
          "Deployed high-intent Google Search campaigns capturing competitor switcher keywords.",
          "Implemented automated post-purchase SMS and Klaviyo retention flows based on skin-type quizzes.",
        ],
        coreWinningAngle:
          "Scientific ingredient teardown matrix highlighting active percentages vs retail store competitors.",
      },
    },
    {
      id: "PROJECT 03",
      category: "DIGITAL-FIRST BRAND",
      clientType: "Subscription Consumer Tech",
      timeline: "120-Day Sprint",
      challenge:
        "Inaccurate platform attribution masking true channel incrementality and leading to wasted ad capital.",
      approach:
        "Implemented PostHog server CAPI, incrementality holdouts, and blended MER target rules.",
      result: "100% Attribution Telemetry | +85% Capital Efficiency",
      tags: ["INCREMENTALITY", "SERVER CAPI", "GROWTH ENGINE"],
      image: "/images/case-studies/project-03.jpg",
      metrics: [
        { label: "ATTRIBUTION MATCH", val: "99.4%" },
        { label: "CAPITAL EFFICIENCY", val: "+85%" },
        { label: "LTV:CAC RATIO", val: "4.8x" },
      ],
      deepDive: {
        problemStatement:
          "Platform reporting claimed a 5.2x ROAS while bank balance showed declining cash flow due to duplicate attribution.",
        strategyDeployed: [
          "Deployed server-side CAPI pipeline via PostHog container directly to Meta & Google APIs.",
          "Conducted geographic incrementality holdout tests to isolate net-new organic conversions.",
          "Created an automated capital re-allocation script shifting daily budget toward high-LTV cohorts.",
        ],
        coreWinningAngle:
          "First-party telemetry dashboard connecting ad click data to 90-day stripe renewal cohorts.",
      },
    },
  ];

  return (
    <section
      id="work"
      className="relative w-full bg-[#15151C] text-[#F7F7F5] py-28 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-[#246BFF]" />
              <span>10 / PROVEN ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
              CASE STUDY ARCHITECTURE.
            </h2>
          </div>
          <span className="font-mono text-xs text-slate uppercase">
            CLICK ANY CASE STUDY TO INSPECT STRATEGY &rarr;
          </span>
        </div>

        {/* Projects Cards Grid */}
        <div className="space-y-8">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedStudy(p)}
              data-cursor="INSPECT STRATEGY"
              className="p-6 md:p-10 bg-[#0B0B10] border border-white/10 hover:border-[#246BFF] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer"
            >
              {/* Media Visual */}
              <div className="lg:col-span-5 h-60 md:h-72 relative overflow-hidden border border-white/10 group-hover:border-[#246BFF] transition-colors">
                <Image
                  src={p.image}
                  alt={`${p.category} — ${p.id}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center z-10">
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {p.category}
                  </span>
                  <span className="px-2 py-0.5 bg-[#246BFF] text-white font-mono text-[9px] font-bold uppercase">
                    VIEW AUDIT
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-[#246BFF]">
                    {p.id} &bull; {p.timeline}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[9px] text-slate uppercase font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight group-hover:text-[#246BFF] transition-colors flex items-center justify-between">
                  <span>{p.clientType}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate group-hover:text-[#246BFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>

                <p className="text-slate text-sm font-light leading-relaxed">
                  {p.challenge}
                </p>

                {/* Metrics Pill Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 bg-[#15151C] border border-white/5 font-mono">
                      <span className="text-[9px] text-slate uppercase block">{m.label}</span>
                      <span className="text-base sm:text-lg font-bold text-white">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Teardown Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudy(null)}
            className="fixed inset-0 z-[9990] bg-[#0B0B10]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#15151C] border border-[#246BFF] p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs text-[#246BFF] font-bold uppercase tracking-widest block mb-1">
                    {selectedStudy.id} &bull; {selectedStudy.timeline}
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase">
                    {selectedStudy.clientType}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedStudy(null)}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-slate hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Verified Result Banner */}
              <div className="p-4 bg-[#246BFF]/10 border border-[#246BFF]/30 flex justify-between items-center font-mono text-xs">
                <span className="text-slate uppercase">VERIFIED SYSTEM RESULT:</span>
                <span className="text-[#246BFF] font-bold text-sm sm:text-base">
                  {selectedStudy.result}
                </span>
              </div>

              {/* Problem Analysis */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-white font-bold uppercase tracking-wider block">
                  01 / BOTTLENECK ANALYSIS
                </span>
                <p className="text-sm text-slate leading-relaxed font-light bg-[#0B0B10] p-4 border border-white/5">
                  {selectedStudy.deepDive.problemStatement}
                </p>
              </div>

              {/* Strategy Deployed */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-white font-bold uppercase tracking-wider block">
                  02 / ARCHITECTURAL PLAYBOOK DEPLOYED
                </span>
                <div className="space-y-2">
                  {selectedStudy.deepDive.strategyDeployed.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E8E8EC] font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#246BFF] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Winning Creative Angle */}
              <div className="p-4 bg-[#0B0B10] border-l-2 border-[#7137FF] space-y-1">
                <span className="font-mono text-[10px] text-[#7137FF] font-bold uppercase tracking-widest block">
                  CORE WINNING CREATIVE HOOK
                </span>
                <p className="text-xs sm:text-sm text-white font-medium">
                  &ldquo;{selectedStudy.deepDive.coreWinningAngle}&rdquo;
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate">ANOR GROWTH INTELLIGENCE ARCHIVE</span>
                <button
                  onClick={() => {
                    setSelectedStudy(null);
                    if (onOpenContact) onOpenContact();
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#246BFF] to-[#7137FF] text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  ENGINEER SIMILAR RESULTS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
