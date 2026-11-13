import { NextResponse } from "next/server";

/**
 * En el dominio propio (Railway) solo vive la landing comercial: la raíz
 * redirige a /diseno-web. La home editorial queda como proyecto de diseño
 * únicamente en Netlify (rama main), sin el dominio propio.
 *
 * - Conserva la query (gclid, utm_*), para no perder la atribución de Ads.
 * - 307 (temporal) mientras la estructura del sitio pueda cambiar.
 * - Guarda de seguridad: en *.netlify.app no redirige, por si este archivo
 *   llegara alguna vez a la rama que publica Netlify.
 */
export function middleware(request) {
  if (request.nextUrl.hostname.endsWith(".netlify.app")) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = "/diseno-web";
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: "/" };
