"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import DustParticles from "./DustParticles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SceneTransitionProps {
  scene: string;
}

export default function SceneTransition({ scene }: SceneTransitionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  // Split the scene text into words for staggered kinetic assembly
  const words = scene.split(" ");

  useGSAP(() => {
    if (!containerRef.current || wordsRef.current.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 1. Kinetic Text Assembly (Magnetic Pull)
    wordsRef.current.forEach((word, i) => {
      // Generate tighter pseudo-random deterministic scatter vectors
      const isEven = i % 2 === 0;
      const startX = isEven ? (i * 20 - 80) : (i * -20 + 80);
      const startY = isEven ? 80 + i * 20 : -80 - i * 20;
      const startRot = isEven ? 35 : -35;
      const zOffset = isEven ? 300 : -300;

      // The word floats in from scattered positions, perfectly assembles in the center
      tl.fromTo(word,
        { 
          x: startX, 
          y: startY, 
          rotationZ: startRot, 
          z: zOffset,
          opacity: 0,
          filter: "blur(20px) contrast(200%) drop-shadow(0 0 0 rgba(255,0,0,1))"
        },
        { 
          x: 0, 
          y: 0, 
          rotationZ: 0, 
          z: 0,
          opacity: 1, 
          filter: "blur(0px) contrast(100%) drop-shadow(4px 0 0 rgba(255,0,0,0.8))",
          duration: 0.35, 
          ease: "back.out(1.5)"
        }, 
        0.1 // Wait until 10% scrolled into the section before starting assembly
      )
      // Hold exactly perfect for longer (0.45 to 0.6)
      .to(word, { 
        filter: "blur(0px) contrast(100%) drop-shadow(0px 0 0 rgba(255,0,0,0))", 
        duration: 0.15 
      }, 0.45)
      // Scatter out
      .to(word,
        { 
          x: -startX * 1.5, 
          y: -startY * 1.5, 
          rotationZ: -startRot, 
          z: -zOffset,
          opacity: 0, 
          filter: "blur(25px) contrast(200%) drop-shadow(-8px 0 0 rgba(0,255,255,1))",
          duration: 0.35, 
          ease: "power3.in"
        }, 
        0.6
      );
    });

    // 2. The CRT Laser Line Sweep
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0, y: -20 },
      { scaleX: 1, opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      0.1
    )
    .to(lineRef.current, { scaleY: 20, opacity: 0, duration: 0.1, ease: "power4.in" }, 0.5) // Flash climax at 0.5
    .to(lineRef.current, { scaleX: 0, duration: 0.35 }, 0.6);

    // 3. Central Clack Flash
    tl.fromTo(flashRef.current,
      { opacity: 0 },
      { opacity: 0.4, duration: 0.05, ease: "power4.out" }, 
      0.45
    ).to(flashRef.current, { opacity: 0, duration: 0.1, ease: "power4.in" }, 0.55);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] flex flex-col items-center justify-center overflow-hidden z-40" style={{ perspective: "1000px" }}>
      
      {/* Deep Atmospheric Smoke/Dust */}
      <DustParticles particleCount={20} />
      <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

      {/* Cinematic Flash Overlay */}
      <div ref={flashRef} className="absolute inset-0 bg-white pointer-events-none opacity-0 mix-blend-overlay z-[5]" />

      {/* Center Strike Line */}
      <div ref={lineRef} className="absolute top-1/2 left-0 right-0 h-[2px] bg-white opacity-0 z-[1] origin-center shadow-[0_0_20px_5px_rgba(255,255,255,0.7)] mix-blend-screen" />

      {/* The Kinetic Text Wrapper */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none w-full max-w-7xl px-4">
        <span className="font-mono text-[10px] tracking-[0.6em] text-[#e8c96a]/50 uppercase mb-8 z-20">NOW PRESENTING</span>
        
        <h2 className="font-bebas uppercase leading-[1.1] text-white tracking-[0.08em] flex flex-wrap justify-center gap-[1vw] w-full" style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}>
          {words.map((word, i) => (
            <span
              key={i}
              ref={el => {
                if (el) wordsRef.current[i] = el;
              }}
              // will-change transform helps GPU accelerate the 3D scatter effect
              className="inline-block relative will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
      
    </section>
  );
}
