"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function BonusFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !screenRef.current || !textRef.current) return;

    // Initial Stage State
    gsap.set(screenRef.current, {
      rotateX: 75,
      scale: 1.8,
      y: '60%',
      filter: 'brightness(0.2)',
      transformOrigin: "center bottom",
    });

    gsap.set(textRef.current, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when section top hits viewport bottom
        end: "center center", // Ends when the section is perfectly centered
        scrub: true,
      }
    });

    // The IMAX Tilt Reveal (Duration 1 for easy proportion calculating)
    tl.to(screenRef.current, {
      rotateX: 0,
      scale: 1,
      y: '0%',
      filter: 'brightness(1)',
      ease: "none",
      duration: 1,
    }, 0);

    // Text Reveal (after rotateX: 20 mark, which is about 73% through a 75->0 degree rotation)
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 0.2,
    }, 0.73);

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="bonus-feature"
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: "2000px" }}
    >
      <div className="absolute top-12 w-full text-center z-10 opacity-40">
        <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-white">BONUS FEATURE</p>
      </div>

      {/* The IMAX Screen Container */}
      <div 
        ref={screenRef}
        className="relative w-[100vw] h-[120vh] bg-[#030303] border border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cinematic Image Background */}
        <img 
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" 
          alt="Cinema audience" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>

        {/* The Vignette (CSS Overlay) */}
        <div 
          className="absolute inset-0 pointer-events-none z-10" 
          style={{ background: "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.9) 100%)" }}
        ></div>

        {/* The Overlaying Typography & Button */}
        <div 
          ref={textRef}
          className="absolute inset-0 m-auto z-20 flex flex-col items-center justify-center text-center w-full h-full transform-gpu"
        >
          <p className="font-serif text-sm md:text-base tracking-[0.4em] text-gray-400 italic mb-6">
            A Cinematic Obsession
          </p>
          <h2 className="font-bebas text-6xl md:text-8xl lg:text-[11rem] text-white leading-[0.85] tracking-wide mb-10 drop-shadow-2xl selection:bg-white selection:text-black">
            THE CRITIC'S<br/>DIARY
          </h2>
          <a 
            href="https://letterboxd.com/raunak6531/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 mt-8 pb-2 text-white text-xs md:text-sm font-sans font-medium uppercase tracking-[0.3em] transition-colors duration-500 hover:text-red-500 outline-none"
          >
            <span>Explore Letterboxd</span>
            <span className="text-lg md:text-xl leading-none transition-transform duration-500 ease-out group-hover:translate-x-2">⟶</span>
            {/* The Hover Line */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:bg-red-500"></span>
          </a>
        </div>
        
        {/* Aesthetic Screen Edge Glairs */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </section>
  );
}
