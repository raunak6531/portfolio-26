"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const montageImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Code snippet
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", // Matrix/Terminal
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop", // Tech wires
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop", // Screen pixels
];

const menuLinks = [
  { name: "THE PRESS KIT (Resume)", href: "/resume.pdf" },
  { name: "GITHUB", href: "https://github.com/raunak6531" },
  { name: "LINKEDIN", href: "https://linkedin.com/in/Raunak" },
  { name: "EMAIL", href: "mailto:raunak6531@gmail.com" },
];

export default function EndCredits() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrolling animation
        pin: containerRef.current, // Pin the view
      }
    });

    // Reset initial states just in case
    gsap.set('.montage-img', { opacity: 0 });
    gsap.set('.split-text-container', { scale: 5, opacity: 0 });
    gsap.set('.split-left', { x: 0 });
    gsap.set('.split-right', { x: 0 });
    gsap.set('.links-container', { opacity: 0, scale: 0.9 });

    // PHASE 1: The Smash Cut Montage
    const images = gsap.utils.toArray('.montage-img');
    images.forEach((img) => {
      // Flash on
      tl.to(img as HTMLElement, { opacity: 1, duration: 0.04, ease: "none" })
      // Flash off
        .to(img as HTMLElement, { opacity: 0, duration: 0.04, ease: "none" });
    });

    // Brief pause of pure black
    tl.to({}, { duration: 0.2 });

    // PHASE 2: The Typographic Slam
    tl.to('.split-text-container', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out"
    });

    // Let the name sit on screen for a moment
    tl.to({}, { duration: 0.5 });

    // PHASE 3: The Split Reveal
    tl.to('.split-left', { 
      x: "-35vw", 
      duration: 1.5, 
      ease: "power3.inOut" 
    }, "split")
    .to('.split-right', { 
      x: "35vw", 
      duration: 1.5, 
      ease: "power3.inOut" 
    }, "split")
    .to('.links-container', { 
      opacity: 1, 
      scale: 1, 
      duration: 1.2, 
      ease: "power2.out" 
    }, "split+=0.3");

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative w-full h-[350vh] bg-[#000000] text-white"
    >
      <div 
        ref={containerRef} 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black"
      >
        {/* Phase 1: Montage Images Container */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          {montageImages.map((src, i) => (
            <div 
              key={i} 
              className="montage-img absolute inset-0 bg-cover bg-center grayscale contrast-150 mix-blend-screen"
              style={{ backgroundImage: `url('${src}')` }}
            >
              {/* Optional film grain specifically on images */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
            </div>
          ))}
        </div>

        {/* Phase 2: The Massive Name */}
        <div className="split-text-container absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className={`transition-all duration-700 ease-out ${isHoveringLink ? 'opacity-15 blur-[8px]' : 'opacity-100 blur-none'}`}>
            <h1 className="font-bebas text-[28vw] leading-none flex tracking-tighter text-white mix-blend-exclusion">
              <span className="split-left inline-block">RAU</span>
              <span className="split-right inline-block">NAK</span>
            </h1>
          </div>
        </div>

        {/* Phase 3: The Reveal Menu */}
        <div className="links-container absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-auto mix-blend-normal">
          <div className="text-center mb-16">
            <h2 className="font-sans font-bold text-xs md:text-sm tracking-[0.5em] text-cinema-muted uppercase">
              ACT V — THE END CREDITS
            </h2>
          </div>
          
          <ul className="flex flex-col gap-10 md:gap-12 items-center text-center">
            {menuLinks.map((link, i) => (
              <li key={i} className="group/link relative block">
                <a 
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="block font-serif text-3xl md:text-5xl lg:text-6xl text-cinema-cream uppercase tracking-wider transition-all duration-400 group-hover/link:italic group-hover/link:text-white"
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  <span className="relative z-10 transition-colors">{link.name}</span>
                  {/* Cinematic Red Strikethrough Effect */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[3px] bg-red-700 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:w-full z-20 opacity-90 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
