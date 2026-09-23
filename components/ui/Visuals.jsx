"use client";
import { useId, useRef } from "react";
import Image from "next/image";
import { useInView } from "./Reveal";

/* Etiqueta de placeholder: discreta, mono, siempre visible para saber qué se reemplaza */
export function Tag({ children, className = "" }) {
  return <span className={`meta inline-flex items-center gap-2 text-muted ${className}`}><i className="h-1.5 w-1.5 rounded-full bg-accent" />[{children}]</span>;
}

/* ------------------------------------------------------------------
   HERO — dibujo de construcción de una interfaz (temporal)
   Capas con parallax de puntero vía --mx / --my en el contenedor.
------------------------------------------------------------------- */
export function HeroComposition({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const L = (d) => ({ transform: `translate(calc(var(--mx,0) * ${d}px), calc(var(--my,0) * ${d}px))`, transition: "transform .9s cubic-bezier(.2,.7,.1,1)" });
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <pattern id={`h${id}`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="12" className="stroke-fg/20" strokeWidth="1.2" />
        </pattern>
      </defs>
      <g style={L(-6)}>
        {Array.from({ length: 14 }).map((_, i) => <line key={i} x1={40 + i * 118} y1="0" x2={40 + i * 118} y2="1000" className="stroke-line" strokeWidth="1" />)}
        <line x1="0" y1="140" x2="1600" y2="140" className="stroke-line" />
        <line x1="0" y1="860" x2="1600" y2="860" className="stroke-line" />
        <circle cx="1490" cy="930" r="330" fill="none" className="stroke-fg/25" />
        <circle cx="1490" cy="930" r="220" fill="none" className="stroke-fg/15" />
      </g>
      <g style={L(10)}>
        <rect x="250" y="190" width="1100" height="630" className="fill-bg stroke-fg/70" strokeWidth="1.2" />
        <line x1="250" y1="232" x2="1350" y2="232" className="stroke-fg/40" />
        {[0, 1, 2].map((i) => <circle key={i} cx={276 + i * 18} cy="211" r="5" className="fill-fg/25" />)}
        <rect x="560" y="202" width="480" height="18" rx="9" className="fill-fg/10" />
        <rect x="300" y="300" width="470" height="54" className="fill-fg" />
        <rect x="300" y="366" width="360" height="54" className="fill-fg" />
        {[0, 1, 2].map((i) => <rect key={i} x="300" y={462 + i * 20} width={[400, 370, 250][i]} height="8" className="fill-fg/30" />)}
        <rect x="300" y="548" width="200" height="48" rx="24" className="fill-fg" />
        <circle cx="476" cy="572" r="16" className="fill-accent" />
        <rect x="870" y="276" width="430" height="500" fill={`url(#h${id})`} className="stroke-fg/30" />
        <circle cx="1085" cy="526" r="118" className="fill-bg stroke-fg/50" />
        <path d="M1045 566 1125 486M1060 486h65v65" fill="none" className="stroke-fg" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={300 + i * 132} y="690" width="116" height="80" className="fill-fg/[0.06] stroke-fg/20" />)}
      </g>
      <g style={L(18)} className="font-mono" fontSize="15" letterSpacing="1">
        <line x1="250" y1="160" x2="1350" y2="160" className="stroke-muted" />
        <line x1="250" y1="152" x2="250" y2="168" className="stroke-muted" />
        <line x1="1350" y1="152" x2="1350" y2="168" className="stroke-muted" />
        <rect x="755" y="148" width="90" height="24" className="fill-bg" />
        <text x="800" y="165" textAnchor="middle" className="fill-muted">1440</text>
        <line x1="222" y1="300" x2="222" y2="420" className="stroke-muted" />
        <text x="206" y="364" textAnchor="end" className="fill-muted">H1 / 96</text>
        <text x="300" y="286" className="fill-muted">COL 01—05</text>
        <text x="870" y="800" className="fill-muted">IMG 4:5</text>
        <path d="M1380 620h60M1410 590v60" className="stroke-fg/60" />
        <text x="1452" y="626" className="fill-muted">CTA</text>
      </g>
    </svg>
  );
}


