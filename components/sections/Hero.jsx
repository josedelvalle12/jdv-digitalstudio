"use client";
import { useEffect, useRef, useState } from "react";
import Action from "../ui/Action";
import { HeroComposition, Tag } from "../ui/Visuals";
import { Lines } from "../ui/Reveal";
import WebGLSlot from "../stage/WebGLSlot";
import { gsap, ScrollTrigger, DESKTOP, reducedMotion } from "../lib/scroll";

/*
  HERO
  El titular tiene una "abertura" (cápsula) entre palabras.
  En desktop, al hacer scroll la abertura se expande hasta ocupar
  todo el viewport y revela el HERO VISUAL (clip-path + escala).
  Candidato natural para WebGL en una etapa posterior.
*/
export default function Hero() {
  const wrap = useRef(null);
  const pin = useRef(null);
  const ap = useRef(null);
  const stage = useRef(null);
  const copy = useRef(null);
  const skin = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShow(true), 120); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP, () => {
      // Geometría de layout, no visual: getBoundingClientRect arrastra los
      // transforms de la máscara de entrada y la abertura nacía desplazada.
      const rect = () => {
        const c = pin.current;
        let x = 0, y = 0;
        for (let n = ap.current; n && n !== c; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
        // Sí sumamos el transform propio del pill (translate-y), que es parte de
        // su posición final; los de los ancestros son la animación de entrada.
        const tr = getComputedStyle(ap.current).transform;
        if (tr && tr !== "none") { const m = new DOMMatrixReadOnly(tr); x += m.e; y += m.f; }
        const w = ap.current.offsetWidth, h = ap.current.offsetHeight;
        return `inset(${y}px ${c.offsetWidth - (x + w)}px ${c.offsetHeight - (y + h)}px ${x}px round ${h / 2}px)`;
      };
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom bottom", scrub: reducedMotion() ? true : 0.8, invalidateOnRefresh: true },
      });
      tl.fromTo(stage.current, { clipPath: rect }, { clipPath: "inset(0px 0px 0px 0px round 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .to(skin.current, { opacity: 0, ease: "none", duration: 0.22 }, 0.02)
        .to(copy.current, { opacity: 0, y: -40, ease: "power1.in", duration: 0.45 }, 0)
        .to({}, { duration: 0.35 });
      // El ancho del pill se anima: re-medimos cuando termina, con timeout de
      // respaldo por si transitionend no llega (pestaña en segundo plano).
      const pill = ap.current;
      const settled = () => ScrollTrigger.refresh();
      pill.addEventListener("transitionend", settled);
      const t = setTimeout(settled, 2000);
      return () => { pill.removeEventListener("transitionend", settled); clearTimeout(t); tl.kill(); };
    });
    return () => mm.revert();
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const title = (
    <h1 className="d d-hero" aria-label="Experiencias digitales para empresas listas para crecer.">
      <span aria-hidden="true">
        <Lines
          show={show}
          step={0.09}
          lines={[
            "Experiencias",
            <span key="l2" className="flex items-center gap-[.18em]">
              digitales
              {/* GREEN SHAPE · cápsula: se abre después del titular y luego se convierte en ventana */}
              <span
                ref={ap}
                className={`pill pill--textured h-[.7em] shrink-0 translate-y-[.04em] transition-[width] duration-[900ms] ${show ? "w-[.95em] md:w-[1.9em]" : "w-0"}`}
                style={{ transitionTimingFunction: "var(--ease-out)", transitionDelay: show ? ".55s" : "0s" }}
              />
              para
            </span>,
            <span key="l3" className="block lg:pl-[1.2em]">empresas listas</span>,
            "para crecer.",
          ]}
        />
      </span>
    </h1>
  );

  return (
    <section id="top" data-tone="base" aria-label="Presentación">
      <div ref={wrap} className="relative lg:h-[230vh]">
        <div ref={pin} className="relative flex min-h-[100svh] flex-col pb-6 pt-20 lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden lg:pt-16">
          <div ref={copy} className="wrap grid-12 flex-1 content-end gap-y-6 md:gap-y-10 lg:gap-y-6">
            <p className={`meta col-span-full flex items-center gap-3 self-start transition-opacity md:pt-6 duration-1000 lg:col-span-6 ${show ? "opacity-100" : "opacity-0"}`}>
              <i className="h-1.5 w-1.5 rounded-full bg-accent" /> DIGITAL EXPERIENCES / WEB / CONTENT
            </p>
            <p className={`meta col-span-full hidden self-start pt-6 text-right text-muted transition-opacity duration-1000 lg:col-span-3 lg:col-start-10 lg:block ${show ? "opacity-100" : "opacity-0"}`}>
              Strategy / UX-UI / Development / Content
            </p>
            <div className="col-span-full lg:col-span-12">{title}</div>
            <div className={`col-span-full mt-3 flex flex-col gap-6 self-end pb-2 transition md:mt-0 md:gap-8-[opacity,transform] delay-500 duration-1000 ease-out md:col-span-6 lg:col-span-3 lg:col-start-10 ${show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <p className="b-lg max-w-[34ch] text-muted md:max-w-[30ch]">
                Estrategia, UX/UI, desarrollo y contenido visual para empresas que necesitan que su presencia digital evolucione con ellas.
              </p>
              <div className="flex flex-col items-start gap-4">
                <Action href="#contact">EMPEZAR UN PROYECTO</Action>
                <Action href="#work" variant="secondary">VER PROYECTOS</Action>
              </div>
            </div>
          </div>

          <div className="wrap mt-12 flex items-end justify-between md:mt-10">
            <span className="meta text-muted">DESLIZAR PARA EXPLORAR</span>
            <span className="scroll-cue text-fg" aria-hidden="true" />
          </div>

          {/* Escenario que se abre desde la cápsula (desktop) */}
          <div ref={stage} onPointerMove={onMove} className="hero-stage tone-dark pointer-events-auto absolute inset-0 z-10 hidden overflow-hidden bg-bg text-fg lg:block" style={{ clipPath: "inset(50% 50% 50% 50%)" }}>
            <div className="absolute inset-0">
              <WebGLSlot id="hero" scene="visual-system" media="desktop" className="h-full w-full">
                <HeroComposition className="h-full w-full" />
              </WebGLSlot>
            </div>
            {/* Piel de la cápsula: color de acento mientras está cerrada */}
            <div ref={skin} className="pill--textured absolute inset-0 bg-accent" />
            <div className="wrap absolute inset-x-0 bottom-8 flex items-end justify-between">
              <Tag>VISUAL SYSTEM — ESTRATEGIA / DISEÑO / TECNOLOGÍA / CONTENIDO</Tag>
              <span className="meta text-muted">JDV — 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: el visual va debajo, sin pin */}
      <div className="wrap pb-16 lg:hidden">
        <div className="media tone-dark relative aspect-[4/5] overflow-hidden bg-bg text-fg md:aspect-[16/10]">
          <WebGLSlot id="hero" scene="visual-system" media="mobile" className="absolute inset-0">
            <HeroComposition className="absolute inset-0 h-full w-full" />
          </WebGLSlot>
          <Tag className="absolute bottom-3 left-3">VISUAL SYSTEM</Tag>
        </div>
      </div>
    </section>
  );
}
