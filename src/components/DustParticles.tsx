"use client";

import { useState, useEffect, useMemo } from "react";

export default function DustParticles({ particleCount = 10 }: { particleCount?: number }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: 12 + Math.random() * 16,
      delay: Math.random() * 8,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, [particleCount, isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
        {particles.map((p: any) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(200,210,255,${p.opacity}) 0%, transparent 70%)`,
              animation: `crewDust${p.id % 3} ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes crewDust0 {
          from { transform: translate(0,0) scale(1); opacity: 0.2; }
          to   { transform: translate(35px,-50px) scale(0.7); opacity: 0.5; }
        }
        @keyframes crewDust1 {
          from { transform: translate(0,0) scale(0.8); opacity: 0.3; }
          to   { transform: translate(-30px,45px) scale(1.1); opacity: 0.15; }
        }
        @keyframes crewDust2 {
          from { transform: translate(0,0) scale(1); opacity: 0.2; }
          to   { transform: translate(40px,25px) scale(0.8); opacity: 0.45; }
        }
      `}</style>
    </>
  );
}
