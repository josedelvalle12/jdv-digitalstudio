"use client";
import { useRef } from "react";
import Reveal from "../ui/Reveal";
import { PhotoFrame } from "../ui/Visuals";
import { useParallax } from "../lib/hooks";

const DATA = [["Base", "Buenos Aires / Argentina"], ["Modalidad", "Trabajo remoto / internacional"], ["Trabajo", "Proyectos seleccionados"]];

export default function About() {
  const img = useRef(null);
  useParallax(img, 5);
  return (
    <section id="about" data-tone="base" aria-labelledby="about-title" className="border-t border-line sec">
      <div className="wrap grid-12 gap-y-14">
        <figure className="col-span-full md:col-span-4 lg:col-span-5">
          <PhotoFrame innerRef={img} className="aspect-[4/5] w-full" src="/assets/escritorio.png" alt="Escritorio de trabajo, dos monitores con código y teclado mecánico" />
          <figcaption className="mt-4 flex justify-between border-t border-line pt-3">
            <span className="meta text-muted">Fig. — Escritorio</span>
            <span className="meta text-muted">Buenos Aires, 2026</span>
          </figcaption>
        </figure>
        <div className="col-span-full flex flex-col md:col-span-4 md:col-start-5 lg:col-span-5 lg:col-start-8">
          <span className="meta text-muted">About</span>
          <Reveal id="about-title" className="d d-xl mt-6" lines={["Pequeño", "por diseño."]} />
          <p data-reveal className="b-lg mt-10 max-w-[32ch]">
            Trabajo de forma independiente, combinando estrategia, UX/UI, desarrollo y contenido visual para crear experiencias digitales para empresas que están listas para evolucionar.
          </p>
          <dl className="mt-auto pt-14">
            {DATA.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 border-t border-fg/20 py-4 last:border-b last:border-b-fg/20">
                <dt className="meta text-muted">{k}</dt>
                <dd className="meta col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
