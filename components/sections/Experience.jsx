"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "../ui/Reveal";
import { ConceptVisual } from "../ui/Visuals";
import { gsap, ScrollTrigger, MOBILE, reducedMotion } from "../lib/scroll";

const ITEMS = [
  ["Claridad", "Hacer que tu propuesta de valor sea más fácil de entender."],
  ["Confianza", "Crear una presencia digital que refleje la calidad de tu negocio."],
  ["Dirección", "Dar a cada visitante un siguiente paso claro."],
  ["Consistencia", "Conectar marca, contenido y experiencia en un mismo sistema."],
];

/*
  MOBILE (< 1024px): cada concepto tiene su figura. Mientras cruza la pantalla:
  · las barras pasan de desordenadas al orden del concepto (reorganización)
  · el marco se dibuja de izquierda a derecha y la figura escala levemente (scrub)
  Al volver hacia arriba se desordena de nuevo. Solo transform/opacity.
*/
function MobileConcept({ index }) {
  const box = useRef(null);
  const rule = useRef(null);
  const [state, setState] = useState(-1);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOBILE, () => {
      if (reducedMotion()) { setState(index); return; }
      const st = ScrollTrigger.create({
        trigger: box.current, start: "top 78%", end: "bottom 20%",
        onEnter: () => setState(index), onEnterBack: () => setState(index),
        onLeaveBack: () => setState(-1),
      });
      const tw = gsap.fromTo(box.current, { scale: 0.9, opacity: 0.35 }, {
        scale: 1, opacity: 1, ease: "none",
        scrollTrigger: { trigger: box.current, start: "top bottom", end: "top 45%", scrub: true },
      });
      const tl = gsap.fromTo(rule.current, { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: box.current, start: "top 85%", end: "top 40%", scrub: true },
      });
      return () => { st.kill(); [tw, tl].forEach((t) => { t.scrollTrigger?.kill(); t.kill(); }); };
    });
    return () => mm.revert();
  }, [index]);

  return (
    <div className="mt-8 w-3/4 max-w-xs lg:hidden">
      <div ref={box} className="aspect-square origin-left"><ConceptVisual state={state} /></div>
      <div className="mt-3 h-px bg-line"><div ref={rule} className="h-px origin-left bg-fg" /></div>
      <span className="meta mt-3 block text-muted">Fig. 0{index + 1}</span>
    </div>
  );
}

/* Una figura de 8 barras reorganiza su orden según el concepto activo. */
export default function Experience() {
  const refs = useRef([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const sts = refs.current.map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setActive(i), onLeaveBack: () => i === 0 && setActive(-1) })
    );
    return () => sts.forEach((s) => s.kill());
  }, []);

  return (
    <section id="experiencia" data-tone="base" aria-labelledby="exp-title" className="py-28 md:py-44">
      <div className="wrap grid-12 gap-y-6">
        <span className="meta col-span-full text-muted lg:col-span-2 lg:pt-4">La experiencia</span>
        <Reveal id="exp-title" className="d d-xl col-span-full lg:col-span-10" lines={["Una web debería hacer", "más que verse bien."]} />
      </div>

      <div className="wrap grid-12 mt-16 md:mt-28">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-[18vh] w-[78%]">
            <div className="relative aspect-square">
              <ConceptVisual state={active} />
            </div>
            <div className="mt-5 flex justify-between border-t border-line pt-4">
              <span className="meta text-muted">Fig. {active < 0 ? "00" : `0${active + 1}`}</span>
              <span className="meta">{active < 0 ? "Sin sistema" : ITEMS[active][0]}</span>
            </div>
          </div>
        </div>

        <ol className="col-span-full lg:col-span-5 lg:col-start-8">
          {ITEMS.map(([t, d], i) => (
            <li
              key={t}
              ref={(el) => (refs.current[i] = el)}
              className={`flex flex-col justify-center border-t border-line py-12 transition-opacity duration-500 lg:min-h-[74svh] lg:border-0 lg:py-0 ${i === active ? "lg:opacity-100" : "lg:opacity-20"}`}
            >
              <span className="meta tabular-nums text-muted">0{i + 1}</span>
              <h3 className="d d-lg mt-4">{t}</h3>
              <p className="b-lg mt-5 max-w-[26ch] text-muted">{d}</p>
              <MobileConcept index={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
