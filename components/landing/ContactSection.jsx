import { CONTACT } from "@/content/landing/contact";
import ContactForm from "./ContactForm";
import WhatsAppIcon from "./WhatsAppIcon";

/** Cierre: CTA final, formulario corto y contacto directo (WhatsApp y email). */
export default function ContactSection({ content, whatsapp }) {
  const { contact, form } = content;
  return (
    <section className="lp-sec lp-contact" id="contacto" aria-labelledby="lp-contact-title">
      <div className="lp-wrap lp-split">
        <div>
          <p className="lp-eyebrow">{contact.label}</p>
          <h2 id="lp-contact-title" className="lp-h2">{contact.title}</h2>
          <p className="lp-contact__response">{contact.response}</p>
          <div className="lp-contact__direct">
            <p>{contact.direct}</p>
            {whatsapp && (
              <a className="lp-btn lp-btn--ghost" href={whatsapp} target="_blank" rel="noopener">
                <WhatsAppIcon />
                {contact.whatsapp}
                <span className="lp-sr">(abre WhatsApp)</span>
              </a>
            )}
            {CONTACT.email && (
              <a className="lp-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            )}
          </div>
        </div>
        <ContactForm form={form} market={content.market} thanksPath={`${content.path}/gracias`} whatsapp={whatsapp} />
      </div>
    </section>
  );
}
