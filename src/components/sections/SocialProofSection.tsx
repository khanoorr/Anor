"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Brand logo data (text-based SVG logos)
const brands = [
  "NUTRABAY",
  "MINIMALIST",
  "MMAMAEARTH",
  "BEWAKOOF",
  "PLIX LIFE",
  "BOMBAY SHAVING CO.",
  "OZIVA",
  "THE MAN COMPANY",
  "BOLDFIT",
  "PILGRIM",
];

const testimonials = [
  {
    quote:
      "We had tried three agencies before ANOR. None of them touched our attribution setup or challenged our offer structure. ANOR overhauled both in week one — we went from ₹9L to ₹24L/mo in 90 days at a 4.1x blended MER.",
    name: "ARJUN MEHTA",
    title: "Founder & CEO",
    brand: "PLIX LIFE",
    stars: 5,
    metric: "+166% Revenue in 90 Days",
  },
  {
    quote:
      "The experimentation velocity alone is worth it. 30+ creative hooks tested in month one. Three winners isolated. Our CAC dropped 32% without touching ad spend. I&apos;ve never seen a team operate with this level of structure.",
    name: "PRIYA SHARMA",
    title: "Head of Growth",
    brand: "MINIMALIST",
    stars: 5,
    metric: "-32% CAC",
  },
  {
    quote:
      "Before ANOR, we were flying blind — platform ROAS looked great but margins were tightening every month. Their server-side attribution stack finally showed us what was actually working. We reallocated budget and immediately saw the difference.",
    name: "ROHAN KAPOOR",
    title: "CMO",
    brand: "BOLDFIT",
    stars: 5,
    metric: "Full Attribution Clarity",
  },
  {
    quote:
      "Most agencies show you impressions and CPMs. ANOR shows you CAC payback curves, LTV cohort splits, and blended MER. It&apos;s like having a growth engineering team embedded full-time in your brand — without the full-time cost.",
    name: "SANYA REDDY",
    title: "Co-Founder",
    brand: "OZIVA",
    stars: 5,
    metric: "4.8x Blended ROAS",
  },
];

export const SocialProofSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  // Scroll entrance animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".social-proof-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 75%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setAutoPlay(false);
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setAutoPlay(false);
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeIdx];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#15151C] text-[#F7F7F5] py-28 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="social-proof-anim text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[#246BFF]" />
            <span>TRUSTED BY AMBITIOUS BRANDS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
            BRANDS WE&apos;VE SCALED.
          </h2>
        </div>

        {/* Infinite Logo Marquee */}
        <div className="social-proof-anim mb-20 space-y-4">
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#15151C] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#15151C] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-left">
              {[...brands, ...brands].map((brand, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="shrink-0 mx-6 px-8 py-4 border border-white/10 bg-[#0B0B10]/50 flex items-center justify-center min-w-[180px] group hover:border-[#246BFF]/40 transition-colors"
                >
                  <span className="font-mono text-xs md:text-sm font-bold text-white/40 tracking-widest uppercase group-hover:text-white/80 transition-colors whitespace-nowrap">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#15151C] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#15151C] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-right">
              {[...brands.slice().reverse(), ...brands.slice().reverse()].map(
                (brand, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="shrink-0 mx-6 px-8 py-4 border border-white/10 bg-[#0B0B10]/50 flex items-center justify-center min-w-[180px] group hover:border-[#7137FF]/40 transition-colors"
                  >
                    <span className="font-mono text-xs md:text-sm font-bold text-white/40 tracking-widest uppercase group-hover:text-white/80 transition-colors whitespace-nowrap">
                      {brand}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="social-proof-anim">
          <div className="bg-[#0B0B10] border border-white/10 p-8 md:p-14 relative">
            {/* Large Quote Mark */}
            <Quote className="w-12 h-12 md:w-16 md:h-16 text-[#246BFF]/20 absolute top-6 left-6 md:top-10 md:left-10" />

            {/* Testimonial Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: current.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#246BFF] text-[#246BFF]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-2xl lg:text-3xl text-white font-light leading-relaxed tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <div className="text-center sm:text-left">
                  <span className="block font-mono text-sm font-bold text-white">
                    {current.name}
                  </span>
                  <span className="block font-mono text-xs text-slate">
                    {current.title}, {current.brand}
                  </span>
                </div>
                <span className="px-4 py-1.5 bg-[#246BFF]/10 text-[#246BFF] font-mono text-xs font-bold tracking-wider">
                  {current.metric}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-white/10 hover:border-white/30 flex items-center justify-center text-slate hover:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIdx(idx);
                      setAutoPlay(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIdx
                        ? "bg-[#246BFF] w-6 rounded-full"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 border border-white/10 hover:border-white/30 flex items-center justify-center text-slate hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
