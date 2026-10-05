"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface AnorLoaderProps {
  onComplete: () => void;
  progress?: number;
  reducedMotion?: boolean;
}

export const AnorLoader: React.FC<AnorLoaderProps> = ({
  onComplete,
  progress = 100,
  reducedMotion: overrideReducedMotion,
}) => {
  const isSystemReducedMotion = useReducedMotion();
  const isReducedMotion = overrideReducedMotion ?? isSystemReducedMotion;

  const containerRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLDivElement>(null);
  const signalRingRef = useRef<SVGCircleElement>(null);
  const constructionLinesRef = useRef<SVGGElement>(null);
  const logoGroupRef = useRef<SVGSVGElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Reduced motion fast path (<500ms)
      if (isReducedMotion) {
        const tl = gsap.timeline({
          onComplete: () => onComplete(),
        });
        tl.to(taglineRef.current, { opacity: 1, duration: 0.2 });
        tl.to(container, { opacity: 0, duration: 0.2, delay: 0.1 });
        return;
      }

      // Check mobile viewport for simplified timing
      const isMobile = window.innerWidth < 768;
      const timeScale = isMobile ? 1.3 : 1.0; // Slightly faster on mobile

      const tl = gsap.timeline({
        timeScale,
        onComplete: () => {
          onComplete();
        },
      });

      // Target elements
      const point = pointRef.current;
      const signalRing = signalRingRef.current;
      const constructionLines = constructionLinesRef.current;
      const logoSvg = logoGroupRef.current;
      const tagline = taglineRef.current;

      const pathA = logoSvg?.querySelector(".loader-path-a") as SVGPathElement | null;
      const pathN = logoSvg?.querySelector(".loader-path-n") as SVGPathElement | null;
      const circleO = logoSvg?.querySelector(".loader-path-o") as SVGCircleElement | null;
      const pathR = logoSvg?.querySelector(".loader-path-r") as SVGPathElement | null;

      // Set initial stroke dash properties for precise vector drawing
      const prepareStroke = (el: SVGPathElement | SVGCircleElement | null) => {
        if (!el) return 0;
        const len = el instanceof SVGCircleElement ? 2 * Math.PI * 38 : el.getTotalLength();
        gsap.set(el, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 0,
        });
        return len;
      };

      prepareStroke(pathA);
      prepareStroke(pathN);
      prepareStroke(circleO);
      prepareStroke(pathR);

      // Initial state at 0.0s: Pure Obsidian screen
      tl.set(container, { opacity: 1 });
      if (point) gsap.set(point, { opacity: 0, scale: 0.1 });
      if (signalRing) gsap.set(signalRing, { opacity: 0, r: 2 });
      if (constructionLines) gsap.set(constructionLines, { opacity: 0 });
      if (tagline) gsap.set(tagline, { opacity: 0, y: 12 });

      // 0.3s: One tiny Electric Blue point appears
      tl.to(
        point,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0.3
      );

      // 0.6s: Point generates a thin radial signal
      tl.to(
        signalRing,
        {
          opacity: 0.4,
          r: 120,
          duration: 0.5,
          ease: "power2.out",
        },
        0.6
      );

      // 1.0s: Multiple precise vector lines emerge
      tl.to(
        constructionLines,
        {
          opacity: 0.35,
          duration: 0.5,
          ease: "power2.out",
        },
        1.0
      );

      // 1.5s: Lines align to the hidden geometry of the ANOR logo
      tl.to(
        point,
        {
          scale: 15,
          opacity: 0.08,
          duration: 0.5,
          ease: "expo.out",
        },
        1.5
      );

      // 2.0s: The A begins forming
      if (pathA) {
        tl.to(
          pathA,
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          2.0
        );
      }

      // 2.5s: The N geometry locks into position
      if (pathN) {
        tl.to(
          pathN,
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          2.5
        );
      }

      // 3.0s: The O begins drawing as an SVG circular path
      if (circleO) {
        tl.to(
          circleO,
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          3.0
        );
      }

      // 3.5s: Gradient energy travels through the O & R resolves
      if (pathR) {
        tl.to(
          pathR,
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          3.5
        );
      }

      // 4.0s: Entire logo snaps into perfect alignment
      if (logoSvg) {
        tl.to(
          logoSvg,
          {
            scale: 1.04,
            filter: "drop-shadow(0 0 20px rgba(36, 107, 255, 0.45))",
            duration: 0.2,
            ease: "back.out(1.8)",
          },
          4.0
        );
        tl.to(
          logoSvg,
          {
            scale: 1,
            filter: "drop-shadow(0 0 0px rgba(36, 107, 255, 0))",
            duration: 0.2,
          },
          4.2
        );
      }

      // 4.2s: All construction lines & signal ring disappear
      tl.to(
        [constructionLines, signalRing, point],
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        4.2
      );

      // 4.5s: Logo remains clean
      // 5.0s: Text appears: ENGINEERED FOR GROWTH.
      if (tagline) {
        tl.to(
          tagline,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          5.0
        );
      }

      // 5.8s: Logo and tagline scale down and transition into navbar
      tl.to(
        [logoSvg, tagline],
        {
          scale: 0.9,
          y: -15,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
        },
        5.8
      );

      // 6.2s: Homepage hero becomes visible (container fade out)
      tl.to(
        container,
        {
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.4,
          ease: "power2.inOut",
        },
        6.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#0B0B10] text-[#F7F7F5] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Central Electric Blue Signal Point */}
      <div
        ref={pointRef}
        className="absolute w-3 h-3 rounded-full bg-[#246BFF] shadow-[0_0_25px_#246BFF]"
      />

      {/* SVG Canvas for Construction Lines & Signal Ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Radial Signal Ring */}
        <circle
          ref={signalRingRef}
          cx="500"
          cy="500"
          r="2"
          fill="none"
          stroke="#246BFF"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Vector Alignment & Construction Lines */}
        <g ref={constructionLinesRef} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.75">
          {/* Horizontal Alignment Guides */}
          <line x1="0" y1="450" x2="1000" y2="450" strokeDasharray="2 4" />
          <line x1="0" y1="500" x2="1000" y2="500" strokeDasharray="4 4" stroke="rgba(36, 107, 255, 0.3)" />
          <line x1="0" y1="550" x2="1000" y2="550" strokeDasharray="2 4" />

          {/* Vertical Alignment Guides for A, N, O, R */}
          <line x1="260" y1="0" x2="260" y2="1000" strokeDasharray="2 4" />
          <line x1="420" y1="0" x2="420" y2="1000" strokeDasharray="2 4" />
          <line x1="500" y1="0" x2="500" y2="1000" strokeDasharray="4 4" stroke="rgba(36, 107, 255, 0.3)" />
          <line x1="580" y1="0" x2="580" y2="1000" strokeDasharray="2 4" />
          <line x1="740" y1="0" x2="740" y2="1000" strokeDasharray="2 4" />

          {/* Diagonal Construction Lines for Letter A */}
          <line x1="200" y1="550" x2="320" y2="450" />
          <line x1="320" y1="450" x2="440" y2="550" />

          {/* Precision Corner Bounding Crosshairs */}
          {[
            { x: 260, y: 450 },
            { x: 420, y: 450 },
            { x: 500, y: 500 },
            { x: 580, y: 450 },
            { x: 740, y: 450 },
          ].map((pt, i) => (
            <g key={i}>
              <line x1={pt.x - 8} y1={pt.y} x2={pt.x + 8} y2={pt.y} stroke="#246BFF" strokeWidth="1" />
              <line x1={pt.x} y1={pt.y - 8} x2={pt.x} y2={pt.y + 8} stroke="#246BFF" strokeWidth="1" />
            </g>
          ))}
        </g>
      </svg>

      {/* ANOR Vector Logo Container */}
      <div className="relative z-10 w-72 md:w-96 max-w-[90vw]">
        <svg
          ref={logoGroupRef}
          viewBox="0 0 520 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient
              id="loader-signature-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#246BFF" />
              <stop offset="50%" stopColor="#7137FF" />
              <stop offset="100%" stopColor="#E500C7" />
            </linearGradient>
          </defs>

          {/* Letter A */}
          <path
            className="loader-path-a"
            d="M 12 88 L 62 12 L 112 88"
            stroke="#F7F7F5"
            strokeWidth="16"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Letter N */}
          <path
            className="loader-path-n"
            d="M 145 88 V 12 L 235 88 V 12"
            stroke="#F7F7F5"
            strokeWidth="16"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Letter O (Gradient Signature Ring) */}
          <circle
            className="loader-path-o"
            cx="320"
            cy="50"
            r="38"
            stroke="url(#loader-signature-gradient)"
            strokeWidth="16"
          />

          {/* Letter R */}
          <path
            className="loader-path-r"
            d="M 405 88 V 12 H 465 C 495 12 495 50 465 50 H 405 M 450 50 L 505 88"
            stroke="#F7F7F5"
            strokeWidth="16"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="mt-6 text-center font-mono text-[11px] md:text-xs tracking-[0.4em] uppercase text-[#E8E8EC]/85 font-semibold"
        >
          ENGINEERED FOR GROWTH.
        </div>
      </div>

      {/* System Telemetry Bar */}
      <div className="absolute bottom-10 left-0 right-0 px-8 flex justify-between items-center text-[10px] font-mono text-[#73737D] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#246BFF] animate-pulse" />
          <span>ENGINEERING VECTOR SIGNATURE</span>
        </div>
        <div ref={statusTextRef}>ANOR CORE v2.6</div>
      </div>
    </div>
  );
};