/* ------------------------------------------------------------------
   PROBLEMA — anillos
   El negocio crece en anillos concéntricos (la forma de cápsula del
   sistema, abierta); la web queda en el centro, rígida y del mismo tamaño.
------------------------------------------------------------------- */
const RINGS = [
  { from: 2, w: 58, h: 44 },
  { from: 3, w: 78, h: 64 },
  { from: 4, w: 98, h: 86 },
];
export function ProblemVisual({ step }) {
  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      {RINGS.map((r, i) => {
        const on = step >= r.from;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-fg"
            style={{
              width: `${r.w}%`, height: `${r.h}%`,
              transform: `translate(-50%, -50%) scale(${on ? 1 : 0.42})`,
              opacity: on ? 0.55 - i * 0.14 : 0,
              transition: "transform 1.4s var(--ease-out), opacity .9s var(--ease-soft)",
            }}
          />
        );
      })}
      <span className="meta absolute right-0 top-[4%] transition-opacity duration-700" style={{ opacity: step >= 2 ? 1 : 0 }}>Negocio</span>
      <div className="media absolute left-1/2 top-1/2 flex h-[26%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col gap-[8%] bg-fg p-[5%]">
        <span className="h-[9%] w-1/2 bg-bg/70" />
        <span className="h-[16%] w-4/5 bg-bg/90" />
        <span className="h-[6%] w-3/5 bg-bg/40" />
        <span className="mt-auto flex items-center justify-between">
          <span className="meta text-[.58rem] text-bg/70">Web · 2019</span>
          <span className={`pill pill--dot transition-transform duration-700 ${step >= 5 ? "scale-150" : "scale-0"}`} />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   MOMENTOS — un sistema que se expande en tres estados
------------------------------------------------------------------- */
export function SystemVisual({ state }) {
  const t = "transition-all duration-[1000ms] ease-out";
  const mods = [[60, 70], [60, 250], [60, 430], [450, 70], [450, 430], [255, 480]];
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible" aria-hidden="true">
      {mods.map(([x, y], i) => (
        <g key={i} className={t} style={{ opacity: state >= 2 ? 1 : 0, transitionDelay: state >= 2 ? `${i * 70}ms` : "0ms" }}>
          <line x1={x + 45} y1={y + 45} x2="300" y2="300" className="stroke-fg/25" strokeDasharray="3 5" />
          <rect x={x} y={y} width="90" height="90" className="fill-bg stroke-fg/60" />
          <rect x={x + 14} y={y + 16} width="46" height="6" className="fill-fg/40" />
        </g>
      ))}
      <line x1="300" y1="300" x2="520" y2="210" className={`stroke-fg ${t}`} strokeWidth="1.5" strokeDasharray="260" style={{ strokeDashoffset: state >= 1 ? 0 : 260 }} />
      <g className={t} style={{ opacity: state >= 1 ? 1 : 0, transform: state >= 1 ? "translate(0,0)" : "translate(60px,-20px)" }}>
        <rect x="470" y="150" width="110" height="120" className="fill-fg" />
        <circle cx="560" cy="170" r="7" className="fill-accent" />
        <rect x="486" y="214" width="60" height="6" className="fill-bg/70" />
        <rect x="486" y="228" width="40" height="6" className="fill-bg/40" />
      </g>
      <g className={t} style={{ transformOrigin: "300px 300px", transform: `scale(${[0.62, 0.82, 0.86][state]})` }}>
        <rect x="170" y="170" width="260" height="260" className="fill-fg" />
        <rect x="200" y="206" width="130" height="16" className="fill-bg/80" />
        <rect x="200" y="232" width="90" height="16" className="fill-bg/80" />
        <rect x="200" y="360" width="200" height="40" className="fill-bg/15" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------
   EXPERIENCIA — 8 barras que se reorganizan según el concepto activo
------------------------------------------------------------------- */
const BARS = {
  "-1": [[90, 140, -18, 0.8], [330, 110, 24, 0.5], [160, 300, 8, 0.9], [380, 360, -30, 0.6], [120, 450, 14, 0.7], [300, 480, -8, 0.4], [420, 220, 40, 0.5], [200, 210, -40, 0.6]],
  0: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [110, 140 + i * 44, 0, [1.7, 1.3, 1.55, 0.9, 1.45, 1.1, 1.35, 0.7][i]]),
  1: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [150, 170 + i * 34, 0, 1.5]),
  2: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [70 + i * 52, 470 - i * 46, 0, 0.3]),
  3: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [110 + (i % 2) * 200, 150 + Math.floor(i / 2) * 84, 0, 0.9]),
};
export function ConceptVisual({ state }) {
  const bars = BARS[state] || BARS["-1"];
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden="true">
      <rect x="130" y="150" width="340" height="300" fill="none" className="stroke-fg/40 transition-opacity duration-700" style={{ opacity: state === 1 ? 1 : 0 }} strokeDasharray="4 6" />
      {bars.map(([x, y, r, s], i) => (
        <rect
          key={i}
          x="0" y="0" width="200" height={state === 3 ? 56 : 16}
          className={`${i === 0 && state === 0 ? "fill-fg" : "fill-fg/85"}`}
          style={{
            transform: `translate(${x}px, ${y}px) rotate(${r}deg) scaleX(${s})`,
            transformOrigin: "0 0",
            transition: "transform 1.1s cubic-bezier(.2,.7,.1,1), height .8s cubic-bezier(.2,.7,.1,1)",
            transitionDelay: `${i * 35}ms`,
          }}
        />
      ))}
      <circle cx="505" cy="98" r="16" className="fill-accent transition-all duration-700" style={{ opacity: state === 2 ? 1 : 0, transform: state === 2 ? "scale(1)" : "scale(0)", transformOrigin: "505px 98px" }} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   MOCKUPS TEMPORALES DE PROYECTO (se reemplazan por capturas reales)
------------------------------------------------------------------- */
export function AduaneroMock({ className = "" }) {
  const navy = "#1D2940", paper = "#FBFAF7", stone = "#E7E3DA";
  return (
    <svg viewBox="0 0 1200 800" className={className} aria-hidden="true">
      <rect width="1200" height="800" rx="14" fill={paper} />
      <rect width="1200" height="44" rx="14" fill="#EFEDE8" /><rect y="30" width="1200" height="14" fill="#EFEDE8" />
      {[0, 1, 2].map((i) => <circle key={i} cx={24 + i * 18} cy="22" r="5" fill="#CFCBC2" />)}
      <rect x="440" y="13" width="320" height="18" rx="9" fill="#E2DFD8" />
      <rect x="60" y="84" width="120" height="18" fill={navy} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={620 + i * 90} y="89" width="64" height="8" fill="#9A9DA5" />)}
      <rect x="1000" y="78" width="140" height="32" rx="16" fill={navy} />
      <rect x="60" y="180" width="600" height="58" fill={navy} />
      <rect x="60" y="250" width="470" height="58" fill={navy} />
      <rect x="60" y="340" width="420" height="10" fill="#A3A6AD" /><rect x="60" y="360" width="360" height="10" fill="#A3A6AD" />
      <rect x="60" y="410" width="170" height="44" rx="22" fill={navy} /><rect x="244" y="410" width="150" height="44" rx="22" fill="none" stroke={navy} />
      <rect x="720" y="160" width="420" height="330" fill={stone} />
      <path d="M770 430 C 860 300, 960 420, 1080 220" fill="none" stroke={navy} strokeWidth="2" strokeDasharray="6 8" />
      {[[770, 430], [905, 360], [1080, 220]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 2 ? 10 : 7} fill={i === 2 ? navy : paper} stroke={navy} strokeWidth="2" />)}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1="60" y1={560 + i * 58} x2="1140" y2={560 + i * 58} stroke="#DAD6CD" />
          <rect x="60" y={578 + i * 58} width="26" height="10" fill="#A3A6AD" />
          <rect x="140" y={576 + i * 58} width={[280, 220, 320, 250][i]} height="14" fill={navy} />
          <rect x="820" y={580 + i * 58} width="200" height="8" fill="#B8BAC0" />
        </g>
      ))}
    </svg>
  );
}

