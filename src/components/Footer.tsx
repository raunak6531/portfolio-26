"use client";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Crew", href: "#crew" },
  { label: "Filmography", href: "#filmography" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cinema-black border-t border-cinema-surface pt-20 pb-10 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        {/* Brand */}
        <div>
          <p className="font-mono text-cinema-gold text-xs tracking-[0.4em] uppercase mb-4">
            [ RAUNAK ]
          </p>
          <p className="text-cinema-muted text-sm leading-relaxed max-w-xs">
            Film nerd. Developer. Builder of digital worlds that feel like cinema.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cinema-gold animate-pulse" />
            <span className="font-mono text-xs text-cinema-muted">Available for work</span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-mono text-xs text-cinema-gold tracking-[0.3em] uppercase mb-4">Navigate</p>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-sm text-cinema-muted hover:text-cinema-gold transition-colors duration-300 uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contacts */}
        <div>
          <p className="font-mono text-xs text-cinema-gold tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <div className="flex flex-col gap-3">
            <a href="mailto:raunak@example.com" className="font-mono text-sm text-cinema-muted hover:text-cinema-gold transition-colors duration-300">
              raunak@example.com
            </a>
            <a href="#" className="font-mono text-sm text-cinema-muted hover:text-cinema-gold transition-colors duration-300">
              GitHub
            </a>
            <a href="#" className="font-mono text-sm text-cinema-muted hover:text-cinema-gold transition-colors duration-300">
              LinkedIn
            </a>
            <a href="#" className="font-mono text-sm text-cinema-muted hover:text-cinema-gold transition-colors duration-300">
              Twitter / X
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="screenplay-divider mb-8" />

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-cinema-muted/60">
          © {year} Raunak. All rights reserved.
        </p>
        <p className="font-mono text-xs text-cinema-muted/40 text-center">
          Made with ♥ and too many films — Next.js · Tailwind · Framer Motion
        </p>
        <p className="font-mono text-xs text-cinema-muted/60 flex items-center gap-2">
          <span className="text-cinema-gold">◼</span> Roll credits.
        </p>
      </div>
    </footer>
  );
}

