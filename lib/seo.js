/**
 * Configuración central de SEO. Único lugar para actualizar dominio,
 * title/description por defecto y los datos reutilizados en el JSON-LD.
 *
 * Dominio: todavía no está configurado en el proyecto. Se resuelve vía
 * NEXT_PUBLIC_SITE_URL (ver .env.example) y cae a un placeholder que deja
 * claro que hay que reemplazarlo antes de producción — nunca se inventa
 * un dominio real.
 */
const FALLBACK_SITE_URL = "https://REEMPLAZAR-CON-TU-DOMINIO.com";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, "");

export const SITE_NAME = "JDV";
export const PERSON_NAME = "Jose Del Valle";
export const LOCALE = "es_AR";

export const SITE_TITLE = "Jose Del Valle — Experiencias digitales para empresas";
export const SITE_DESCRIPTION =
  "Estrategia, UX/UI, desarrollo web y contenido audiovisual para empresas que están creciendo, evolucionando o lanzando algo nuevo.";

/** JSON-LD (@graph): Person + WebSite + ProfessionalService. Solo datos visibles/verificables en el sitio. */
export function getStructuredData() {
  const personId = `${SITE_URL}/#person`;
  const businessId = `${SITE_URL}/#business`;
  const websiteId = `${SITE_URL}/#website`;
  const address = { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON_NAME,
        alternateName: SITE_NAME,
        url: SITE_URL,
        address,
        worksFor: { "@id": businessId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "es-AR",
        publisher: { "@id": businessId },
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        founder: { "@id": personId },
        address,
        areaServed: ["Argentina", "Remoto / internacional"],
        priceRange: "$500–$1.200+",
        knowsAbout: ["Estrategia digital", "UX/UI", "Desarrollo web", "Contenido audiovisual"],
      },
    ],
  };
}
