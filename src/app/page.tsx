import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Quotes from "@/components/sections/Quotes";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CinematicDivider from "@/components/CinematicDivider";

export default function Home() {
  return (
    <div className="grain">
      <CustomCursor />
      <Navbar />
      <main className="flex flex-col gap-8 md:gap-10 lg:gap-12 pb-8 md:pb-10 lg:pb-12">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CinematicDivider scene="INTERMISSION — TAKE A BREATH" bg="bg-transparent" />
        <Quotes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
