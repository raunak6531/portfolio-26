"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const DirectorNote = ({ children, className = "", viewBox="0 0 100 100" }: { children: React.ReactNode, className?: string, viewBox?: string }) => (
  <svg 
    className={`absolute pointer-events-none director-note overflow-visible z-30 ${className}`} 
    viewBox={viewBox}
    fill="none" 
    stroke="#cc0000"
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ filter: "drop-shadow(0px 1px 1px rgba(200,0,0,0.3))", mixBlendMode: 'multiply' }}
  >
    {children}
  </svg>
);


const ExplosiveWord = ({ children }: { children: React.ReactNode }) => (
  <span className="explosive-word inline-block font-black text-[#7a0000] relative">
    {children}
  </span>
);

const ScriptLine = ({ type, text, className = "" }: { type: 'scene' | 'action' | 'character' | 'dialogue' | 'parenthetical' | 'transition' | 'thought' | 'narrator', text: string | React.ReactNode, className?: string }) => {
  const styles = {
    scene: "font-bold uppercase tracking-widest text-[#111] mb-10 mt-24 w-full text-left border-b-[6px] border-[#111]/80 pb-4 text-[18px] md:text-[24px] lg:text-[28px] underline underline-offset-[12px] decoration-4",
    action: "mb-10 text-[#111] leading-[1.9] max-w-5xl w-full text-justify font-bold text-[18px] md:text-[24px] lg:text-[28px]",
    character: "uppercase tracking-widest text-[#111] mb-2 mt-16 w-full flex justify-center text-center font-bold text-[22px] md:text-[28px] lg:text-[32px] drop-shadow-sm",
    parenthetical: "mb-4 w-full flex justify-center text-center text-[#333] italic font-bold text-[18px] md:text-[22px] lg:text-[24px]",
    dialogue: "mb-12 w-full max-w-4xl mx-auto leading-[1.9] text-[#111] font-bold text-center flex flex-col items-center text-[20px] md:text-[26px] lg:text-[30px]",
    thought: "mb-12 w-full max-w-4xl mx-auto leading-[1.9] text-[#333] italic font-bold text-center flex flex-col items-center text-[19px] md:text-[25px] lg:text-[29px]",
    narrator: "mb-12 w-full max-w-4xl mx-auto leading-[1.9] text-black font-black tracking-widest text-center flex flex-col items-center text-[21px] md:text-[27px] lg:text-[31px]",
    transition: "font-bold uppercase tracking-widest mt-28 mb-28 text-right pr-[5%] lg:pr-[10%] w-full text-[20px] md:text-[24px] lg:text-[28px]",
  };

  return (
    <div 
      className={`script-line opacity-100 relative ${styles[type]} ${className} font-courier`}
    >
      {text}
    </div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const lines = gsap.utils.toArray<HTMLElement>('.script-line');
    
    // Typewriter wet ink condensing effect & Anamorphic Focus
    lines.forEach((line) => {
      // 1. Enter from bottom — blurred & slightly transparent, racks into sharp focus
      gsap.fromTo(line, 
        { 
          opacity: 0.45, 
          y: 30, 
          scale: 0.98,
          textShadow: "0 0 20px rgba(0,0,0,0.6)",
          filter: "blur(6px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          textShadow: "0 0 1px rgba(10,10,10,0.8), 0 0 5px rgba(10,10,10,0.2)",
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 95%",
            end: "top 60%",
            scrub: 1,
          }
        }
      );

      // 2. Blur out towards the top — stays visible but defocused (depth-of-field)
      gsap.to(line, {
        opacity: 0.55,
        filter: "blur(5px)",
        scale: 0.97,
        textShadow: "0 0 20px rgba(0,0,0,0.5)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: line,
          start: "bottom 45%",
          end: "bottom 10%",
          scrub: 1,
        }
      });
    });

    // 3. Director Notes Draw SVG Animation
    const notes = gsap.utils.toArray<SVGPathElement>('.director-note path');
    notes.forEach((note) => {
      const length = note.getTotalLength() || 1000;
      gsap.set(note, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(note, {
        strokeDashoffset: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: note.closest('.script-line') || note,
          start: "top 80%",
          end: "top 55%",
          scrub: 1,
        }
      });
    });

    // 4. Explosive Word Impact Animation
    const explosiveWords = gsap.utils.toArray<HTMLElement>('.explosive-word');
    explosiveWords.forEach((word) => {
      gsap.fromTo(word,
        { 
          scale: 1.6, 
          color: "#ff0000",
          textShadow: "6px 0 15px rgba(255,0,0,0.9), -6px 0 15px rgba(0,255,255,0.9)",
          filter: "blur(4px)"
        },
        {
          scale: 1,
          color: "#6b0000", // Deep dried blood red
          textShadow: "0px 0px 0px rgba(0,0,0,0)",
          filter: "blur(0px)",
          duration: 0.8,
          ease: "elastic.out(1.2, 0.4)",
          scrollTrigger: {
            trigger: word,
            start: "top 75%", // Triggers right when the reader hits it
            toggleActions: "play none none reverse", // Non-scrubbed, plays instantly
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section 
      id="story" 
      ref={containerRef} 
      className="about-section relative w-full bg-[#b8ad97] text-[#1a1a1a] overflow-hidden z-20 shadow-[0_0_80px_rgba(0,0,0,0.9)] py-32 md:py-48 flex justify-center"
    >

      <div className="about-content relative w-full flex justify-center">

      {/* High Quality Textured Paper Background */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center mix-blend-multiply opacity-[0.55]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2000&auto=format&fit=crop")'
        }}
      />

      {/* Extreme Burned / Dirty Edges Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 shadow-[inset_0_0_300px_rgba(40,20,0,0.9),inset_0_0_80px_rgba(20,10,0,0.8)] mix-blend-multiply" />
      
      {/* Fractal noise for rough paper physical texture */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4] mix-blend-color-burn"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")'
        }}
      />

      {/* Mouse-Reactive Cinematic Spotlight */}
      <div 
        className="pointer-events-none absolute inset-0 z-[5] opacity-60 mix-blend-color-dodge transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(circle 300px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(255, 248, 210, 0.55) 0%, transparent 75%)`,
          backgroundAttachment: "fixed"
        }}
      />
      
      {/* Edge burn for spotlight contrast */}
      <div 
        className="pointer-events-none absolute inset-0 z-[4] opacity-50 mix-blend-color-burn transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(circle 500px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), transparent 40%, rgba(40, 20, 0, 0.8) 100%)`,
          backgroundAttachment: "fixed"
        }}
      />

      {/* Red Pen edits over the text act as the dynamic layer */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-center min-h-screen bg-transparent">
        
        {/* Top Header Information traditionally found on scripts */}
        <div className="flex justify-between items-end border-b-[6px] border-[#111]/80 pb-4 mb-24 opacity-80 font-courier text-base md:text-lg font-bold">
          <span style={{ textShadow: "0 0 1px rgba(0,0,0,0.5)"}}>PROJECT: THE OVERHAUL</span>
          <span className="text-right" style={{ textShadow: "0 0 1px rgba(0,0,0,0.5)"}}>DRAFT: FINAL V2<br/>PAGE: 1</span>
        </div>

        {/* The Script Flow */}
        <div className="relative mt-12 w-full flex flex-col items-center">
          
          <ScriptLine type="scene" text={
            <>
              INT. THE DEVELOPMENT STUDIO - LATE NIGHT
              <DirectorNote viewBox="0 0 400 50" className="w-[60%] h-[150%] left-[40%] -top-[20%]">
                {/* Aggressively scratch out "LATE NIGHT" */}
                <path d="M 10,25 Q 150,40 380,10 M 20,15 Q 200,5 370,35 M 30,35 Q 150,-5 360,30" />
              </DirectorNote>
            </>
          } />

          {/* Action Header */}
          <ScriptLine type="action" text={
            <>
              The glow of a massive monitor cuts through the absolute pitch black of the room. Lines of <ExplosiveWord>flawless</ExplosiveWord> TypeScript scroll rapidly. A self-taught architect is shifting from basic automation scripts to forging highly complex, emotionally resonant web applications.
              <DirectorNote viewBox="0 0 500 150" className="w-[105%] h-[150%] -left-[2%] -top-[10%]">
                 {/* Double frantic underline */}
                 <path d="M 20,130 Q 250,145 480,120 M 15,140 Q 250,155 485,130" />
                 {/* Aggressive arrow pointing to "TypeScript" */}
                 <path d="M 400,20 Q 380,50 350,80 M 350,80 L 370,75 M 350,80 L 360,60" />
              </DirectorNote>
            </>
          } className="w-full text-justify" />

          <div className="my-16 flex flex-col items-center w-full">
            <ScriptLine type="character" text="RAUNAK" />
            <ScriptLine type="parenthetical" text={
              <>
                (leaning dangerously close to the screen)
                <DirectorNote viewBox="0 0 300 50" className="w-[120%] h-[150%] -left-[10%] -top-[25%] opacity-80">
                   {/* Frantic cross-out stroke */}
                   <path d="M 10,35 Q 150,10 290,25 M 20,20 Q 150,40 280,15" strokeWidth="4" />
                </DirectorNote>
              </>
            } />
            
            <div className="w-full flex justify-center px-4 md:px-0">
               <ScriptLine type="dialogue" text="It's not just about writing clean code. If an interface doesn't feel like a movie... if the scroll doesn't have a relentless pulse... it isn't finished." className="w-full text-center" />
            </div>
          </div>

          <ScriptLine type="action" text={
            <>
              He <ExplosiveWord>brutally</ExplosiveWord> forces the build. TypeScript, React, Next.js, and Tailwind CSS lay the robust foundation. GSAP injects buttery smooth, cinematic motion. The performance metrics <ExplosiveWord>shatter</ExplosiveWord> the ceiling and hit a <ExplosiveWord>flawless</ExplosiveWord> 100. A smirk.
              <DirectorNote viewBox="0 0 800 200" className="w-[110%] h-[130%] -left-[5%] -top-[15%] opacity-70">
                 {/* Giant angry X across the whole paragraph */}
                 <path d="M 50,20 L 750,180" strokeWidth="5" />
                 <path d="M 750,20 L 50,180" strokeWidth="5" />
                 {/* Circle around "smirk" */}
                 <path d="M 680,180 C 650,140 750,120 780,150 C 800,180 730,220 680,180" strokeWidth="3" />
              </DirectorNote>
            </>
          } className="w-full text-justify mt-8" />

          <div className="my-16 flex flex-col items-center w-full">
            <ScriptLine type="character" text="RAUNAK (THOUGHT)" />
            
            <div className="w-full flex justify-center px-4 md:px-0">
               <ScriptLine type="thought" text={
                 <>
                   Tools are just tools. The real stack is rhythm, framing, and <ExplosiveWord>ruthlessly</ExplosiveWord> obsessing over the micro-interactions. My goal is to build things that people don't just 'use', but <ExplosiveWord>truly</ExplosiveWord> experience.
                   <DirectorNote viewBox="0 0 600 250" className="w-[120%] h-[140%] -left-[10%] -top-[20%]">
                      {/* Left margin angry zigzag */}
                      <path d="M 20,20 L 10,60 L 30,100 L 5,140 L 25,180 L 10,220" strokeWidth="4" />
                      {/* Aggressive underline under "truly experience" */}
                      <path d="M 400,230 Q 500,240 580,220" strokeWidth="5" />
                   </DirectorNote>
                 </>
               } className="w-full text-center" />
            </div>
          </div>

          <ScriptLine type="transition" text={
            <>
              SMASH CUT TO:
              <DirectorNote viewBox="0 0 200 100" className="w-[150%] h-[200%] -left-[25%] -top-[50%]">
                 {/* Aggressive Box around transition */}
                 <path d="M 10,10 L 190,15 L 185,90 L 15,85 Z" strokeWidth="4" />
                 {/* Exclamation marks */}
                 <path d="M 210,20 L 205,70 M 205,85 L 204,90 M 230,25 L 225,75 M 225,90 L 224,95" strokeWidth="5" />
              </DirectorNote>
            </>
          } />

          <ScriptLine type="scene" text="EXT. THE INDUSTRY - DAWN" />

          <div className="my-16 flex flex-col items-center w-full">
            <ScriptLine type="character" text="NARRATOR (V.O.)" />
            <div className="w-full flex justify-center px-4 md:px-0">
               <ScriptLine type="narrator" text={
                 <>
                   A wasteland of repetitive templates and generic UI components stretches infinitely. A new standard is demanded. Iterative, visually-aggressive development creating premium digital environments. Approaching interface design the exact same way an insane director approaches a scene. Every pixel blocked, lit, and paced for maximum narrative <ExplosiveWord>trauma</ExplosiveWord>.
                   <DirectorNote viewBox="0 0 500 200" className="w-[105%] h-[120%] -left-[2%] -top-[10%]">
                      {/* Massive circle around "narrative trauma" at the end */}
                      <path d="M 350,160 C 350,120 480,120 480,160 C 480,200 340,200 350,160 Z" strokeWidth="3" />
                      <path d="M 330,170 Q 250,190 100,180" strokeDasharray="10, 10" />
                   </DirectorNote>
                 </>
               } className="w-full text-center" />
            </div>
          </div>

        </div>

      </div>

      </div>
    </section>
  );
}
