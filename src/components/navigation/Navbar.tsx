"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnorLogo } from "../ui/AnorLogo";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const magneticBtnsRef = useRef<(HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const nav = navRef.current;
    if (!nav) return;

    let lastScroll = 0;

    const st = ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        if (currentScroll > 100) {
          setIsScrolled(true);
          if (currentScroll > lastScroll && currentScroll > 300) {
            gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.out" });
          } else {
            gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
          }
        } else {
          setIsScrolled(false);
          gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
        }
        lastScroll = currentScroll;
      },
    });

    const cleanupMagnetic: (() => void)[] = [];

    magneticBtnsRef.current.forEach((el) => {
      if (!el) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = (e.clientX - centerX) * 0.25;
        const distanceY = (e.clientY - centerY) * 0.25;

        gsap.to(el, {
          x: distanceX,
          y: distanceY,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      };

      const onMouseMove = (e: Event) => handleMouseMove(e as MouseEvent);
      const onMouseLeave = () => handleMouseLeave();

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      cleanupMagnetic.push(() => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      st.kill();
      cleanupMagnetic.forEach((fn) => fn());
    };
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "SERVICES", href: "#services" },
    { label: "PROCESS", href: "#process" },
    { label: "CALCULATOR", href: "#roi-calculator" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 px-4 md:px-8 bg-[#0B0B10]/80 backdrop-blur-lg border-b border-white/10"
            : "py-6 px-6 md:px-12"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#"
            className="flex items-center group"
            data-cursor="ANOR"
          >
            <AnorLogo className="h-6 md:h-7 w-auto transition-transform duration-300 group-hover:scale-105" />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                ref={(el) => {
                  magneticBtnsRef.current[idx] = el;
                }}
                className="text-slate hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-[#246BFF] after:to-[#E500C7] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenContact}
              ref={(el) => {
                magneticBtnsRef.current[5] = el;
              }}
              data-cursor="LET'S TALK →"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/15 text-white font-mono text-xs font-bold tracking-wider uppercase hover:border-[#246BFF] hover:bg-[#246BFF]/10 transition-all duration-300 group"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#246BFF]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white border border-white/10 rounded-full"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0B0B10] pt-24 px-8 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-[#246BFF] uppercase">
                NAVIGATION SYSTEM
              </span>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white tracking-tight uppercase hover:text-[#246BFF] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#246BFF] via-[#7137FF] to-[#E500C7] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <span>LET&apos;S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-center font-mono text-[10px] text-slate tracking-widest">
                ANOR — ENGINEERED FOR GROWTH.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
