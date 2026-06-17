// Small shared presentational primitives.

export function Photo({ src, className = '', style }) {
  // Photo first, warm gradient second — if the image fails to load,
  // the gradient shows through instead of an empty box.
  const backgroundImage = `url(${src}), linear-gradient(135deg,#2A231B,#0B0A08)`;
  return <div className={`photo ${className}`} style={{ backgroundImage, ...style }} />;
}

export function Label({ children, className = '' }) {
  return (
    <span className={`font-mono text-[11px] tracking-[.35em] uppercase text-dim ${className}`}>
      {children}
    </span>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <Label className="block mb-2">{label}</Label>
      {children}
    </label>
  );
}
