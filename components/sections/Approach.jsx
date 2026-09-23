"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/scroll";
import { useScrollSteps } from "../lib/hooks";

const LINES = ["No empezamos por el diseño.", "Empezamos por el problema.", "Lo estructuramos.", "Diseñamos la experiencia.", "La construimos.", "Y la llevamos al mundo."];
const PROCESS = ["Entender", "Estructurar", "Diseñar", "Desarrollar", "Lanzar"];
const STEPS = LINES.length + 1;

/*
  Tipografía fijada. La frase actual sube por máscara; la anterior sale por arriba
  y queda registrada en el índice. Al final se dibuja la línea de proceso y el
  punto verde la recorre hasta "Lanzar".
*/
/*
  MOBILE (< 1024px) — secuencia fijada, ligada al scroll.
  Cada paso de scroll activa una frase y el paso de proceso que le corresponde:
    frase 0 (No empezamos por el diseño) → ningún paso
    frase 1 → Entender · 2 → Estructurar · 3 → Diseñar · 4 → Desarrollar · 5 → Lanzar
  La línea vertical se rellena de verde hasta el paso activo.
  Solo transform/opacity; sin blur ni filtros.
*/
function MobileApproach() {
  const ref = useRef(null);
  const a = useScrollSteps(ref, LINES.length);
  const reached = a - 1; // índice del paso de proceso activo (-1 = ninguno)

  return (
    <div ref={ref} className="relative lg:hidden" style={{ height: `${100 + LINES.length * 48}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-10 pt-20">
        <div className="wrap flex items-baseline justify-between">
          <span className="meta">El enfoque</span>
          <span className="meta tabular-nums text-muted">{String(a + 1).padStart(2, "0")} / 06</span>
        </div>

        <div className="wrap stack flex-1 items-center" aria-live="polite">
          {LINES.map((l, i) => (
            <p
              key={l}
              className={`d max-w-[12ch] transition-[transform,opacity] duration-700 ${i === 0 ? "text-muted" : ""} ${
                i === a ? "translate-y-0 scale-100 opacity-100" : i < a ? "-translate-y-8 scale-[.98] opacity-0" : "translate-y-10 scale-[.98] opacity-0"
              }`}
              style={{ fontSize: "clamp(2.6rem, 11.6vw, 5.4rem)", transitionTimingFunction: "var(--ease-out)", transformOrigin: "left center" }}
              aria-hidden={i !== a}
            >
              {l}
            </p>
          ))}
        </div>

        <ol className="wrap relative" aria-label="Proceso">
          <div className="relative pl-8">
            {/* línea base + relleno verde hasta el paso activo */}
            <span className="absolute bottom-[14px] left-[5px] top-[14px] w-px bg-line" />
            <span
              className="absolute left-[4px] top-[14px] w-[3px] origin-top bg-accent transition-transform duration-700"
              style={{ bottom: "14px", transform: `scaleY(${Math.max(0, reached) / (PROCESS.length - 1)})`, transitionTimingFunction: "var(--ease-io)" }}
            />
            {PROCESS.map((p, i) => {
              const on = i <= reached;
              const current = i === reached;
              return (
                <li key={p} className="relative flex items-baseline gap-4 py-[5px]">
                  <span
                    className={`absolute -left-8 top-[9px] h-[11px] w-[11px] rounded-full border transition-[background-color,border-color,transform] duration-500 ${
                      on ? "border-accent bg-accent" : "border-fg/60 bg-bg"
                    } ${current ? "scale-[1.35]" : "scale-100"}`}
                  />
                  <span className={`meta w-6 tabular-nums transition-opacity duration-500 ${on ? "opacity-100" : "opacity-40"}`}>0{i + 1}</span>
                  <span className={`d d-sm transition-opacity duration-500 ${current ? "opacity-100" : on ? "opacity-60" : "opacity-30"}`}>{p}</span>
                </li>
              );
            })}
          </div>
        </ol>
      </div>
    </div>
  );
}

export default function Approach() {
  const ref = useRef(null);
  const step = useScrollSteps(ref, STEPS);
  const a = Math.min(step, LINES.length - 1);
  const done = step >= LINES.length;

  // Recorrido del punto verde: un solo tween controla punto, línea y nodos
  const dot = useRef(null);
  const fill = useRef(null);
  const prog = useRef({ p: 0 });
  const [reached, setReached] = useState(-1);
  useEffect(() => {
    const o = prog.current;
    const render = () => {
      if (dot.current) dot.current.style.left = `${o.p * 80}%`;
      if (fill.current) fill.current.style.transform = `scaleX(${o.p})`;
      setReached(o.p <= 0 ? -1 : Math.floor(o.p * 4 + 0.001));
    };
    const tw = done
      ? gsap.to(o, { p: 1, duration: reducedMotion() ? 0 : 2.2, delay: reducedMotion() ? 0 : 0.5, ease: "power2.inOut", onUpdate: render })
      : gsap.to(o, { p: 0, duration: reducedMotion() ? 0 : 0.4, ease: "power2.out", onUpdate: render });
    return () => tw.kill();
  }, [done]);

  return (
    <section id="enfoque" data-tone="inv" aria-label="El enfoque" className="tone-inv bg-bg text-fg">
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + STEPS * 55}vh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-14 pt-28">
          <div className="wrap grid-12">
            <span className="meta col-span-2">El enfoque</span>
            <span className="meta col-span-1 col-start-3 tabular-nums text-muted">{String(a + 1).padStart(2, "0")} / 06</span>
            <ol className="col-span-4 col-start-9 space-y-1.5" aria-hidden="true">
              {LINES.map((l, i) => (
                <li key={l} className={`meta flex gap-4 transition-[opacity,transform] duration-700 ${i < a || (done && i === a) ? "translate-x-0 opacity-70" : "translate-x-3 opacity-0"}`} style={{ transitionTimingFunction: "var(--ease-out)" }}>
                  <span className="tabular-nums text-muted">0{i + 1}</span>{l}
                </li>
              ))}
            </ol>
          </div>

          <div className="wrap grid-12 flex-1 items-end pb-[8vh]">
            <div className="stack col-span-11 col-start-1" aria-live="polite">
              {LINES.map((l, i) => (
                <p key={l} className="d self-end overflow-hidden pb-[.08em]" style={{ fontSize: "clamp(3.2rem, min(9.4vw, 16.5vh), 12.5rem)" }}>
                  <span
                    className={`block max-w-[13ch] transition-transform duration-[850ms] ${i === a ? "translate-y-0" : i < a ? "-translate-y-[115%]" : "translate-y-[115%]"} ${i === 0 ? "text-muted" : ""}`}
                    style={{ transitionTimingFunction: "var(--ease-out)", transitionDelay: i === a ? "220ms" : "0ms" }}
                  >
                    {l}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="wrap">
            <div className="relative grid grid-cols-5">
              <div className={`absolute left-0 right-[20%] top-[6px] h-px origin-left bg-fg/40 transition-transform duration-[1400ms] ${done ? "scale-x-100" : "scale-x-0"}`} style={{ transitionTimingFunction: "var(--ease-io)" }} />
              {/* línea base + relleno verde (hasta el último nodo) */}
              <div className="absolute left-[6px] right-[calc(20%-6px)] top-[6px] h-[2px]">
                <div ref={fill} className="h-full w-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
              </div>
              {/* GREEN SHAPE · punto que viaja hasta el destino */}
              <span
                ref={dot}
                className="pill absolute top-[-3px] z-10 h-[19px] w-[19px] transition-opacity duration-500"
                style={{ left: "0%", opacity: done ? 1 : 0, boxShadow: "0 0 0 4px rgb(var(--c-bg))" }}
              />
              {PROCESS.map((p, i) => {
                const on = i <= reached;
                return (
                  <div key={p} className={`relative transition-[opacity,transform] duration-700 ${done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`} style={{ transitionDelay: done ? `${i * 120}ms` : "0ms" }}>
                    <span className={`block h-[13px] w-[13px] rounded-full border transition-colors duration-300 ${on ? "border-accent bg-accent" : "border-fg bg-bg"}`} />
                    <span className={`meta mt-5 block tabular-nums transition-colors duration-500 ${on ? "text-fg" : "text-muted"}`}>0{i + 1}</span>
                    <span className="d d-sm mt-1 block">{p}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <MobileApproach />
    </section>
  );
}
