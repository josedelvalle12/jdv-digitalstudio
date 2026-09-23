"use client";
import { useEffect, useRef, useState } from "react";
import { SystemVisual } from "../ui/Visuals";
import { gsap, DESKTOP, reducedMotion } from "../lib/scroll";

const MOMENTS = [
  { n: "01 / 03", t: ["Tu negocio", "creció."], d: "Tu presencia digital debería reflejar la empresa que estás construyendo hoy." },
  { n: "02 / 03", t: ["Estás lanzando", "algo nuevo."], d: "Un nuevo servicio merece algo más que otra página añadida a un sitio antiguo." },
  { n: "03 / 03", t: ["Estás listo para", "lo que viene."], d: "Construí una base digital preparada para acompañar la próxima etapa de tu negocio." },
];

/*
  El texto viaja en horizontal; el sistema visual queda fijo a la derecha
  y evoluciona en tres estados (crecer → sumar → estructurar).
*/
export default function Moments() {
  const wrap = useRef(null);
  const track = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP, () => {
      const el = track.current;
      const tw = gsap.to(el, {
        x: () => -(el.scrollWidth - el.parentElement.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current, start: "top top", end: "bottom bottom",
          scrub: reducedMotion() ? true : 0.7, invalidateOnRefresh: true,
          snap: reducedMotion() ? undefined : { snapTo: 1 / 2, duration: 0.6, delay: 0.1, ease: "power2.inOut" },
          onUpdate: (s) => setActive(Math.min(2, Math.round(s.progress * 2))),
        },
      });
      return () => tw.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="momentos" data-tone="base" aria-label="Cuándo es momento de cambiar" className="border-t border-line">
      <div ref={wrap} className="relative hidden lg:block" style={{ height: "340vh" }}>
        <div className="sticky top-0 grid h-[100svh] grid-cols-12 overflow-hidden">
          <div className="relative col-span-7 overflow-hidden">
            <div ref={track} className="flex h-full w-max will-change-transform">
              {MOMENTS.map((m, i) => (
                <article key={m.n} className={`flex h-full w-[58.333vw] flex-col justify-end pb-24 pl-14 pr-10 pt-32 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-20"}`}>
                  <span className="d outline-text leading-none" style={{ fontSize: "clamp(6rem, 13vw, 16rem)" }} aria-hidden="true">0{i + 1}</span>
                  <h3 className="d d-xl mt-6">{m.t.map((l) => <span key={l} className="block">{l}</span>)}</h3>
                  <p className="b-lg mt-8 max-w-[32ch] text-muted">{m.d}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative col-span-5 border-l border-line">
            <div className="absolute inset-x-12 top-28 flex items-baseline justify-between">
              <span className="meta">Cuándo es momento de cambiar</span>
              <span className="meta tabular-nums">{MOMENTS[active].n}</span>
            </div>
            <div className="absolute inset-12 top-40 bottom-28"><SystemVisual state={active} /></div>
            {/* GREEN SHAPE · indicador: el punto activo se estira en cápsula */}
            <div className="absolute inset-x-12 bottom-12 flex items-center gap-6">
              {MOMENTS.map((m, i) => (
                <span key={m.n} className="flex items-center gap-3">
                  <span
                    className={`block h-2 rounded-full transition-all duration-700 ${i === active ? "w-7 bg-accent" : i < active ? "w-2 bg-fg" : "w-2 bg-fg/20"}`}
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  />
                  <span className={`meta tabular-nums transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-40"}`}>0{i + 1}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET: cada momento es un capítulo con su estado del sistema */}
      <div className="py-24 md:py-32 lg:hidden">
        <div className="wrap"><span className="meta">Cuándo es momento de cambiar</span></div>
        {MOMENTS.map((m, i) => (
          <article key={m.n} className="wrap relative mt-14 border-t border-line pt-8">
            {/* el visual no participa del flujo: no agrega alto entre título y texto */}
            <div className="absolute right-5 top-8 w-[26%] max-w-[9rem] md:right-10" aria-hidden="true"><SystemVisual state={i} /></div>
            <span className="meta tabular-nums text-muted">{m.n}</span>
            <h3 className="d mt-4 max-w-[68%]" style={{ fontSize: "clamp(2.4rem, 10vw, 5rem)" }}>{m.t.join(" ")}</h3>
            <p className="b-lg mt-4 max-w-[32ch] text-muted">{m.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
