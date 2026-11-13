import Image from "next/image";
import { MEDIA } from "@/content/landing/media";

/**
 * Quién soy: nombre, forma de trabajo y datos verificables. La foto se
 * agrega sola cuando MEDIA.photo tiene valor; mientras tanto el bloque se
 * muestra solo con texto, sin un hueco vacío.
 */
export default function AboutSection({ about }) {
  const photo = MEDIA.photo;
  return (
    <section className="lp-sec lp-about" id="quien-soy" aria-labelledby="lp-about-title">
      <div className="lp-wrap lp-split">
        {photo ? (
          <figure className="lp-about__photo">
            <Image src={photo.src} width={photo.width} height={photo.height} alt={about.photoAlt} sizes="(min-width: 60rem) 28rem, 100vw" />
          </figure>
        ) : (
          <header>
            <p className="lp-eyebrow">{about.label}</p>
            <h2 id="lp-about-title" className="lp-h2">{about.title}</h2>
          </header>
        )}
        <div>
          {photo && (
            <header>
              <p className="lp-eyebrow">{about.label}</p>
              <h2 id="lp-about-title" className="lp-h2">{about.title}</h2>
            </header>
          )}
          <p className="lp-about__text">{about.text}</p>
          <dl className="lp-dl lp-dl--compact">
            {about.facts.map(([k, v]) => (
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
