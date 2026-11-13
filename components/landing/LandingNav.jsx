import WhatsAppIcon from "./WhatsAppIcon";

/**
 * Navegación mínima: marca + acciones. Sin enlaces que saquen al visitante
 * de la landing (la marca no lleva a la home editorial).
 * Fija arriba con position: sticky, sin JavaScript.
 */
export default function LandingNav({ nav, whatsapp }) {
  return (
    <header className="lp-nav">
      <div className="lp-wrap lp-nav__inner">
        <a className="lp-brand" href="#top" aria-label="JDV Digital Studio, volver arriba">
          JDV <span>Digital Studio</span>
        </a>
        <div className="lp-nav__actions">
          {whatsapp && (
            <a className="lp-btn lp-btn--ghost lp-btn--sm" href={whatsapp} target="_blank" rel="noopener">
              <WhatsAppIcon />
              <span className="lp-hide-sm">{nav.whatsapp}</span>
              <span className="lp-sr">(abre WhatsApp)</span>
            </a>
          )}
          <a className="lp-btn lp-btn--primary lp-btn--sm" href="#contacto">{nav.cta}</a>
        </div>
      </div>
    </header>
  );
}
