#!/usr/bin/env node
/**
 * Verificación de la rama feature/commercial-landing.
 *
 * El proyecto no tiene TypeScript, ESLint ni test runner: esta es la red de
 * seguridad. Se ejecuta DESPUÉS de `next build` (ver `npm run verify`).
 *
 *   1. Zonas protegidas: la home editorial no puede cambiar respecto de `main`.
 *   2. Estilo: sin guiones largos en los archivos de la landing.
 *   3. Regresión de la home: el HTML prerenderizado de "/" (normalizado) debe
 *      ser idéntico a la línea de base, y todas las reglas CSS de la línea de
 *      base deben seguir existiendo.
 *   4. Humo: levanta `next start` y comprueba que las rutas respondan. En las
 *      landings comerciales exige además H1 visible sin JS, canonical,
 *      hreflang, noindex (hasta el lanzamiento) y lang por mercado; y que la
 *      raíz redirija a la landing (la home editorial solo se publica en
 *      Netlify, desde main, pero su código igual se protege).
 *
 * El dominio se toma de NEXT_PUBLIC_SITE_URL: usá el mismo valor en el
 * build y en la verificación.
 *
 * Uso:
 *   npm run verify                         build + verificación
 *   npm run verify:only                    solo verificación (build ya hecho)
 *   node scripts/verify.mjs --update-baseline
 *       Regenera la línea de base. Solo tiene sentido con el código de la
 *       home idéntico a `main`; el script se niega si las zonas protegidas
 *       tienen cambios.
 *
 * No correr con `next dev` activo sobre este mismo proyecto: comparten `.next`.
 */
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NEXT_DIR = join(ROOT, ".next");
const BASELINE_DIR = join(ROOT, "scripts", "baseline");
const BASE_HTML = join(BASELINE_DIR, "home.html");
const BASE_CSS = join(BASELINE_DIR, "home.css");
const UPDATE = process.argv.includes("--update-baseline");
const PORT = Number(process.env.VERIFY_PORT || 3999);

/* Rutas que componen la home editorial: ningún cambio permitido. */
const PROTECTED = [
  "app/page.jsx",
  "app/layout.jsx",
  "app/globals.css",
  "app/fonts.css",
  "app/icon.svg",
  "app/robots.js",
  "components/HomePage.jsx",
  "components/Nav.jsx",
  "components/Cursor.jsx",
  "components/SmoothScroll.jsx",
  "components/GridOverlay.jsx",
  "components/sections",
  "components/stage",
  "components/ui",
  "components/lib",
  "tailwind.config.js",
  "postcss.config.js",
  "next.config.mjs",
];
/* Solo se permite agregar: ni modificar ni borrar lo existente. */
const ADD_ONLY_DIRS = ["public"];
/* Solo se permite agregar líneas (exports nuevos). */
const ADD_ONLY_FILES = ["lib/seo.js"];

/* Rutas a comprobar con el servidor levantado. */
const LANDING_ALTERNATES = { "es-AR": "/diseno-web", "es-ES": "/es/diseno-web", "x-default": "/diseno-web" };
const ROUTES = [
  /* En Railway la raíz redirige a la landing (middleware.js) sin perder gclid/utm. */
  { path: "/?gclid=prueba&utm_source=google", redirect: "/diseno-web?gclid=prueba&utm_source=google" },
  { path: "/robots.txt" },
  { path: "/sitemap.xml" },
  { path: "/diseno-web", h1: true, landing: true, lang: "es-AR" },
  { path: "/es/diseno-web", h1: true, landing: true, lang: "es-ES" },
  { path: "/landing/estudio-aduanero-antes.webp" },
  { path: "/landing/estudio-aduanero-despues.webp" },
  { path: "/_next/image?url=%2Flanding%2Festudio-aduanero-despues.webp&w=1200&q=75" },
];
/* Clases que esconden contenido hasta que corre JavaScript. */
const HIDING = /\b(opacity-0|invisible|hidden|sr-only|mask)\b/;

let failures = 0;
const ok = (msg) => console.log(`  ✓ ${msg}`);
const warn = (msg) => console.log(`  ! ${msg}`);
const fail = (msg) => { failures++; console.log(`  ✗ ${msg}`); };
const section = (t) => console.log(`\n${t}`);
const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

/* ------------------------------------------------------------------ */
function checkProtected() {
  section("1 · Zonas protegidas (comparado con main)");
  const branch = git("branch", "--show-current");
  if (branch === "main") fail("estás en main: el trabajo va en feature/commercial-landing");
  else ok(`rama: ${branch}`);

  const changed = git("diff", "--name-status", "main", "--", ...PROTECTED);
  const untracked = git("ls-files", "--others", "--exclude-standard", "--", ...PROTECTED);
  if (changed || untracked) fail(`cambios en archivos protegidos:\n${[changed, untracked].filter(Boolean).join("\n")}`);
  else ok("home editorial sin cambios");

  const pub = git("diff", "--name-status", "main", "--", ...ADD_ONLY_DIRS)
    .split("\n").filter((l) => l && !l.startsWith("A"));
  if (pub.length) fail(`public/: solo se permite agregar archivos:\n${pub.join("\n")}`);
  else ok("public/: sin modificaciones ni borrados");

  for (const f of ADD_ONLY_FILES) {
    const removed = git("diff", "-U0", "main", "--", f)
      .split("\n").filter((l) => l.startsWith("-") && !l.startsWith("---"));
    if (removed.length) fail(`${f}: solo se permite agregar líneas; se quitaron:\n${removed.join("\n")}`);
    else ok(`${f}: solo agregados`);
  }
  return !(changed || untracked);
}

