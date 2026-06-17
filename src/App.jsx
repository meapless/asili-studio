import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useReveal } from './hooks.js';
import { Cursor, Nav } from './sections/Header.jsx';
import { Hero, Marquee } from './sections/Hero.jsx';
import { Studio, Services } from './sections/Studio.jsx';
import { Portfolio } from './sections/Work.jsx';
import { Vision, Testimonials } from './sections/About.jsx';
import { Contact, Footer } from './sections/Contact.jsx';

export default function App() {
  useReveal();

  // Inertia smooth-scroll. Guarded so the page never depends on it.
  useEffect(() => {
    // Respect the user's reduced-motion preference: skip inertia scroll entirely.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let lenis;
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    } catch {
      /* no-op */
    }
    return () => lenis?.destroy?.();
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
