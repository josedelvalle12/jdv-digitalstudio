"use client";
import { useState } from "react";
import Action from "../ui/Action";

const LOOKING = ["Nuevo sitio web", "Rediseño", "Nuevo servicio / lanzamiento", "Producto digital", "Contenido / video", "Otro"];
const BUDGET = ["$500–1.000", "$1.000–1.500", "$1.500+", "Todavía no lo sé"];
const TIMELINE = ["Lo antes posible", "1–2 meses", "3+ meses", "Explorando"];

function Num({ n }) { return <span className="meta w-10 shrink-0 pt-9 tabular-nums text-muted">{n}</span>; }

function Field({ n, label, name, type = "text", value, onChange, required, area }) {
  const Tag = area ? "textarea" : "input";
  return (
    <div className="flex gap-2">
      <Num n={n} />
      <label className="field flex-1">
        <Tag type={area ? undefined : type} name={name} value={value} placeholder=" " rows={area ? 4 : undefined} required={required}
          onChange={(e) => onChange(name, e.target.value)} autoComplete="on" />
        <span className="field__label">{label}{required && " *"}</span>
        <span className="field__line" />
      </label>
    </div>
  );
}

function Choice({ n, legend, options, value, onPick }) {
  return (
    <fieldset className="flex gap-2">
      <span className="meta w-10 shrink-0 pt-1 tabular-nums text-muted">{n}</span>
      <div className="flex-1">
        <legend className="meta">{legend}</legend>
        <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label={legend}>
          {options.map((o) => (
            <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onPick(value === o ? "" : o)} className="chip">
              <i />{o}
            </button>
          ))}
        </div>
      </div>
    </fieldset>
  );
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgavkjvp";

export default function Contact() {
  const [f, setF] = useState({ nombre: "", empresa: "", email: "", web: "", tipo: "", mensaje: "", presupuesto: "", timeline: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const submit = async () => {
    if (loading) return;
    if (!f.nombre.trim() || !/^\S+@\S+\.\S+$/.test(f.email)) { setError("Completá tu nombre y un email válido para enviar el proyecto."); return; }
    setError(""); setSubmitError(false); setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error("Formspree submit failed");
      setSent(true);
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-tone="dark" aria-labelledby="contact-title" className="tone-dark bg-bg pb-28 text-fg md:pb-44">
      <div className="wrap grid-12 gap-y-14 border-t border-line pt-24 md:pt-32">
        <div className="col-span-full lg:col-span-7 lg:pr-10">
          <div className="lg:sticky lg:top-28">
            <span className="meta text-muted">Contacto</span>
            <h2 id="contact-title" className="d mt-6 max-w-[9ch]" style={{ fontSize: "clamp(2.6rem, min(6.2vw, 13vh), 8rem)" }}>
              <span className="block">Construyamos</span><span className="block">algo útil.</span>
            </h2>
          </div>
        </div>

        <div className="col-span-full lg:col-span-5 lg:col-start-8">
          {sent ? (
            <div className="border-t border-line pt-8" role="status">
              <p className="meta text-muted">PROYECTO ENVIADO</p>
              <p className="d d-md mt-4">Gracias por compartirlo. Me pondré en contacto con vos pronto.</p>
              <button type="button" onClick={() => setSent(false)} className="meta u-link mt-8">Volver al formulario</button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                <Field n="01" label="Nombre" name="nombre" value={f.nombre} onChange={set} required />
                <Field n="02" label="Empresa" name="empresa" value={f.empresa} onChange={set} />
                <Field n="03" label="Email" name="email" type="email" value={f.email} onChange={set} required />
                <Field n="04" label="Sitio web" name="web" type="url" value={f.web} onChange={set} />
              </div>
              <Choice n="05" legend="¿Qué estás buscando construir?" options={LOOKING} value={f.tipo} onPick={(v) => set("tipo", v)} />
              <Field n="06" label="Contame un poco sobre el proyecto..." name="mensaje" value={f.mensaje} onChange={set} area />
              <div className="grid gap-10 md:grid-cols-2">
                <Choice n="07" legend="Presupuesto" options={BUDGET} value={f.presupuesto} onPick={(v) => set("presupuesto", v)} />
                <Choice n="08" legend="Timeline" options={TIMELINE} value={f.timeline} onPick={(v) => set("timeline", v)} />
              </div>
              <div className="flex flex-wrap items-center gap-8 pl-12 pt-4">
                <Action type="button" onClick={submit}>{loading ? "ENVIANDO →" : "ENVIAR PROYECTO"}</Action>
                {error && <p className="b text-fg" role="alert">{error}</p>}
                {submitError && (
                  <p className="b text-fg" role="alert">
                    NO SE PUDO ENVIAR <span className="block text-muted">Intentá nuevamente en unos segundos.</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
