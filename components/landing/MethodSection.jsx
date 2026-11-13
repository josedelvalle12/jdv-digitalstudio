/**
 * Método en 3 pasos: web (servicio principal) -> tráfico -> mejora.
 * Google Ads y el plan mensual aparecen como continuación de la web, nunca
 * como un negocio aparte.
 */
export default function MethodSection({ method }) {
  return (
    <section className="lp-sec lp-dark" id="metodo" aria-labelledby="lp-method-title">
      <div className="lp-wrap">
        <header>
          <p className="lp-eyebrow">{method.label}</p>
          <h2 id="lp-method-title" className="lp-h2">{method.title}</h2>
          <p className="lp-sec__intro">{method.intro}</p>
        </header>
        <ol className="lp-steps">
          {method.steps.map((step, i) => (
            <li key={step.title} className="lp-step">
              <div className="lp-step__top">
                <span className="lp-step__n" aria-hidden="true">{i + 1}</span>
                <span className={i === 0 ? "lp-tag lp-tag--main" : "lp-tag"}>{step.tag}</span>
              </div>
              <h3 className="lp-h3">{step.title}</h3>
              <p className="lp-step__text">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="lp-sec__cta">
          <a className="lp-btn lp-btn--primary" href="#contacto">
            {method.cta}
            <span className="lp-btn__dot" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
