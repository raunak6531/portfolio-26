"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const cinematicEase = [0.22, 1, 0.36, 1] as const;
const roles = ["Film Enthusiast", "Frontend Developer", "Creative Thinker", "Story Lover"];

function FilmCountdown({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const t = setTimeout(onDone, 400);
      return () => clearTimeout(t);
    }
    
    const t = setTimeout(() => setCount((c) => c - 1), 700);
    return () => clearTimeout(t);
  }, [count, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-cinema-black flex flex-col items-center justify-center cursor-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Film strip top */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-cinema-deep flex items-center px-4 gap-2 overflow-hidden opacity-50">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="film-hole flex-shrink-0" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-cinema-deep flex items-center px-4 gap-2 overflow-hidden opacity-50">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="film-hole flex-shrink-0" />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={count}
            initial={{ scale: 1.2, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.8, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: cinematicEase }}
            className="text-center"
          >
            <p className="font-mono text-cinema-gold/70 text-xs tracking-[0.5em] uppercase mb-4">
              Feature Presentation
            </p>
            <span className="font-bebas text-[25vw] leading-none text-cinema-cream drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {count}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="go"
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: cinematicEase }}
            className="font-bebas text-[15vw] text-cinema-gold leading-none drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]"
          >
            ACTION!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Cinematic Floating Dust Particles
function AmbientDust() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-40">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 1.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            x: [null, (Math.random() - 0.5) * 100],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [introComplete, setIntroComplete] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);

  useEffect(() => {
    if (!introComplete) return;
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [introComplete]);

  // Dramatic GSAP Title Reveal
  useGSAP(() => {
    if (!introComplete || !titleContainerRef.current) return;

    const chars = titleContainerRef.current.querySelectorAll(".char");

    gsap.fromTo(chars,
      {
        opacity: 0,
        y: 60,
        rotateX: -90,
        filter: "blur(10px)",
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
      }
    );
  }, { scope: heroRef, dependencies: [introComplete] });

  return (
    <>
      <AnimatePresence>
        {!introComplete && <FilmCountdown onDone={() => setIntroComplete(true)} />}
      </AnimatePresence>

      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 overflow-hidden bg-cinema-black">
        
        {/* Dynamic Cinematic Lighting (Lens Flares / Orbs) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-[20vw] w-[60vw] h-[60vw] bg-cinema-gold/10 blur-[150px] rounded-full z-0 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 -left-[10vw] w-[50vw] h-[50vw] bg-[#5b8caa]/10 blur-[120px] rounded-full z-0 pointer-events-none"
        />

        {/* Cinematic Viewfinder Grid */}
        <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center">
          <div className="w-[85vw] md:w-[70vw] h-[75vh] md:h-[65vh] relative">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 md:w-16 h-8 md:h-16 border-t-[1px] border-l-[1px] border-cinema-cream/20" />
            <div className="absolute top-0 right-0 w-8 md:w-16 h-8 md:h-16 border-t-[1px] border-r-[1px] border-cinema-cream/20" />
            <div className="absolute bottom-0 left-0 w-8 md:w-16 h-8 md:h-16 border-b-[1px] border-l-[1px] border-cinema-cream/20" />
            <div className="absolute bottom-0 right-0 w-8 md:w-16 h-8 md:h-16 border-b-[1px] border-r-[1px] border-cinema-cream/20" />

            {/* Center cross */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center opacity-30">
              <div className="w-full h-[1px] bg-cinema-cream" />
              <div className="absolute h-full w-[1px] bg-cinema-cream" />
            </div>

            {/* Rule of thirds grid (very subtle) */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10">
              <div className="border-r border-b border-cinema-cream" />
              <div className="border-r border-b border-cinema-cream" />
              <div className="border-b border-cinema-cream" />
              <div className="border-r border-b border-cinema-cream" />
              <div className="border-r border-b border-cinema-cream" />
              <div className="border-b border-cinema-cream" />
              <div className="border-r border-cinema-cream" />
              <div className="border-r border-cinema-cream" />
              <div className="" />
            </div>

            {/* Focal length / Safe area ticks */}
            <div className="absolute top-[10%] left-[-4px] w-2 h-[1px] bg-cinema-cream/30" />
            <div className="absolute top-[90%] left-[-4px] w-2 h-[1px] bg-cinema-cream/30" />
            <div className="absolute top-[10%] right-[-4px] w-2 h-[1px] bg-cinema-cream/30" />
            <div className="absolute top-[90%] right-[-4px] w-2 h-[1px] bg-cinema-cream/30" />
            <div className="absolute left-[10%] top-[-4px] h-2 w-[1px] bg-cinema-cream/30" />
            <div className="absolute left-[90%] top-[-4px] h-2 w-[1px] bg-cinema-cream/30" />
            <div className="absolute left-[10%] bottom-[-4px] h-2 w-[1px] bg-cinema-cream/30" />
            <div className="absolute left-[90%] bottom-[-4px] h-2 w-[1px] bg-cinema-cream/30" />
          </div>
        </div>

        {introComplete && <AmbientDust />}

        {/* "NOW PLAYING" label top-right */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
          animate={introComplete ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.8, duration: 1.2, ease: cinematicEase }}
          className="absolute top-24 right-6 md:right-16 lg:right-24 z-20 text-right"
        >
          <p className="font-mono text-[10px] md:text-xs text-cinema-gold tracking-[0.3em] uppercase mb-2">Now Playing</p>
          <div className="w-24 h-[1px] bg-gradient-to-l from-cinema-gold to-transparent mt-2 ml-auto" />
        </motion.div>

        {/* Frame counter bottom-left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 0.5 } : {}}
          transition={{ delay: 1.8, duration: 2 }}
          className="absolute bottom-24 left-6 md:left-16 lg:left-24 z-20 flex items-center gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="font-mono text-xs text-cinema-muted tracking-widest">
            REC / 24FPS / 35MM
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div className="relative z-20 flex flex-col items-center justify-center origin-center" style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex flex-col items-center"
          >
            <p className="font-mono text-[10px] md:text-xs text-cinema-gold tracking-[0.4em] uppercase mb-4 md:mb-6 text-center">A film by</p>

            <div ref={titleContainerRef} className="flex overflow-hidden perspective-[1000px] justify-center">
              {"RAUNAK".split("").map((char, index) => (
                <span
                  key={index}
                  className="char font-bebas text-[22vw] md:text-[18vw] leading-[0.85] text-cinema-cream drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] inline-block"
                >
                  {char}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={introComplete ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 1.5, duration: 1, ease: cinematicEase }}
            className="flex items-center gap-6 mt-8 md:mt-10"
          >
            <div className="w-8 md:w-16 h-[1px] bg-cinema-gold/50" />
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: cinematicEase }}
                className="font-mono text-xs md:text-sm text-cinema-cream/90 uppercase tracking-[0.3em] text-center"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <div className="w-8 md:w-16 h-[1px] bg-cinema-gold/50" />
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute bottom-12 right-6 md:right-16 lg:right-24 z-20 flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[10px] text-cinema-muted tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-cinema-gold to-transparent origin-top"
          />
        </motion.div>
      </section>
    </>
  );
}