export function ImperiumMock({ className = "" }) {
  const bg = "#0E0E0E", card = "#171717", hot = "#FF5B24", mid = "#3A3A3A";
  const C = 2 * Math.PI * 70;
  return (
    <svg viewBox="0 0 1200 800" className={className} aria-hidden="true">
      <rect width="1200" height="800" rx="14" fill={bg} />
      <rect x="0" y="0" width="84" height="800" rx="14" fill="#121212" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="30" y={110 + i * 64} width="24" height="24" rx="6" fill={i === 0 ? hot : mid} />)}
      <rect x="130" y="60" width="300" height="34" fill="#EDEDED" /><rect x="130" y="108" width="200" height="12" fill="#6B6B6B" />
      <rect x="130" y="160" width="330" height="300" rx="16" fill={card} />
      <circle cx="295" cy="300" r="70" fill="none" stroke={mid} strokeWidth="16" />
      <circle cx="295" cy="300" r="70" fill="none" stroke={hot} strokeWidth="16" strokeDasharray={`${C * 0.72} ${C}`} transform="rotate(-90 295 300)" strokeLinecap="round" />
      <rect x="265" y="290" width="60" height="22" fill="#EDEDED" />
      <rect x="490" y="160" width="580" height="300" rx="16" fill={card} />
      {[0.45, 0.62, 0.38, 0.8, 0.7, 0.92, 0.55].map((h, i) => (
        <rect key={i} x={540 + i * 72} y={420 - h * 200} width="36" height={h * 200} rx="6" fill={i === 5 ? hot : "#4A4A4A"} />
      ))}
      <rect x="130" y="490" width="940" height="250" rx="16" fill={card} />
      {Array.from({ length: 28 }).map((_, i) => (
        <rect key={i} x={170 + (i % 14) * 62} y={540 + Math.floor(i / 14) * 70} width="46" height="46" rx="8" fill={[3, 4, 5, 9, 10, 16, 17, 18, 19, 23].includes(i) ? hot : "#262626"} />
      ))}
    </svg>
  );
}

