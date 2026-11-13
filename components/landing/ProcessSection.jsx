/** Proceso en 5 pasos, con el plazo real de una landing. Estático, sin animaciones de scroll. */
export default function ProcessSection({ process }) {
  return (
    <section className="lp-sec lp-process" id="proceso" aria-labelledby="lp-process-title">
      <div className="lp-wrap">
        <header>
          <p className="lp-eyebrow">{process.label}</p>
          <h2 id="lp-process-title" className="lp-h2">{process.title}</h2>
        </header>
        <ol className="lp-process__steps">
          {process.steps.map((step, i) => (
            <li key={step.title} className="lp-process__step">
              <span className="lp-process__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="lp-h3">{step.title}</h3>
              <p className="lp-process__text">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="lp-process__note">{process.note}</p>
        <p className="lp-process__closing">{process.closing}</p>
      </div>
    </section>
  );
}
