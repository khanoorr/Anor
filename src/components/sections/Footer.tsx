"use client";

import React from "react";
import { AnorLogo } from "../ui/AnorLogo";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC<{ onOpenContact?: () => void }> = ({ onOpenContact }) => {
  const socialLinks = [
    { label: "LINKEDIN", href: "https://linkedin.com/company/anor-marketing" },
    { label: "INSTAGRAM", href: "https://instagram.com/anor.grow" },
    { label: "TWITTER / X", href: "https://x.com/anorgrow" },
  ];

  return (
    <footer className="w-full bg-[#0B0B10] text-[#73737D] py-16 px-6 md:px-12 lg:px-20 border-t border-white/10 font-mono text-xs">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Brand Info */}
        <div className="md:col-span-4 space-y-4">
          <AnorLogo className="h-6 w-auto" />
          <p className="text-slate/80 text-[11px] leading-relaxed max-w-sm">
            Performance-first growth marketing agency for ambitious DTC, e-commerce, and modern consumer brands.
          </p>
          <div className="text-[#246BFF] font-bold tracking-widest text-[10px]">
            ENGINEERED FOR GROWTH.
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-white font-bold block mb-2 uppercase">NAVIGATION</span>
          <ul className="space-y-2">
            {[
              { label: "WORK", href: "#work" },
              { label: "SERVICES", href: "#services" },
              { label: "PROCESS", href: "#process" },
              { label: "CALCULATOR", href: "#roi-calculator" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Contact */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-white font-bold block mb-2 uppercase">CONTACT</span>
          <div>
            <span className="block text-[10px] text-slate">EMAIL:</span>
            <a
              href="mailto:anor.support@gmail.com"
              className="text-white hover:text-[#246BFF] transition-colors"
            >
              anor.support@gmail.com
            </a>
          </div>
          <div>
            <span className="block text-[10px] text-slate">PHONE / WHATSAPP:</span>
            <a
              href="https://wa.me/917208809892"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#246BFF] transition-colors"
            >
              +91 72088 09892
            </a>
          </div>
          <div>
            <span className="block text-[10px] text-slate">START AUDIT:</span>
            <button
              onClick={onOpenContact}
              className="text-[#246BFF] hover:underline font-bold uppercase"
            >
              Request Free Performance Audit &rarr;
            </button>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="md:col-span-2 space-y-3">
          <span className="text-white font-bold block mb-2 uppercase">CONNECT</span>
          <div className="flex flex-col gap-2">
            {socialLinks.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors group"
              >
                <span>{soc.label}</span>
                <ArrowUpRight className="w-3 h-3 text-[#246BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
          <div className="pt-6 text-[10px] text-slate/60">
            &copy; 2026 ANOR. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
