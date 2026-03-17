"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

interface CinematicDividerProps {
  scene: string;
  bg?: string;
}

export default function CinematicDivider({
  scene,
  bg = "bg-cinema-black",
}: CinematicDividerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`relative ${bg} overflow-hidden py-6 px-6 md:px-16 lg:px-24`}>
      {/* Film holes row */}
      <div className="flex items-center gap-3 mb-5 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="film-hole flex-shrink-0" />
        ))}
      </div>

      {/* Scene label + sweeping lines */}
      <div className="flex items-center gap-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: cinematicEase }}
          className="h-px bg-gradient-to-r from-transparent via-cinema-gold/50 to-cinema-gold/20 flex-1 origin-left"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease: cinematicEase }}
          className="flex-shrink-0 text-center"
        >
          <p className="font-mono text-[10px] text-cinema-gold/60 tracking-[0.5em] uppercase leading-none">
            {scene}
          </p>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: cinematicEase }}
          className="h-px bg-gradient-to-l from-transparent via-cinema-gold/50 to-cinema-gold/20 flex-1 origin-right"
        />
      </div>

      {/* Film holes row */}
      <div className="flex items-center gap-3 mt-5 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="film-hole flex-shrink-0" />
        ))}
      </div>
    </div>
  );
}

