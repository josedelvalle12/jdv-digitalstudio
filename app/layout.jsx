import "./fonts.css";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, LOCALE, getStructuredData } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  verification: {
  google: "arlwhC7OKuamafMC_Cjo1SsQe5FxI379PQ_NtKIEYhw",
  },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: LOCALE,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

/*
  TIPOGRAFÍA
  Fuentes temporales (Google Fonts). Para probar Satoshi / General Sans /
  Neue Montreal localmente: agregá los .woff2 en /public/fonts, declaralos
  en app/fonts.css (hay ejemplos comentados) y cambiá --font-display /
  --font-body en app/globals.css. No hace falta tocar ningún componente.
*/
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
