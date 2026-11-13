import { landingStructuredData } from "@/lib/landing";

/** Datos estructurados del servicio (schema.org), en el HTML inicial. */
export default function LandingJsonLd({ content }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(landingStructuredData(content)) }}
    />
  );
}
