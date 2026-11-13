/**
 * Datos de contacto compartidos por ambos mercados.
 *
 * Un valor vacío NO se muestra: el botón correspondiente desaparece de la
 * landing en lugar de quedar roto. Completar solo con datos reales.
 */
export const CONTACT = {
  /** Solo dígitos, con código de país y sin "+", p. ej. 5491100000000. */
  whatsapp: "5491138198682", // +54 9 11 3819-8682 (formato wa.me: 54 + 9 + área sin 0 + número sin 15)
  /** Publicar solo cuando el dominio ya reciba correo (probado desde afuera). */
  email: "hola@josedelvalle.dev",
};

/** Enlace de WhatsApp con mensaje inicial, o null si no hay número. */
export function whatsappUrl(text) {
  if (!CONTACT.whatsapp) return null;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}
