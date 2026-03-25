"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

const filmography = [
  {
    id: "phisaver",
    title: "PhiSaver",
    logline: "A gamified savings application designed to encourage millennials and Gen Z to build wealth over time using behavioral economics.",
    director: "Raunak Sadana",
    cast: ["Next.js", "Tailwind CSS", "Clerk", "Flask", "PostgreSQL", "Gemini 2.0 Flash"],
    posterUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop",
    trailerUrl: "/videos/phisaver.mp4",
    releaseDate: "2026",
    liveLink: "https://phi-saver-savingapp.vercel.app/",
    repoLink: "https://github.com/raunak6531/my-savings-app"
  },
  {
    id: "storyboxd",
    title: "StoryBoxd",
    logline: "A Next.js PWA that scrapes Letterboxd reviews and generates customizable, aesthetic images for Instagram Stories.",
    director: "Raunak Sadana",
    cast: ["Next.js", "TypeScript", "Tailwind CSS", "html2canvas"],
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop", 
    trailerUrl: "/videos/storyboxd.mp4", 
    releaseDate: "2026",
    liveLink: "https://storyboxd-eight.vercel.app/",
    repoLink: "https://github.com/raunak6531/storyboxd"
  },
  {
    id: "letsmate",
    title: "Let's Mate",
    logline: "A fun, free-to-play chess game to play against the Stockfish engine in your preferred difficulty.",
    director: "Raunak Sadana",
    cast: ["React", "Socket.IO", "Stockfish Engine"],
    posterUrl: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=2158&auto=format&fit=crop", 
    trailerUrl: "/videos/letsmate.mp4", 
    releaseDate: "2026",
    liveLink: "https://chess-game-app-lemon.vercel.app/",
    repoLink: "https://github.com/raunak6531/chess-game-app"
  },
  {
    id: "portfolio-v1",
    title: "Portfolio v1",
    logline: "The original iteration of my digital archive, built as the foundation of my engineering journey.",
    director: "Raunak Sadana",
    cast: ["React", "HTML/CSS", "JavaScript", "GSAP"],
    posterUrl: "https://images.unsplash.com/photo-1507238692062-5a02ea0124ad?q=80&w=2070&auto=format&fit=crop", 
    trailerUrl: "/videos/portfoliov1.mp4", 
    releaseDate: "2024",
    liveLink: "https://my-portfolio-zeta-ten-49.vercel.app/",
    repoLink: "https://github.com/raunak6531/personal-portfolio"
  }
];

