import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useReveal, updateParallax, prefersReducedMotion } from './hooks.js';
import { Cursor, Nav } from './sections/Header.jsx';
import { Hero, Marquee } from './sections/Hero.jsx';
import { Studio, Services } from './sections/Studio.jsx';
import { Portfolio } from './sections/Work.jsx';
import { Vision, Testimonials } from './sections/About.jsx';
import { Contact, Footer } from './sections/Contact.jsx';

export default function App() {
  useReveal();

  // Inertia smooth-scroll + parallax, both off one rAF loop. Guarded so the
  // page never depends on it, and skipped entirely under reduced motion.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let lenis, raf;
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    } catch {
      /* no-op: page scrolls natively */
    }
    const loop = (t) => {
      lenis?.raf(t);
      updateParallax();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy?.();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Studio />
        <Services />
        <Portfolio />
        <Vision />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
