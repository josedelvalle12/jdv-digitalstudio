"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ADS_ID, ADS_LABELS, ANALYTICS_ENABLED, GA_ID } from "@/lib/analytics";
import { CONSENT } from "@/content/landing/consent";

const KEY = "lp-consent";

const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const save = (v) => { try { localStorage.setItem(KEY, v); } catch {} };

function gtag() { window.dataLayer.push(arguments); }

/** Estado de consentimiento. La personalización de anuncios queda siempre denegada: no hay remarketing. */
const state = (granted) => {
  const v = granted ? "granted" : "denied";
  return { ad_storage: v, analytics_storage: v, ad_user_data: v, ad_personalization: "denied" };
};

function track(name, label) {
  gtag("event", name, { transport_type: "beacon" });
  if (ADS_ID && label) gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
}

/**
 * GA4 + Google Ads con Consent Mode v2, solo en las rutas comerciales.
 * El consentimiento por defecto se declara ANTES de cargar la etiqueta:
 * España parte denegado y pide aceptación; Argentina parte concedido con aviso.
 */
export default function Analytics() {
  const pathname = usePathname() || "";
  const market = pathname.startsWith("/es/") ? "es" : "ar";
  const copy = CONSENT[market];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ENABLED || window.__lpAnalytics) return;
    window.__lpAnalytics = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    const stored = read();
    gtag("consent", "default", { ...state(market === "ar"), wait_for_update: 500 });
    if (stored) gtag("consent", "update", state(stored === "granted"));
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID || ADS_ID}`;
    document.head.appendChild(script);
    gtag("js", new Date());
    if (GA_ID) gtag("config", GA_ID);
    if (ADS_ID) gtag("config", ADS_ID);
    if (!stored) setOpen(true);
  }, [market]);

  /* Consulta enviada: la página de gracias es la conversión (una vez por sesión). */
  useEffect(() => {
    if (!ANALYTICS_ENABLED || !pathname.endsWith("/gracias") || !window.gtag) return;
    try {
      if (sessionStorage.getItem("lp-lead")) return;
      sessionStorage.setItem("lp-lead", "1");
    } catch {}
    track("generate_lead", ADS_LABELS.form);
  }, [pathname]);

  /* Clics en WhatsApp y email, y botón del pie para reabrir el aviso. */
  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    const onClick = (e) => {
      const el = e.target.closest ? e.target.closest("a, button") : null;
      if (!el) return;
      if (el.hasAttribute("data-consent-open")) { setOpen(true); return; }
      const href = el.getAttribute("href") || "";
      if (!window.gtag) return;
      if (href.startsWith("https://wa.me")) track("click_whatsapp", ADS_LABELS.whatsapp);
      else if (href.startsWith("mailto:")) track("click_email");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function choose(granted) {
    save(granted ? "granted" : "denied");
    if (window.gtag) gtag("consent", "update", state(granted));
    setOpen(false);
  }

  if (!ANALYTICS_ENABLED || !open) return null;
  return (
    <div className="lp lp-consent" role="region" aria-label={copy.label} lang={market === "es" ? "es-ES" : "es-AR"}>
      <p>
        {copy.text} <a href={copy.privacyPath}>{copy.more}</a>.
      </p>
      <div className="lp-consent__actions">
        <button type="button" className="lp-btn lp-btn--ghost lp-btn--sm" onClick={() => choose(false)}>{copy.reject}</button>
        <button type="button" className="lp-btn lp-btn--primary lp-btn--sm" onClick={() => choose(true)}>{copy.accept}</button>
      </div>
    </div>
  );
}