const rotations = [-2, 3, -1];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function ScrambleText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    const maxIterations = text.length;
    
    // Safety check just in case text changes often
    setDisplayText("");

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (letter === " ") return " ";
              if (index < iteration) return text[index];
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        
        if (iteration >= maxIterations) {
          clearInterval(interval);
        }
        iteration += 1 / 3; 
      }, 40);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { delayChildren: delay, staggerChildren: 0.03 } }
      }}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function FilmPoster({
  film, index, scrollRef, isHovered, isDimmed, isSelected, onHoverStart, onHoverEnd, onClick
}: {
  film: typeof filmography[0]; index: number; scrollRef: React.RefObject<HTMLDivElement | null>;
  isHovered: boolean; isDimmed: boolean; isSelected: boolean;
  onHoverStart: () => void; onHoverEnd: () => void; onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Parallax horizontal scroll tracker against its container
  const { scrollXProgress } = useScroll({
    container: scrollRef,
    target: itemRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to opposite internal motion (3D window pan)
  const imageX = useTransform(scrollXProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={itemRef}
      className={`relative cursor-pointer transition-opacity duration-300 ${isDimmed && !isSelected ? 'opacity-30' : 'opacity-100'} ${isSelected ? 'w-[75vw] md:w-[30vw] max-w-[400px]' : ''}`}
      onHoverStart={() => {
        onHoverStart();
        // Hover handled externally if needed, but we can call it globally if we passed it down
      }}
      onHoverEnd={onHoverEnd}
      onClick={() => {
        onClick();
      }}
      initial={{ rotate: rotations[index % rotations.length] }}
      animate={{
        rotate: isHovered || isSelected ? 0 : rotations[index % rotations.length],
        scale: isHovered && !isSelected ? 1.05 : 1,
        zIndex: isHovered ? 20 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container with layoutId */}
      {!isSelected ? (
        <motion.div 
          layoutId={`poster-${film.id}`}
          className="w-[75vw] md:w-[30vw] max-w-[400px] aspect-[2/3] overflow-hidden rounded-sm shadow-2xl bg-[#0a0a0a] border border-cinema-surface/30 relative"
        >
          {/* Apply scale 1.25 and motion x on image to prevent clipping while panning */}
          <motion.img 
            src={film.posterUrl} 
            alt={film.title}
            style={{ x: imageX, scale: 1.25 }}
            animate={{ opacity: isHovered ? 0 : 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover grayscale z-0"
          />
          
          {/* Trailer Video on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.video 
                src={film.trailerUrl}
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
            )}
          </AnimatePresence>

          {/* Grain overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none z-20" style={{ display: isHovered ? 'none' : 'block' }}></div>
          
          {/* Subtle info in default view */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent opacity-0 transition-opacity duration-300 z-30" style={{ opacity: isHovered ? 1 : 0 }}>
            <p className="font-mono text-red-700 text-xs mb-1 tracking-widest">{film.releaseDate}</p>
            <h3 className="font-bebas text-3xl">{film.title}</h3>
          </div>
        </motion.div>
      ) : (
        // Placeholder to preserve space in the scroll container when image transitions away
        <div className="w-full aspect-[2/3]" />
      )}
      
      {/* Cassette / Tape details below the poster */}
      <motion.div 
        className="mt-6 text-center"
        animate={{ opacity: isHovered ? 1 : 0.5, y: isHovered ? 0 : 5 }}
      >
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-cinema-muted">
          {film.id.replace('-', ' ')}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Filmography() {
  const [selectedFilm, setSelectedFilm] = useState<typeof filmography[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for light leak
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 0.5 });
  const lightLeakBackground = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(153, 27, 27, 0.15) 0%, rgba(202, 138, 4, 0.05) 30%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(((clientX - left) / width) * 100);
    mouseY.set(((clientY - top) / height) * 100);
  };

  return (
    <section 
      id="filmography" 
      className="relative min-h-screen bg-cinema-black text-cinema-cream py-24 flex flex-col justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      <style>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -15%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(5%, 20%); }
          90% { transform: translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain-shift 8s steps(10) infinite;
        }
      `}</style>
      
      {/* Animated CSS Film Grain */}
      <div 
        className="absolute -inset-[50%] z-0 pointer-events-none opacity-[0.25] mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dynamic Light Leak */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-100"
        style={{ background: lightLeakBackground }}
      />
      
      {/* Background Cinematic Text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] z-0 overflow-hidden">
        <h2 className="font-bebas text-[25vw] leading-none whitespace-nowrap">THE ARCHIVE</h2>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full mb-12 flex justify-center">
        <h2 className="font-bebas text-6xl md:text-8xl text-cinema-cream tracking-wide text-center">
          FILM<span className="text-red-700">OG</span>RAPHY
        </h2>
      </div>

      {/* The Film Strip (Default View) */}
      <div 
        ref={scrollRef}
        className="relative z-10 flex flex-1 items-center justify-start w-full overflow-x-auto overflow-y-hidden hide-scrollbar py-20"
      >
        <div className="flex items-center gap-12 md:gap-20 min-w-max px-8 md:px-16 lg:px-24 pb-8 pr-[10vw]">
          {filmography.map((film, index) => (
            <FilmPoster 
              key={film.id}
              film={film}
              index={index}
              scrollRef={scrollRef}
              isHovered={hoveredId === film.id}
              isDimmed={hoveredId !== null && hoveredId !== film.id}
              isSelected={selectedFilm?.id === film.id}
              onHoverStart={() => { setHoveredId(film.id); }}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => { setSelectedFilm(film); }}
            />
          ))}
        </div>
      </div>

      {/* The Feature Presentation (Expanded View) */}
      <AnimatePresence>
        {selectedFilm && (
          <>
            {/* Dark overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFilm(null)}
              className="fixed inset-0 z-40 bg-cinema-black/95 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-50 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 lg:p-24 pointer-events-none">
              
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSelectedFilm(null)}
                className="absolute top-6 right-6 md:top-12 md:right-12 text-cinema-muted hover:text-red-700 transition-colors pointer-events-auto p-2 border border-cinema-surface/50 rounded-full hover:border-red-700/50 bg-black/50"
              >
                <X size={32} strokeWidth={1.5} />
              </motion.button>

              {/* Left Side: The Poster */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center relative pointer-events-auto">
                <motion.div
                  layoutId={`poster-${selectedFilm.id}`}
                  className="w-auto h-full max-h-[75vh] aspect-[2/3] overflow-hidden rounded-sm shadow-2xl bg-[#0a0a0a] border border-cinema-surface/30 relative"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -1 }} // Slight dynamic tilt when expanded
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <img 
                    src={selectedFilm.posterUrl} 
                    alt={selectedFilm.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Trailer Video in Expanded View */}
                  <motion.video 
                    src={selectedFilm.trailerUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }} // Fade in after the FLIP morph completes
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Subtle red recording light accent */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-600 rounded-full animate-pulse blur-[1px]"></div>
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                </motion.div>
              </div>

              {/* Right Side: The Plot (Details) */}
              <div className="w-full md:w-1/2 md:pl-16 lg:pl-24 pt-8 md:pt-0 flex flex-col justify-center pointer-events-auto max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h4 className="font-mono text-red-700 text-sm tracking-[0.3em] uppercase mb-4">
                    Director: {selectedFilm.director} • {selectedFilm.releaseDate}
                  </h4>
                  <h3 className="font-bebas text-6xl md:text-8xl lg:text-[100px] leading-[0.85] text-cinema-cream mb-8">
                    <ScrambleText text={selectedFilm.title.toUpperCase()} delay={0.4} />
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-mono text-cinema-muted text-xs tracking-widest uppercase mb-2 border-b border-cinema-surface/50 pb-2 inline-block">
                        Synopsis
                      </p>
                      <p className="text-xl md:text-2xl font-light text-cinema-cream/90 leading-relaxed font-serif italic">
                        {selectedFilm.logline}
                      </p>
                    </div>

                    <motion.div 
                      className="pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <p className="font-mono text-cinema-muted text-xs tracking-widest uppercase mb-2 border-b border-cinema-surface/50 pb-2 inline-block">
                        Starring
                      </p>
                      <p className="font-mono text-sm md:text-base text-cinema-cream leading-relaxed block h-8">
                        <TypewriterText text={selectedFilm.cast.join(", ")} delay={0.9} />
                      </p>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex flex-wrap gap-4 mt-8"
                  >
                    <a 
                      href={selectedFilm.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-8 py-4 bg-cinema-cream text-cinema-black font-mono text-sm uppercase tracking-widest overflow-hidden flex items-center gap-3"
                    >
                      {/* Hover fill effect */}
                      <div className="absolute inset-0 bg-red-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
                      <span className="relative z-10 group-hover:text-cinema-cream transition-colors duration-300">Now Showing</span>
                      <ExternalLink size={16} className="relative z-10 group-hover:text-cinema-cream transition-colors duration-300" />
                    </a>

                    <a 
                      href={selectedFilm.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-8 py-4 border border-cinema-surface text-cinema-cream font-mono text-sm uppercase tracking-widest hover:border-red-700 hover:text-red-700 transition-colors flex items-center gap-3"
                    >
                      <span>Behind the Scenes</span>
                      <Github size={16} />
                    </a>
                  </motion.div>

                </motion.div>
              </div>

            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
