"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, setLenis, reducedMotion } from "./lib/scroll";

/*
  MOTION — una sola gramática:
  entrada  fade + 16px (data-reveal)       tipografía  máscara + translate
  hover    físico (ver Cursor)             imágenes    escala / clip-path
  scroll   Lenis, suave sin inercia excesiva
*/
export default function SmoothScroll({ children }) {
  useEffect(() => {
    let lenis = null;
    let tick = null;
    const rm = reducedMotion();
    if (!rm) {
      lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 1, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Entradas
    let batch = [];
    if (!rm) {
      gsap.set("[data-reveal]", { opacity: 0, y: 16 });
      batch = ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });
    }

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { duration: 1.3 });
      else el.scrollIntoView({ behavior: rm ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Revisión: G muestra la grilla de 12 columnas
    const onKey = (e) => {
      if (/INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === "g" || e.key === "G") document.documentElement.classList.toggle("show-grid");
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.removeEventListener("keydown", onKey);
      batch.forEach((b) => b.kill());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);
  return children;
}
