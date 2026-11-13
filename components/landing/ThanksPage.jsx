import { whatsappUrl } from "@/content/landing/contact";
import WhatsAppIcon from "./WhatsAppIcon";

/**
 * Página de gracias tras enviar el formulario. Además de confirmar el envío,
 * es la URL que en la etapa 8 se usa como conversión en Google Ads / GA4.
 */
export default function ThanksPage({ content }) {
  const { thanks } = content;
  const whatsapp = whatsappUrl(content.whatsappText);
  return (
    <div className="lp lp-thanks" lang={content.lang}>
      <header className="lp-nav">
        <div className="lp-wrap lp-nav__inner">
          <a className="lp-brand" href={content.path}>JDV <span>Digital Studio</span></a>
        </div>
      </header>
      <main className="lp-wrap lp-thanks__main">
        <div className="lp-thanks__mark" aria-hidden="true" />
        <h1 className="lp-title">{thanks.title}</h1>
        <p className="lp-lead">{thanks.text}</p>
        <div className="lp-actions">
          {whatsapp && (
            <a className="lp-btn lp-btn--ghost" href={whatsapp} target="_blank" rel="noopener">
              <WhatsAppIcon />
              {thanks.whatsapp}
              <span className="lp-sr">(abre WhatsApp)</span>
            </a>
          )}
          <a className="lp-link" href={content.path}>{thanks.back}</a>
        </div>
      </main>
    </div>
  );
}
