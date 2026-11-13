import "@/components/landing/landing.css";
import Analytics from "@/components/landing/Analytics";

/**
 * Layout de las rutas comerciales. El grupo (landing) no cambia las URLs:
 * solo permite compartir estilos, y más adelante medición y consentimiento,
 * entre /diseno-web y /es/diseno-web sin tocar el layout raíz de la home.
 * Analytics (GA4 + Google Ads con consentimiento) solo se activa si hay IDs.
 */
export default function LandingLayout({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
