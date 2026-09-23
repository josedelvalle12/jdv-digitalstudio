"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, reducedMotion } from "../lib/scroll";
import VisualSystemScene from "./VisualSystemScene";

/*
  Puente DOM ⇄ escena. Scroll y puntero se escriben en un objeto mutable
  que la escena lee por frame: React no re-renderiza durante la interacción.
    progress 0→1  entrada por scroll        exit 0→1  deriva al salir
    tx / ty       puntero en NDC            influence 0→1  presencia del cursor
*/
const clamp1 = (v) => (v < -1 ? -1 : v > 1 ? 1 : v);
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function VisualSystem({ media = "desktop" }) {
  const wrap = useRef(null);
  const field = useRef({
    tx: 0, ty: 0, px: 0, py: 0, wx: 0, wy: 0,
    influence: 0, targetInfluence: 0, progress: 0, exit: 0, reduced: false,
  }).current;
  const [reduced] = useState(() => reducedMotion());
  const [visible, setVisible] = useState(true);
  const desktop = media === "desktop";

  field.reduced = reduced;
  if (reduced) field.progress = 1;

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    const apply = (p) => {
      field.progress = desktop ? smooth(0.05, 0.62, p) : p;
      field.exit = desktop ? smooth(0.82, 1, p) : 0;
    };
    const st = ScrollTrigger.create({
      trigger: desktop ? el.closest("section") || el : el,
      start: desktop ? "top top" : "top 92%",
      end: desktop ? "bottom bottom" : "top 28%",
      onUpdate: (self) => apply(self.progress),
    });
    apply(st.progress);
    return () => st.kill();
  }, [field, desktop, reduced]);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = wrap.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      field.tx = clamp1(((e.clientX - r.left) / r.width) * 2 - 1);
      field.ty = clamp1(-((((e.clientY - r.top) / r.height) * 2) - 1));
      field.targetInfluence = 1;
    };
    const onLeave = () => { field.targetInfluence = 0; field.tx = 0; field.ty = 0; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [field, reduced]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "15%" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <VisualSystemScene
        field={field}
        tier={desktop ? "full" : "lite"}
        reduced={reduced}
        frameloop={visible ? "always" : "never"}
      />
    </div>
  );
}