/* ------------------------------------------------------------------ */
/* Fuentes de la landing: se les exige el estilo de escritura acordado. */
const LANDING_SOURCES = ["content/landing", "components/landing", "lib/landing.js", "app/(landing)", "middleware.js"];

function checkStyle() {
  section("2 · Estilo de la landing");
  const files = git("ls-files", "--cached", "--others", "--exclude-standard", "--", ...LANDING_SOURCES)
    .split("\n").filter(Boolean);
  const bad = [];
  for (const f of files) {
    readFileSync(join(ROOT, f), "utf8").split("\n").forEach((line, i) => {
      if (/[–—]/.test(line)) bad.push(`${f}:${i + 1}: ${line.trim()}`);
    });
  }
  if (bad.length) fail(`guiones largos (en dash / em dash): usar el guion normal "-":\n    ${bad.join("\n    ")}`);
  else ok(`sin guiones largos (${files.length} archivos)`);
}

/* ------------------------------------------------------------------ */
const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://REEMPLAZAR-CON-TU-DOMINIO.com").replace(/\/$/, "");
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Quita del HTML todo lo que cambia entre builds sin cambiar lo que ve el usuario. */
function normalizeHtml(html) {
  return html
    .replace(/<!--[A-Za-z0-9_-]{10,}-->/g, "")                                   // build id
    .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "") // chunks + payload RSC
    .replace(/<link rel="preload" as="script"[^>]*>/g, "")
    .replace(/\/_next\/static\/css\/[0-9a-f]+\.css/g, "/_next/static/css/CSS.css")
    .replace(new RegExp(escapeRe(siteUrl()), "gi"), "SITE_URL")
    .replace(/\r/g, "")
    .replace(/></g, ">\n<");                                                     // diff legible
}

function homeHtml() {
  const p = join(NEXT_DIR, "server", "app", "index.html");
  if (!existsSync(p)) throw new Error("no existe .next/server/app/index.html: corré `next build` primero");
  return readFileSync(p, "utf8");
}

function homeCss(html) {
  const hrefs = [...html.matchAll(/<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]+)"/g)].map((m) => m[1]);
  return hrefs.map((h) => readFileSync(join(NEXT_DIR, h.replace("/_next/", "")), "utf8")).join("\n");
}

/** Reglas CSS de nivel superior; las de @media/@supports/@layer se prefijan con su condición. */
function cssRules(css, prefix = "") {
  const out = [];
  let depth = 0, start = 0, head = "";
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === "{") { if (depth === 0) { head = css.slice(start, i).trim(); start = i + 1; } depth++; }
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        const body = css.slice(start, i);
        if (/^@(media|supports|layer)/.test(head)) out.push(...cssRules(body, `${prefix}${head} `));
        else out.push(`${prefix}${head}{${body}}`);
        start = i + 1;
      }
    } else if (c === ";" && depth === 0) {                                       // @import, @charset
      const stmt = css.slice(start, i).trim();
      if (stmt) out.push(prefix + stmt);
      start = i + 1;
    }
  }
  return out;
}

function checkHomeRegression() {
  section("3 · Regresión de la home (HTML prerenderizado + CSS)");
  const html = homeHtml();
  const norm = normalizeHtml(html);
  const css = homeCss(html);

  if (UPDATE) {
    mkdirSync(BASELINE_DIR, { recursive: true });
    writeFileSync(BASE_HTML, norm);
    writeFileSync(BASE_CSS, css);
    ok(`línea de base guardada (${norm.length} B HTML normalizado, ${cssRules(css).length} reglas CSS)`);
    return;
  }
  if (!existsSync(BASE_HTML) || !existsSync(BASE_CSS)) { fail("falta la línea de base: scripts/baseline/"); return; }

  // Git puede convertir la línea de base a CRLF en Windows (core.autocrlf).
  const base = readFileSync(BASE_HTML, "utf8").replace(/\r/g, "");
  if (base === norm) ok("HTML de / idéntico a la línea de base");
  else {
    const a = base.split("\n"), b = norm.split("\n");
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    fail(`HTML de / difiere desde la línea ${i + 1}:\n    base:  ${(a[i] || "").slice(0, 220)}\n    ahora: ${(b[i] || "").slice(0, 220)}`);
  }

  const now = new Set(cssRules(css.replace(/\r/g, "")));
  const missing = cssRules(readFileSync(BASE_CSS, "utf8").replace(/\r/g, "")).filter((r) => !now.has(r));
  if (missing.length) fail(`${missing.length} reglas CSS de la home desaparecieron o cambiaron, p. ej.:\n    ${missing.slice(0, 5).join("\n    ")}`);
  else ok(`todas las reglas CSS de la línea de base siguen presentes (${now.size} reglas ahora)`);
}

