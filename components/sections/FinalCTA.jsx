"use client";
import { useEffect, useRef } from "react";
import Action from "../ui/Action";
import { gsap, reducedMotion, DESKTOP, MOBILE } from "../lib/scroll";

/*
  Dos capas idénticas: la base (tono de página) y la capa de cierre
  (negro). La capa de cierre sube con un
  clip-path en arco mientras la sección entra: el texto cambia de color
  exactamente donde pasa el borde.
*/
function Body({ hidden }) {
  return (
    <div className="wrap grid-12 h-full content-center gap-y-12 py-28" aria-hidden={hidden || undefined}>
      <span className="meta col-span-full text-muted">Empecemos</span>
      <h2 id={hidden ? undefined : "cta-title"} className="d col-span-full lg:col-span-11" style={{ fontSize: "clamp(3.2rem, min(10vw, 16vh), 13rem)" }}>
        <span className="block">¿Qué estás</span>
        <span className="flex items-center gap-[.2em]">
          {/* GREEN SHAPE · la cápsula del hero vuelve: el sitio empieza y termina igual */}
          <span className="pill pill--textured h-[.62em] w-[.9em] shrink-0 translate-y-[.05em] md:w-[1.5em]" aria-hidden="true" />
          construyendo
        </span>
        <span className="block">ahora?</span>
      </h2>
      <p className="b-lg col-span-full max-w-[32ch] md:col-span-5 lg:col-span-3 lg:col-start-2">
        Contame dónde está hoy tu negocio, hacia dónde querés llevarlo y qué necesita cambiar.
      </p>
      <div className="col-span-full md:justify-self-end">
        <Action href="#contact" size="xl" tabIndex={hidden ? -1 : undefined}>EMPEZAR UN PROYECTO</Action>
      </div>
    </div>
  );
}

export default function FinalCTA() {
  const section = useRef(null);
  const layer = useRef(null);
  useEffect(() => {
    const mm = gsap.matchMedia();

    // DESKTOP (sin cambios): arco desde el borde inferior de la sección
    mm.add(DESKTOP, () => {
      const t = gsap.fromTo(
        layer.current,
        { clipPath: reducedMotion() ? "ellipse(150% 150% at 50% 100%)" : "ellipse(80% 0% at 50% 100%)" },
        { clipPath: "ellipse(150% 150% at 50% 100%)", ease: "none", scrollTrigger: { trigger: section.current, start: "top 85%", end: "top top", scrub: true } }
      );
      return () => { t.scrollTrigger?.kill(); t.kill(); };
    });

    // MOBILE: la sección es más alta que el viewport, así que el arco no puede
    // nacer en su borde inferior (quedaría fuera de pantalla). El borde del
    // negro se ancla a la parte visible y sube con el progreso:
    //   ~20 % empieza a verse · ~50 % mayormente oscuro · ~72 % oscuro completo.
    mm.add(MOBILE, () => {
      const vh = () => window.innerHeight;
      const shape = (top) => `inset(${top}px 0px -40% 0px round 50% 50% 0% 0% / 64px 64px 0px 0px)`;
      if (reducedMotion()) { gsap.set(layer.current, { clipPath: shape(-200) }); return; }
      const t = gsap.fromTo(
        layer.current,
        { clipPath: () => shape(vh() * 0.28) },
        { clipPath: () => shape(vh() * -0.14), ease: "none",
          scrollTrigger: { trigger: section.current, start: "top bottom", end: "top top", scrub: true, invalidateOnRefresh: true } }
      );
      return () => { t.scrollTrigger?.kill(); t.kill(); };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="cta" data-tone="cta" aria-labelledby="cta-title" className="relative min-h-[100svh] bg-bg">
      <div className="min-h-[100svh]"><Body /></div>
      <div ref={layer} className="tone-cta absolute inset-0 bg-bg text-fg" style={{ clipPath: "ellipse(80% 0% at 50% 100%)" }}>
        <Body hidden />
      </div>
    </section>
  );
}
