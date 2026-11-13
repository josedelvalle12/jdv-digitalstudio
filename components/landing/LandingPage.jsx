/**
 * Landing comercial. Componente de servidor: todo el contenido llega en el
 * HTML inicial y es visible sin JavaScript.
 *
 * No usa Cursor, SmoothScroll, WebGL ni utilidades de Tailwind: los estilos
 * viven en landing.css con prefijo lp- para no alterar la hoja de la home.
 *
 * Etapa 1: esqueleto con el hero de texto. Las secciones se suman por etapas.
 */
export default function LandingPage({ content }) {
  const { hero } = content;
  return (
    <main className="lp" lang={content.lang}>
      <section className="lp-hero" aria-labelledby="lp-hero-title">
        <p className="lp-eyebrow">{hero.eyebrow}</p>
        <h1 id="lp-hero-title" className="lp-title">{hero.title}</h1>
        <p className="lp-lead">{hero.subtitle}</p>
      </section>
    </main>
  );
}
