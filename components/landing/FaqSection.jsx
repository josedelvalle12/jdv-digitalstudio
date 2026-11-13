/** Preguntas frecuentes con <details>: se abren sin JavaScript y son accesibles por teclado. */
export default function FaqSection({ faq }) {
  return (
    <section className="lp-sec lp-faq" id="preguntas" aria-labelledby="lp-faq-title">
      <div className="lp-wrap lp-split">
        <header>
          <p className="lp-eyebrow">{faq.label}</p>
          <h2 id="lp-faq-title" className="lp-h2">{faq.title}</h2>
        </header>
        <div className="lp-faq__list">
          {faq.items.map((item) => (
            <details key={item.q} className="lp-faq__item">
              <summary>
                <h3 className="lp-faq__q">{item.q}</h3>
                <span className="lp-faq__icon" aria-hidden="true" />
              </summary>
              <p className="lp-faq__a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
