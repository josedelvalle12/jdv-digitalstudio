import { SITE_URL } from "@/lib/seo";

/*
  El sitio es una SPA de una sola página (todas las secciones — proyectos,
  servicios, proceso, about, FAQ, contacto — viven en "/" como anclas).
  No hay rutas adicionales para indexar: si en el futuro se agregan páginas
  propias (ej. un caso de estudio por proyecto), se suman acá.
*/
export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
