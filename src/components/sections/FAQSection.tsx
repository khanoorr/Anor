"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQSection: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [openId, setOpenId] = useState<string | null>("01");

  const faqs: FAQItem[] = [
    {
      id: "01",
      category: "COMMERCIAL & BILLING",
      question: "How does ad spend billing work? Does it route through ANOR?",
      answer:
        "No. All ad capital is billed directly from your Meta, Google, or TikTok ad accounts to your payment method. You retain 100% account ownership, data rights, and pixel history. ANOR charges only a transparent, flat monthly management fee.",
    },
    {
      id: "02",
      category: "TIMELINE & VELOCITY",
      question: "How quickly do we see measurable performance results?",
      answer:
        "Phase 01 (Days 1–7) is dedicated to full technical audit, CAPI telemetry validation, and creative angle mapping. Live campaign sprints launch in Week 2. Initial statistically significant testing signals typically emerge within 14–21 days.",
    },
    {
      id: "03",
      category: "CONTRACTS & COMMITMENTS",
      question: "Is there a mandatory long-term contract lock-in?",
      answer:
        "We recommend an initial 90-day sprint to establish data baselines and build algorithmic momentum. However, after the first 90 days, all engagements convert to flexible month-to-month contracts with a standard 30-day notice period.",
    },
    {
      id: "04",
      category: "CREATIVE ASSETS",
      question: "What creative production assets are included in our tier?",
      answer:
        "Depending on your selected engine tier, we deliver between 10 to 30+ new creative angle iterations per month. This includes data-backed hook copywriting, UGC video editing, motion graphic teardowns, and landing page wireframe variants.",
    },
    {
      id: "05",
      category: "DATA & ATTRIBUTION",
      question: "How do you solve post-iOS14 tracking loss and attribution?",
      answer:
        "We build direct server-side CAPI pipelines (via PostHog or custom server containers), enforce blended Marketing Efficiency Ratio (MER) target modeling, and conduct incrementality holdout tests to isolate true net revenue from platform over-reporting.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full bg-[#111117] text-[#F7F7F5] py-28 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-b border-white/10"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-[#246BFF] uppercase font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#246BFF]" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            CLARITY BEFORE ENGAGEMENT.
          </h2>
          <p className="text-slate text-sm sm:text-base font-light">
            Everything you need to know about our growth engine operations, contracts, and telemetry.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="py-6 transition-colors duration-200"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-6 text-left group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-mono text-xs font-bold text-[#246BFF]">
                      {faq.id}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#246BFF] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#246BFF] border-[#246BFF] text-white rotate-180"
                        : "border-white/15 text-slate group-hover:border-white/40 group-hover:text-white"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden pl-8 sm:pl-12 pr-4 pt-4"
                    >
                      <span className="inline-block px-2 py-0.5 mb-2 bg-white/5 border border-white/10 text-[9px] font-mono text-[#246BFF] uppercase tracking-widest font-bold">
                        {faq.category}
                      </span>
                      <p className="text-sm sm:text-base text-slate font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help CTA */}
        <div className="mt-12 p-6 bg-[#0B0B10] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-xs text-white font-bold uppercase tracking-wider block">
              HAVE A SPECIFIC TECHNICAL OR SCOPE QUESTION?
            </span>
            <p className="text-xs text-slate font-light">
              Speak directly with an ANOR growth architect — no pushy sales reps.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            data-cursor="LET'S TALK →"
            className="px-6 py-3 bg-white/10 hover:bg-[#246BFF] text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all duration-200 shrink-0"
          >
            <span>ASK AN ARCHITECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
