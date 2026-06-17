import { useState } from 'react';
import { VISION_TABS, TESTIMONIALS } from '../data.js';
import { Label } from '../ui.jsx';

export function Vision() {
  const [tab, setTab] = useState('Maono');
  const keys = Object.keys(VISION_TABS);
  return (
    <section id="vision" className="relative overflow-hidden bg-ink2 border-y border-line">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4 reveal"><span className="h-px w-10 bg-clay" /><Label>Maono Yetu · Our Vision</Label></div>
          <h2 className="reveal font-display font-bold text-4xl md:text-6xl leading-[1.02] mt-6 tracking-tight">
            Kujenga kesho ya usanifu wa Kiafrika
          </h2>
          <p className="reveal reveal-d1 text-dim mt-4 italic">Building the future of African architecture.</p>
          <div className="reveal reveal-d2 mt-10 flex gap-10">
            <div><div className="font-display font-extrabold text-5xl">12</div><Label className="block mt-2">Countries built in</Label></div>
            <div><div className="font-display font-extrabold text-5xl">120+</div><Label className="block mt-2">Projects realised</Label></div>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-12 md:border-l border-line">
          <div className="flex flex-wrap gap-2">
            {keys.map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${tab === k ? 'bg-sand border-sand text-ink' : 'border-line text-sand/70 hover:text-sand'}`}
              >
                {k} <span className="opacity-50">/ {VISION_TABS[k].en}</span>
              </button>
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-display leading-snug mt-10 tracking-tight">{VISION_TABS[tab].body}</p>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (d) => setI((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="flex items-center gap-4 reveal"><span className="h-px w-10 bg-clay" /><Label>Testimonials</Label></div>
      <h2 className="reveal font-display font-bold text-[8vw] md:text-5xl leading-tight mt-6 max-w-2xl tracking-tight">
        What our clients say about working with us
      </h2>
      <div className="mt-14 border-t border-line pt-12">
        <blockquote className="font-display text-2xl md:text-4xl leading-snug max-w-4xl tracking-tight">
          <span className="text-clay">“</span>{t.q}<span className="text-clay">”</span>
        </blockquote>
        <div className="flex items-end justify-between mt-10 flex-wrap gap-6">
          <div>
            <div className="font-medium text-lg">{t.n}</div>
            <Label className="block mt-1">{t.r}</Label>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-sm text-dim">{i + 1} / {TESTIMONIALS.length}</span>
            <div className="flex gap-3">
              <button onClick={() => go(-1)} className="hov w-12 h-12 rounded-full border border-line hover:border-clay hover:text-clay transition-colors">←</button>
              <button onClick={() => go(1)} className="hov w-12 h-12 rounded-full border border-line hover:border-clay hover:text-clay transition-colors">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
