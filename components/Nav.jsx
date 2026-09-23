"use client";
import { useEffect, useState } from "react";
import { getLenis } from "./lib/scroll";
import Action from "./ui/Action";

const LINKS = [["PROYECTOS", "#work"], ["SERVICIOS", "#services"], ["PROCESO", "#process"], ["NOSOTROS", "#about"], ["CONTACTO", "#contact"]];

/*
  Integrada con la página: sin barra propia.
  - Toma el tono de la sección que tiene debajo (claro / oscuro).
  - Se esconde al bajar y vuelve al subir; cuando vuelve lleva el mismo
    fondo que la sección, sin borde ni sombra.
  - Sección activa: el punto se estira en una cápsula verde.
*/
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState("base");
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      const probe = 36;
      let t = "base";
      document.querySelectorAll("[data-tone]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) t = s.dataset.tone;
      });
      setTone(t);
      let a = "";
      const mid = window.innerHeight * 0.45;
      LINKS.forEach(([, h]) => {
        const s = document.querySelector(h);
        if (!s) return;
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) a = h;
      });
      setActive(a);
      setScrolled(y > 40);
      if (Math.abs(y - lastY) > 6) { setHidden(y > lastY && y > 320); lastY = y; }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop(); else l?.start();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dark = open || tone !== "base";
  return (
    <>
      <header
        className={`nav ${dark ? "tone-dark" : "tone-base"} ${hidden && !open ? "is-hidden" : ""} fixed inset-x-0 top-0 z-50 text-fg`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        onFocus={() => setHidden(false)}
      >
        <div className={`absolute inset-0 -z-10 bg-bg transition-opacity duration-500 ${scrolled && !open ? "opacity-100" : "opacity-0"}`} />
        <div className="wrap grid-12 h-16 items-center lg:h-[4.75rem]">
          <a href="#top" className="col-span-2 flex items-baseline gap-5 md:col-span-4 lg:col-span-4" aria-label="JDV, volver al inicio">
            <span className="d text-[1.55rem] leading-none tracking-[-0.05em]">JDV</span>
            <span className="meta hidden text-muted md:inline">Digital studio — Buenos Aires</span>
          </a>
          <nav className="hidden items-center justify-between lg:col-span-5 lg:col-start-5 lg:flex" aria-label="Principal">
            {LINKS.map(([l, h]) => (
              <a key={h} href={h} className={`nav-link meta ${active === h ? "is-active" : ""}`} aria-current={active === h ? "true" : undefined}>
                <i />{l}
              </a>
            ))}
          </nav>
          <div className="hidden justify-end lg:col-span-3 lg:col-start-10 lg:flex">
            <Action href="#contact" size="sm">EMPEZAR UN PROYECTO</Action>
          </div>
          <div className="col-span-2 flex justify-end md:col-span-4 lg:hidden">
            <button
              type="button"
              className="meta flex items-center gap-2.5 rounded-full px-4 py-2.5"
              style={{ boxShadow: "inset 0 0 0 1px rgb(var(--c-line))" }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <i className={`h-1.5 rounded-full transition-all duration-500 ${open ? "w-4 bg-accent" : "w-1.5 bg-fg"}`} />{open ? "CERRAR" : "MENÚ"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`tone-dark fixed inset-0 z-40 flex flex-col justify-end bg-bg text-fg transition-[clip-path] duration-700 lg:hidden ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
        style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))", transitionTimingFunction: "var(--ease-io)" }}
        aria-hidden={!open}
      >
        <nav className="wrap" aria-label="Menú móvil">
          {LINKS.map(([l, h], i) => (
            <a key={h} href={h} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-t border-line py-3">
              <span className="meta tabular-nums text-muted">0{i + 1}</span>
              <span className="d d-lg">{l}</span>
            </a>
          ))}
          <div className="mt-10"><Action href="#contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>EMPEZAR UN PROYECTO</Action></div>
        </nav>
      </div>
    </>
  );
}
