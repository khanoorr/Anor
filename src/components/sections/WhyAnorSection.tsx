"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Zap, ShieldCheck } from "lucide-react";

export const WhyAnorSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Entry animations from different directions
      gsap.fromTo(
        ".principle-left",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".principle-center",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".principle-right",
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 70%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-anor"
      ref={containerRef}
      className="relative w-full bg-[#0B0B10] text-[#F7F7F5] py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[#246BFF]" />
            <span>09 / CORE PRINCIPLES</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white max-w-4xl">
            NOT MORE MARKETING.
          </h2>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] bg-clip-text text-transparent mt-2">
            BETTER MARKETING SYSTEMS.
          </h2>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Principle 1: PRECISION */}
          <div className="principle-left p-8 bg-[#15151C] border border-white/10 flex flex-col justify-between min-h-[380px] hover:border-[#246BFF] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-6">
                <Target className="w-8 h-8 text-[#246BFF]" />
                <span className="font-mono text-xs font-bold text-slate">01</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                PRECISION
              </h3>
              <p className="text-lg text-slate font-light leading-relaxed">
                We eliminate noise by design. Every campaign targets the highest-intent cohorts only — zero vanity metrics, zero budget burning on audiences that don&apos;t convert.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 font-mono text-xs text-[#246BFF] font-bold">
              ZERO NOISE. 100% INTENT.
            </div>
          </div>

          {/* Principle 2: SPEED */}
          <div className="principle-center p-8 bg-[#15151C] border border-white/10 flex flex-col justify-between min-h-[380px] hover:border-[#7137FF] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-6">
                <Zap className="w-8 h-8 text-[#7137FF]" />
                <span className="font-mono text-xs font-bold text-slate">02</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                SPEED
              </h3>
              <p className="text-lg text-slate font-light leading-relaxed">
                7-day sprint cycles, every week. We turn hypotheses into verified results faster than most agencies finish a strategy deck.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 font-mono text-xs text-[#7137FF] font-bold">
              7-DAY HYPOTHESIS SPRINT CYCLES.
            </div>
          </div>

          {/* Principle 3: ACCOUNTABILITY */}
          <div className="principle-right p-8 bg-[#15151C] border border-white/10 flex flex-col justify-between min-h-[380px] hover:border-[#E500C7] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#E500C7]" />
                <span className="font-mono text-xs font-bold text-slate">03</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                ACCOUNTABILITY
              </h3>
              <p className="text-lg text-slate font-light leading-relaxed">
                Every decision ties to blended MER and real bottom-line revenue — not platform ROAS, not impressions, not reach. Just growth.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 font-mono text-xs text-[#E500C7] font-bold">
              BLENDED MER & REVENUE ATTACHED.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
