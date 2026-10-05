"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AnorLogo } from "../ui/AnorLogo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FinalCTASectionProps {
  onOpenContact: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const ctx = gsap.context(() => {
      // Expanding gradient behind logo on scroll to bottom
      ScrollTrigger.create({
        trigger: container,
        start: "top 60%",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(glow, {
            scale: 0.8 + progress * 0.8,
            opacity: 0.15 + progress * 0.35,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0B0B10] text-[#F7F7F5] py-32 px-6 md:px-12 lg:px-20 flex flex-col justify-between overflow-hidden border-t border-white/10"
    >
      {/* Background Expanding Signature Gradient Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#246BFF]/20 via-[#7137FF]/20 to-[#E500C7]/20 rounded-full blur-[150px] pointer-events-none transition-all duration-300"
      />

      <div className="max-w-7xl mx-auto w-full my-auto text-center relative z-10 space-y-10">
        <span className="font-mono text-xs md:text-sm tracking-[0.4em] text-[#246BFF] uppercase font-bold">
          12 / INITIATE CONVERSATION
        </span>

        <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight text-white max-w-5xl mx-auto leading-[0.88]">
          READY TO ENGINEER WHAT&apos;S NEXT?
        </h2>

        <p className="text-xl md:text-3xl text-slate font-light max-w-2xl mx-auto">
          Stop running campaigns. Start building a system that compounds.
        </p>

        <div className="pt-6">
          <button
            onClick={onOpenContact}
            data-cursor="LET'S TALK →"
            className="px-10 py-5 bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] text-white font-bold text-sm md:text-base tracking-widest uppercase inline-flex items-center gap-3 group hover:shadow-[0_0_40px_rgba(36,107,255,0.5)] transition-all duration-300"
          >
            <span>LET&apos;S TALK</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Massive ANOR Logo Footer Graphic */}
      <div className="max-w-7xl mx-auto w-full pt-20 relative z-10 flex flex-col items-center">
        <AnorLogo className="w-full max-w-3xl h-auto" showTagline={true} />
      </div>
    </section>
  );
};
