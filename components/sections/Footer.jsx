const LINKS = [["PROYECTOS", "#work"], ["SERVICIOS", "#services"], ["PROCESO", "#process"], ["NOSOTROS", "#about"], ["CONTACTO", "#contact"]];

export default function Footer() {
  return (
    <footer data-tone="dark" className="tone-dark overflow-hidden bg-bg text-fg">
      <div className="wrap grid-12 gap-y-10 border-t border-line pt-14">
        <p className="b-lg col-span-full max-w-[26ch] md:col-span-4 lg:col-span-4">Experiencias digitales para empresas listas para crecer.</p>
        <nav className="col-span-2 flex flex-col gap-6 md:col-span-2 lg:col-span-2 lg:col-start-7" aria-label="Footer">
          {LINKS.map(([l, h]) => <a key={h} href={h} className="meta self-start -mx-1 -my-1.5 px-1 py-1.5">{l}</a>)}
        </nav>
        <div className="meta col-span-2 space-y-2 text-muted md:col-span-2 lg:col-span-3 lg:col-start-10">
          <p>Buenos Aires / Argentina</p>
          <p>Trabajando con clientes de todo el mundo.</p>
          <p className="pt-6">© 2026</p>
        </div>
      </div>
      <p className="d pointer-events-none select-none whitespace-nowrap px-3 pt-10 leading-[.74] md:px-6" style={{ fontSize: "clamp(8rem, 42vw, 46rem)", textTransform: "none", marginBottom: "-0.12em" }} aria-label="JDV">
        JDV
      </p>
    </footer>
  );
}
