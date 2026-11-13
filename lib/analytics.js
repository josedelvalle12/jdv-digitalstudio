/**
 * Medición de la landing (GA4 + Google Ads). Todo sale de variables de
 * entorno NEXT_PUBLIC_ (se fijan al compilar: si las cambiás, redeploy).
 * Sin IDs no se carga ninguna etiqueta ni aparece ningún aviso.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";                       // G-XXXXXXXXXX
export const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID || "";                     // AW-XXXXXXXXX
export const ADS_LABELS = {
  form: process.env.NEXT_PUBLIC_ADS_LABEL_FORM || "",                           // etiqueta de "Formulario enviado"
  whatsapp: process.env.NEXT_PUBLIC_ADS_LABEL_WHATSAPP || "",                   // etiqueta de "Clic en WhatsApp"
};
export const ANALYTICS_ENABLED = Boolean(GA_ID || ADS_ID);
