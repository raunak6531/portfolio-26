"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, Github, Linkedin, Twitter } from "lucide-react";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

const socials = [
  { icon: Mail, label: "Email", href: "mailto:raunak@example.com", handle: "raunak@example.com" },
  { icon: Github, label: "GitHub", href: "#", handle: "@raunak" },
  { icon: Linkedin, label: "LinkedIn", href: "#", handle: "in/raunak" },
  { icon: Twitter, label: "Twitter", href: "#", handle: "@raunak" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} className="section-shell relative bg-cinema-deep min-h-[82vh] py-32 md:py-44 lg:py-48 px-6 md:px-12 lg:px-16 overflow-hidden flex items-center">
      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-bebas text-[30vw] text-cinema-surface/20 leading-none">
          CUT
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-start w-full">
        {/* Left */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            FADE TO BLACK — FINAL SCENE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease: cinematicEase }}
            className="font-bebas text-[12vw] md:text-[8.5vw] lg:text-[5.2vw] leading-[1.05] text-cinema-cream mb-10"
          >
            LET&apos;S MAKE<br />
            <span className="text-cinema-gold">SOMETHING</span><br />
            TOGETHER
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-cinema-muted leading-loose mb-12 max-w-md text-base"
          >
            Every great film starts with a conversation. Let&apos;s talk about
            yours — whether it&apos;s a web app, a creative collaboration, or just film recs.
          </motion.p>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex items-center gap-4 group rounded-2xl border border-cinema-surface/80 bg-cinema-black/20 px-4 py-4 hover:border-cinema-gold/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 border border-cinema-surface flex items-center justify-center text-cinema-muted group-hover:border-cinema-gold group-hover:text-cinema-gold transition-all duration-300">
                  <s.icon size={14} />
                </div>
                <div>
                  <p className="font-mono text-xs text-cinema-gold uppercase tracking-widest">{s.label}</p>
                  <p className="font-mono text-sm text-cinema-cream/60">{s.handle}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: cinematicEase }}
          className="lg:pl-4"
        >
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center rounded-[28px] border border-cinema-gold/20 bg-cinema-black/40 py-20 px-6">
              <p className="font-bebas text-5xl text-cinema-gold mb-4">THAT&apos;S A WRAP!</p>
              <p className="font-mono text-sm text-cinema-muted">
                Message received. I&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-cinema-surface/80 bg-cinema-black/40 p-7 md:p-9 lg:p-12 space-y-8">
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "Stanley Kubrick" },
                { id: "email", label: "Your Email", type: "email", placeholder: "stanley@paths.of.glory" },
              ].map((field) => (
                <div key={field.id} className="group">
                  <label className="section-label block mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    id={field.id}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    className="w-full bg-transparent border-b border-cinema-surface focus:border-cinema-gold outline-none py-4 font-mono text-sm text-cinema-cream placeholder-cinema-muted/40 transition-colors duration-300"
                  />
                </div>
              ))}
              <div>
                <label className="section-label block mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-cinema-surface focus:border-cinema-gold outline-none py-4 font-mono text-sm text-cinema-cream placeholder-cinema-muted/40 transition-colors duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="group flex items-center gap-3 px-8 py-4 bg-cinema-gold text-cinema-black font-mono text-sm uppercase tracking-widest hover:bg-cinema-amber transition-colors duration-300"
              >
                <span>Send Message</span>
                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

