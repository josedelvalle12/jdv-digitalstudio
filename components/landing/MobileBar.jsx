import WhatsAppIcon from "./WhatsAppIcon";

/** Barra fija inferior, solo en mobile (CSS): las dos acciones siempre a mano. */
export default function MobileBar({ nav, whatsapp }) {
  return (
    <div className="lp-mbar">
      <a className="lp-btn lp-btn--primary" href="#contacto">{nav.cta}</a>
      {whatsapp && (
        <a className="lp-btn lp-btn--ghost lp-mbar__wa" href={whatsapp} target="_blank" rel="noopener" aria-label={`${nav.whatsapp} (abre WhatsApp)`}>
          <WhatsAppIcon />
        </a>
      )}
    </div>
  );
}
