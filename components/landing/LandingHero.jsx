import WhatsAppIcon from "./WhatsAppIcon";

/** Primer pantallazo: qué hago, para quién, y las dos formas de contactar. */
export default function LandingHero({ hero, whatsapp }) {
  return (
    <section className="lp-hero lp-wrap" aria-labelledby="lp-hero-title">
      <p className="lp-eyebrow">{hero.eyebrow}</p>
      <h1 id="lp-hero-title" className="lp-title">{hero.title}</h1>
      <p className="lp-lead">{hero.subtitle}</p>
      <div className="lp-actions">
        <a className="lp-btn lp-btn--primary" href="#contacto">
          {hero.primary}
          <span className="lp-btn__dot" aria-hidden="true" />
        </a>
        {whatsapp && (
          <a className="lp-btn lp-btn--ghost" href={whatsapp} target="_blank" rel="noopener">
            <WhatsAppIcon />
            {hero.secondary}
            <span className="lp-sr">(abre WhatsApp)</span>
          </a>
        )}
      </div>
      <p className="lp-note">{hero.note}</p>
    </section>
  );
}
