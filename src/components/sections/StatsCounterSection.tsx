"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, TrendingUp, Banknote, Users } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
}

export const StatsCounterSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const stats: StatItem[] = [
    {
      value: 250,
      suffix: "+",
      prefix: "",
      label: "CAMPAIGNS",
      sublabel: "ENGINEERED & DEPLOYED",
      icon: Rocket,
      color: "#246BFF",
    },
    {
      value: 4.5,
      suffix: "x",
      prefix: "",
      label: "AVG. CLIENT ROAS",
      sublabel: "BLENDED RETURN ON AD SPEND",
      icon: TrendingUp,
      color: "#7137FF",
    },
    {
      value: 12,
      suffix: "Cr+",
      prefix: "₹",
      label: "AD SPEND MANAGED",
      sublabel: "TOTAL CAPITAL DEPLOYED",
      icon: Banknote,
      color: "#E500C7",
    },
    {
      value: 98,
      suffix: "%",
      prefix: "",
      label: "CLIENT RETENTION",
      sublabel: "LONG-TERM PARTNERSHIPS",
      icon: Users,
      color: "#246BFF",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

      // CountUp animation for each number
      numberRefs.current.forEach((el, idx) => {
        if (!el) return;

        const stat = stats[idx];
        const isDecimal = stat.value % 1 !== 0;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
          },
          onUpdate: () => {
            if (el) {
              el.textContent = isDecimal
                ? obj.val.toFixed(1)
                : Math.floor(obj.val).toString();
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0B0B10] text-[#F7F7F5] py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-b border-white/10"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(36,107,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[#246BFF] animate-pulse" />
            <span>VERIFIED PERFORMANCE METRICS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
            NUMBERS DON&apos;T LIE.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-card p-6 md:p-8 bg-[#15151C] border border-white/10 hover:border-white/25 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Top gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  }}
                />

                <div className="flex items-center justify-between mb-6">
                  <Icon
                    className="w-6 h-6 md:w-7 md:h-7 transition-colors"
                    style={{ color: stat.color }}
                  />
                  <span className="font-mono text-[10px] text-slate tracking-widest">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Animated Number */}
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black font-mono text-white tracking-tighter">
                    {stat.prefix}
                    <span
                      ref={(el) => {
                        numberRefs.current[idx] = el;
                      }}
                    >
                      0
                    </span>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <div className="space-y-1 pt-4 border-t border-white/10">
                  <span className="block font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="block font-mono text-[9px] text-slate uppercase tracking-widest">
                    {stat.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
