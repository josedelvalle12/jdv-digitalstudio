"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../lib/scroll";

/** Revela un título por líneas enmascaradas cuando entra en pantalla. */
export function useInView(ref, start = "top 85%") {
  const [inView, set] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const st = ScrollTrigger.create({ trigger: ref.current, start, once: true, onEnter: () => set(true) });
    return () => st.kill();
  }, [ref, start]);
  return inView;
}

export function Lines({ lines, show, delay = 0, step = 0.07, lineClass = "" }) {
  return lines.map((l, i) => (
    <span key={i} className={`mask ${show ? "is-in" : ""} ${lineClass}`}>
      <span style={{ transitionDelay: show ? `${delay + i * step}s` : "0s" }}>{l}</span>
    </span>
  ));
}

export default function Reveal({ as: Tag = "h2", lines, className = "", id, start }) {
  const ref = useRef(null);
  const show = useInView(ref, start);
  return (
    <Tag ref={ref} id={id} className={className} aria-label={lines.join(" ")}>
      <span aria-hidden="true"><Lines lines={lines} show={show} /></span>
    </Tag>
  );
}
