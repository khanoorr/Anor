"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ServicesSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  const services = [
    {
      num: "01",
      title: "PAID MEDIA",
      tagline: "Precision capital deployed across Meta, Google & TikTok — every rupee tracked to net revenue, not platform ROAS.",
      deliverables: [
        "Full-funnel media architecture",
        "Algorithmic bid strategy optimization",
        "Creative testing framework",
        "ROAS & MER target modeling",
      ],
    },
    {
      num: "02",
      title: "CREATIVE STRATEGY",
      tagline: "Hook-led creative built on data, not instinct. We test angles at velocity until statistically verified winners emerge.",
      deliverables: [
        "Data-backed hook & angle matrix",
        "UGC & Studio ad concepting",
        "Iterative variant editing",
        "Creative fatigue detection",
      ],
    },
    {
      num: "03",
      title: "CRO / LANDING PAGES",
      tagline: "Bespoke landers and storefronts engineered to convert — A/B tested relentlessly until the winning variant locks in.",
      deliverables: [
        "Custom Next.js & Shopify landers",
        "Multivariate A/B testing",
        "Cart & Checkout optimization",
        "Page speed & performance tuning",
      ],
    },
    {
      num: "04",
      title: "ANALYTICS & MEASUREMENT",
      tagline: "Your own server-side telemetry stack. No more trusting platform over-reporting — know exactly what drives net-new revenue.",
      deliverables: [
        "Custom attribution modeling",
        "PostHog & GA4 server-side CAPI",
        "Incrementality holdout tests",
        "Executive KPI dashboards",
      ],
    },
    {
      num: "05",
      title: "GROWTH STRATEGY",
      tagline: "LTV, CAC, payback period — modelled together into a capital allocation strategy that compounds the longer you stay in the game.",
      deliverables: [
        "Unit economics & CAC forecasting",
        "Retention & LTV modeling",
        "Pricing & Offer optimization",
        "Omnichannel scale roadmap",
      ],
    },
    {
      num: "06",
      title: "EXPERIMENTATION",
      tagline: "Weekly sprint cycles turning 20–40 hypotheses into statistically validated winners. Fast, systematic, and permanently documented.",
      deliverables: [
        "Weekly hypothesis sprint planning",
        "Statistical significance validation",
        "Winner scaling playbooks",
        "Post-experiment teardowns",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-[#15151C] text-[#F7F7F5] py-32 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[#246BFF] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[#246BFF]" />
            <span>04 / CAPABILITIES</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white">
            WHAT WE ENGINEER.
          </h2>
        </div>

        {/* Oversized Typographic Service Rows */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {services.map((service, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={service.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
                data-cursor={`VIEW ${service.title}`}
                className="group py-8 md:py-12 cursor-pointer transition-colors duration-500 relative"
              >
                {/* Accent Gradient Highlight Line */}
                {isHovered && (
                  <motion.div
                    layoutId="service-gradient-line"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#246BFF] via-[#7137FF] to-[#E500C7]"
                  />
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-8">
                  {/* Row Number & Title */}
                  <div className="flex items-center gap-6 md:gap-12">
                    <span
                      className={`font-mono text-lg md:text-2xl font-bold transition-colors ${
                        isHovered ? "text-[#246BFF]" : "text-slate"
                      }`}
                    >
                      {service.num}
                    </span>
                    <h3
                      className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase transition-all duration-300 ${
                        isHovered
                          ? "text-white translate-x-3"
                          : "text-white/60"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Arrow Icon */}
                  <div className="hidden md:flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "bg-[#246BFF] border-[#246BFF] text-white rotate-45"
                          : "border-white/10 text-slate"
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Expandable Details Container */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden px-4 md:px-8 pt-8"
                    >
                      <div className="pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-5">
                          <p className="text-xl md:text-2xl text-[#E8E8EC] font-light leading-relaxed">
                            {service.tagline}
                          </p>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.deliverables.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 p-3 bg-[#0B0B10]/60 border border-white/5"
                            >
                              <Check className="w-4 h-4 text-[#246BFF] shrink-0" />
                              <span className="text-xs font-mono text-white/90">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
