"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ProblemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [transformed, setTransformed] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Reveal headline text smoothly when entering viewport
      gsap.fromTo(
        ".problem-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

      // Snappy 250ms delay for immediate morph transition
      let timer: NodeJS.Timeout;

      ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        onEnter: () => {
          timer = setTimeout(() => {
            setTransformed(true);

            if (wordRef.current) {
              gsap.fromTo(
                wordRef.current,
                { opacity: 0, scale: 0.92, filter: "blur(3px)" },
                {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.45,
                  ease: "power3.out",
                }
              );
            }
          }, 250); // Ultra-fast 250ms delay
        },
        onLeaveBack: () => {
          clearTimeout(timer);
          setTransformed(false);
        },
      });

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F7F7F5] text-[#0B0B10] py-32 px-6 md:px-12 lg:px-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header Tag */}
        <div className="problem-reveal flex items-center gap-3 mb-10 font-mono text-xs md:text-sm tracking-[0.35em] text-[#73737D] uppercase font-bold">
          <span className="w-2 h-2 rounded-full bg-[#0B0B10]" />
          <span>02 / DISCOVERY</span>
        </div>

        {/* Large Typography */}
        <div className="space-y-2 font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9]">
          <div className="problem-reveal">GROWTH</div>
          <div className="problem-reveal">SHOULDN&apos;T</div>
          <div className="problem-reveal flex flex-wrap items-center gap-x-6">
            <span>BE</span>
            <span
              ref={wordRef}
              className={`inline-block transition-all duration-500 ${
                transformed
                  ? "bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] bg-clip-text text-transparent underline decoration-[#246BFF] decoration-wavy"
                  : "text-[#0B0B10]/40 line-through decoration-red-500 decoration-4"
              }`}
            >
              {transformed ? "A SYSTEM." : "GUESSWORK."}
            </span>
          </div>
        </div>

        {/* Subtext */}
        <div className="problem-reveal mt-16 pt-12 border-t border-[#0B0B10]/15 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <p className="text-xl md:text-3xl text-[#15151C] font-light leading-snug">
            Most agencies hand you weekly reports, monthly decks, and vanity metrics. They call it strategy. Your revenue calls it noise.
          </p>
          <p className="text-lg md:text-2xl text-[#246BFF] font-medium leading-snug">
            ANOR wires your entire acquisition engine into one unified system — where every signal informs the next decision, and every rupee compounds.
          </p>
        </div>
      </div>
    </section>
  );
};
