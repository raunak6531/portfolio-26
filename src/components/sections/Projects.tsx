"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const cinematicEase = [0.22, 1, 0.36, 1] as const;

const films = [
  {
    id: "01",
    title: "Echo Chamber",
    genre: "Full-Stack Web App",
    year: "2025",
    synopsis: "A real-time collaborative platform built with Next.js, WebSockets, and PostgreSQL. Think Google Docs meets a social network.",
    tags: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    color: "#c9a84c",
    href: "#",
  },
  {
    id: "02",
    title: "Noir Market",
    genre: "E-Commerce Platform",
    year: "2025",
    synopsis: "A dark-themed luxury e-commerce experience with seamless cart, auth, and Stripe integration. Aesthetic meets function.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "#c0392b",
    href: "#",
  },
  {
    id: "03",
    title: "The Archive",
    genre: "Personal Film Database",
    year: "2024",
    synopsis: "A personal film logging app powered by TMDB API. Rate, review, and organize your cinematic life.",
    tags: ["Next.js", "TMDB API", "Tailwind", "Supabase"],
    color: "#5b8caa",
    href: "#",
  },
  {
    id: "04",
    title: "Frame Rate",
    genre: "Creative Agency Site",
    year: "2024",
    synopsis: "A high-performance agency portfolio with GSAP scroll animations, 3D tilt effects, and zero-lag transitions.",
    tags: ["Next.js", "GSAP", "Framer Motion", "Sanity CMS"],
    color: "#7c6e8a",
    href: "#",
  },
];

function ProjectCard({ film, index }: { film: typeof films[0]; index: number }) {
  return (
    <article
      className="project-panel group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] bg-cinema-black/90 border border-cinema-surface/40 hover:border-cinema-surface/80 overflow-hidden transition-all duration-700"
    >
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#080808_120%)] z-0 pointer-events-none opacity-50" />

      {/* Color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-all duration-700"
        style={{ background: film.color }}
      />

      {/* Large background number */}
      <span className="absolute -bottom-8 -right-8 text-[20vw] font-bebas leading-none text-cinema-surface/10 select-none group-hover:text-cinema-surface/20 transition-all duration-700">
        {film.id}
      </span>

      <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-2" style={{ color: film.color }}>
              {film.id} — {film.year}
            </p>
            <h3 className="font-bebas text-5xl md:text-6xl text-cinema-cream leading-none group-hover:text-cinema-gold transition-colors duration-500">
              {film.title}
            </h3>
            <p className="font-mono text-xs md:text-sm text-cinema-muted uppercase tracking-widest mt-2">
              {film.genre}
            </p>
          </div>
          <a
            href={film.href}
            className="w-12 h-12 rounded-full border border-cinema-surface flex items-center justify-center text-cinema-cream hover:border-cinema-gold hover:text-cinema-gold hover:scale-110 transition-all duration-500 flex-shrink-0"
            aria-label={`View ${film.title}`}
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        {/* Synopsis */}
        <p className="text-cinema-cream/70 text-base md:text-lg leading-relaxed flex-grow group-hover:text-cinema-cream/90 transition-colors duration-500 max-w-xl">
          {film.synopsis}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
          {film.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] md:text-xs px-3 py-1.5 border border-cinema-surface text-cinema-cream/80 uppercase tracking-widest group-hover:border-cinema-surface/80 group-hover:text-cinema-cream transition-colors duration-500 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".project-panel");
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper || panels.length === 0) return;

    // Calculate how far to scroll the wrapper
    // We want it to scroll continuously to the left based on scroll position
    let ctx = gsap.context(() => {
      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

      const scrollTween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true, // Ensure it pushes content down
          scrub: 1, // Smooth scrub
          end: () => `+=${wrapper.scrollWidth - window.innerWidth}`, // The distance to scroll before unpinning
          invalidateOnRefresh: true,
        }
      });

      // Individual panel animation when it comes into view horizontally
      panels.forEach((panel: any) => {
        gsap.fromTo(panel,
          { opacity: 0.2, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween, // Use the horizontal scroll animation as a trigger context
              start: "left center+=30%",
              end: "left center-=30%",
              scrub: true,
            }
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div className="bg-cinema-black w-full overflow-hidden">
      <section ref={containerRef} id="filmography" className="relative h-screen bg-cinema-black flex flex-col justify-center">

        {/* Intro Header that stays pinned while scrolling */}
        <div className="absolute top-16 md:top-24 left-6 md:left-12 lg:left-16 z-20 pointer-events-none pr-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="section-label mb-2 text-cinema-muted"
          >
            INT. THE VAULT — NIGHT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: cinematicEase }}
            className="font-bebas text-7xl md:text-[8vw] leading-none text-cinema-cream mix-blend-difference"
          >
            FILM<span className="text-cinema-gold">OG</span>RAPHY
          </motion.h2>
        </div>

        {/* Horizontal scroll track */}
        <div ref={wrapperRef} className="flex h-full items-center flex-nowrap pl-6 md:pl-12 lg:pl-16 pr-[20vw] pt-20 relative z-10 w-max">
          <div className="flex gap-6 md:gap-12 flex-nowrap">
            {films.map((film, i) => (
              <ProjectCard key={film.id} film={film} index={i} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

