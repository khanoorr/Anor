"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { AnorLogo } from "./AnorLogo";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    budget: "Growth Audit",
    message: "",
  });

  const tierOptions = [
    { label: "Growth Audit", detail: "Find bottlenecks" },
    { label: "Paid Media", detail: "Scale acquisition" },
    { label: "Creative Testing", detail: "Improve hooks" },
    { label: "Custom Scope", detail: "Discuss fit" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setError(null);
        setForm({
          name: "",
          email: "",
          phone: "",
          brand: "",
          budget: "Growth Audit",
          message: "",
        });
        onClose();
      }, 2500);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9990] bg-[#0B0B10]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 350 }}
            className="fixed right-0 top-0 bottom-0 z-[9995] w-full max-w-lg bg-[#14141B] border-l border-white/10 p-6 sm:p-10 overflow-y-auto flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center pb-5 mb-5 border-b border-white/10">
                <AnorLogo className="w-auto h-6" />
                <button
                  onClick={onClose}
                  data-cursor="CLOSE"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-slate hover:text-white hover:border-white/30 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#246BFF]/10 text-[#246BFF] flex items-center justify-center border border-[#246BFF]/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white uppercase">
                    SIGNAL RECEIVED.
                  </h3>
                  <p className="text-slate text-xs max-w-sm mx-auto leading-relaxed">
                    We&apos;ve got your details. An ANOR growth engineer will audit your setup and reach out within 24 hours — no sales pitch, just a real plan.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-1 mb-5">
                    <span className="text-[10px] font-mono text-[#246BFF] tracking-wider uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      INITIATE GROWTH AUDIT
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                      LET&apos;S ENGINEER YOUR GROWTH.
                    </h2>
                    <p className="text-slate text-xs font-light">
                      Drop your details. We&apos;ll audit your current performance setup and come back with a plan — not a deck, a system.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Row 1: Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate mb-1 font-semibold">
                          YOUR NAME *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Alex Vance"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-[#0B0B10] border border-white/10 rounded-md p-2.5 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#246BFF] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate mb-1 font-semibold">
                          WORK EMAIL *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="alex@brand.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-[#0B0B10] border border-white/10 rounded-md p-2.5 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#246BFF] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone Number & Store URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate mb-1 font-semibold">
                          PHONE / WHATSAPP *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-[#0B0B10] border border-white/10 rounded-md p-2.5 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#246BFF] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate mb-1 font-semibold">
                          STORE / BRAND URL *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="https://yourbrand.com"
                          value={form.brand}
                          onChange={(e) => setForm({ ...form, brand: e.target.value })}
                          className="w-full bg-[#0B0B10] border border-white/10 rounded-md p-2.5 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#246BFF] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Interactive Growth Tier Selector */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate mb-1.5 font-semibold">
                        GROWTH PRIORITY
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {tierOptions.map((tier) => {
                          const isSelected = form.budget === tier.label;
                          return (
                            <button
                              type="button"
                              key={tier.label}
                              onClick={() =>
                                setForm({
                                  ...form,
                                  budget: tier.label,
                                })
                              }
                              className={`p-2 rounded-md border text-left font-mono transition-all ${
                                isSelected
                                  ? "bg-[#246BFF]/15 border-[#246BFF] text-white"
                                  : "bg-[#0B0B10] border-white/10 text-slate hover:border-white/25 hover:text-white"
                              }`}
                            >
                              <div className="text-[11px] font-bold text-white">{tier.label}</div>
                              <div className="text-[9px] text-[#246BFF]">{tier.detail}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message / Goals */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate mb-1 font-semibold">
                        CURRENT GOALS / HURDLES <span className="text-white/30">(OPTIONAL)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="What are your CAC, ROAS, or scaling hurdles?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-[#0B0B10] border border-white/10 rounded-md p-2.5 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#246BFF] transition-colors resize-none"
                      />
                    </div>

                    {/* Error Notice */}
                    {error && (
                      <div className="p-2 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs text-center rounded-md">
                        {error}
                      </div>
                    )}

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={loading}
                      data-cursor="TRANSMIT"
                      className={`w-full py-3.5 rounded-md bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 group hover:shadow-[0_0_25px_rgba(36,107,255,0.4)] transition-all ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>SUBMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>BOOK YOUR FREE AUDIT</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-slate">
              <span>DIRECT: +91 72088 09892</span>
              <span>100% CONFIDENTIAL</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
