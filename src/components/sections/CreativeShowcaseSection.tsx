"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, Sparkles, Layers, ArrowUpRight } from "lucide-react";

export const CreativeShowcaseSection: React.FC = () => {
  const [selectedCreative, setSelectedCreative] = useState<number | null>(null);

  const creatives = [
    {
      id: 1,
      title: "FOUNDER TEARDOWN — UNFILTERED",
      format: "9:16 VERTICAL REEL / UGC",
      hook: "0-3s Visual Pattern Interrupt",
      angle: "Raw Radical Authenticity",
      audience: "High-Intent DTC Founders (25-45)",
      objective: "Scale Cold Acquisition ROAS",
      metric: "4.8x ROAS",
      bgGradient: "from-[#246BFF]/30 to-[#15151C]",
      image: "/images/creatives/creative-01.jpg",
    },
    {
      id: 2,
      title: "INGREDIENT TELEMETRY 3D ANIMATION",
      format: "4:5 HIGH-IMPACT CAPI MOTION",
      hook: "Micro-Explosion Product Render",
      angle: "Technical Product Superiority",
      audience: "Skincare & Wellness Buyers",
      objective: "Boost Add-To-Cart Rate (+38%)",
      metric: "5.4% CVR",
      bgGradient: "from-[#7137FF]/30 to-[#15151C]",
      image: "/images/creatives/creative-02.jpg",
    },
    {
      id: 3,
      title: "SIDE-BY-SIDE US VS STANDARD COMPARISON",
      format: "1:1 STATIC GRAPHIC & SLIDER",
      hook: "Bold High-Contrast Matrix",
      angle: "Direct Competitor Replacement",
      audience: "Mid-Funnel Switchers",
      objective: "Lower CAC (-24%)",
      metric: "₹1,120 CAC",
      bgGradient: "from-[#E500C7]/30 to-[#15151C]",
      image: "/images/creatives/creative-03.jpg",
    },
  ];

  return (
    <section
      id="creative"
      className="relative w-full bg-[#0B0B10] text-[#F7F7F5] py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[#246BFF]" />
            <span>07 / CREATIVE ENGINE</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white">
            CREATIVE IS A PERFORMANCE VARIABLE.
          </h2>
        </div>

        {/* Creative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creatives.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCreative(c.id)}
              data-cursor={`VIEW ${c.id}`}
              className={`border border-white/10 bg-gradient-to-b ${c.bgGradient} relative group cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[420px] overflow-hidden`}
            >
              {/* Badge */}
              <div className="flex justify-between items-center p-8 pb-0 relative z-10">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                  {c.format}
                </span>
                <span className="font-mono text-sm font-black text-[#246BFF]">
                  {c.metric}
                </span>
              </div>

              {/* Image Preview */}
              <div className="relative mx-8 my-6 h-48 overflow-hidden border border-white/10 group-hover:border-[#246BFF] transition-colors">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#0B0B10]/30 group-hover:bg-[#0B0B10]/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#246BFF]/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Title & Overlay Metadata */}
              <div className="p-8 pt-0">
                <h3 className="text-xl font-bold uppercase text-white tracking-tight mb-4 group-hover:text-[#246BFF] transition-colors">
                  {c.title}
                </h3>
                <div className="space-y-1.5 font-mono text-[10px] text-slate border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>HOOK:</span>
                    <span className="text-white">{c.hook}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ANGLE:</span>
                    <span className="text-white">{c.angle}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Teardown Viewer */}
        <AnimatePresence>
          {selectedCreative && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCreative(null)}
              className="fixed inset-0 z-50 bg-[#0B0B10]/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
              {(() => {
                const item = creatives.find((c) => c.id === selectedCreative);
                if (!item) return null;
                return (
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-2xl w-full bg-[#15151C] border border-[#246BFF] p-8 space-y-6 shadow-2xl"
                  >
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="font-mono text-xs text-[#246BFF] font-bold uppercase tracking-widest">
                        CREATIVE PERFORMANCE TELEMETRY
                      </span>
                      <button
                        onClick={() => setSelectedCreative(null)}
                        className="font-mono text-xs text-slate hover:text-white uppercase"
                      >
                        [CLOSE]
                      </button>
                    </div>

                    {/* Image in modal */}
                    <div className="relative h-48 w-full overflow-hidden border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="600px"
                      />
                    </div>

                    <h3 className="text-3xl font-black text-white uppercase">
                      {item.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 font-mono text-xs bg-[#0B0B10] p-4 border border-white/10">
                      <div>
                        <span className="text-slate block text-[10px]">
                          FORMAT
                        </span>
                        <span className="text-white font-bold">
                          {item.format}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate block text-[10px]">
                          HOOK PATTERN
                        </span>
                        <span className="text-white font-bold">
                          {item.hook}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate block text-[10px]">
                          PSYCHOLOGICAL ANGLE
                        </span>
                        <span className="text-white font-bold">
                          {item.angle}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate block text-[10px]">
                          TARGET AUDIENCE COHORT
                        </span>
                        <span className="text-white font-bold">
                          {item.audience}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#246BFF]/10 border border-[#246BFF]/30 font-mono text-xs flex justify-between items-center">
                      <span>VERIFIED PERFORMANCE OUTCOME:</span>
                      <span className="text-lg font-black text-[#246BFF]">
                        {item.metric}
                      </span>
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
