import { whatsappUrl } from "@/content/landing/contact";
import LandingFooter from "./LandingFooter";

/** Política de privacidad o aviso legal. kind: "privacy" | "notice". */
export default function LegalPage({ content, kind }) {
  const doc = content.legal[kind];
  const whatsapp = whatsappUrl(content.whatsappText);
  return (
    <div className="lp lp-legal" lang={content.lang}>
      <header className="lp-nav">
        <div className="lp-wrap lp-nav__inner">
          <a className="lp-brand" href={content.path}>JDV <span>Digital Studio</span></a>
        </div>
      </header>
      <main className="lp-wrap lp-doc">
        <h1 className="lp-title">{doc.title}</h1>
        <p className="lp-doc__meta">{doc.updated}</p>
        <p className="lp-lead">{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.h} className="lp-doc__sec">
            <h2 className="lp-doc__h">{s.h}</h2>
            {s.p?.map((t) => <p key={t}>{t}</p>)}
            {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
            {s.after?.map((t) => <p key={t}>{t}</p>)}
            {s.link && (
              <p>
                <a className="lp-link" href={`${content.path}/${content.legal[s.link].slug}`}>
                  {content.legal[s.link].title}
                </a>
              </p>
            )}
          </section>
        ))}
        <p><a className="lp-link" href={content.path}>{content.thanks.back}</a></p>
      </main>
      <LandingFooter content={content} whatsapp={whatsapp} />
    </div>
  );
}
