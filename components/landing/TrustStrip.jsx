/** Franja de confianza: solo condiciones reales de trabajo (ver content/landing). */
export default function TrustStrip({ trust }) {
  return (
    <section className="lp-trust" aria-label={trust.label}>
      <ul className="lp-wrap lp-trust__list">
        {trust.items.map((item) => (
          <li key={item} className="lp-trust__item">{item}</li>
        ))}
      </ul>
    </section>
  );
}
