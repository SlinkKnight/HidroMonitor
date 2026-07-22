import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { SpecsBand } from "./components/SpecsBand";
import { Cta } from "./components/Cta";
import { SiteFooter } from "./components/SiteFooter";

export function MarketingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Hero />
      <main>
        <Features />
        <SpecsBand />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
