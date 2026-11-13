"use client";
import { useState } from "react";

/**
 * Formulario corto. Es un <form> real: sin JavaScript se envía igual
 * (POST a /api/contacto, que redirige a la página de gracias o de vuelta
 * con #contacto-error). Con JavaScript se envía sin recargar y, si sale
 * bien, lleva a la misma página de gracias.
 */
export default function ContactForm({ form, market, thanksPath, privacyPath, whatsapp }) {
  const [state, setState] = useState("idle"); // idle | sending | error

  async function onSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setState("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        window.location.assign(thanksPath);
        return;
      }
    } catch {}
    setState("error");
  }

  return (
    <form className="lp-form" action="/api/contacto" method="post" onSubmit={onSubmit}>
      <input type="hidden" name="mercado" value={market} />
      <div className="lp-hp" aria-hidden="true">
        <label>
          Sitio web
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="lp-field">
        <label htmlFor="lp-nombre">{form.name}</label>
        <input id="lp-nombre" name="nombre" type="text" required maxLength={80} autoComplete="name" />
      </div>
      <div className="lp-field">
        <label htmlFor="lp-email">{form.email}</label>
        <input id="lp-email" name="email" type="email" required maxLength={120} autoComplete="email" />
      </div>
      <div className="lp-field">
        <label htmlFor="lp-telefono">{form.phone}</label>
        <input id="lp-telefono" name="telefono" type="tel" maxLength={40} autoComplete="tel" inputMode="tel" />
      </div>

      <fieldset className="lp-field">
        <legend>{form.need}</legend>
        <div className="lp-chips">
          {form.needOptions.map((option) => (
            <label key={option} className="lp-chip">
              <input type="radio" name="necesidad" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="lp-field">
        <label htmlFor="lp-mensaje">{form.message}</label>
        <textarea id="lp-mensaje" name="mensaje" rows={4} maxLength={3000} placeholder={form.messagePlaceholder} />
      </div>

      <p id="contacto-error" className="lp-form__error" role="alert" data-show={state === "error"}>
        {form.error}
        {whatsapp && (
          <>
            {" "}
            <a href={whatsapp} target="_blank" rel="noopener">WhatsApp</a>
          </>
        )}
      </p>

      <button className="lp-btn lp-btn--primary lp-form__submit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? form.sending : form.submit}
        <span className="lp-btn__dot" aria-hidden="true" />
      </button>
      <p className="lp-form__privacy">
        {form.privacy} <a href={privacyPath}>{form.privacyLink}</a>.
      </p>
    </form>
  );
}
