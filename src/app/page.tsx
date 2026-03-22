import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

import EndCredits from "@/components/sections/EndCredits";
import CustomCursor from "@/components/CustomCursor";
import SceneTransition from "@/components/SceneTransition";
import CrewSpotlight from "@/components/sections/CrewSpotlight";
import Filmography from "@/components/sections/Filmography";
import ProductionLog from "@/components/sections/ProductionLog";
import BonusFeature from "@/components/sections/BonusFeature";

export default function Home() {
  return (
    <div className="grain">
      <CustomCursor />
      <Navbar />
      <main className="relative flex flex-col">
        <Hero />
        
        <SceneTransition scene="ACT I — THE PROTAGONIST" />
        <About />

        <SceneTransition scene="ACT II — THE CAST & CREW" />
        <CrewSpotlight />

        <SceneTransition scene="ACT III — THE PRODUCTION LOG" />
        <ProductionLog />

        <SceneTransition scene="ACT IV — THE FILMOGRAPHY" />
        <Filmography />

        <BonusFeature />

        <SceneTransition scene="ACT V — THE END CREDITS" />
        <EndCredits />
      </main>
    </div>
  );
}
