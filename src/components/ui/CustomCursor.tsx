"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = dotRef.current;
    const lens = lensRef.current;
    if (!dot || !lens) return;

    // Direct, ultra-fast 60fps tracking
    const toDotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const toDotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    const toLensX = gsap.quickTo(lens, "x", { duration: 0.18, ease: "power3.out" });
    const toLensY = gsap.quickTo(lens, "y", { duration: 0.18, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (!isVisible) setIsVisible(true);

      toDotX(x);
      toDotY(y);
      toLensX(x);
      toLensY(y);
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      gsap.to(dot, { scale: 0.5, duration: 0.1 });
      gsap.to(lens, { scale: isZoomed ? 2.1 : 0.8, duration: 0.12 });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "back.out(2)" });
      gsap.to(lens, {
        scale: isZoomed ? 2.8 : 1,
        duration: 0.3,
        ease: "back.out(1.5)",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "VIEW";
        setCursorText(text);
        setIsZoomed(true);

        // Huge Magnifier Glass Expansion with frosted backdrop
        gsap.to(lens, {
          scale: 2.8,
          borderColor: "rgba(36, 107, 255, 0.95)",
          backgroundColor: "rgba(36, 107, 255, 0.14)",
          backdropFilter: "blur(5px)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(dot, { opacity: 0.2, scale: 0.4, duration: 0.2 });
      } else if (target.closest("a, button, [role='button'], input, select, textarea")) {
        setCursorText("");
        setIsZoomed(true);

        // Clean link/button hover zoom
        gsap.to(lens, {
          scale: 2.2,
          borderColor: "rgba(255, 255, 255, 0.85)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(3px)",
          duration: 0.28,
          ease: "power3.out",
        });
        gsap.to(dot, { opacity: 0.35, scale: 0.5, duration: 0.2 });
      } else {
        setCursorText("");
        setIsZoomed(false);

        // Return to clean idle state
        gsap.to(lens, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.35)",
          backgroundColor: "transparent",
          backdropFilter: "none",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isZoomed, isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#246BFF] shadow-[0_0_10px_#246BFF,0_0_20px_#7137FF] will-change-transform"
      />

      {/* 2. Glass Magnifier Zoom Lens */}
      <div
        ref={lensRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/35 flex items-center justify-center transition-colors duration-200 will-change-transform"
        style={{
          boxShadow: isZoomed
            ? "0 0 35px rgba(36, 107, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.15)"
            : "0 0 12px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Subtle magnifying ring accent */}
        {isZoomed && (
          <div className="absolute inset-[-2px] rounded-full border border-white/20 pointer-events-none animate-pulse" />
        )}

        {/* Hover action text label inside the lens */}
        {cursorText && (
          <span
            ref={labelRef}
            className="px-2 text-[8px] font-mono tracking-widest font-black text-white uppercase text-center select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
