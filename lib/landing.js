/**
 * SEO de la landing comercial (/diseno-web y /es/diseno-web).
 *
 * Archivo propio para no modificar lib/seo.js ni app/layout.jsx, que son
 * de la home editorial. metadataBase (dominio) lo hereda del layout raíz,
 * así que todas las rutas de acá son relativas.
 */

import { SITE_URL } from "./seo";
import { CONTACT } from "../content/landing/contact";

const OWNER_EMAIL = CONTACT.email;

/**
 * Lanzada (true): las landings y las páginas legales se pueden indexar. Con
 * false vuelven a llevar noindex/nofollow y el sitemap queda vacío.
 */
export const LANDING_INDEXABLE = true;

export const LANDING_BRAND = "JDV Digital Studio";

/** Variantes por mercado. x-default apunta a Argentina (mercado inicial). */
export const LANDING_ALTERNATES = {
  "es-AR": "/diseno-web",
  "es-ES": "/es/diseno-web",
  "x-default": "/diseno-web",
};

/**
 * Metadatos de Next para una variante de la landing. Los objetos openGraph y
 * twitter se definen completos porque Next no los combina con los del layout
 * raíz: un hijo que los declara reemplaza el objeto entero.
 */
export function landingMetadata(content) {
  const { title, description, ogLocale } = content.meta;
  const image = { url: "/og-image.jpg", width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    alternates: { canonical: content.path, languages: LANDING_ALTERNATES },
    openGraph: {
      title,
      description,
      url: content.path,
      siteName: LANDING_BRAND,
      type: "website",
      locale: ogLocale,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: LANDING_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** Políticas y aviso legal: siguen el mismo criterio de indexación que la landing. */
export function legalMetadata(content, kind) {
  const doc = content.legal[kind];
  return {
    title: `${doc.title} | ${LANDING_BRAND}`,
    alternates: { canonical: `${content.path}/${doc.slug}` },
    robots: LANDING_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** Página de gracias: nunca se indexa (solo tiene sentido después de enviar el formulario). */
export function thanksMetadata(content) {
  return {
    title: `${content.thanks.title} | ${LANDING_BRAND}`,
    alternates: { canonical: `${content.path}/gracias` },
    robots: { index: false, follow: false },
  };
}

const COUNTRY = { ar: "Argentina", es: "España" };

/**
 * Datos estructurados de la landing (schema.org): la página, el servicio de
 * diseño web y sus tres niveles con precio "desde" en la moneda del mercado.
 * Solo incluye lo que se ve en la página; sin reseñas ni cifras inventadas.
 */
export function landingStructuredData(content) {
  const url = `${SITE_URL}${content.path}`;
  const { currency, tiers } = content.services;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: content.meta.title,
        description: content.meta.description,
        inLanguage: content.lang,
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        serviceType: "Diseño y desarrollo web",
        name: content.meta.title,
        description: content.meta.description,
        url,
        inLanguage: content.lang,
        areaServed: { "@type": "Country", name: COUNTRY[content.market] },
        provider: {
          "@type": "ProfessionalService",
          name: LANDING_BRAND,
          url,
          email: OWNER_EMAIL,
          address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: content.services.title,
          itemListElement: tiers.map((tier) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: tier.name, description: tier.description },
            priceSpecification: { "@type": "PriceSpecification", minPrice: tier.amount, priceCurrency: currency },
          })),
        },
      },
    ],
  };
}
