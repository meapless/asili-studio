import { useState, useEffect, useRef } from 'react';
import { NAV } from '../data.js';
import { prefersReducedMotion } from '../hooks.js';
import { Label } from '../ui.jsx';

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    // CSS hides the cursor under reduced-motion; also skip the rAF loop and listeners.
    if (prefersReducedMotion()) return;
    let rx = 0, ry = 0, mx = 0, my = 0, raf;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => { if (e.target.closest('a,button,.hov')) ring.current?.classList.add('grow'); };
    const out = (e) => { if (e.target.closest('a,button,.hov')) ring.current?.classList.remove('grow'); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${solid ? 'bg-ink/85 backdrop-blur border-b border-line' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="font-display font-extrabold text-2xl tracking-tight">ASILI<span className="text-clay">.</span></a>
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm text-sand/80 hover:text-sand transition-colors relative group">
              {n}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-clay transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden md:block"><Label>1.2921° S · 36.8219° E</Label></div>
        <button onClick={() => setOpen((o) => !o)} className="md:hidden font-mono text-xs tracking-widest uppercase">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-ink2 border-t border-line px-6 py-6 flex flex-col gap-4">
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} className="font-display text-2xl">{n}</a>
          ))}
        </div>
      )}
    </header>
  );
}
