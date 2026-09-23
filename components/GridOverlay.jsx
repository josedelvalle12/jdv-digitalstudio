/* Herramienta de revisión: tecla G. No forma parte del diseño. */
export default function GridOverlay() {
  return (
    <div className="grid-overlay pointer-events-none fixed inset-0 z-[85] hidden" aria-hidden="true">
      <div className="wrap grid-12 h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`h-full bg-[rgb(255_60_60/.06)] ${i >= 4 ? "hidden md:block" : ""} ${i >= 8 ? "md:hidden lg:block" : ""}`} />
        ))}
      </div>
    </div>
  );
}
