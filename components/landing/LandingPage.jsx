import { whatsappUrl } from "@/content/landing/contact";
import AboutSection from "./AboutSection";
import AcquisitionSection from "./AcquisitionSection";
import ContactSection from "./ContactSection";
import FaqSection from "./FaqSection";
import LandingFooter from "./LandingFooter";
import LandingHero from "./LandingHero";
import LandingJsonLd from "./LandingJsonLd";
import LandingNav from "./LandingNav";
import MethodSection from "./MethodSection";
import MobileBar from "./MobileBar";
import ProblemSection from "./ProblemSection";
import ProcessSection from "./ProcessSection";
import ServicesSection from "./ServicesSection";
import TrustStrip from "./TrustStrip";
import WorkSection from "./WorkSection";

/**
 * Landing comercial. Componentes de servidor salvo el formulario: todo el
 * contenido llega en el HTML inicial y es visible sin JavaScript.
 *
 * No usa Cursor, SmoothScroll, WebGL ni utilidades de Tailwind: los estilos
 * viven en landing.css con prefijo lp- para no alterar la hoja de la home.
 */
export default function LandingPage({ content }) {
  const whatsapp = whatsappUrl(content.whatsappText);
  return (
    <div className="lp" lang={content.lang} id="top">
      <LandingJsonLd content={content} />
      <LandingNav nav={content.nav} whatsapp={whatsapp} />
      <main>
        <LandingHero hero={content.hero} whatsapp={whatsapp} />
        <TrustStrip trust={content.trust} />
        <ProblemSection problem={content.problem} />
        <MethodSection method={content.method} />
        <WorkSection work={content.work} />
        <ServicesSection services={content.services} />
        {content.acquisition && <AcquisitionSection acquisition={content.acquisition} />}
        <ProcessSection process={content.process} />
        <AboutSection about={content.about} />
        <FaqSection faq={content.faq} />
        <ContactSection content={content} whatsapp={whatsapp} />
      </main>
      <LandingFooter content={content} whatsapp={whatsapp} />
      <MobileBar nav={content.nav} whatsapp={whatsapp} />
    </div>
  );
}
