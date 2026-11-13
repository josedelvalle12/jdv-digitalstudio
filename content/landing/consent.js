/**
 * Textos del aviso de medición. España pide aceptación antes de medir
 * (Consent Mode v2: por defecto todo denegado). Argentina informa y mide
 * por defecto, con opción de no permitirlo.
 */
export const CONSENT = {
  ar: {
    text: "Esta página usa Google Analytics y Google Ads para medir las visitas y saber qué anuncios funcionan.",
    accept: "Entendido",
    reject: "No permitir",
    more: "Más información",
    label: "Aviso de medición",
    privacyPath: "/diseno-web/privacidad",
  },
  es: {
    text: "Uso cookies de Google Analytics y Google Ads para medir las visitas y saber qué anuncios funcionan. Puedes aceptarlas o rechazarlas.",
    accept: "Aceptar",
    reject: "Rechazar",
    more: "Más información",
    label: "Aviso de cookies",
    privacyPath: "/es/diseno-web/privacidad",
  },
};
