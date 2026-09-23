"use client";
import { useRef } from "react";
import { useScrollSteps } from "../lib/hooks";
import { Lines } from "../ui/Reveal";
import { ProblemVisual } from "../ui/Visuals";
import WebGLSlot from "../stage/WebGLSlot";

/*
  7 pasos. Desplazamiento tipográfico: cada frase entra por máscara
  y ocupa una posición distinta del grid; las anteriores pasan a contorno.
  En "Pero tu web siguió igual." la sección se invierte (contraste).
*/
const STEPS = 7;

function Phrase({ lines, show, past, className = "" }) {
  return (
    <p className={`d transition-[color,-webkit-text-stroke] duration-700 ${past ? "outline-text" : ""} ${className}`} aria-hidden={!show}>
      <Lines lines={lines} show={show} step={0.08} />
    </p>
  );
}

export default function Problem() {
  const ref = useRef(null);
  const bar = useRef(null);
  const a = useScrollSteps(ref, STEPS, (p) => { if (bar.current) bar.current.style.transform = `scaleX(${p})`; });
  const inv = a >= 5;
  const size = { fontSize: "clamp(3rem, min(7.8vw, 14vh), 10.5rem)" };

  return (
    <section id="problema" data-tone={inv ? "inv" : "base"} aria-label="El problema">
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + STEPS * 60}vh` }}>
        <div className={`${inv ? "tone-inv" : "tone-base"} sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-bg pb-10 pt-24 text-fg transition-colors duration-700`}>
          <div className="wrap flex items-center justify-between">
            <span className="meta">El problema</span>
            <span className="meta tabular-nums text-muted">{String(a + 1).padStart(2, "0")} / {String(STEPS).padStart(2, "0")}</span>
          </div>

          <div className="wrap grid-12 relative flex-1 items-center" style={size}>
            <div className="stack col-span-8 self-center">
              <div className={a <= 1 ? "" : "pointer-events-none opacity-0 transition-opacity duration-500"}>
                <Phrase lines={["Tu negocio", "evolucionó."]} show={a <= 1} past={a === 1} />
                <Phrase lines={["¿Y tu presencia", "digital?"]} show={a === 1} className="mt-[.25em] pl-[2.4em]" />
              </div>
              <div className={a >= 2 && a <= 4 ? "" : "pointer-events-none opacity-0 transition-opacity duration-500"}>
                <Phrase lines={["Tu empresa creció."]} show={a >= 2 && a <= 4} past={a > 2} />
                <Phrase lines={["Tus servicios cambiaron."]} show={a >= 3 && a <= 4} past={a > 3} className="mt-[.12em] pl-[1.2em]" />
                <Phrase lines={["Tu audiencia cambió."]} show={a === 4} className="mt-[.12em] pl-[2.4em]" />
              </div>
              <div className={inv ? "" : "pointer-events-none opacity-0"}>
                <Phrase lines={["Pero tu web", "siguió igual."]} show={inv} className="text-[1.12em]" />
                <p className={`b-lg mt-10 max-w-[30ch] pl-[.2em] transition-[opacity,transform] duration-700 ease-out ${a >= 6 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.5rem)" }}>
                  Tu presencia digital debería comunicar dónde está tu negocio hoy, no dónde estaba hace unos años.
                </p>
              </div>
            </div>
            <WebGLSlot id="rings" state={a} className="col-span-4 col-start-9 self-center">
              <ProblemVisual step={a} />
            </WebGLSlot>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-line">
            <div ref={bar} className="h-px origin-left bg-fg" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET: la misma secuencia como lectura vertical con cambio de contraste */}
      <div className="lg:hidden">
        <div className="wrap py-24 md:py-32">
          <span className="meta">El problema</span>
          <div className="d mt-10" style={{ fontSize: "clamp(2.7rem, 12vw, 5.5rem)" }}>
            <p>Tu negocio evolucionó.</p>
            <p className="outline-text mt-3">¿Y tu presencia digital?</p>
            <p className="mt-16">Tu empresa creció.</p>
            <p className="pl-[.8em]">Tus servicios cambiaron.</p>
            <p className="pl-[1.6em]">Tu audiencia cambió.</p>
          </div>
          <div className="mt-16 w-4/5 max-w-sm"><ProblemVisual step={4} /></div>
        </div>
        <div className="tone-inv bg-bg py-24 text-fg md:py-32">
          <div className="wrap">
            <p className="d" style={{ fontSize: "clamp(3rem, 14vw, 6rem)" }}>Pero tu web siguió igual.</p>
            <p className="b-lg mt-8 max-w-[30ch]">Tu presencia digital debería comunicar dónde está tu negocio hoy, no dónde estaba hace unos años.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
