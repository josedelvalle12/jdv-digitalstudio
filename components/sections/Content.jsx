"use client";
import { useRef } from "react";
import Reveal from "../ui/Reveal";
import { FilmFrame } from "../ui/Visuals";
import { useParallax, useScaleIn } from "../lib/hooks";

export default function Content() {
  const wide = useRef(null), tall = useRef(null), sq = useRef(null);
  useScaleIn(wide, 0.82);
  useParallax(tall, 16);
  useParallax(sq, 7);

  return (
    <section id="contenido" data-tone="dark" aria-labelledby="content-title" className="tone-dark overflow-hidden bg-bg py-28 text-fg md:py-44">
      <div className="wrap grid-12 gap-y-8">
        <span className="meta col-span-full text-muted lg:col-span-2 lg:pt-4">Contenido</span>
        <Reveal id="content-title" className="d d-xl col-span-full lg:col-span-10" lines={["Lo digital no", "termina en la web."]} />
        <p data-reveal className="b-lg col-span-full max-w-[28ch] text-muted md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-10">
          A veces una buena experiencia necesita algo más que una interfaz.
        </p>
      </div>

      <div className="mt-20 md:mt-28">
        <FilmFrame innerRef={wide} label="VIDEO PRINCIPAL" className="mx-auto aspect-[4/5] w-full md:aspect-[21/9]" tone={0} src="/assets/01_jdv_Corporativo.mp4" />
      </div>

      <div className="wrap grid-12 mt-8 gap-y-8 md:mt-10">
        <div className="col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-2">
          <FilmFrame innerRef={tall} label="VERTICAL / REDES" ratio="9:16" tc="00:00:08:12" className="aspect-[9/16] w-full lg:mt-32" tone={1} src="/assets/02_jdv_Redes.mp4" />
        </div>
        <div className="col-span-2 self-end md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-6">
          <FilmFrame innerRef={sq} label="CAMPAÑA" ratio="4:5" tc="00:00:21:00" className="aspect-[4/5] w-full" tone={2} src="/assets/03_jdv_Campaña.mp4" />
        </div>
        <div className="col-span-full self-end lg:col-span-3 lg:col-start-10">
          <p data-reveal className="d d-md">Contenido pensado para funcionar en tu web, tus campañas y tus redes.</p>
        </div>
      </div>
    </section>
  );
}
