"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DESKTOP, MOBILE } from "../lib/scroll";

/*
  WEBGL SLOT
  Monta una escena 3D solo cuando el breakpoint corresponde y hay WebGL;
  en cualquier otro caso renderiza los children (fallback SVG/HTML).
  El bundle 3D queda en su propio chunk: se carga en cliente, no en SSR.
  Slots actuales:
    · "hero"  → scene="visual-system"   (media: desktop | mobile)
    · "rings" → sin scene, solo fallback
*/
const SCENES = {
  "visual-system": dynamic(() => import("./VisualSystem"), { ssr: false }),
};

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function WebGLSlot({ id, state, scene, media = "desktop", className = "", children }) {
  const Scene = scene ? SCENES[scene] : null;
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!Scene) return;
    const q = window.matchMedia(media === "mobile" ? MOBILE : DESKTOP);
    const sync = () => setOn(q.matches && supportsWebGL());
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, [Scene, media]);

  return (
    <div data-webgl-slot={id} data-state={state} data-webgl={on ? "on" : undefined} className={className}>
      {on && Scene ? <Scene media={media} /> : children}
    </div>
  );
}
