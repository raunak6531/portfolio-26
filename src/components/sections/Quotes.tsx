"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

const quotes = [
  {
    text: "Cinema is a matter of what's in the frame and what's out.",
    author: "Martin Scorsese",
  },
  {
    text: "The more personal something is, the more universal it becomes.",
    author: "Stanley Kubrick",
  },
  {
    text: "A film is never really good unless the camera is an eye in the head of a poet.",
    author: "Orson Welles",
  },
  {
    text: "Every great film should seem new every time you see it.",
    author: "Roger Ebert",
  },
  {
    text: "I am a camera with its shutter open, quite passive, recording, not thinking.",
    author: "Christopher Isherwood",
  },
];

export default function Quotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + quotes.length) % quotes.length);
  const next = () => setIndex((i) => (i + 1) % quotes.length);

  return (
    <section className="section-shell relative bg-cinema-black min-h-[62vh] py-28 md:py-36 lg:py-40 px-6 md:px-12 lg:px-16 overflow-hidden flex items-center">
      {/* Big decorative quote marks */}
      <div className="absolute top-4 left-8 font-bebas text-[20vw] text-cinema-surface/20 leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <p className="section-label mb-12 md:mb-14">DIRECTOR&apos;S CUT — WORDS OF WISDOM</p>

        <div className="min-h-[190px] md:min-h-[220px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-dm-sans text-xl md:text-2xl lg:text-3xl text-cinema-cream leading-relaxed italic mb-6">
                &ldquo;{quotes[index].text}&rdquo;
              </p>
              <p className="font-mono text-sm text-cinema-gold uppercase tracking-[0.3em]">
                — {quotes[index].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mt-12 md:mt-14">
          <button
            onClick={prev}
            className="w-10 h-10 border border-cinema-surface text-cinema-muted hover:border-cinema-gold hover:text-cinema-gold transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-px transition-all duration-300 ${i === index ? "w-8 bg-cinema-gold" : "w-3 bg-cinema-surface"}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-cinema-surface text-cinema-muted hover:border-cinema-gold hover:text-cinema-gold transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

