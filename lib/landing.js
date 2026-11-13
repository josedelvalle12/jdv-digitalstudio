/**
 * SEO de la landing comercial (/diseno-web y /es/diseno-web).
 *
 * Archivo propio para no modificar lib/seo.js ni app/layout.jsx, que son
 * de la home editorial. metadataBase (dominio) lo hereda del layout raíz,
 * así que todas las rutas de acá son relativas.
 */

/**
 * false hasta el lanzamiento: las landings llevan noindex/nofollow para que
 * Google no indexe una versión a medio construir. Se pasa a true en la etapa
 * final, cuando decidas publicar.
 */
export const LANDING_INDEXABLE = false;

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

/** Página de gracias: nunca se indexa (solo tiene sentido después de enviar el formulario). */
export function thanksMetadata(content) {
  return {
    title: `${content.thanks.title} | ${LANDING_BRAND}`,
    alternates: { canonical: `${content.path}/gracias` },
    robots: { index: false, follow: false },
  };
}
