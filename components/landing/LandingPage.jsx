import { whatsappUrl } from "@/content/landing/contact";
import AboutSection from "./AboutSection";
import LandingHero from "./LandingHero";
import LandingNav from "./LandingNav";
import MethodSection from "./MethodSection";
import ProblemSection from "./ProblemSection";
import ProcessSection from "./ProcessSection";
import ServicesSection from "./ServicesSection";
import TrustStrip from "./TrustStrip";
import WorkSection from "./WorkSection";

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
        <ProblemSection problem={content.problem} />
        <MethodSection method={content.method} />
        <WorkSection work={content.work} />
        <ServicesSection services={content.services} />
        <ProcessSection process={content.process} />
        <AboutSection about={content.about} />
      </main>
    </div>
  );
}
