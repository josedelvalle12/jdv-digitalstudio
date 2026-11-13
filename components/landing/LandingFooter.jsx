import { CONTACT } from "@/content/landing/contact";
import { ANALYTICS_ENABLED } from "@/lib/analytics";

/** Pie con identificación del negocio, contacto y enlaces legales. */
export default function LandingFooter({ content, whatsapp }) {
  const { footer, legal, path } = content;
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
          <li><a href={`${path}/${legal.privacy.slug}`}>{footer.privacy}</a></li>
          <li><a href={`${path}/${legal.notice.slug}`}>{footer.legal}</a></li>
          {ANALYTICS_ENABLED && (
            <li><button type="button" className="lp-footer__btn" data-consent-open>{footer.consent}</button></li>
          )}
        </ul>
        <p className="lp-footer__muted lp-footer__rights">
          © {new Date().getFullYear()} JDV Digital Studio. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