/* ------------------------------------------------------------------ */
async function waitFor(url, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { await fetch(url); return true; } catch { await new Promise((r) => setTimeout(r, 300)); }
  }
  return false;
}

function stop(child) {
  if (process.platform === "win32") {
    try { execFileSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" }); } catch {}
  } else child.kill("SIGTERM");
}

const robotsMeta = (body) => (body.match(/<meta name="robots" content="([^"]*)"/i) || [])[1] || "";

function landingProblems(r, body) {
  const p = [];
  const site = new URL(siteUrl()).origin;                                       // Next normaliza el host a minúsculas
  const h1 = body.match(/<h1([^>]*)>([\s\S]*?)<\/h1>/);
  if (!h1) p.push("sin <h1>");
  else {
    if (HIDING.test(h1[1])) p.push(`el <h1> tiene clases que lo ocultan: ${h1[1].trim()}`);
    if (!h1[2].replace(/<[^>]+>/g, "").trim()) p.push("el <h1> está vacío en el HTML inicial");
  }
  const canonical = (body.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canonical !== site + r.path) p.push(`canonical: se esperaba ${site + r.path}, hay ${canonical}`);
  for (const [lang, path] of Object.entries(LANDING_ALTERNATES)) {
    const re = new RegExp(`<link rel="alternate" hreflang="${lang}" href="${escapeRe(site + path)}"`, "i");
    if (!re.test(body)) p.push(`falta hreflang ${lang} → ${site + path}`);
  }
  if (!/noindex/i.test(robotsMeta(body))) p.push(`se esperaba noindex hasta el lanzamiento, hay "${robotsMeta(body)}"`);
  if (!new RegExp(`<div class="lp" lang="${r.lang}"`).test(body)) p.push(`falta lang="${r.lang}" en el contenedor .lp`);
  const markup = body.replace(/<script[\s\S]*?<\/script>/g, "");
  const hidden = [...markup.matchAll(/<[a-z0-9]+[^>]*class="([^"]*)"/g)].map((m) => m[1]).filter((c) => HIDING.test(c));
  if (hidden.length) p.push(`elementos que nacen ocultos: ${hidden.join(" | ")}`);
  const ids = new Set([...markup.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const pending = [...new Set([...markup.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))].filter((id) => !ids.has(id));
  if (pending.length) warn(`${r.path}: enlaces internos sin destino todavía: #${pending.join(", #")}`);
  if (/class="cursor|has-cursor|lenis/.test(body)) p.push("la landing monta cursor o Lenis de la home");
  return p;
}

async function checkRoutes() {
  section(`4 · Humo sobre next start (puerto ${PORT})`);
  const nextBin = join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));
  try {
    const base = `http://localhost:${PORT}`;
    if (!(await waitFor(base))) { fail(`el servidor no respondió:\n${log}`); return; }
    for (const r of ROUTES) {
      const res = await fetch(base + r.path, { redirect: "manual" });
      const body = await res.text();
      if (r.redirect) {
        const to = res.headers.get("location") || "";
        if (res.status !== 307 || !to.endsWith(r.redirect)) fail(`${r.path} → ${res.status} ${to}; se esperaba 307 → ${r.redirect}`);
        else ok(`${r.path} → 307 ${r.redirect}`);
        continue;
      }
      if (res.status !== 200) { fail(`${r.path} → ${res.status}`); continue; }
      if (r.h1 && (body.match(/<h1[\s>]/g) || []).length !== 1) { fail(`${r.path}: se esperaba exactamente un <h1>`); continue; }
      const problems = r.landing ? landingProblems(r, body) : [];
      if (problems.length) fail(`${r.path}:\n    ${problems.join("\n    ")}`);
      else ok(`${r.path} → 200${r.landing ? " · H1 visible sin JS · canonical · hreflang · noindex · lang" : ""}`);
    }
    if (/error/i.test(log)) fail(`el servidor registró errores:\n${log}`);
  } finally {
    stop(child);
  }
}

/* ------------------------------------------------------------------ */
const clean = checkProtected();
if (UPDATE && !clean) {
  console.log("\nNo se actualiza la línea de base: la home tiene cambios respecto de main.");
  process.exit(1);
}
if (!UPDATE) checkStyle();
try { checkHomeRegression(); } catch (e) { fail(e.message); }
if (!UPDATE) await checkRoutes();

console.log(failures ? `\n✗ ${failures} problema(s)` : "\n✓ Verificación completa");
process.exit(failures ? 1 : 0);
