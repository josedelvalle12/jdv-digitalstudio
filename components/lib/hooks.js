"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "./scroll";

/**
 * Divide el recorrido de un contenedor alto (con hijo sticky) en `count` pasos.
 * Devuelve el paso activo. `onProgress` recibe 0..1 en cada frame (para barras).
 */
export function useScrollSteps(ref, count, onProgress) {
  const [active, setActive] = useState(0);
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setActive(Math.min(count - 1, Math.floor(self.progress * count)));
        cb.current?.(self.progress);
      },
    });
    return () => st.kill();
  }, [ref, count]);
  return active;
}

/** Parallax sutil: desplaza el elemento ±amount % mientras cruza el viewport. */
export function useParallax(ref, amount = 8) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const t = gsap.fromTo(
      el,
      { yPercent: amount },
      { yPercent: -amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [ref, amount]);
}

/** Escala de imagen al entrar en pantalla (from → 1). */
export function useScaleIn(ref, from = 0.86) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const t = gsap.fromTo(
      el,
      { scale: from },
      { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 15%", scrub: true } }
    );
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [ref, from]);
}
