"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const crew = [
  { role: "Lead Actor", name: "React / Next.js", type: "Framework", stat: "99+ projects", accent: "#e8c96a",
    details: "Core UI framework. Handles state, routing, and component lifecycle with precision. The glue that holds every frame of the digital film together." },
  { role: "Dir. of Photography", name: "TypeScript", type: "Language", stat: "Strict mode", accent: "#7cacf8",
    details: "Static typing for JavaScript. Gives clarity across every angle — no blurry shots, no ambiguous types. Every variable framed with intent." },
  { role: "Sound Designer", name: "Node.js", type: "Runtime", stat: "Event-driven", accent: "#7ec94b",
    details: "Non-blocking, event-driven runtime built on Chrome's V8. The rhythm section of the backend — always in time, never blocking the beat." },
  { role: "Production Designer", name: "Tailwind CSS", type: "Styling", stat: "Utility-first", accent: "#38bdf8",
    details: "Utility-first CSS framework for rapid UI construction. Sets the stage — every utility class a carefully placed piece of production design." },
  { role: "Editor", name: "Git & GitHub", type: "Tooling", stat: "3000+ commits", accent: "#f07451",
    details: "Version control and collaborative coding. The editing suite — non-linear, precise, preserving every cut in the history of this production." },
  { role: "Visual Effects", name: "GSAP / Framer", type: "Animation", stat: "60fps always", accent: "#88ce02",
    details: "Animation libraries for complex interactions and buttery-smooth transitions. The VFX team — turning static components into living, breathing scenes." },
  { role: "Score Composer", name: "PostgreSQL", type: "Database", stat: "ACID compliant", accent: "#5298c3",
    details: "Relational database for storing production data securely. The underlying score that gives the narrative its persistent memory." },
  { role: "Casting Director", name: "REST / GraphQL", type: "API", stat: "Type-safe", accent: "#e535ab",
    details: "Clean API interfaces for querying and manipulating data streams. Curates the right data for each scene — never more, never less." },
];

const TOTAL = crew.length;

import DustParticles from "@/components/DustParticles";

