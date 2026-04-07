import { Header } from "@/components/v2/header";
import { HeroSection } from "@/components/v2/hero-section";
import { PhilosophySection } from "@/components/v2/philosophy-section";
import { VslSection } from "@/components/v2/vsl-section";
import { TrustSection } from "@/components/v2/trust-section";
import { SalesLetterSection } from "@/components/v2/sales-letter-section";
import { FaqSection } from "@/components/v2/faq-section";
import { FooterSection } from "@/components/v2/footer-section";

export default function V2Page() {
  return (
    <main className="v2-light min-h-screen">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <VslSection />
      <TrustSection />
      <SalesLetterSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