export function PhoneMock({ className = "", variant = 0 }) {
  const hot = "#FF5B24";
  return (
    <svg viewBox="0 0 390 800" className={className} aria-hidden="true">
      <rect width="390" height="800" rx="46" fill="#0E0E0E" />
      <rect x="140" y="18" width="110" height="28" rx="14" fill="#000" />
      <rect x="32" y="90" width="200" height="30" fill="#EDEDED" /><rect x="32" y="132" width="140" height="10" fill="#6B6B6B" />
      {variant === 0 ? (
        <>
          <circle cx="195" cy="330" r="110" fill="none" stroke="#2E2E2E" strokeWidth="22" />
          <circle cx="195" cy="330" r="110" fill="none" stroke={hot} strokeWidth="22" strokeDasharray="480 700" transform="rotate(-90 195 330)" strokeLinecap="round" />
          <rect x="150" y="316" width="90" height="28" fill="#EDEDED" />
          {[0, 1, 2].map((i) => <rect key={i} x="32" y={520 + i * 72} width="326" height="56" rx="14" fill="#171717" />)}
        </>
      ) : (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x="32" y={190 + i * 104} width="326" height="88" rx="16" fill="#171717" />
              <rect x="52" y={214 + i * 104} width="44" height="44" rx="10" fill={i === 1 ? hot : "#2E2E2E"} />
              <rect x="112" y={222 + i * 104} width="150" height="12" fill="#D9D9D9" />
              <rect x="112" y={242 + i * 104} width="90" height="8" fill="#5E5E5E" />
            </g>
          ))}
        </>
      )}
      <rect x="130" y="770" width="130" height="5" rx="3" fill="#555" />
    </svg>
  );
}

/* Cuadro de video: el <video> solo se monta (y empieza a descargar) cuando el
   cuadro se acerca al viewport, para no competir por ancho de banda con la
   carga inicial en secciones muy below-the-fold. */
export function FilmFrame({ label, ratio = "16:9", tc = "00:00:12:04", className = "", innerRef, tone = 0, src }) {
  const containerRef = useRef(null);
  const setRefs = (el) => {
    containerRef.current = el;
    if (innerRef) innerRef.current = el;
  };
  const near = useInView(containerRef, "top 150%");
  const ready = src && near;
  return (
    <div ref={setRefs} {...(!src && { "data-cursor": "PLAY" })} className={`media relative overflow-hidden bg-fg/[0.05] ${className}`}>
      {ready && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {!ready && (
        <>
          <div className="absolute inset-x-0 top-1/3 h-px bg-fg/[0.07]" />
          <div className="absolute inset-x-0 top-2/3 h-px bg-fg/[0.07]" />
          <div className="absolute inset-y-0 left-1/3 w-px bg-fg/[0.07]" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-fg/[0.07]" />
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-fg/40 md:h-20 md:w-20">
            <svg viewBox="0 0 10 12" className="ml-1 h-3.5 w-3.5 fill-current md:h-4 md:w-4"><path d="M0 0l10 6-10 6z" /></svg>
          </span>
        </>
      )}
      <div className="meta absolute left-3 top-3 flex items-center gap-2 md:left-5 md:top-5"><i className="rec h-2 w-2 rounded-full bg-fg" />REC</div>
      <div className="meta absolute right-3 top-3 tabular-nums text-muted md:right-5 md:top-5">{tc}</div>
      <div className="meta absolute bottom-3 left-3 text-muted md:bottom-5 md:left-5">[{label}]</div>
      <div className="meta absolute bottom-3 right-3 text-muted md:bottom-5 md:right-5">{ratio}</div>
    </div>
  );
}

/* Marco con marcas de corte para la fotografía editorial */
export function PhotoFrame({ className = "", innerRef, src, alt, sizes = "40vw" }) {
  const mark = "absolute h-5 w-5 border-fg";
  return (
    <div ref={innerRef} className={`relative ${className}`}>
      {src ? (
        <div className="media absolute inset-3 overflow-hidden md:inset-4">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </div>
      ) : (
        <div className="media absolute inset-3 bg-fg/[0.05] md:inset-4" />
      )}
      <span className={`${mark} left-0 top-0 border-l border-t`} />
      <span className={`${mark} right-0 top-0 border-r border-t`} />
      <span className={`${mark} bottom-0 left-0 border-b border-l`} />
      <span className={`${mark} bottom-0 right-0 border-b border-r`} />
      {!src && (
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <div>
            <Tag>EDITORIAL IMAGE</Tag>
            <p className="b mx-auto mt-3 max-w-[24ch] text-muted">Fotografía real pendiente. Retrato en contexto de trabajo, luz natural, encuadre vertical.</p>
          </div>
        </div>
      )}
    </div>
  );
}
