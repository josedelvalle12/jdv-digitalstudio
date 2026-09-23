"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

let lenisInstance = null;
export const setLenis = (l) => { lenisInstance = l; };
export const getLenis = () => lenisInstance;

export function scrollToTarget(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Breakpoint a partir del cual se activan sticky / horizontal. */
export const DESKTOP = "(min-width: 1024px)";
/** Comportamiento mobile (todo lo que no es DESKTOP). */
export const MOBILE = "(max-width: 1023px)";
