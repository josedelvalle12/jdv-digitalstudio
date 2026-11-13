/**
 * Imágenes de la landing (compartidas por ambos mercados). Los textos
 * alternativos y los pies van en ar.js / es.js.
 *
 * Capturas de Estudio Aduanero: versiones optimizadas de las de
 * public/assets, con la franja de contacto personal del cliente difuminada.
 */
export const MEDIA = {
  /** Foto para "Quién soy". null = el bloque se muestra sin foto. */
  photo: null, // { src: "/landing/jose-del-valle.webp", width: 1200, height: 1500 }

  aduanero: {
    before: { src: "/landing/estudio-aduanero-antes.webp", width: 1600, height: 799 },
    after: { src: "/landing/estudio-aduanero-despues.webp", width: 1600, height: 798 },
    url: "https://estudio-aduanero-pablozecca.netlify.app/",
  },
};
