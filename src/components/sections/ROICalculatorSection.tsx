"use client";

import React, { useState } from "react";
import { ArrowRight, TrendingUp, Zap, Sparkles } from "lucide-react";

export const ROICalculatorSection: React.FC<{
  onOpenContact: () => void;
}> = ({ onOpenContact }) => {
  // Simple, intuitive inputs
  const [adSpend, setAdSpend] = useState<number>(300000);
  const [currentRoas, setCurrentRoas] = useState<number>(2.5);

  // Clear, mathematically sound projections
  const targetRoas = +(currentRoas * 1.75).toFixed(1);
  const currentMonthlyRevenue = Math.round(adSpend * currentRoas);
  const projectedMonthlyRevenue = Math.round(adSpend * targetRoas);
  const additionalRevenue = projectedMonthlyRevenue - currentMonthlyRevenue;
  const growthPercentage = Math.round(((targetRoas - currentRoas) / currentRoas) * 100);

  const formatINR = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakh`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  return (
    <section
      id="roi-calculator"
      className="relative w-full bg-[#0B0B10] text-[#F7F7F5] py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-[#246BFF] uppercase font-bold">
            <Zap className="w-3.5 h-3.5 text-[#246BFF]" />
            <span>ROI GROWTH ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            ESTIMATE YOUR SCALE POTENTIAL.
          </h2>
          <p className="text-slate text-sm sm:text-base font-light">
            Slide to your current ad spend and return. See the projected revenue lift engineered by ANOR.
          </p>
        </div>

        {/* Clean 2-Card Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Clean Sliders */}
          <div className="lg:col-span-5 bg-[#15151C] border border-white/15 p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <span className="font-mono text-xs text-white font-bold tracking-wider uppercase block pb-3 border-b border-white/10">
              01 / YOUR CURRENT METRICS
            </span>

            {/* Slider 1: Monthly Ad Spend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs text-slate uppercase">Monthly Ad Spend</label>
                <span className="font-mono text-base font-bold text-white bg-[#0B0B10] px-3 py-1 border border-white/10">
                  {formatINR(adSpend)}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={5000000}
                step={50000}
                value={adSpend}
                onChange={(e) => setAdSpend(+e.target.value)}
                className="w-full cursor-pointer accent-[#246BFF]"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate/70">
                <span>₹50K</span>
                <span>₹25 Lakh</span>
                <span>₹50 Lakh</span>
              </div>
            </div>

            {/* Slider 2: Current Blended ROAS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs text-slate uppercase">Current ROAS</label>
                <span className="font-mono text-base font-bold text-[#246BFF] bg-[#0B0B10] px-3 py-1 border border-white/10">
                  {currentRoas.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={1.0}
                max={6.0}
                step={0.1}
                value={currentRoas}
                onChange={(e) => setCurrentRoas(+e.target.value)}
                className="w-full cursor-pointer accent-[#246BFF]"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate/70">
                <span>1.0x</span>
                <span>3.5x</span>
                <span>6.0x</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate flex justify-between items-center">
              <span>Current Revenue:</span>
              <span className="text-white/80 font-bold">{formatINR(currentMonthlyRevenue)}/mo</span>
            </div>
          </div>

          {/* Right Column: High-Impact Projected Output */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#15151C] to-[#0B0B10] border border-[#246BFF]/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#246BFF]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs text-[#246BFF] font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                02 / PROJECTED SCALE WITH ANOR
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                +{growthPercentage}% ESTIMATED LIFT
              </span>
            </div>

            {/* Projected Revenue Big Number */}
            <div className="space-y-1">
              <span className="font-mono text-xs text-slate uppercase tracking-wider block">
                PROJECTED MONTHLY REVENUE
              </span>
              <div className="text-4xl sm:text-6xl font-black font-mono bg-gradient-to-r from-white via-[#E8E8EC] to-[#246BFF] bg-clip-text text-transparent">
                {formatINR(projectedMonthlyRevenue)}
              </div>
              <div className="flex items-center gap-2 pt-1 font-mono text-xs text-emerald-400 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+{formatINR(additionalRevenue)} in Net Monthly Expansion</span>
              </div>
            </div>

            {/* Comparison Metrics Pill Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-[#0B0B10] border border-white/10 space-y-1 font-mono">
                <span className="text-[10px] text-slate uppercase block">PROJECTED ROAS</span>
                <span className="text-2xl font-bold text-[#246BFF]">{targetRoas}x</span>
                <span className="text-[9px] text-white/50 block">vs current {currentRoas.toFixed(1)}x</span>
              </div>
              <div className="p-3.5 bg-[#0B0B10] border border-white/10 space-y-1 font-mono">
                <span className="text-[10px] text-slate uppercase block">TARGET CAC DROP</span>
                <span className="text-2xl font-bold text-[#E500C7]">-28%</span>
                <span className="text-[9px] text-white/50 block">via creative testing</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenContact}
                data-cursor="LET'S TALK →"
                className="w-full py-4 bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] text-white font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 group hover:shadow-[0_0_30px_rgba(36,107,255,0.4)] transition-all duration-300"
              >
                <span>ENGINEER THIS GROWTH FOR YOUR BRAND</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
