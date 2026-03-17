"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const favFilms = [
  { title: "2001: A Space Odyssey", dir: "KUBRICK" },
  { title: "Mulholland Drive", dir: "LYNCH" },
  { title: "Parasite", dir: "BONG JOON-HO" },
  { title: "The Godfather", dir: "COPPOLA" },
  { title: "Stalker", dir: "TARKOVSKY" },
  { title: "Eternal Sunshine", dir: "GONDRY" },
];

function ScrubText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { opacity: 0.08, filter: "blur(2px)", y: 4 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          end: "bottom 55%",
          scrub: 1.2,
        },
      }
    );
  }, { scope: ref });

  return (
    <p ref={ref} className={className}>
      {children.split(" ").map((word, i) => (
        <span key={i} className="word inline-block mr-[0.3em] will-change-transform">
          {word}
        </span>
      ))}
    </p>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.utils.toArray<HTMLElement>(".script-el").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 36, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 91%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.to(".bg-watermark", {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full bg-[#E5E1D8] text-[#1C1C1C] rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-12 z-30 overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.6)]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Centered watermark — no overflow, no cut-off */}
      <div className="bg-watermark pointer-events-none select-none absolute inset-0 flex flex-col items-center justify-center opacity-[0.035] font-bebas leading-none text-[#1C1C1C] text-center pt-24">
        <span className="text-[23vw] md:text-[18vw]">THE STORY</span>
        <span className="text-[23vw] md:text-[18vw]">SO FAR</span>
      </div>

      {/* ────── SCREENPLAY PAGE ────── */}
      <div className="relative z-10 max-w-2xl mx-auto px-8 sm:px-12 py-28 md:py-48 flex flex-col gap-14 font-mono">

        {/* TITLE CARD */}
        <div className="script-el text-center space-y-3 pb-12 border-b border-[#1C1C1C]/20">
          <h2 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-[0.12em] text-[#1C1C1C]">
            THE STORY SO FAR
          </h2>
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#1C1C1C]/50">
            Written & Directed by Raunak
          </p>
        </div>

        {/* SCENE HEADING */}
        <div className="script-el text-sm md:text-base font-bold uppercase tracking-[0.22em] text-[#1C1C1C]">
          INT. THE DESK — CONTINUOUS
        </div>

        {/* ACTION LINES */}
        <div className="space-y-5 text-sm md:text-[0.95rem] leading-[1.9] text-[#1C1C1C]/85">
          <ScrubText>
            RAUNAK sits illuminated only by the harsh glow of dual monitors. Code streams down one screen, a Tarkovsky still rests on the other.
          </ScrubText>
          <ScrubText>
            He is a developer by day, but every waking hour is obsessed with film.
          </ScrubText>
        </div>

        {/* CHARACTER + DIALOGUE */}
        <div className="script-el flex flex-col items-center mt-6 gap-2">
          <span className="font-bold uppercase tracking-[0.3em] text-sm md:text-base text-[#1C1C1C]">
            RAUNAK
          </span>
          <span className="italic text-xs md:text-sm text-[#1C1C1C]/60 tracking-widest">
            (voice over)
          </span>
          <div className="mt-4 w-[85%] md:w-[75%] space-y-4 text-sm md:text-[0.95rem] leading-[1.9] text-[#1C1C1C]/85">
            <ScrubText>
              The best interfaces, like the best films, are built on story, tension, and release.
            </ScrubText>
            <ScrubText>
              Every pixel is a frame. Every interaction, a cut.
            </ScrubText>
          </div>
        </div>

        {/* ACTION LINES */}
        <div className="space-y-5 text-sm md:text-[0.95rem] leading-[1.9] text-[#1C1C1C]/85 mt-6">
          <ScrubText>
            He crafts digital experiences that feel like cinema — immersive, intentional, and hard to forget.
          </ScrubText>
          <ScrubText>
            Whether building a blazing-fast web app or directing a slow-burn animation, he brings a director's eye to the build.
          </ScrubText>
        </div>

        {/* GOLD DIVIDER QUOTE */}
        <div className="script-el mt-10 border-l-4 border-[#B28A32] pl-6 space-y-2">
          <p className="font-bebas text-2xl md:text-3xl tracking-wide text-[#1C1C1C]/80 italic">
            "Cinema is a matter of what's in the frame and what's out."
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-[#1C1C1C]/50">
            — Martin Scorsese
          </p>
        </div>

        {/* TRANSITION */}
        <div className="script-el text-right font-bold uppercase tracking-[0.3em] text-sm md:text-base mt-10 text-[#1C1C1C]/70">
          CUT TO:
        </div>

        {/* NEW SCENE */}
        <div className="script-el text-sm md:text-base font-bold uppercase tracking-[0.22em] text-[#1C1C1C] mt-4">
          INT. THE THEATER — LATER
        </div>

        <div className="text-sm md:text-[0.95rem] leading-[1.9] text-[#1C1C1C]/85">
          <ScrubText>
            A curated list of his defining inspirations flickers on the screen:
          </ScrubText>
        </div>

        {/* ESSENTIAL VIEWING */}
        <div className="script-el mt-4">
          <div className="text-center font-bold uppercase tracking-[0.35em] text-sm md:text-base border-b border-[#1C1C1C]/20 pb-5 mb-8">
            ESSENTIAL VIEWING
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {favFilms.map((film) => (
              <div key={film.title} className="group cursor-pointer flex flex-col">
                <span className="font-bebas text-[1.5rem] md:text-[1.75rem] tracking-wide group-hover:text-[#B28A32] transition-colors duration-300">
                  "{film.title}"
                </span>
                <span className="text-[0.6rem] md:text-xs tracking-[0.25em] uppercase text-[#1C1C1C]/55 mt-1 group-hover:text-[#1C1C1C]/90 transition-colors">
                  DIR. {film.dir}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FADE OUT */}
        <div className="script-el text-center uppercase tracking-[0.4em] text-xs text-[#1C1C1C]/35 mt-24">
          [ END OF ACT ONE ]
        </div>

      </div>
    </section>
  );
}
