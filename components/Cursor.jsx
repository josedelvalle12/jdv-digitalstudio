"use client";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "./lib/scroll";

/**
 * Cursor + float magnético.
 * - Punto de 6px: tinta sobre fondos claros, papel sobre oscuros. Sobre enlaces crece un poco; sobre CTA, apenas.
 * - [data-cursor="VIEW"] muestra el círculo verde con etiqueta.
 * - [data-magnetic]: el objeto flota hacia el puntero en dos capas
 *   (contenedor ≤ 6px, círculo ≤ 5px extra) y vuelve con un rebote suave.
 * Solo con puntero fino; en táctil no existe.
 */
export default function Cursor() {
  const root = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const el = root.current;
    const rm = reducedMotion();
    const xTo = gsap.quickTo(el, "x", { duration: rm ? 0 : 0.28, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: rm ? 0 : 0.28, ease: "power3" });
    const clamp = (v, m) => Math.max(-m, Math.min(m, v));

    let magnet = null;
    let dot = null;
    let px = -100, py = -100, raf = 0;

    // Color del punto según el fondo real bajo el cursor (claro → tinta, oscuro → papel)
    const DARK = ".tone-dark, .tone-inv, .tone-cta, .stage-2";
    const TONED = DARK + ", .tone-base";
    const readTone = () => {
      raf = 0;
      const hit = document.elementFromPoint(px, py);
      const t = hit?.closest?.(TONED);
      el.classList.toggle("is-dark", !!t && t.matches(DARK));
    };
    const queueTone = () => { if (!raf) raf = requestAnimationFrame(readTone); };

    const onMove = (e) => {
      px = e.clientX; py = e.clientY;
      queueTone();
      xTo(e.clientX); yTo(e.clientY);
      el.classList.remove("is-hidden");
      if (magnet && !rm) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(magnet, { x: clamp(dx * 0.08, 6), y: clamp(dy * 0.22, 5), rotate: clamp(dx * 0.004, 1.2), duration: 0.7, ease: "power3.out" });
        if (dot) {
          const d = dot.getBoundingClientRect();
          const ddx = e.clientX - (d.left + d.width / 2);
          const ddy = e.clientY - (d.top + d.height / 2);
          gsap.to(dot, { x: clamp(ddx * 0.14, 5), y: clamp(ddy * 0.14, 5), duration: 0.6, ease: "power3.out" });
        }
      }
    };
    const release = (m, d) => {
      gsap.to(m, { x: 0, y: 0, rotate: 0, duration: 1.1, ease: "elastic.out(1, 0.5)" });
      if (d) gsap.to(d, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.45)" });
    };
    const onOver = (e) => {
      const t = e.target;
      const lab = t.closest?.("[data-cursor]");
      const cta = t.closest?.("[data-cta]");
      const link = t.closest?.("a, button, [role=radio], label");
      el.classList.toggle("is-label", !!lab);
      el.classList.toggle("is-cta", !lab && !!cta);
      el.classList.toggle("is-link", !lab && !cta && !!link);
      if (lab) label.current.textContent = lab.getAttribute("data-cursor");
      const m = t.closest?.("[data-magnetic]");
      if (m !== magnet) {
        if (magnet) release(magnet, dot);
        magnet = m;
        dot = m ? m.querySelector(".act__dot") : null;
      }
    };
    const onLeave = () => el.classList.add("is-hidden");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", queueTone, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", queueTone);
      cancelAnimationFrame(raf);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="cursor is-hidden" aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__ring"><span ref={label}>VIEW</span></span>
    </div>
  );
}
