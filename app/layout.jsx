import { Geist, Geist_Mono } from "next/font/google";
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

/* Geist y Geist Mono se descargan al compilar y se sirven desde el propio dominio. */
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

/*
  TIPOGRAFÍA
  Texto y etiquetas: Geist y Geist Mono vía next/font (autoalojadas, sin pedir
  nada a Google en cada visita). Títulos: Satoshi, local. Para probar Satoshi / General Sans /
  Neue Montreal localmente: agregá los .woff2 en /public/fonts, declaralos
  en app/fonts.css (hay ejemplos comentados) y cambiá --font-display /
  --font-body en app/globals.css. No hace falta tocar ningún componente.
*/
export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preload" href="/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
