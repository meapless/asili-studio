import { useState } from 'react';
import { PROJECTS, FILTERS } from '../data.js';
import { useParallax, useInView } from '../hooks.js';
import { Photo, Label } from '../ui.jsx';

const STAGGER = ['', 'reveal-d1', 'reveal-d2'];

function ProjectCard({ p, idx }) {
  const imgRef = useParallax(0.045); // image drifts gently inside its frame
  const [cardRef, inView] = useInView(); // own observer: survives filter remounts
  const shown = inView ? 'in' : '';
  return (
    <a ref={cardRef} href="#contact" className="hov group block">
      <div className={`reveal-clip ${shown} relative overflow-hidden h-[58vw] md:h-[34vw] ${STAGGER[idx % 3]}`}>
        <div ref={imgRef} className="parallax h-[124%] -mt-[12%]">
          <Photo src={p.img} className="h-full transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
        </div>
        <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.3em] text-sand">
            View project <span className="text-clay">↗</span>
          </span>
        </div>
      </div>
      <div className={`reveal ${shown} flex items-start justify-between gap-4 mt-5`}>
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Label>{p.year}</Label><Label>· {p.brief}</Label><Label>· {p.loc}</Label>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl mt-3 tracking-tight group-hover:text-clay transition-colors">{p.title}</h3>
          <div className="text-dim text-sm mt-1">{p.type}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-xs text-clay">{p.size}</div>
          <div className="mt-3 flex flex-col items-end gap-1">
            {p.tags.map((t) => (<span key={t} className="text-[11px] font-mono text-dim">{t}</span>))}
          </div>
        </div>
      </div>
    </a>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState('All Projects');
  const list = filter === 'All Projects' ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);
  return (
    <section id="projects" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="flex items-center gap-4 reveal"><span className="h-px w-10 bg-clay" /><Label>Our Portfolio</Label></div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-6">
        <h2 className="reveal font-display font-bold text-[11vw] md:text-[6vw] leading-[.95] tracking-tight">
          Transforming space<br />through form
        </h2>
        <p className="reveal reveal-d1 max-w-sm text-dim leading-relaxed">
          Each project balances a bold architectural statement with thoughtful integration into its Kenyan context —
          a commitment to spatial innovation and material honesty.
        </p>
      </div>

      <div className="no-bar flex gap-3 mt-12 overflow-x-auto pb-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm border transition-colors ${filter === f ? 'bg-clay border-clay text-ink' : 'border-line text-sand/70 hover:text-sand'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 mt-14">
        {list.map((p, idx) => (
          <ProjectCard key={p.title} p={p} idx={idx} />
        ))}
      </div>
    </section>
  );
}
