"use client";
import { useState } from "react";
import Action from "../ui/Action";
import Reveal from "../ui/Reveal";

const TIERS = [
  { name: "Launch", from: "$500", d: "Para necesidades digitales concretas.", ex: ["Landing pages", "Lanzamientos", "Nuevos servicios", "Campañas"] },
  { name: "Business", from: "$900", d: "Para empresas listas para replantear su presencia digital.", ex: ["Rediseño web", "Sitios corporativos", "UX/UI", "Desarrollo", "Analytics", "SEO técnico básico"] },
  { name: "Growth", from: "$1.200", d: "Para experiencias digitales más complejas.", ex: ["Integraciones", "CMS", "CRM", "Automatizaciones", "Contenido dinámico", "Interacciones avanzadas"] },
];

/*
  Filas grandes. Nombre y precio comparten línea de base (la misma escala).
  Hover: filete de tinta que se dibuja + desplazamiento del nombre.
  Activa: cápsula verde junto al número + botón relleno.
*/
export default function Services() {
  const [open, setOpen] = useState(1);

  return (
    <section id="services" data-tone="base" aria-labelledby="services-title" className="sec border-t border-line">
      <div className="wrap grid-12 gap-y-6">
        <span className="meta col-span-full text-muted lg:col-span-2 lg:pt-4">Servicios / inversión</span>
        <div className="col-span-full lg:col-span-10">
          <Reveal id="services-title" className="d d-xl" lines={["Elegí la escala."]} />
          <Reveal as="p" className="d d-xl text-muted" lines={["Nosotros definimos", "el alcance."]} />
        </div>
      </div>

      <div className="wrap mt-20 md:mt-28">
        {TIERS.map((t, i) => {
          const isOpen = open === i;
          return (
            <div key={t.name} className="group relative border-t border-fg/25 last:border-b last:border-b-fg/25">
              <span
                className={`absolute left-0 top-[-1px] h-px bg-fg transition-transform duration-[900ms] ${isOpen ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"} origin-left`}
                style={{ transitionTimingFunction: "var(--ease-out)" }}
              />
              <h3>
                <button
                  type="button"
                  className="grid-12 w-full items-baseline gap-y-3 py-8 text-left md:py-11"
                  aria-expanded={isOpen}
                  aria-controls={`tier-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="meta col-span-1 flex items-center gap-2.5 self-start pt-2 tabular-nums text-muted">
                    0{i + 1}
                    <i className={`pill pill--bar transition-transform duration-500 ${isOpen ? "scale-100" : "scale-0"}`} style={{ transformOrigin: "left", transitionTimingFunction: "var(--ease-out)" }} />
                  </span>
                  <span className="d d-lg col-span-2 transition-transform duration-700 group-hover:translate-x-3 md:col-span-3 lg:col-span-4 lg:col-start-3" style={{ transitionTimingFunction: "var(--ease-out)" }}>
                    {t.name}
                  </span>
                  <span className="b col-span-full hidden max-w-[28ch] text-muted lg:col-span-2 lg:col-start-7 lg:block">{t.d}</span>
                  <span className="col-span-3 col-start-2 flex items-baseline gap-3 md:col-span-3 md:col-start-5 lg:col-span-3 lg:col-start-9">
                    <span className="meta text-muted">Desde</span>
                    <span className="d d-lg tabular-nums">{t.from}</span>
                  </span>
                  <span className="col-span-1 col-start-4 row-start-1 flex justify-end self-start md:col-start-8 lg:col-start-12" aria-hidden="true">
                    <span className={`pm ${isOpen ? "is-open" : ""}`} />
                  </span>
                </button>
              </h3>
              <div id={`tier-${i}`} className={`expand ${isOpen ? "is-open" : ""}`}>
                <div>
                  <div className="expand__in grid-12 gap-y-8 pb-14">
                    <p className="b col-span-full max-w-[32ch] text-muted lg:hidden">{t.d}</p>
                    <span className="meta col-span-full text-muted lg:col-span-2 lg:col-start-3 lg:pt-1">Ejemplos</span>
                    <ul className="col-span-full grid grid-cols-2 gap-x-6 gap-y-2.5 lg:col-span-5 lg:col-start-7">
                      {t.ex.map((e) => <li key={e} className="d-sm" style={{ letterSpacing: "-.02em" }}>{e}</li>)}
                    </ul>
                    <div className="col-span-full lg:col-span-5 lg:col-start-7">
                      <Action href="#contact" variant="secondary" tabIndex={isOpen ? 0 : -1}>EMPEZAR UN PROYECTO</Action>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="wrap grid-12 mt-16 md:mt-20">
        <p data-reveal className="b-lg col-span-full max-w-[36ch] lg:col-span-4 lg:col-start-7">Cada proyecto se define alrededor del negocio, no de una lista rígida de funcionalidades.</p>
      </div>
    </section>
  );
}
