import LegalPage from "@/components/landing/LegalPage";
import content from "@/content/landing/ar";
import { legalMetadata } from "@/lib/landing";

export const metadata = legalMetadata(content, "notice");

export default function Page() {
  return <LegalPage content={content} kind="notice" />;
}
