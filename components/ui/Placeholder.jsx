/**
 * Placeholder editorial claramente identificado.
 * label → texto entre corchetes (ej. "HERO VISUAL")
 * note  → qué debería ir acá en la versión final
 */
export default function Placeholder({ label, note, className = "", children, innerRef, style }) {
  return (
    <div ref={innerRef} className={`ph ${className}`} style={style} role="img" aria-label={`Placeholder: ${label}`}>
      <svg className="ph-x" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" />
        <line x1="100%" y1="0" x2="0" y2="100%" />
      </svg>
      <span className="ph-label absolute left-3 top-3 md:left-4 md:top-4">[{label}]</span>
      {note && <span className="ph-note absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 max-w-[34ch]">{note}</span>}
      {children}
    </div>
  );
}

export function PlayGlyph() {
  return (
    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-current/40 md:h-20 md:w-20" aria-hidden="true">
      <svg viewBox="0 0 10 12" className="ml-1 h-4 w-4 fill-current opacity-70 md:h-5 md:w-5"><path d="M0 0l10 6-10 6z" /></svg>
    </span>
  );
}
