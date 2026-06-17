import { useState, useEffect, useRef } from 'react';

/** True when the user has asked the OS to minimize non-essential motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/* ----------------------------------------------------------------------------
 * Parallax: one shared registry, driven by App's existing Lenis rAF loop.
 * No second scroll listener; every layer rides its own GPU layer (translate3d).
 * -------------------------------------------------------------------------- */
const parallaxLayers = new Set();

/** Called once per animation frame from App's rAF loop. Reads then writes. */
export function updateParallax() {
  if (!parallaxLayers.size) return;
  const mid = window.innerHeight / 2;
  parallaxLayers.forEach((layer) => {
    const r = layer.el.getBoundingClientRect();
    const dist = r.top + r.height / 2 - mid; // signed distance from viewport center
    layer.el.style.transform = `translate3d(0, ${(dist * layer.speed).toFixed(2)}px, 0)`;
  });
}

/**
 * Attach to an element to drift it on scroll. `speed` is small: negative moves
 * the layer against the scroll (recedes), positive moves with it. No-op under
 * reduced motion. Returns a ref to spread onto the element.
 */
export function useParallax(speed = -0.06) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const layer = { el: ref.current, speed };
    parallaxLayers.add(layer);
    return () => {
      parallaxLayers.delete(layer);
      if (layer.el) layer.el.style.transform = '';
    };
  }, [speed]);
  return ref;
}

/**
 * Adds the `in` class to every `.reveal` element when it scrolls into view,
 * driving the CSS reveal transition. One observer for the whole page.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-clip');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Per-element in-view flag via its own IntersectionObserver. Unlike `useReveal`
 * (one page-wide observer bound at mount), this re-binds whenever the element
 * remounts, so it survives list changes like the portfolio filter swapping cards.
 * Reveals immediately under reduced motion (CSS neutralizes the transition).
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) { setInView(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** Eased count-up from 0 to `target`, started only when `run` is true. */
export function useCountUp(target, run) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    let start;
    const duration = 1600;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return value;
}
