import "@/components/landing/landing.css";

/**
 * Layout de las rutas comerciales. El grupo (landing) no cambia las URLs:
 * solo permite compartir estilos, y más adelante medición y consentimiento,
 * entre /diseno-web y /es/diseno-web sin tocar el layout raíz de la home.
 */
export default function LandingLayout({ children }) {
  return children;
}
