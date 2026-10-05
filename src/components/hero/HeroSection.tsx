"use client";

import React, { useEffect, useRef } from "react";
import { HeroWebGL } from "./HeroWebGL";
import { ArrowRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroSectionProps {
  onOpenContact: () => void;
  preloaderFinished: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  preloaderFinished,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const title3Ref = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Hero Load Animation Timeline
      if (preloaderFinished) {
        const tl = gsap.timeline();

        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power3.out" }
        );

        tl.fromTo(
          [title1Ref.current, title2Ref.current, title3Ref.current],
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.3"
        );

        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );

        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.3"
        );

        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );
      }

      // Scroll Trigger Parallax & Seamless Transition to Section 02
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // Push typography up and fade out
          if (title1Ref.current && title2Ref.current && title3Ref.current) {
            gsap.set([title1Ref.current, title2Ref.current, title3Ref.current], {
              y: -progress * 150,
              opacity: 1 - progress * 1.2,
            });
          }

          if (descRef.current && ctaRef.current) {
            gsap.set([descRef.current, ctaRef.current], {
              y: -progress * 80,
              opacity: 1 - progress * 1.5,
            });
          }
        },
      });

      return () => st.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [preloaderFinished]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0B0B10] text-[#F7F7F5] flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* WebGL Growth Network Background */}
      <HeroWebGL />

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-3 mb-6 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold"
        >
          <span className="w-2 h-2 rounded-full bg-[#246BFF] animate-ping" />
          <span>PERFORMANCE-FIRST GROWTH ENGINE</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-0 select-none tracking-tighter">
          <h1
            ref={title1Ref}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase leading-[0.85] text-white"
          >
            ENGINEERED
          </h1>
          <h1
            ref={title2Ref}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase leading-[0.85] text-white/40"
          >
            FOR
          </h1>
          <h1
            ref={title3Ref}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase leading-[0.85] bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow"
          >
            GROWTH.
          </h1>
        </div>

        {/* Supporting text & CTAs */}
        <div className="mt-12 md:mt-16 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <p
            ref={descRef}
            className="max-w-xl text-lg md:text-2xl text-[#E8E8EC]/80 font-light leading-relaxed tracking-tight"
          >
            We don&apos;t run campaigns. We engineer growth systems — built to learn, optimised to compound, and designed to scale.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenContact}
              data-cursor="LET'S TALK →"
              className="px-8 py-4 bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] text-white font-bold text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-3 group hover:shadow-[0_0_35px_rgba(36,107,255,0.4)] transition-all duration-300"
            >
              <span>START A CONVERSATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <a
              href="#problem"
              data-cursor="EXPLORE"
              className="px-8 py-4 bg-white/5 border border-white/10 hover:border-white/30 text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300"
            >
              <span>EXPLORE APPROACH</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#246BFF]" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator footer */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-12 border-t border-white/10 font-mono text-[10px] md:text-xs text-[#73737D] uppercase tracking-widest"
      >
        <div className="flex items-center gap-4">
          <span>LATENCY: 0.12ms</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">DATA-DRIVEN SYSTEMS</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <span>SCROLL TO SYSTEM DISCOVERY</span>
          <ArrowDown className="w-3 h-3 animate-bounce text-[#246BFF]" />
        </div>
      </div>
    </section>
  );
};
