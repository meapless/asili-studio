import { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../data.js';
import { Label } from '../ui.jsx';
import { useCountUp } from '../hooks.js';

export function Studio() {
  const [run, setRun] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const a = useCountUp(38, run);
  const b = useCountUp(14, run);
  const c = useCountUp(54, run);
  const stats = [[a, 'Award-winning projects'], [b, 'Years of practice'], [c, 'Architects & makers']];
  return (
    <section id="studio" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
      <h2 className="reveal font-display font-bold text-[10vw] md:text-[6vw] leading-[.95] tracking-tight">
        Precision in form,<br /><span className="text-dim">honesty in material.</span>
      </h2>

      <div className="grid md:grid-cols-12 gap-10 mt-16 md:mt-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4 reveal"><span className="h-px w-10 bg-clay" /><Label>Est. 2012 · Our Nairobi Studio</Label></div>
        </div>
        <div className="md:col-span-7 space-y-6 reveal reveal-d1">
          <p className="text-lg md:text-xl text-sand/80 leading-relaxed">
            At ASILI, we understand that architecture is not only about building structures, but about shaping
            experiences that profoundly affect how we live, work and gather. Our work begins where the land does.
          </p>
          <p className="text-base text-dim leading-relaxed">
            Our approach is defined by geometric clarity, material honesty and spatial intelligence — drawing on the
            red earth of the highlands, the coral stone of the coast and the rhythms of the Kenyan climate to create
            buildings that are both boldly distinctive and deeply contextual.
          </p>
        </div>
      </div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px mt-20 border border-line bg-line">
        {stats.map(([num, lab], idx) => (
          <div key={idx} className="bg-ink p-8 md:p-10">
            <div className="font-display font-extrabold text-6xl md:text-7xl">{num}</div>
            <div className="mt-3"><Label>{lab}</Label></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  const [hov, setHov] = useState(null);
  return (
    <section className="bg-ink2 border-y border-line">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-4 mb-12 reveal"><span className="h-px w-10 bg-clay" /><Label>What we do · Services</Label></div>
        <div>
          {SERVICES.map((s, idx) => (
            <a
              href="#projects"
              key={s}
              onMouseEnter={() => setHov(idx)}
              onMouseLeave={() => setHov(null)}
              className="hov group flex items-center justify-between gap-6 border-t border-line py-7 md:py-9 transition-colors"
              style={{ background: hov === idx ? 'rgba(194,104,60,.06)' : 'transparent' }}
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="font-mono text-xs text-clay">0{idx + 1}</span>
                <span
                  className="font-display font-bold text-3xl md:text-6xl tracking-tight transition-transform duration-500 group-hover:translate-x-3"
                  style={{ color: hov === idx ? '#ECE5D8' : '#9A917F' }}
                >
                  {s}
                </span>
              </div>
              <span className="font-mono text-xl opacity-0 group-hover:opacity-100 transition-opacity text-clay">↗</span>
            </a>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
