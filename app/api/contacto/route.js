/**
 * Formulario de la landing -> email vía Resend (API REST, sin dependencias).
 *
 * Acepta dos formatos:
 * - JSON (envío con JavaScript): responde JSON { ok }.
 * - application/x-www-form-urlencoded (sin JavaScript): responde 303 a la
 *   página de gracias o de vuelta al formulario con #contacto-error.
 *
 * Variables de entorno (Railway):
 *   RESEND_API_KEY  obligatoria; sin ella no se envía nada (503).
 *   CONTACT_TO      destino, por defecto hola@josedelvalle.dev.
 *   CONTACT_FROM    remitente de un dominio verificado en Resend.
 *
 * Protección: campo trampa para bots, límite de envíos por IP, chequeo de
 * origen y límites de largo. El correo va en texto plano (sin HTML).
 */

const MARKETS = { ar: "/diseno-web", es: "/es/diseno-web" };
const RATE = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
  Ojo: Tailwind lee los archivos de app/ (comentarios incluidos) buscando
  nombres de clase. Una palabra suelta que coincida con una utilidad (por
  ejemplo, el método de arrays que filtra) genera reglas nuevas en la hoja
  global de la home. Por eso acá se usan bucles y nombres neutros.
*/
const line = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const paragraph = (v, max) => String(v ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);

function rateLimited(ip) {
  const now = Date.now();
  const recent = [];
  for (const t of hits.get(ip) || []) if (now - t < RATE.windowMs) recent.push(t);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();                     // tope de memoria
  return recent.length > RATE.max;
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;                                // envíos sin Origin (algunos navegadores, pruebas)
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try { return new URL(origin).host === host; } catch { return false; }
}

export async function POST(request) {
  const isJson = (request.headers.get("content-type") || "").includes("application/json");
  let data = {};
  try {
    data = isJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {}

  const market = data.mercado === "es" ? "es" : "ar";
  const base = MARKETS[market];
  const respond = (ok, status, reason) =>
    isJson
      ? Response.json({ ok, reason }, { status })
      : new Response(null, { status: 303, headers: { Location: ok ? `${base}/gracias` : `${base}#contacto-error` } });

  // Bots: el campo trampa está oculto para personas. Se responde "ok" sin enviar nada.
  if (line(data.sitio_web, 200)) return respond(true, 200);
  if (!sameOrigin(request)) return respond(false, 403, "origen");

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (rateLimited(ip)) return respond(false, 429, "limite");

  const name = line(data.nombre, 80);
  const email = line(data.email, 120);
  const phone = line(data.telefono, 40);
  const need = line(data.necesidad, 40);
  const message = paragraph(data.mensaje, 3000);
  if (!name || !EMAIL_RE.test(email)) return respond(false, 400, "datos");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[contacto] RESEND_API_KEY no configurada: la consulta no se envió");
    return respond(false, 503, "no-configurado");
  }

  const text = [
    `Nueva consulta desde la landing (${market.toUpperCase()})`,
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `WhatsApp: ${phone || "-"}`,
    `Necesita: ${need || "-"}`,
    "",
    "Mensaje:",
    message || "-",
    "",
    `Página: ${base}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "JDV Digital Studio <hola@josedelvalle.dev>",
        to: [process.env.CONTACT_TO || "hola@josedelvalle.dev"],
        reply_to: email,
        subject: `Nueva consulta (${market.toUpperCase()}): ${name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.warn(`[contacto] Resend respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return respond(false, 502, "envio");
    }
  } catch (e) {
    console.warn(`[contacto] no se pudo contactar a Resend: ${e.message}`);
    return respond(false, 502, "envio");
  }
  return respond(true, 200);
}
