"use client";

import React, { useEffect, useRef } from "react";

export const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const progressBar = progressRef.current;
        if (!progressBar) return;

        const totalScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
          const currentProgress = (window.scrollY / totalScroll) * 100;
          progressBar.style.transform = `scaleY(${currentProgress / 100})`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[2px] z-50 pointer-events-none bg-white/5">
      <div
        ref={progressRef}
        className="w-full bg-gradient-to-b from-[#246BFF] via-[#7137FF] to-[#E500C7] transition-all duration-75"
        style={{
          height: "100%",
          transform: "scaleY(0)",
          transformOrigin: "top",
        }}
      />
    </div>
  );
};
