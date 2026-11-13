/** El problema: que el visitante se reconozca en la situación. Estático, sin scroll fijado. */
export default function ProblemSection({ problem }) {
  return (
    <section className="lp-sec" aria-labelledby="lp-problem-title">
      <div className="lp-wrap lp-split">
        <header>
          <p className="lp-eyebrow">{problem.label}</p>
          <h2 id="lp-problem-title" className="lp-h2">{problem.title}</h2>
          <p className="lp-sec__intro">{problem.intro}</p>
        </header>
        <ol className="lp-problems">
          {problem.points.map((point, i) => (
            <li key={point.title} className="lp-problem">
              <span className="lp-problem__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="lp-h3">{point.title}</h3>
                <p className="lp-problem__text">{point.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
