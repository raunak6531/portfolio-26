"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const cinematicEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: cinematicEase } },
};

const crew = [
  { role: "Lead Actor", name: "React / Next.js" },
  { role: "Director of Photography", name: "TypeScript" },
  { role: "Sound Designer", name: "Node.js" },
  { role: "Production Designer", name: "Tailwind CSS" },
  { role: "Editor", name: "Git & GitHub" },
  { role: "Visual Effects", name: "Framer Motion / GSAP" },
  { role: "Score Composer", name: "MongoDB / PostgreSQL" },
  { role: "Casting Director", name: "REST APIs / GraphQL" },
];

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
  "Framer Motion", "GSAP", "MongoDB", "PostgreSQL", "Git",
  "REST API", "GraphQL", "Figma", "Vercel", "Docker",
];

function MarqueeRow({ reverse = false, className }: { reverse?: boolean; className?: string }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden py-4 border-y border-cinema-gold/10 relative">
      <div className={`flex gap-12 whitespace-nowrap ${className}`}>
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

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Marquee scroll-linked parallax
    gsap.to(".marquee-forward", {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(".marquee-backward", {
      xPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Credit list stagger reveal
    gsap.fromTo(".credit-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".credits-container",
          start: "top 80%",
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="crew" className="section-shell relative bg-cinema-deep min-h-[76vh] py-32 md:py-44 lg:py-48 flex flex-col justify-center overflow-hidden">

      {/* Background ambient light */}
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-cinema-surface/20 blur-[150px] rounded-full pointer-events-none" />

      {/* Section header */}
      <motion.div
        className="px-6 md:px-12 lg:px-16 mb-20 md:mb-24 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p variants={fadeUp} className="section-label mb-4 text-cinema-gold">
          EXT. THE SET — ROLL CALL
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bebas text-[14vw] md:text-[8vw] leading-none text-cinema-cream"
        >
          THE CREW
        </motion.h2>
      </motion.div>

      {/* Marquee strips */}
      <div className="space-y-8 relative z-10 my-12 rotate-[-2deg] scale-105">
        <MarqueeRow className="marquee-forward" />
        <MarqueeRow className="marquee-backward" reverse />
      </div>

      {/* Credits list */}
      <div className="credits-container px-6 md:px-12 lg:px-16 mt-20 md:mt-32 relative z-10">
        <p className="font-mono text-xs text-cinema-gold tracking-[0.3em] uppercase mb-12 text-center md:text-left">
          CREDITS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-5xl">
          {crew.map((member) => (
            <div
              key={member.role}
              className="credit-item flex items-center justify-between py-6 border-b border-cinema-surface/50 group hover:bg-cinema-surface/10 px-4 -mx-4 transition-colors duration-500"
            >
              <span className="font-mono text-xs md:text-sm text-cinema-muted uppercase tracking-[0.2em] group-hover:text-cinema-gold transition-colors duration-500">
                {member.role}
              </span>
              <span className="font-dm-sans text-lg md:text-xl text-cinema-cream font-light tracking-wide group-hover:tracking-widest transition-all duration-500">
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

