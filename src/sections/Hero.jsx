import { useState, useEffect } from 'react';
import { FEATURED } from '../data.js';
import { prefersReducedMotion, useParallax } from '../hooks.js';
import { Photo, Label } from '../ui.jsx';

export function Hero() {
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState(false);
  const f = FEATURED[i];
  const heroRef = useParallax(-0.06); // image recedes slightly behind the headline
  useEffect(() => {
    // Trigger the on-mount intro on the next frame so the transition runs.
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);
  useEffect(() => {
    // Don't auto-advance the hero for users who prefer reduced motion (the
    // numbered controls still let them switch manually).
    if (prefersReducedMotion()) return;
    const t = setInterval(() => setI((p) => (p + 1) % FEATURED.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden">
      <div ref={heroRef} className="parallax absolute -inset-y-[12%] inset-x-0">
        {FEATURED.map((p, idx) => (
          <Photo
            key={idx}
            src={p.img}
            className="hero-photo absolute inset-0"
            style={{
              opacity: idx === i ? 1 : 0,
              transform: idx === i ? 'scale(1.08)' : 'scale(1.04)',
              transition: 'opacity 1.2s ease, transform 6s ease',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col">
        <div className={`intro intro-1 ${mounted ? 'intro-in' : ''} pt-28 md:pt-32 flex items-center gap-4`}>
          <span className="h-px w-10 bg-clay" />
          <Label>Architecture · Nairobi, Kenya — Est. 2012</Label>
        </div>

        <div className="mt-auto mb-10 md:mb-14 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <h1 className="font-display font-extrabold leading-[.92] text-[15vw] md:text-[clamp(4rem,8.7vw,10rem)] tracking-[-.02em]">
              <span className={`line-mask block ${mounted ? 'line-rise' : ''}`}><span>Form rooted</span></span>
              <span className={`line-mask line-2 block ${mounted ? 'line-rise' : ''}`}><span className="text-clay">in place.</span></span>
            </h1>
          </div>
          <div className={`intro intro-3 ${mounted ? 'intro-in' : ''} md:col-span-4 md:pb-3`}>
            <div className="border-l border-line pl-5">
              <Label>{f.place}</Label>
              <h3 className="font-display text-2xl md:text-3xl mt-2">{f.title}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {[f.type, ...f.tags].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 border border-line rounded-full text-sand/70">{t}</span>
                ))}
              </div>
              <a href="#projects" className="inline-flex items-center gap-2 mt-5 text-sm group">
                <span className="h-px w-6 bg-clay group-hover:w-10 transition-all" />View Project
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              {FEATURED.map((p, idx) => (
                <button key={idx} onClick={() => setI(idx)} className="font-mono text-xs">
                  <span className={idx === i ? 'text-clay' : 'text-dim'}>{p.n}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const words = ['Rammed Earth', 'Timber', 'Coral Stone', 'Light', 'Climate', 'Context', 'ASILI'];
  const row = [...words, ...words];
  return (
    <div className="border-y border-line py-5 overflow-hidden bg-ink2">
      <div className="marquee whitespace-nowrap flex gap-10 w-max">
        {row.map((w, idx) => (
          <span key={idx} className="font-display text-2xl md:text-3xl text-sand/40 flex items-center gap-10">
            {w}<span className="text-clay text-base">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
