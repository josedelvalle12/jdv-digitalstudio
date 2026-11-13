import { whatsappUrl } from "@/content/landing/contact";
import LandingHero from "./LandingHero";
import LandingNav from "./LandingNav";
import TrustStrip from "./TrustStrip";

/**
 * Landing comercial. Componente de servidor: todo el contenido llega en el
 * HTML inicial y es visible sin JavaScript.
 *
 * No usa Cursor, SmoothScroll, WebGL ni utilidades de Tailwind: los estilos
 * viven en landing.css con prefijo lp- para no alterar la hoja de la home.
 * Las secciones se suman por etapas.
 */
export default function LandingPage({ content }) {
  const whatsapp = whatsappUrl(content.whatsappText);
  return (
    <div className="lp" lang={content.lang} id="top">
      <LandingNav nav={content.nav} whatsapp={whatsapp} />
      <main>
        <LandingHero hero={content.hero} whatsapp={whatsapp} />
        <TrustStrip trust={content.trust} />
      </main>
    </div>
  );
}
