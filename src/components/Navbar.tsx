"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Crew", href: "#crew" },
  { label: "Filmography", href: "#filmography" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-cinema-black/90 backdrop-blur-md border-b border-cinema-gold/10"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-0 right-0 h-px bg-cinema-gold origin-left z-10"
        />
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-mono text-cinema-gold text-xs tracking-[0.3em] uppercase group-hover:tracking-[0.5em] transition-all duration-500">
            [ RAUNAK ]
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs tracking-widest uppercase text-cinema-muted hover:text-cinema-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex items-center gap-6 ml-2 border-l border-cinema-surface/50 pl-8">
            <a
              href="#contact"
              className="px-5 py-2 border border-cinema-gold text-cinema-gold font-mono text-xs tracking-widest uppercase hover:bg-cinema-gold hover:text-cinema-black transition-all duration-300"
            >
              Hire Me
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger & Sound */}
        <div className="md:hidden flex items-center gap-6">
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => { setMenuOpen(!menuOpen); }}
            aria-label="Toggle menu"
          >
          <span
            className={`block w-6 h-px bg-cinema-cream transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-cinema-cream transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-cinema-cream transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: cinematicEase }}
            className="fixed inset-0 z-40 bg-cinema-black flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => { setMenuOpen(false); }}
                className="font-bebas text-6xl text-cinema-cream hover:text-cinema-gold transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

