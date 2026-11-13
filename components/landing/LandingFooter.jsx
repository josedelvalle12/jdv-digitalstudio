import { CONTACT } from "@/content/landing/contact";

/** Pie con identificación del negocio y contacto. Los enlaces legales llegan en la etapa 7. */
export default function LandingFooter({ footer, whatsapp }) {
  return (
    <footer className="lp-footer">
      <div className="lp-wrap lp-footer__inner">
        <div>
          <p className="lp-brand">JDV <span>Digital Studio</span></p>
          <p className="lp-footer__tagline">{footer.tagline}</p>
          <p className="lp-footer__muted">{footer.location}</p>
        </div>
        <ul className="lp-footer__links">
          {CONTACT.email && <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>}
          {whatsapp && <li><a href={whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>}
        </ul>
        <p className="lp-footer__muted lp-footer__rights">
          © {new Date().getFullYear()} JDV Digital Studio. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
