"use client";
import { useEffect, useRef } from "react";
import Reveal from "../ui/Reveal";
import { ScrollTrigger } from "../lib/scroll";

const STEPS = [
  ["01", "Descubrimiento", "Negocio / audiencia / objetivos"],
  ["02", "Propuesta", "Alcance / tiempos / inversión"],
  ["03", "Kickoff", "Dirección / contenido / milestones"],
  ["04", "UX / UI", "Estructura primero. Diseño después."],
  ["05", "Desarrollo", "Convertimos la experiencia aprobada en un producto real."],
  ["06", "QA", "Pruebas / responsive / detalles"],
  ["07", "Lanzamiento", "Deploy / analytics / últimos ajustes"],
];
// Escalera: cada paso empieza una columna más a la derecha (de la idea al lanzamiento)
const START = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4", "lg:col-start-5", "lg:col-start-6", "lg:col-start-7"];

export default function Process() {
  const list = useRef(null);
  useEffect(() => {
    const sts = [...list.current.querySelectorAll(".step")].map((row) =>
      ScrollTrigger.create({ trigger: row, start: "top 68%", endTrigger: "html", end: "bottom top", toggleClass: { targets: row, className: "is-on" } })
    );
    // paso actual: el que cruza la línea de lectura (marca verde)
    sts.push(...[...list.current.querySelectorAll(".step")].map((row) =>
      ScrollTrigger.create({ trigger: row, start: "top 68%", end: "bottom 68%", toggleClass: { targets: row, className: "is-current" } })
    ));
    return () => sts.forEach((s) => s.kill());
  }, []);

  return (
    <section id="process" data-tone="base" aria-labelledby="process-title" className="border-t border-line sec">
      <div className="wrap grid-12 gap-y-6">
        <span className="meta col-span-full text-muted lg:col-span-2 lg:pt-4">Proceso</span>
        <Reveal id="process-title" className="d d-xl col-span-full lg:col-span-9" lines={["De la idea", "al lanzamiento."]} />
      </div>

      <ol ref={list} className="wrap mt-20 md:mt-28">
        {STEPS.map(([n, t, d], i) => (
          <li key={n} className="step grid-12 py-5 md:py-6">
            <div className={`col-span-full md:col-span-7 lg:col-span-6 ${START[i]}`} style={{ paddingLeft: `min(${i * 3}vw, ${i * 10}px)` }}>
              <div className="step__rule h-px bg-fg/40" />
              <div className="mt-4 flex items-baseline gap-5">
                <span className="meta relative tabular-nums">{n}<i className="step__mark pill pill--dot absolute -left-4 top-[.2em]" /></span>
                <h3 className="d d-md">{t}</h3>
              </div>
              <p className="b mt-2 max-w-[34ch] pl-[2.6rem] opacity-80">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="wrap grid-12 mt-24 md:mt-36">
        <Reveal as="p" className="d d-lg col-span-full lg:col-span-8 lg:col-start-5" lines={["Alcance claro. Comunicación clara.", "Sin sorpresas."]} />
      </div>
    </section>
  );
}
