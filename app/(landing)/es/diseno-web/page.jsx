import LandingPage from "@/components/landing/LandingPage";
import content from "@/content/landing/es";
import { landingMetadata } from "@/lib/landing";

export const metadata = landingMetadata(content);

export default function Page() {
  return <LandingPage content={content} />;
}
