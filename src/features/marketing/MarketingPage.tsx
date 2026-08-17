import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Faq } from "./components/Faq";
import { MarketProof } from "./components/MarketProof";
import { Cta } from "./components/Cta";
import { SiteFooter } from "./components/SiteFooter";

export function MarketingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Hero />
      <main>
        <Features />
        <HowItWorks />
        <Faq />
        <MarketProof />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
