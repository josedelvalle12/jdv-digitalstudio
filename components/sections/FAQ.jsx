"use client";
import { useState } from "react";

const QUESTIONS = [
  {
    q: "¿Qué tipo de proyectos realizás?",
    a: "Trabajo en sitios web, rediseños, landing pages y experiencias digitales para empresas que están creciendo, evolucionando o lanzando algo nuevo. También puedo incorporar contenido audiovisual cuando el proyecto lo necesita.",
  },
  {
    q: "¿También rediseñás sitios existentes?",
    a: "Sí. Analizo qué funciona, qué puede mejorar y qué necesita el negocio actualmente. A partir de eso, puedo replantear la estructura, experiencia, diseño y desarrollo sin perder lo que ya funciona.",
  },
  {
    q: "¿Podés trabajar con nuestra marca actual?",
    a: "Sí. No es necesario empezar una identidad desde cero. Puedo trabajar respetando la identidad existente y adaptar la experiencia digital para que la marca se vea y se comunique de forma consistente.",
  },
  {
    q: "¿También creás contenido?",
    a: "Sí. Puedo crear y editar contenido audiovisual para complementar el proyecto: videos corporativos, contenido para redes, piezas promocionales y material visual para la web. El alcance depende de las necesidades del proyecto.",
  },
  {
    q: "¿Podés integrar CRM u otras herramientas?",
    a: "Sí. Dependiendo del proyecto, puedo integrar formularios, CRM, analytics, calendarios, herramientas de email, APIs y otras soluciones. Primero evaluamos qué necesita realmente el negocio y qué integración tiene sentido.",
  },
  {
    q: "¿Cuánto demora un proyecto?",
    a: "Depende del alcance. Una landing o proyecto de lanzamiento puede llevar alrededor de 1–2 semanas, mientras que un sitio corporativo suele requerir 3–4 semanas. Los proyectos más complejos pueden extenderse según sus funcionalidades.",
  },
  {
    q: "¿Qué sucede después de contactarte?",
    a: "Primero tenemos una conversación para entender tu negocio, el proyecto y qué necesitás resolver. Si hay un buen encaje, preparo una propuesta con alcance, tiempos e inversión. Una vez aprobado, coordinamos el kickoff y comenzamos.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" data-tone="base" aria-labelledby="faq-title" className="border-t border-line sec">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-full lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="meta text-muted">FAQ</span>
            <h2 id="faq-title" className="d d-lg mt-4">Preguntas frecuentes</h2>
          </div>
        </div>
        <div className="col-span-full lg:col-span-7 lg:col-start-6">
          {QUESTIONS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="group border-t border-fg/20 last:border-b last:border-b-fg/20">
                <h3>
                  <button type="button" className="flex w-full items-center gap-6 py-6 text-left md:py-8" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    <span className="meta w-8 shrink-0 self-baseline pt-1 tabular-nums text-muted">0{i + 1}</span>
                    <span className="flex-1 transition-transform duration-700 group-hover:translate-x-2" style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.6rem)", letterSpacing: "-.02em" }}>{q}</span>
                    <span className={`pm ${isOpen ? "is-open" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-${i}`} className={`expand ${isOpen ? "is-open" : ""}`}>
                  <div>
                    <div className="expand__in max-w-[52ch] pb-10 pl-14">
                      <p className="b text-muted">{a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
