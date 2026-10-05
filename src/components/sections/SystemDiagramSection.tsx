"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, FlaskConical, BarChart3, Repeat } from "lucide-react";
import { motion } from "framer-motion";

export const SystemDiagramSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const stages = [
    {
      id: "01",
      name: "STRATEGY",
      icon: Cpu,
      tag: "PHASE 01 — INTENT & ALLOCATION",
      desc: "Architecting high-intent channel allocation, audience telemetry, unit economics targets, and creative angle blueprints.",
      metrics: ["LTV:CAC Target > 4.0x", "Channel Diversification Matrix", "Creative Angle Blueprints"],
      nodePos: { x: 300, y: 70 },
      gradient: "from-[#246BFF] to-[#7137FF]",
    },
    {
      id: "02",
      name: "EXPERIMENTATION",
      icon: FlaskConical,
      tag: "PHASE 02 — RAPID TESTING SPRINT",
      desc: "Continuous rapid multi-variant testing across creative hooks, UGC concepts, landing pages, and offer combinations.",
      metrics: ["30+ Creative Tests / Month", "Hook Rate > 35%", "Multivariate Lander Testing"],
      nodePos: { x: 530, y: 300 },
      gradient: "from-[#7137FF] to-[#E500C7]",
    },
    {
      id: "03",
      name: "MEASUREMENT",
      icon: BarChart3,
      tag: "PHASE 03 — TELEMETRY & ATTRIBUTION",
      desc: "First-party telemetry, blended MER attribution modeling, incrementality holdouts, and PostHog/GA4 server-side CAPI.",
      metrics: ["First-Party Telemetry", "Incrementality Holdouts", "Blended MER Tracking"],
      nodePos: { x: 300, y: 530 },
      gradient: "from-[#E500C7] to-[#246BFF]",
    },
    {
      id: "04",
      name: "OPTIMIZATION",
      icon: Repeat,
      tag: "PHASE 04 — RE-ALLOCATION & SCALE",
      desc: "Re-allocating capital towards winning cohorts, eliminating fatigue, enforcing automated rules, and scaling ROI.",
      metrics: ["Dynamic Capital Re-Allocation", "Bid Strategy Rules", "Cohort LTV Expansion"],
      nodePos: { x: 70, y: 300 },
      gradient: "from-[#246BFF] to-[#E500C7]",
    },
  ];

  // Auto-rotate stages every 4 seconds unless hovered/clicked
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoRotate, stages.length]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Reveal headline on scroll
      gsap.fromTo(
        ".system-header-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentStage = stages[activeStage];

  return (
    <section
      id="system"
      ref={containerRef}
      className="relative w-full bg-[#0B0B10] text-[#F7F7F5] py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#246BFF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="system-header-anim flex items-center gap-3 mb-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-[#246BFF] animate-pulse" />
              <span>03 / ARCHITECTURE & SYSTEM ENGINE</span>
            </div>
            <h2 className="system-header-anim text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
              THE SYSTEM BEHIND THE GROWTH.
            </h2>
          </div>

          <div className="system-header-anim flex items-center gap-3 font-mono text-xs text-slate uppercase tracking-widest">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="px-3 py-1.5 border border-white/10 hover:border-white/30 text-white/80 transition-colors"
            >
              {autoRotate ? "AUTO-LOOP: ON" : "AUTO-LOOP: PAUSED"}
            </button>
            <span className="text-[#246BFF] font-bold">
              {currentStage.id} / 04
            </span>
          </div>
        </div>

        {/* System Diagram Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Stage Cards */}
          <div className="lg:col-span-5 space-y-4">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    setActiveStage(idx);
                    setAutoRotate(false);
                  }}
                  onMouseEnter={() => setAutoRotate(false)}
                  data-cursor={`STAGE ${stage.id}`}
                  className={`p-6 border transition-colors duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[200px] ${
                    isActive
                      ? "bg-[#15151C] border-[#246BFF] shadow-[0_0_35px_rgba(36,107,255,0.2)]"
                      : "bg-[#0B0B10]/60 border-white/10 hover:border-white/25"
                  }`}
                >
                  {/* Accent Line on Active */}
                  {isActive && (
                    <motion.div
                      layoutId="active-stage-bar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#246BFF] via-[#7137FF] to-[#E500C7]"
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <motion.span
                          animate={{ color: isActive ? "#246BFF" : "#73737D" }}
                          transition={{ duration: 0.25 }}
                          className="font-mono text-xs font-bold"
                        >
                          {stage.id}
                        </motion.span>
                        <h3
                          className={`text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                            isActive ? "text-white" : "text-white/60"
                          }`}
                        >
                          {stage.name}
                        </h3>
                      </div>
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? "text-[#246BFF]" : "text-slate"
                        }`}
                      />
                    </div>

                    <p className="text-xs text-slate leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Metrics — framer-motion y+fade, always in DOM so no height shift */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 6,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="pt-3 mt-3 border-t border-white/10 flex flex-wrap gap-2"
                  >
                    {stage.metrics.map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-1 bg-[#246BFF]/10 text-[#246BFF] font-mono text-[9px] uppercase font-bold tracking-wider"
                      >
                        {m}
                      </span>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Interactive SVG Visual Diagram */}
          <div className="lg:col-span-7 relative flex items-center justify-center p-6 md:p-10 border border-white/10 bg-[#15151C]/40 backdrop-blur-md min-h-[480px] overflow-hidden">
            <svg
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-w-[500px] select-none"
            >
              <defs>
                <linearGradient id="central-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#246BFF" />
                  <stop offset="50%" stopColor="#7137FF" />
                  <stop offset="100%" stopColor="#E500C7" />
                </linearGradient>

                <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbit Rings */}
              <circle
                cx="300"
                cy="300"
                r="230"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <circle
                cx="300"
                cy="300"
                r="145"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.5"
              />

              {/* Connecting Path Lines */}
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <g key={stage.id}>
                    <line
                      x1="300"
                      y1="300"
                      x2={stage.nodePos.x}
                      y2={stage.nodePos.y}
                      stroke={isActive ? "#246BFF" : "rgba(115, 115, 125, 0.25)"}
                      strokeWidth={isActive ? "3.5" : "1.5"}
                      filter={isActive ? "url(#glow-filter)" : undefined}
                      className="transition-all duration-500"
                    />

                    {/* Animated Pulse Circle travelling on active line */}
                    {isActive && (
                      <circle r="4" fill="#E500C7">
                        <animateMotion
                          path={`M300 300 L${stage.nodePos.x} ${stage.nodePos.y}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Center Core: GROWTH */}
              <g transform="translate(300, 300)">
                <circle
                  r="68"
                  fill="#0B0B10"
                  stroke="url(#central-gradient)"
                  strokeWidth="5"
                  className="shadow-2xl"
                />
                <circle
                  r="58"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
                <text
                  textAnchor="middle"
                  dy="-8"
                  fill="#73737D"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="2"
                  fontFamily="monospace"
                >
                  ANOR CORE
                </text>
                <text
                  textAnchor="middle"
                  dy="12"
                  fill="#F7F7F5"
                  fontSize="16"
                  fontWeight="900"
                  letterSpacing="2.5"
                  fontFamily="monospace"
                >
                  GROWTH
                </text>
              </g>

              {/* Stage Outer Nodes (Clickable) */}
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <g
                    key={stage.id}
                    transform={`translate(${stage.nodePos.x}, ${stage.nodePos.y})`}
                    onClick={() => {
                      setActiveStage(idx);
                      setAutoRotate(false);
                    }}
                    className="cursor-pointer group"
                    data-cursor={`SELECT ${stage.name}`}
                  >
                    {/* Active Outer Pulsing Aura — contained opacity pulse, no scale transform */}
                    {isActive && (
                      <circle
                        r="34"
                        fill="none"
                        stroke="#246BFF"
                        strokeWidth="1.5"
                        opacity="0.3"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    <circle
                      r={isActive ? "26" : "20"}
                      fill={isActive ? "#246BFF" : "#15151C"}
                      stroke={isActive ? "#E500C7" : "rgba(255, 255, 255, 0.25)"}
                      strokeWidth="2.5"
                      className="transition-all duration-300 group-hover:stroke-[#246BFF]"
                    />

                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#F7F7F5"
                      fontSize="11"
                      fontWeight="900"
                      fontFamily="monospace"
                    >
                      {stage.id}
                    </text>

                    <text
                      textAnchor="middle"
                      dy="42"
                      fill={isActive ? "#246BFF" : "#73737D"}
                      fontSize="10"
                      fontWeight="800"
                      letterSpacing="1"
                      fontFamily="monospace"
                      className="transition-colors"
                    >
                      {stage.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
