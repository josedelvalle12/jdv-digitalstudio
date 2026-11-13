import ThanksPage from "@/components/landing/ThanksPage";
import content from "@/content/landing/ar";
import { thanksMetadata } from "@/lib/landing";

export const metadata = thanksMetadata(content);

export default function Page() {
  return <ThanksPage content={content} />;
}
