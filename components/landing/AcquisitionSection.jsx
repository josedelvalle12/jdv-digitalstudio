/**
 * Adquisición digital (Google Ads y Meta Ads) como continuación de la web.
 * Reutiliza .lp-dark, .lp-split, .lp-tag y .lp-btn; sin promesas de resultados.
 */
export default function AcquisitionSection({ acquisition: a }) {
  return (
    <section className="lp-sec lp-dark" id="campanas" aria-labelledby="lp-acq-title">
      <div className="lp-wrap">
        <div className="lp-split">
          <header>
            <p className="lp-eyebrow">{a.label}</p>
            <h2 id="lp-acq-title" className="lp-h2">{a.title}</h2>
            <p className="lp-sec__intro">{a.intro}</p>
          </header>
          <ul className="lp-acq__channels">
            {a.channels.map((ch) => (
              <li key={ch.name} className="lp-acq__ch">
                <h3 className="lp-h3">{ch.name}</h3>
                <p>{ch.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-acq__cols">
          <div>
            <h3 className="lp-acq__label">{a.loopLabel}</h3>
            <ul className="lp-acq__list">
              {a.loop.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="lp-acq__label">{a.stepsLabel}</h3>
            <ul className="lp-acq__list">
              {a.steps.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>

        <div className="lp-acq__foot">
          <div>
            <p className="lp-acq__closing">{a.closing}</p>
            <p className="lp-acq__price">
              <span className="lp-tag">{a.price}</span>
              <span>{a.priceNote}</span>
            </p>
          </div>
          <a className="lp-btn lp-btn--primary" href="#contacto">
            {a.cta}
            <span className="lp-btn__dot" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
