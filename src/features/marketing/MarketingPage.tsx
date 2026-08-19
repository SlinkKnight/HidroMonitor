import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Platform } from "./components/Platform";
import { HowItWorks } from "./components/HowItWorks";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { SiteFooter } from "./components/SiteFooter";

export function MarketingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Hero />
      <main>
        <Features />
        <Platform />
        <HowItWorks />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
