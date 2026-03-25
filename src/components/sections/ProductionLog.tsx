"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const experiences = [
  {
    id: "muj-btech",
    role: "B.Tech CSE - AI/ML",
    production: "Manipal University Jaipur",
    timeline: "Aug 2023 - 2027",
    description: "Maintaining a 9.49 CGPA and recognized on the Dean's List for four consecutive semesters.",
    image: "/images/manipal.jpg"
  },
  {
    id: "techlearn-intern",
    role: "Frontend Developer Intern",
    production: "TechLearn Solutions",
    timeline: "June 2025 - Aug 2025",
    description: "Built the Homepage and Learn page, incorporating smooth animations to make the UI interactive.",
    image: "/images/intern.png"
  },
  {
    id: "techlearn-jr",
    role: "Junior Frontend Developer",
    production: "TechLearn Solutions",
    timeline: "Aug 2025 - Oct 2025",
    description: "Developing modern and responsive user-friendly web pages using React and Tailwind CSS.",
    image: "/images/dev.png"
  },
  {
    id: "hpe-cpp3",
    role: "Project Developer",
    production: "HPE - CPP3 Program",
    timeline: "2026 - Present",
    description: "Currently developing an enterprise project as part of the prestigious Hewlett Packard Enterprise CPP3 Program.",
    image: "/images/hpe.jpg"
  }
];

export default function ProductionLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const sceneRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!parentRef.current) return;

    const cards = gsap.utils.toArray('.experience-card');
    const bgs = gsap.utils.toArray('.experience-bg');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        pin: true,
        start: "top top",
        end: "+=4000",
        scrub: true,
        onUpdate: (self) => {
          // Dynamic Scrubbing Timecode
          if (tcRef.current) {
            const totalSeconds = self.progress * 145; // arbitrary duration for timecode aesthetics
            const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const secs = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
            const frames = Math.floor((self.progress * 145 * 24) % 24).toString().padStart(2, '0');
            tcRef.current.innerText = `[00:${mins}:${secs}:${frames}]`;
          }

          // Dynamic SCENE counter based on current timeline progress
          if (sceneRef.current) {
            const activeIndex = Math.min(
              experiences.length - 1,
              Math.floor(self.progress * experiences.length)
            );
            sceneRef.current.innerText = `SCENE 0${activeIndex + 1} / 0${experiences.length}`;
          }
        }
      }
    });

    // Initialize state with focus pull effect for cards and invisible backgrounds
    gsap.set(cards, { opacity: 0, filter: 'blur(24px)', scale: 1.1, y: 20 });
    gsap.set(bgs, { opacity: 0 });

    cards.forEach((card: any, index) => {
      const bg = bgs[index] as HTMLElement;

      // Group: Card focus pull IN + Background crossfade IN
      tl.to(card, { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 1, ease: "power2.out" })
        .to(bg, { opacity: 1, duration: 1, ease: "power2.out" }, "<")
        
        // HOLD phase
        .to({}, { duration: 1 }) 
        
        // Group: Card focus pull OUT + Background crossfade OUT
        .to(card, { opacity: 0, filter: 'blur(24px)', scale: 0.9, y: -20, duration: 1, ease: "power2.in" })
        .to(bg, { opacity: 0, duration: 1, ease: "power2.in" }, "<");
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="production-log"
      className="bg-black"
    >
      <div 
        ref={parentRef}
        className="relative w-full h-screen bg-black overflow-hidden"
      >
        {/* Layer 1: Atmospheric Backgrounds */}
        {experiences.map((exp) => (
          <div 
            key={`bg-${exp.id}`}
            className="experience-bg absolute inset-0 w-full h-full z-0 pointer-events-none"
          >
            <img 
              src={exp.image} 
              alt="" 
              className="w-full h-full object-cover grayscale opacity-70" 
            />
            {/* Heavy overlay to keep text highly readable */}
            <div className="absolute inset-0 bg-black/85"></div>
          </div>
        ))}

        {/* Layer 2: Background Decorative Text */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between py-12 opacity-30">
          <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-center w-full text-white">ACT III</p>
          <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-center w-full text-white">THE PRODUCTION LOG</p>
        </div>

        {/* Layer 3: The Cinematic Title Cards */}
        {experiences.map((exp) => (
          <div 
            key={exp.id}
            className="experience-card absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20"
          >
            <p className="font-serif text-sm md:text-base tracking-widest uppercase text-gray-500 mb-2 md:mb-4">
              {exp.timeline}
            </p>
            <h2 className="font-bebas text-4xl md:text-6xl lg:text-8xl font-bold uppercase text-white mb-2 max-w-[90vw] break-words leading-[0.9]">
              {exp.role}
            </h2>
            <h3 className="font-serif text-lg md:text-xl lg:text-2xl italic text-gray-400 mb-6">
              {exp.production}
            </h3>
            <p className="max-w-2xl w-full font-sans text-xs md:text-sm lg:text-base text-gray-400 leading-relaxed mx-auto">
              {exp.description}
            </p>
          </div>
        ))}

        {/* Layer 4: Viewfinder UI (Metadata) */}
        <div className="absolute inset-0 pointer-events-none z-30 p-6 md:p-12 flex flex-col justify-between font-mono text-xs md:text-sm text-gray-400/80">
          {/* Top Row */}
          <div className="flex justify-between w-full">
            {/* Top Left: REC */}
            <div className="flex items-center gap-2">
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-600 animate-pulse border border-red-500/50 shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
              <span className="tracking-widest">REC</span>
            </div>
            {/* Top Right: SCENE */}
            <div className="tracking-widest">
              <span ref={sceneRef}>SCENE 01 / 0{experiences.length}</span>
            </div>
          </div>
          
          {/* Bottom Row */}
          <div className="flex justify-between w-full">
            {/* Bottom Left: Timecode */}
            <div className="tracking-widest">
              TC: <span ref={tcRef}>[00:00:00:00]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
