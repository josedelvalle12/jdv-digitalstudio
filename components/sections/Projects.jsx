"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { TextLink } from "../ui/Action";
import Reveal from "../ui/Reveal";
import { Tag } from "../ui/Visuals";
import { gsap, reducedMotion } from "../lib/scroll";

/* El escenario se abre (clip-path) y el mockup se desplaza dentro (parallax). */
function useStage(stage, inner) {
  useEffect(() => {
    if (reducedMotion()) return;
    const t1 = gsap.fromTo(stage.current, { clipPath: "inset(12% 8% 12% 8% round 28px)" }, {
      clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
      scrollTrigger: { trigger: stage.current, start: "top bottom", end: "top 12%", scrub: true },
    });
    const t2 = gsap.fromTo(inner.current, { yPercent: 10 }, {
      yPercent: -8, ease: "none",
      scrollTrigger: { trigger: stage.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { [t1, t2].forEach((t) => { t.scrollTrigger?.kill(); t.kill(); }); };
  }, [stage, inner]);
}

function Chapter({ n, name, cats, desc, href, align = "left", stageClass, stageTone, children, innerRef, stageRef }) {
  const right = align === "right";
  return (
    <article className="group/p mt-32 md:mt-48" aria-label={name}>
      <div className="wrap grid-12 items-end gap-y-4">
        <span className="meta col-span-2 tabular-nums text-muted">{n} / 02</span>
        <span className="meta col-span-2 text-right text-muted transition-transform duration-700 group-hover/p:-translate-x-2 md:col-span-6 md:col-start-3 lg:col-span-4 lg:col-start-9" style={{ transitionTimingFunction: "var(--ease-out)" }}>{cats}</span>
        <h3
          className={`d d-xl col-span-full transition-transform duration-[900ms] ${right ? "group-hover/p:-translate-x-[1.5vw] lg:col-span-10 lg:col-start-3 lg:text-right" : "group-hover/p:translate-x-[1.5vw] lg:col-span-11"}`}
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        >
          {name}
        </h3>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="VIEW"
        aria-label={`Ver proyecto ${name} (se abre en una pestaña nueva)`}
        className="relative mt-8 block md:mt-12 lg:mx-7"
      >
        <div ref={stageRef} className={`${stageClass} ${stageTone} relative h-[68svh] overflow-hidden text-fg md:h-[84svh] lg:h-[92svh]`}>
          <div ref={innerRef} className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-full w-full items-center justify-center transition-transform duration-[1400ms] group-hover/p:scale-[1.03]" style={{ transitionTimingFunction: "var(--ease-out)" }}>
              {children}
            </div>
          </div>
          <Tag className="absolute left-4 top-4 md:left-7 md:top-7">{name}</Tag>
          <span className="absolute bottom-6 right-7 hidden translate-y-2 opacity-0 transition-[opacity,transform] duration-500 group-hover/p:translate-y-0 group-hover/p:opacity-100 lg:block">
            <TextLink as="span">VER PROYECTO</TextLink>
          </span>
        </div>
      </a>

      <div className="wrap grid-12 mt-8 gap-y-5 md:mt-10">
        <p data-reveal className={`b-lg col-span-full max-w-[34ch] md:col-span-5 ${right ? "lg:col-span-4 lg:col-start-3" : "lg:col-span-4 lg:col-start-5"}`}>{desc}</p>
        <div className={`col-span-full self-end md:col-span-3 md:col-start-6 md:justify-self-end ${right ? "lg:col-span-2 lg:col-start-11" : "lg:col-span-3 lg:col-start-10"}`}>
          <TextLink href={href} target="_blank" rel="noopener noreferrer">VER PROYECTO</TextLink>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const s1 = useRef(null), i1 = useRef(null), s2 = useRef(null), i2 = useRef(null);
  useStage(s1, i1);
  useStage(s2, i2);

  return (
    <section id="work" data-tone="base" aria-labelledby="work-title" className="pb-28 pt-28 md:pb-40 md:pt-44">
      <header className="wrap grid-12 gap-y-8">
        <span className="meta col-span-full text-muted lg:col-span-2 lg:pt-4">Selected work</span>
        <Reveal id="work-title" className="d d-xl col-span-full lg:col-span-9" lines={["Proyectos", "seleccionados"]} />
        <p data-reveal className="b-lg col-span-full max-w-[34ch] self-end text-muted md:col-span-5 md:col-start-4 lg:col-span-3 lg:col-start-10">
          Una selección de productos digitales y experiencias creadas para diferentes objetivos, audiencias y contextos.
        </p>
      </header>

      <Chapter
        n="01" name="ESTUDIO ADUANERO" cats="B2B / CORPORATE / DIGITAL EXPERIENCE"
        desc="Una experiencia digital más clara y contemporánea para un servicio profesional tradicional."
        href="https://estudio-aduanero-pablozecca.netlify.app/"
        stageClass="stage-1" stageTone="" stageRef={s1} innerRef={i1}
      >
        <div className="media relative aspect-[16/10] w-[92%] translate-y-[16%] shadow-[0_30px_80px_-50px_rgba(17,17,17,.4)] md:w-[78%] lg:w-[70%]">
          <Image src="/assets/landing-estudioaduanero.webp" alt="Estudio Aduanero — vista del sitio" fill sizes="70vw" className="object-cover object-top" />
        </div>
      </Chapter>

      <Chapter
        n="02" name="IMPERIUM" cats="DIGITAL PRODUCT / WEB APP" align="right"
        desc="Una plataforma de fitness diseñada alrededor del progreso, la motivación y la constancia."
        href="https://www.imperiumfit.app/"
        stageClass="stage-2" stageTone="tone-dark" stageRef={s2} innerRef={i2}
      >
        <div className="relative w-[112%] -translate-x-[4%] md:w-[88%] lg:w-[78%]">
          <div className="media relative aspect-[16/10] w-[84%]">
            <Image src="/assets/landing.imperium.webp" alt="Imperium — vista del sitio" fill sizes="60vw" className="object-cover object-top" />
          </div>
          <div className="media absolute -bottom-[10%] right-[6%] aspect-[9/19.5] w-[22%] rounded-[1.6rem] shadow-[0_20px_50px_-25px_rgba(0,0,0,.6)]">
            <Image src="/assets/app-imperium1.png" alt="Imperium — app móvil, progreso" fill sizes="22vw" className="object-cover" />
          </div>
          <div className="media absolute -top-[8%] right-[-6%] aspect-[9/19.5] w-[18%] rounded-[1.3rem] shadow-[0_20px_50px_-25px_rgba(0,0,0,.6)]">
            <Image src="/assets/app-imperium2.png" alt="Imperium — app móvil, entrenamientos" fill sizes="18vw" className="object-cover" />
          </div>
        </div>
      </Chapter>
    </section>
  );
}
