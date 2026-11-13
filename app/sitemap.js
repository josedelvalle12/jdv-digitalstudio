import { SITE_URL } from "@/lib/seo";
import { LANDING_ALTERNATES, LANDING_INDEXABLE } from "@/lib/landing";

/*
  Netlify (producción de la home editorial): el sitemap sigue siendo el de
  siempre, con la home como única URL.

  Cualquier otro destino (Railway, la landing comercial): la raíz "/" solo
  redirige a /diseno-web, así que no se lista. Las dos landings se listan
  recién cuando LANDING_INDEXABLE es true; mientras tengan noindex, un
  sitemap con esas URLs generaría errores en Search Console.
*/
export default function sitemap() {
  if (process.env.NETLIFY) {
    return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
  }
  if (!LANDING_INDEXABLE) return [];

  const languages = Object.fromEntries(
    Object.entries(LANDING_ALTERNATES).map(([lang, path]) => [lang, `${SITE_URL}${path}`]),
  );
  return ["/diseno-web", "/es/diseno-web"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
