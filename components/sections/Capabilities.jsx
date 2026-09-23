"use client";
import { useEffect, useRef } from "react";
import Reveal, { Lines, useInView } from "../ui/Reveal";
import { gsap, reducedMotion } from "../lib/scroll";

// Cada palabra ocupa otra posición del grid y deriva en dirección opuesta al scroll
const CAPS = [
  // size: cada disciplina tiene su propio peso en la página
  { n: "01", w: "Estrategia", d: "Entender el negocio, la audiencia, los objetivos y las oportunidades.", col: "lg:col-start-1", dcol: "lg:col-start-9", drift: -3, size: "clamp(3rem, 9.4vw, 12rem)" },
  { n: "02", w: "UX / UI", d: "Estructurar y diseñar experiencias que hagan más clara la información y más fácil la acción.", col: "lg:col-start-5", dcol: "lg:col-start-1", drift: 4, size: "clamp(3.4rem, 12.5vw, 15rem)" },
  { n: "03", w: "Desarrollo", d: "Construir experiencias digitales rápidas, responsive y escalables.", col: "lg:col-start-3", dcol: "lg:col-start-10", drift: -3, size: "clamp(3rem, 8.2vw, 10.5rem)" },
  { n: "04", w: "Contenido", d: "Crear piezas visuales que ayuden a comunicar más allá de la interfaz.", col: "lg:col-start-6", dcol: "lg:col-start-2", drift: 3, size: "clamp(3rem, 8.8vw, 11rem)" },
];

function Cap({ c }) {
  const ref = useRef(null);
  const show = useInView(ref, "top 85%");
  return (
    <li ref={ref} className="cap-row grid-12 gap-y-3 border-t border-line py-8 md:py-10" tabIndex={0}>
      <span className={`meta col-span-full flex items-center gap-3 tabular-nums text-muted lg:col-span-6 ${c.col}`}>
        <i className="cap-dot pill pill--bar" />{c.n}
      </span>
      <p data-drift={c.drift} className={`d cap-word col-span-full whitespace-nowrap lg:col-span-7 ${c.col}`} style={{ fontSize: c.size }} aria-label={c.w}>
        <span aria-hidden="true"><Lines lines={[c.w]} show={show} /></span>
      </p>
      <p className={`b col-span-full max-w-[32ch] text-muted transition-[opacity,transform] delay-300 duration-1000 md:col-span-5 md:col-start-4 lg:col-span-3 lg:row-start-2 lg:self-end ${c.dcol} ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionTimingFunction: "var(--ease-out)" }}>{c.d}</p>
    </li>
  );
}

export default function Capabilities() {
  const list = useRef(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const tws = [...list.current.querySelectorAll("[data-drift]")].map((el) =>
        gsap.fromTo(el, { xPercent: -+el.dataset.drift }, { xPercent: +el.dataset.drift, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } })
      );
      return () => tws.forEach((t) => t.kill());
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="capacidades" data-tone="base" aria-labelledby="cap-title" className="overflow-hidden border-t border-line sec">
      <div className="wrap grid-12 gap-y-6">
        <span className="meta col-span-full text-muted lg:col-span-2 lg:pt-4">Capacidades</span>
        <Reveal id="cap-title" className="d d-lg col-span-full lg:col-span-8" lines={["Un proyecto.", "Múltiples disciplinas."]} />
      </div>

      <ul ref={list} className="wrap mt-20 md:mt-28">
        {CAPS.map((c) => <Cap key={c.n} c={c} />)}
      </ul>

      <div className="wrap grid-12 mt-24 md:mt-36">
        <div className="col-span-full lg:col-span-9 lg:col-start-4">
          <Reveal as="p" className="d d-lg" lines={["Estrategia. Diseño.", "Tecnología. Contenido."]} />
          <p className="d d-lg mt-2 text-muted">Conectados desde el principio.</p>
        </div>
      </div>
    </section>
  );
}
