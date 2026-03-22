"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const crew = [
  { role: "Lead Actor", name: "React / Next.js", time: "06:00 AM" },
  { role: "Director of Photography", name: "TypeScript", time: "07:30 AM" },
  { role: "Sound Designer", name: "Node.js", time: "08:15 AM" },
  { role: "Production Designer", name: "Tailwind CSS", time: "09:00 AM" },
  { role: "Editor", name: "Git & GitHub", time: "10:30 AM" },
  { role: "Visual Effects", name: "Framer Motion / GSAP", time: "11:45 AM" },
  { role: "Score Composer", name: "MongoDB / PostgreSQL", time: "01:00 PM" },
  { role: "Casting Director", name: "REST APIs / GraphQL", time: "02:30 PM" },
];

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
  "Framer Motion", "GSAP", "MongoDB", "PostgreSQL", "Git",
  "REST API", "GraphQL", "Figma", "Vercel", "Docker",
];

function MarqueeRow({ reverse = false, className }: { reverse?: boolean; className?: string }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className={`overflow-hidden py-4 border-y border-cinema-gold/10 relative ${className}`}>
      <div className="flex gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-bebas text-4xl md:text-5xl text-cinema-cream/20 tracking-widest hover:text-cinema-gold/80 transition-colors duration-500 cursor-default">
              {item}
            </span>
            <span className="text-cinema-gold/40 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 3D Marquee scrolling
    gsap.to(".marquee-forward-inner", {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(".marquee-backward-inner", {
      xPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Focus Pull Entrance
    gsap.fromTo(".focus-pull", 
      { filter: "blur(20px)", scale: 1.05, opacity: 0 },
      {
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".focus-pull-trigger",
          start: "top 75%",
        }
      }
    );

    // Call Sheet Intro
    gsap.fromTo(".credit-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".credits-container",
          start: "top 80%",
        }
      }
    );

  }, { scope: sectionRef });

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (listRef.current) {
        const rect = listRef.current.getBoundingClientRect();
        // Request animation frame for smooth tracking
        animationFrameId = requestAnimationFrame(() => {
          const y = e.clientY - rect.top;
          setMouseY(Math.max(0, Math.min(y, rect.height)));
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="crew" 
      className="section-shell relative bg-cinema-deep min-h-screen py-32 md:py-44 lg:py-48 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Focus Pull Header */}
      <div className="px-6 md:px-12 lg:px-16 mb-24 md:mb-32 relative z-10 focus-pull-trigger">
        <p className="focus-pull font-mono text-sm md:text-base text-cinema-gold tracking-[0.3em] uppercase mb-6">
          EXT. THE SET — ROLL CALL
        </p>
        <h2 className="focus-pull font-bebas text-[15vw] md:text-[10vw] leading-[0.85] text-cinema-cream tracking-tight">
          THE CREW
        </h2>
      </div>

      {/* 3D Marquee Tunnel */}
      <div className="relative z-0 h-[30vh] md:h-[40vh] mb-32 flex flex-col justify-center opacity-60 pointer-events-none [perspective:1000px]">
        <div className="space-y-12 [transform-style:preserve-3d] [transform:rotateX(20deg)_rotateY(-10deg)_scale(1.1)]">
          <MarqueeRow className="marquee-forward-inner [transform:translateZ(50px)]" />
          <MarqueeRow reverse className="marquee-backward-inner [transform:translateZ(-50px)]" />
        </div>
      </div>

      {/* Interactive Call Sheet (Credits) */}
      <div className="credits-container px-6 md:px-12 lg:px-16 max-w-6xl mx-auto relative z-20">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-6 border-b border-cinema-surface/50 mb-8 px-4 opacity-50">
          <span className="col-span-5 md:col-span-4 font-mono text-xs text-cinema-gold tracking-[0.2em] uppercase">Role</span>
          <span className="col-span-7 md:col-span-6 font-mono text-xs text-cinema-gold tracking-[0.2em] uppercase">Cast Member</span>
          <span className="hidden md:block col-span-2 font-mono text-xs text-cinema-gold tracking-[0.2em] uppercase text-right">Call Time</span>
        </div>

        <div className="group/list relative" ref={listRef}>
          {/* Playhead Laser Tracker */}
          <motion.div 
            className="hidden md:block absolute -left-8 top-0 w-[2px] h-full bg-cinema-surface/30"
          >
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-[4px] h-[30px] bg-cinema-red opacity-0 group-hover/list:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ top: mouseY - 15 }}
              layout
            >
              <div className="absolute inset-0 bg-cinema-red blur-[8px] opacity-70" />
            </motion.div>
          </motion.div>

          {crew.map((member, i) => (
            <motion.div
              key={member.role}
              className={`credit-item grid grid-cols-12 gap-4 items-center py-6 px-4 -mx-4 border-b border-cinema-surface/20 transition-all duration-500 relative cursor-none ${
                hoveredIdx !== null && hoveredIdx !== i ? "opacity-20 grayscale" : "opacity-100"
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ x: 10 }}
            >
              {/* Anamorphic Flare Background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-cinema-gold/5 to-transparent blur-md transition-opacity duration-500 pointer-events-none ${hoveredIdx === i ? "opacity-100" : "opacity-0"}`}
              />

              <span className="col-span-5 md:col-span-4 font-mono text-xs md:text-sm text-cinema-muted uppercase tracking-[0.15em] transition-colors duration-300 relative z-10 pointer-events-none">
                {member.role}
              </span>
              
              <span className="col-span-7 md:col-span-6 font-dm-sans text-xl md:text-3xl text-cinema-cream font-light tracking-wide transition-all duration-300 relative z-10 pointer-events-none">
                {member.name}
              </span>

              <span className="hidden md:flex col-span-2 font-mono text-xs text-cinema-gold/60 justify-end relative z-10 pointer-events-none">
                {member.time}
              </span>
              
              {/* Director's Viewfinder Brackets */}
              <div className={`hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[130%] border-y border-cinema-gold/20 transition-all duration-500 pointer-events-none justify-between items-center ${
                hoveredIdx === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}>
                <div className="w-3 h-full border-l border-cinema-gold/30" />
                <div className="w-3 h-full border-r border-cinema-gold/30" />
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

