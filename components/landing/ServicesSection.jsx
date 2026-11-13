/**
 * Oferta: tres niveles de web (servicio principal) con precio y moneda por
 * mercado, y dos complementos (Google Ads y plan mensual). Sin acordeones:
 * todo visible para comparar de un vistazo.
 */
export default function ServicesSection({ services }) {
  return (
    <section className="lp-sec lp-services" id="servicios" aria-labelledby="lp-services-title">
      <div className="lp-wrap">
        <header>
          <p className="lp-eyebrow">{services.label}</p>
          <h2 id="lp-services-title" className="lp-h2">{services.title}</h2>
          <p className="lp-sec__intro">{services.intro}</p>
        </header>

        <ul className="lp-tiers">
          {services.tiers.map((tier) => (
            <li key={tier.name} className="lp-tier">
              <h3 className="lp-h3">{tier.name}</h3>
              <p className="lp-tier__desc">{tier.description}</p>
              <p className="lp-tier__price">
                <span className="lp-tier__from">{services.fromLabel}</span>
                <span className="lp-tier__amount">{tier.price}</span>
              </p>
              <p className="lp-tier__time">
                <span>{services.timeLabel}</span> {tier.time}
              </p>
              <div className="lp-tier__list">
                <p className="lp-tier__list-label">{services.listLabel}</p>
                <ul>
                  {tier.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <a className="lp-btn lp-btn--ghost lp-tier__cta" href="#contacto">{services.cta}</a>
            </li>
          ))}
        </ul>

        <h3 className="lp-addons__label">{services.addonsLabel}</h3>
        <ul className="lp-addons">
          {services.addons.map((addon) => (
            <li key={addon.name} className="lp-addon">
              <div className="lp-addon__head">
                <h4 className="lp-h3">{addon.name}</h4>
                <span className="lp-tag">{addon.price}</span>
              </div>
              <p className="lp-addon__desc">{addon.description}</p>
              {addon.note && <p className="lp-addon__note">{addon.note}</p>}
            </li>
          ))}
        </ul>

        <p className="lp-services__foot">{services.footnote}</p>
      </div>
    </section>
  );
}
