"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowUpRight, Zap, Target, Filter, RefreshCw } from "lucide-react";

export const PerformanceDashboardSection: React.FC = () => {
  const [activeDecision, setActiveDecision] = useState<"TEST" | "SCALE" | "CUT" | "LEARN">("SCALE");

  // Decision state configs
  const decisionData = {
    SCALE: {
      roas: "4.85x",
      cac: "₹1,240",
      cvr: "4.8%",
      mer: "5.60x",
      aov: "₹4,850",
      action: "RE-ALLOCATE CAPITAL (+45%) TO TOP AD SETS",
      color: "#246BFF",
      bars: [40, 65, 80, 95, 110, 140, 185],
    },
    TEST: {
      roas: "2.90x",
      cac: "₹1,850",
      cvr: "2.9%",
      mer: "3.40x",
      aov: "₹3,900",
      action: "DEPLOY 12 NEW CREATIVE HOOK VARIANTS",
      color: "#7137FF",
      bars: [30, 45, 40, 60, 55, 75, 90],
    },
    CUT: {
      roas: "1.20x",
      cac: "₹3,400",
      cvr: "1.1%",
      mer: "1.80x",
      aov: "₹2,600",
      action: "KILL NON-PERFORMING AUDIENCES & ADS",
      color: "#E500C7",
      bars: [90, 80, 60, 45, 30, 20, 15],
    },
    LEARN: {
      roas: "3.40x",
      cac: "₹1,450",
      cvr: "3.5%",
      mer: "4.10x",
      aov: "₹4,200",
      action: "EXTRACT WINNING ANGLE & SYNTHESIZE AUDIT",
      color: "#F7F7F5",
      bars: [50, 55, 60, 65, 70, 85, 100],
    },
  };

  const currentData = decisionData[activeDecision];

  return (
    <section
      id="performance"
      className="relative w-full bg-[#0B0B10] text-[#F7F7F5] py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[#246BFF]" />
            <span>05 / PERFORMANCE INTELLIGENCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white max-w-4xl">
            WE DON&apos;T OPTIMIZE FOR PRETTY DASHBOARDS.
          </h2>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] bg-clip-text text-transparent mt-2">
            WE OPTIMIZE FOR DECISIONS.
          </h2>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-[#15151C] border border-white/10 p-6 md:p-10 shadow-2xl relative">
          {/* Conceptual Disclaimer Banner */}
          <div className="mb-8 pb-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] md:text-xs text-slate">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#246BFF] animate-pulse" />
              <span>ANOR DECISION ENGINE v2.4 (CONCEPTUAL METRICS UI DEMO)</span>
            </div>
            <span>BLENDED ATTRIBUTION TELEMETRY</span>
          </div>

          {/* Decision Toggles */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-white/80 uppercase font-bold">
              SYSTEM DECISION MATRIX:
            </span>
            <div className="flex flex-wrap gap-2">
              {(["SCALE", "TEST", "CUT", "LEARN"] as const).map((dec) => (
                <button
                  key={dec}
                  onClick={() => setActiveDecision(dec)}
                  data-cursor={`DECISION: ${dec}`}
                  className={`px-5 py-2.5 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    activeDecision === dec
                      ? "bg-[#246BFF] text-white shadow-[0_0_20px_rgba(36,107,255,0.4)]"
                      : "bg-[#0B0B10] text-slate border border-white/10 hover:border-white/30"
                  }`}
                >
                  {dec}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger Banner */}
          <div className="mb-10 p-4 bg-[#0B0B10] border-l-4 border-[#246BFF] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#246BFF]" />
              <span className="font-mono text-xs md:text-sm text-white font-bold uppercase tracking-wider">
                EXECUTING ACTION: {currentData.action}
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate uppercase">
              CONFIDENCE: 98.4%
            </span>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {[
              { label: "ROAS (RETURN ON AD SPEND)", val: currentData.roas, change: "+32%" },
              { label: "BLENDED MER", val: currentData.mer, change: "+24%" },
              { label: "CAC (ACQUISITION COST)", val: currentData.cac, change: "-18%" },
              { label: "CONVERSION RATE (CVR)", val: currentData.cvr, change: "+1.2%" },
              { label: "AVERAGE ORDER VALUE", val: currentData.aov, change: "+14%" },
            ].map((metric) => (
              <div key={metric.label} className="p-5 bg-[#0B0B10] border border-white/5 space-y-2">
                <span className="block font-mono text-[9px] text-slate tracking-wider uppercase">
                  {metric.label}
                </span>
                <span className="block text-2xl md:text-3xl font-black font-mono text-white">
                  {metric.val}
                </span>
                <span className="inline-block text-[10px] font-mono font-bold text-[#246BFF]">
                  {metric.change}
                </span>
              </div>
            ))}
          </div>

          {/* Animated Growth Graph Visual */}
          <div className="p-6 bg-[#0B0B10] border border-white/5 space-y-4">
            <div className="flex justify-between items-center font-mono text-xs text-slate">
              <span>REAL-TIME PERFORMANCE COHORT TRAJECTORY</span>
              <span>7-DAY SCRUBBER</span>
            </div>

            <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
              {currentData.bars.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full transition-all duration-500 rounded-t-sm"
                    style={{
                      height: `${height}px`,
                      backgroundColor: currentData.color,
                      opacity: 0.6 + (i / 7) * 0.4,
                    }}
                  />
                  <span className="font-mono text-[9px] text-slate">D{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
