"use client";

import React from "react";

interface AnorLogoProps {
  className?: string;
  gradientId?: string;
  showTagline?: boolean;
}

export const AnorLogo: React.FC<AnorLogoProps> = ({
  className = "w-auto h-8",
  gradientId = "anor-logo-gradient",
  showTagline = false,
}) => {
  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <svg
        viewBox="0 0 520 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-label="ANOR"
      >
        <defs>
          <linearGradient
            id={gradientId}
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
          d="M 12 88 L 62 12 L 112 88"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="anor-path-a"
        />

        {/* Letter N */}
        <path
          d="M 145 88 V 12 L 235 88 V 12"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="anor-path-n"
        />

        {/* Letter O - Gradient Signature Ring */}
        <circle
          cx="320"
          cy="50"
          r="38"
          stroke={`url(#${gradientId})`}
          strokeWidth="16"
          className="anor-path-o"
        />

        {/* Letter R */}
        <path
          d="M 405 88 V 12 H 465 C 495 12 495 50 465 50 H 405 M 450 50 L 505 88"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="anor-path-r"
        />
      </svg>
      {showTagline && (
        <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-slate mt-1.5 font-semibold">
          ENGINEERED FOR GROWTH.
        </span>
      )}
    </div>
  );
};
