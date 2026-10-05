"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";

let registered = false;

export function initGSAP() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, Flip, Observer);
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger, Flip, Observer };
