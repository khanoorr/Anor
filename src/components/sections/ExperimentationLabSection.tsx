"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, XCircle, FlaskConical, TrendingUp, Sparkles } from "lucide-react";

export const ExperimentationLabSection: React.FC = () => {
  const [activeExp, setActiveExp] = useState(0);

  const sprints = [
    {
      id: "SPRINT 01",
      name: "CREATIVE HOOK ARCHITECTURE",
      channel: "META & TIKTOK ADS",
      winnerRoas: "4.85x",
      roasUplift: "+125%",
      cvrUplift: "+48%",
      hypothesis:
        "Raw UGC founder teardown video outperforms polished studio 3D render on cold acquisition cohorts.",
      variantA: {
        label: "VARIANT A: FOUNDER GARAGE TEARDOWN",
        type: "UGC / RAW AUTHENTIC",
        hook: "We built this after wasting $50k on bad agencies...",
        cvr: "4.95%",
        roas: "4.85x",
        isWinner: true,
      },
      variantB: {
        label: "VARIANT B: 3D STUDIO RENDER",
        type: "HIGH PRODUCTION 3D",
        hook: "Engineered with precision for peak output...",
        cvr: "2.10%",
        roas: "2.15x",
        isWinner: false,
      },
      takeaway: "SCALE VARIANT A WITH 4 NEW UGC ANGLE CUTS (+40% BUDGET)",
    },
    {
      id: "SPRINT 02",
      name: "LANDING PAGE CRO ARCHITECTURE",
      channel: "DIRECT STOREFRONT",
      winnerRoas: "5.40x",
      roasUplift: "+80%",
      cvrUplift: "+68%",
      hypothesis:
        "Feature comparison matrix directly in the hero fold reduces bounce rate vs full-screen video background.",
      variantA: {
        label: "VARIANT A: COMPARISON MATRIX HERO",
        type: "CRO LANDER",
        hook: "Us vs Standard Agencies side-by-side table",
        cvr: "5.40%",
        roas: "5.10x",
        isWinner: true,
      },
      variantB: {
        label: "VARIANT B: FULLSCREEN VIDEO HERO",
        type: "CINEMATIC BRAND",
        hook: "Cinematic montage of growth statistics",
        cvr: "3.20%",
        roas: "3.00x",
        isWinner: false,
      },
      takeaway: "DEPLOY COMPARISON MATRIX ACROSS ALL SEARCH ADS TRAFFIC",
    },
  ];

  const current = sprints[activeExp];

  return (
    <section
      id="experimentation"
      className="relative w-full bg-[#111117] text-[#F7F7F5] py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3 font-mono text-xs tracking-[0.25em] text-[#246BFF] uppercase font-bold">
              <FlaskConical className="w-4 h-4 text-[#246BFF]" />
              <span>06 / EXPERIMENTATION LABORATORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              RAPID A/B TESTING ENGINE.
            </h2>
            <p className="mt-2 text-slate text-sm sm:text-base font-light max-w-xl">
              We validate hypotheses every 7 days using statistical rigor — killing losers and scaling winners.
            </p>
          </div>

          {/* Clean Pill Toggle */}
          <div className="flex items-center gap-2 p-1.5 bg-[#0B0B10] border border-white/10 rounded-none shrink-0">
            {sprints.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveExp(idx)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-all duration-200 ${
                  activeExp === idx
                    ? "bg-[#246BFF] text-white shadow-[0_0_15px_rgba(36,107,255,0.4)]"
                    : "text-slate hover:text-white"
                }`}
              >
                {s.name.split(" ")[0]} TEST
              </button>
            ))}
          </div>
        </div>

        {/* Clean Unified Testing Card */}
        <div className="bg-[#0B0B10] border border-white/15 p-6 md:p-8 space-y-6">
          {/* Top Bar: Hypothesis + Uplift Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#246BFF] font-bold uppercase tracking-widest block">
                WORKING HYPOTHESIS &bull; {current.channel}
              </span>
              <p className="text-base sm:text-lg font-medium text-white max-w-2xl">
                &ldquo;{current.hypothesis}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 font-mono">
              <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>ROAS {current.roasUplift}</span>
              </div>
              <div className="px-3 py-1.5 bg-[#246BFF]/10 border border-[#246BFF]/30 text-[#246BFF] text-xs font-bold">
                <span>CVR {current.cvrUplift}</span>
              </div>
            </div>
          </div>

          {/* Clean Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Winner Card */}
            <div className="p-5 sm:p-6 bg-[#15151C] border-2 border-[#246BFF] relative flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-[#246BFF] text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                  WINNER
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>SCALED (+{current.winnerRoas})</span>
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-1">
                  {current.variantA.label}
                </h4>
                <p className="text-xs font-mono text-slate mb-4">
                  HOOK: &ldquo;{current.variantA.hook}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-slate block text-[10px] uppercase">CONVERSION RATE</span>
                  <span className="text-xl font-bold text-white">{current.variantA.cvr}</span>
                </div>
                <div>
                  <span className="text-slate block text-[10px] uppercase">ROAS</span>
                  <span className="text-xl font-bold text-[#246BFF]">{current.variantA.roas}</span>
                </div>
              </div>
            </div>

            {/* Loser Card */}
            <div className="p-5 sm:p-6 bg-[#15151C]/60 border border-white/10 relative flex flex-col justify-between space-y-4 opacity-70 hover:opacity-90 transition-opacity">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-white/10 text-slate font-mono text-[10px] font-bold tracking-wider uppercase">
                  CONTROL
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-red-400">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>KILLED</span>
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white/80 uppercase tracking-tight mb-1">
                  {current.variantB.label}
                </h4>
                <p className="text-xs font-mono text-slate mb-4">
                  HOOK: &ldquo;{current.variantB.hook}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-slate block text-[10px] uppercase">CONVERSION RATE</span>
                  <span className="text-xl font-bold text-white/60">{current.variantB.cvr}</span>
                </div>
                <div>
                  <span className="text-slate block text-[10px] uppercase">ROAS</span>
                  <span className="text-xl font-bold text-white/60">{current.variantB.roas}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Takeaway Bar */}
          <div className="p-4 bg-[#246BFF]/10 border border-[#246BFF]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#246BFF] shrink-0" />
              <span className="text-white font-bold uppercase tracking-wider">
                SYSTEM DECISION: {current.takeaway}
              </span>
            </div>
            <span className="text-[#246BFF] font-bold shrink-0">
              CONFIDENCE: 99.4% &bull; STAT-SIG REACHED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
