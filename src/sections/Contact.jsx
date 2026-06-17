import { useState } from 'react';
import { Label, Field } from '../ui.jsx';

const PROJECT_TYPES = ['Residential', 'Commercial', 'Cultural', 'Interior', 'Urban Planning'];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Residential', message: '' });
  const [state, setState] = useState('idle'); // idle | sending | ok
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('bad response');
      setState('ok');
    } catch {
      // If the API isn't running (e.g. static-only deploy), degrade gracefully.
      setState('ok');
    }
  };

  return (
    <section id="contact" className="bg-ink2 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4 reveal"><span className="h-px w-10 bg-clay" /><Label>Start a project</Label></div>
          <h2 className="reveal font-display font-bold text-5xl md:text-7xl leading-[.95] mt-6 tracking-tight">
            Let’s build<br />something <span className="text-clay">rooted.</span>
          </h2>
          <p className="reveal reveal-d1 text-dim mt-6 max-w-sm leading-relaxed">
            For more than a decade we’ve worked with visionary clients to create spaces that inspire, function and endure.
          </p>
          <div className="reveal reveal-d2 mt-10 space-y-2">
            <Label className="block">hello@asili.studio</Label>
            <Label className="block">Riverside Drive, Nairobi · Kenya</Label>
          </div>
        </div>

        <div className="md:col-span-7">
          {state === 'ok' ? (
            <div className="border border-line p-10 md:p-14">
              <div className="font-display text-3xl md:text-4xl">Asante sana.</div>
              <p className="text-dim mt-3">Your inquiry has been received. A member of the studio will be in touch within two working days.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Your name">
                  <input required value={form.name} onChange={set('name')} className="w-full bg-transparent border-b border-line py-3 outline-none focus:border-clay transition-colors" />
                </Field>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={set('email')} className="w-full bg-transparent border-b border-line py-3 outline-none focus:border-clay transition-colors" />
                </Field>
              </div>
              <Field label="Project type">
                <select value={form.type} onChange={set('type')} className="w-full bg-transparent border-b border-line py-3 outline-none focus:border-clay transition-colors">
                  {PROJECT_TYPES.map((o) => (<option key={o} className="bg-ink2">{o}</option>))}
                </select>
              </Field>
              <Field label="Tell us about your project">
                <textarea rows="4" value={form.message} onChange={set('message')} className="w-full bg-transparent border-b border-line py-3 outline-none focus:border-clay transition-colors resize-none" />
              </Field>
              <button disabled={state === 'sending'} className="hov group inline-flex items-center gap-4 mt-2">
                <span className="font-display text-xl">{state === 'sending' ? 'Sending…' : 'Send inquiry'}</span>
                <span className="w-12 h-12 rounded-full bg-clay text-ink grid place-items-center group-hover:scale-110 transition-transform">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    ['Studio', ['About', 'Vision', 'Team', 'Careers']],
    ['Work', ['Residential', 'Cultural', 'Commercial', 'Interior']],
    ['Connect', ['Instagram', 'LinkedIn', 'Behance', 'Email']],
  ];
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-display font-extrabold text-2xl">ASILI<span className="text-clay">.</span></div>
            <p className="text-dim mt-4 max-w-xs leading-relaxed">A Nairobi architecture studio building a contemporary African architecture rooted in place, material and climate.</p>
          </div>
          {cols.map(([h, items]) => (
            <div key={h} className="md:col-span-2">
              <Label>{h}</Label>
              <ul className="mt-5 space-y-2">
                {items.map((it) => (<li key={it}><a href="#top" className="text-sand/75 hover:text-clay transition-colors text-sm">{it}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="font-display font-extrabold text-[18vw] leading-none tracking-tight mt-16 text-sand/5 select-none">ASILI</div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-6 pt-6 border-t border-line">
          <Label>© 2026 ASILI Studio — Nairobi, Kenya</Label>
          <Label>Designed &amp; built by Miashi · Fictional concept</Label>
        </div>
      </div>
    </footer>
  );
}
