import Image from "next/image";
import { MEDIA } from "@/content/landing/media";

/**
 * Prueba: un caso real con antes y después. Estático (sin slider ni JS)
 * para que la comparación se vea igual en cualquier dispositivo.
 */
export default function WorkSection({ work }) {
  const img = MEDIA.aduanero;
  const shots = [
    { ...img.before, ...work.before, key: "before" },
    { ...img.after, ...work.after, key: "after" },
  ];
  return (
    <section className="lp-sec" id="trabajos" aria-labelledby="lp-work-title">
      <div className="lp-wrap">
        <header>
          <p className="lp-eyebrow">{work.label}</p>
          <h2 id="lp-work-title" className="lp-h2">{work.title}</h2>
        </header>

        <div className="lp-compare">
          {shots.map((s) => (
            <figure key={s.key} className="lp-shot">
              <Image
                src={s.src}
                width={s.width}
                height={s.height}
                alt={s.alt}
                sizes="(min-width: 60rem) 36rem, 100vw"
              />
              <figcaption className={s.key === "after" ? "lp-shot__cap lp-shot__cap--after" : "lp-shot__cap"}>
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="lp-case">
          <div>
            <h3 className="lp-h3">{work.name}</h3>
            <p className="lp-case__sector">{work.sector}</p>
            <a className="lp-link" href={img.url} target="_blank" rel="noopener">
              {work.link} <span aria-hidden="true">↗</span>
              <span className="lp-sr">(se abre en otra pestaña)</span>
            </a>
          </div>
          <dl className="lp-dl">
            {work.details.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