// ─── Typing Effect ───
function TypedText({ text, active, speed = 18 }: { text: string; active: boolean; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const prevActiveRef = useRef(false);
  const textRef = useRef(text);

  useEffect(() => {
    if (!active) {
      if (prevActiveRef.current) setDisplayed("");
      prevActiveRef.current = false;
      return;
    }
    if (prevActiveRef.current && textRef.current === text) return;
    textRef.current = text;
    prevActiveRef.current = true;
    setDisplayed("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, active, speed]);

  return (
    <span>
      {displayed}
      {active && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-white/40 ml-[2px] align-text-bottom" style={{ animation: "crewBlink 0.6s step-end infinite" }} />
      )}
    </span>
  );
}

// ─── Single Crew Slide (minimal: just accent glow + content) ──────────────────
function CrewSlide({ member, isActive }: { member: typeof crew[0]; isActive: boolean }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: isActive ? "auto" : "none",
        zIndex: isActive ? 2 : 1,
      }}
    >
      {/* Accent glow — stronger and more vibrant */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 20%, ${member.accent}1a 0%, ${member.accent}08 30%, transparent 60%)`,
        }}
      />

      {/* Top-down warm spotlight wash */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ opacity: 0.07 }}>
        <span
          className="font-bebas uppercase whitespace-nowrap select-none"
          style={{
            fontSize: "clamp(14rem, 36vw, 32rem)",
            color: member.accent,
            letterSpacing: "0.05em",
            lineHeight: 0.85,
          }}
        >
          {member.name.split("/")[0].trim()}
        </span>
      </div>

      {/* ── Content ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-16"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1) 0.12s, transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.12s",
        }}
      >
        {/* Role label */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8" style={{ backgroundColor: `${member.accent}55` }} />
          <span
            className="font-mono uppercase tracking-[0.5em]"
            style={{ fontSize: "clamp(9px, 1vw, 12px)", color: member.accent }}
          >
            {member.role}
          </span>
          <div className="h-px w-8" style={{ backgroundColor: `${member.accent}55` }} />
        </div>

        {/* Member Name */}
        <h2
          className="font-bebas uppercase text-center leading-none tracking-wider mb-6"
          style={{
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            color: "#fff",
            textShadow: `0 0 80px ${member.accent}50, 0 0 200px ${member.accent}25`,
            letterSpacing: "0.06em",
          }}
        >
          {member.name}
        </h2>

        {/* Type / Stat badges */}
        <div className="flex items-center gap-4 mb-8">
          <span
            className="font-mono uppercase tracking-[0.25em] px-4 py-1.5 rounded-full"
            style={{
              fontSize: "9px",
              color: member.accent,
              border: `1px solid ${member.accent}33`,
              background: `${member.accent}0a`,
            }}
          >
            {member.type}
          </span>
          <span className="font-mono text-white/25" style={{ fontSize: "8px" }}>●</span>
          <span
            className="font-mono uppercase tracking-[0.2em]"
            style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)" }}
          >
            {member.stat}
          </span>
        </div>

        {/* Typed description */}
        <div className="max-w-xl text-center" style={{ minHeight: "4.5em" }}>
          <p
            className="font-mono leading-relaxed"
            style={{ fontSize: "clamp(12px, 1.3vw, 15px)", color: "rgba(255,255,255,0.45)", lineHeight: "1.9" }}
          >
            <TypedText text={member.details} active={isActive} speed={16} />
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CrewSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ─── Performant Mouse Spotlight ───
  const mouseSpotlightRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    
    let rafId: number;
    let smoothX = 0.5, smoothY = 0.5;

    const tick = () => {
      // Smooth interpolation
      smoothX += (mousePosRef.current.x - smoothX) * 0.1;
      smoothY += (mousePosRef.current.y - smoothY) * 0.1;

      // Update native DOM node directly with transform (GPU accelerated, 0 paint cost)
      if (mouseSpotlightRef.current) {
        // Calculate rotation based on X position (pendulum effect: -35deg to +35deg -> reduced to -15deg to +15deg)
        const rotation = (smoothX - 0.5) * 30;
        mouseSpotlightRef.current.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP only does pinning + index mapping — zero DOM writes
  useGSAP(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${TOTAL * 200}vh`,
      pin: true,
      pinSpacing: true,
      scrub: 0,
      anticipatePin: 1,
      onUpdate: (self) => {
        const rawIndex = self.progress * TOTAL;
        const idx = Math.min(Math.floor(rawIndex), TOTAL - 1);
        setActiveIndex(idx);
      },
    });
  }, { scope: sectionRef });

  const activeMember = crew[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="crew"
      className="relative w-full h-screen overflow-hidden z-20"
      style={{ background: "#000" }}
    >

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.5)",
        }}
      />

      {/* ── Pendulum Mouse Spotlight ── */}
      <div
        ref={mouseSpotlightRef}
        className="absolute pointer-events-none z-[3] mix-blend-screen"
        style={{
          top: "0",
          left: "50%",
          width: "clamp(600px, 60vw, 1200px)",
          height: "125vh",
          transformOrigin: "50% -5%",
          transform: "translateX(-50%)",
          background: `conic-gradient(from 150deg at 50% -5%, transparent 0deg, ${activeMember.accent}90 30deg, transparent 60deg)`,
          maskImage: "linear-gradient(to bottom, black 10%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 80%)",
          willChange: "transform",
        }}
      />

      {/* Dust — one instance at section level */}
      <DustParticles />

      {/* All Crew Slides — stacked, CSS opacity transition only */}
      {crew.map((member, i) => (
        <CrewSlide
          key={i}
          member={member}
          isActive={i === activeIndex}
        />
      ))}

      {/* ── HUD: Top-Left ── */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none hidden md:flex flex-col gap-[3px]">
        <span className="font-mono text-[8px] tracking-[0.4em] text-white/15 uppercase">CAMERA A · REEL 02</span>
        <span className="font-mono text-[9px] tracking-[0.22em]" style={{ color: "rgba(204,0,0,0.5)" }}>
          SCENE {String(activeIndex + 1).padStart(2, "0")} · TAKE 1
        </span>
      </div>

      {/* ── HUD: Top-Right ── */}
      <div className="absolute top-6 right-6 z-20 pointer-events-none hidden md:flex flex-col items-end gap-[3px]">
        <span className="font-mono text-[8px] tracking-[0.35em] text-white/15 uppercase">4K · 24.000 FPS</span>
        <span className="font-mono text-[9px] tracking-[0.22em]" style={{ color: "rgba(201,168,76,0.35)" }}>
          ISO 800 · T/1.4
        </span>
      </div>

      {/* ── HUD: Bottom-Left — Film Strip ── */}
      <div className="absolute bottom-8 left-6 z-20 pointer-events-none hidden md:flex items-end gap-4">
        <div className="flex gap-[3px]">
          {crew.map((m, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div
                className="rounded-[2px]"
                style={{
                  width: i === activeIndex ? "28px" : "14px",
                  height: "20px",
                  backgroundColor: i === activeIndex ? m.accent : i < activeIndex ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                  boxShadow: i === activeIndex ? `0 0 10px ${m.accent}55` : "none",
                  border: `1px solid ${i === activeIndex ? `${m.accent}88` : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              <span
                className="font-mono absolute -bottom-4 text-center"
                style={{
                  fontSize: "6px",
                  color: m.accent,
                  letterSpacing: "0.15em",
                  opacity: i === activeIndex ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
        <span className="font-mono text-white/15 uppercase ml-2" style={{ fontSize: "8px", letterSpacing: "0.3em" }}>
          {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* ── HUD: Bottom-Right — Scroll Hint ── */}
      <div className="absolute bottom-8 right-6 z-20 pointer-events-none flex flex-col items-end gap-2">
        <span className="font-mono text-white/15 uppercase" style={{ fontSize: "8px", letterSpacing: "0.35em" }}>
          SCROLL TO ADVANCE
        </span>
        <div
          className="w-[1px] h-8 relative overflow-hidden rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-full absolute top-0 rounded-full"
            style={{
              height: "40%",
              backgroundColor: activeMember.accent,
              opacity: 0.5,
              animation: "crewScrollPulse 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-[5]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)",
        }}
      />

      <style>{`
        @keyframes crewBlink {
          50% { opacity: 0; }
        }
        @keyframes crewScrollPulse {
          0%   { transform: translateY(-100%); opacity: 0; }
          30%  { opacity: 0.7; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
