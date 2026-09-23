"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { Color, DataTexture, DoubleSide, IcosahedronGeometry, MathUtils, RepeatWrapping, Vector3 } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/*
  VISUAL SYSTEM — composición 3D del hero.
  El canvas ocupa todo el stage; <Frame> escala la composición para que viva
  dentro de una ventana 4:5 centrada (DESIGN_H es su alto en unidades locales).
  Nada sigue al puntero de forma directa: el cursor alimenta un campo (field)
  y cada pieza lo consume según su profundidad y su distancia, siempre con damp.
*/

const PAPER = "#f3f1ec", STONE = "#77736c", RULE = "#d8d4cc", ACID = "#b8ff5a", GRAPHITE = "#16161a";
const DESIGN_H = 3.2, DESIGN_W = DESIGN_H * 0.8;
const FOV = 32, START_Z = 6.3, REST_Z = 5.25;

const { damp, clamp, lerp } = MathUtils;
const step = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const dt60 = (d) => Math.min(d, 0.1);

/* Campo de cursor: suavizado único que el resto de las piezas lee. */
function FieldUpdater({ field }) {
  useFrame((_, delta) => {
    const d = dt60(delta);
    field.px = damp(field.px, field.tx, 2.6, d);
    field.py = damp(field.py, field.ty, 2.6, d);
    field.influence = damp(field.influence, field.targetInfluence, 1.8, d);
  });
  return null;
}

/* prefers-reduced-motion: sin loop continuo, se renderiza hasta que todo asienta. */
function Settle() {
  const invalidate = useThree((s) => s.invalidate);
  const frames = useRef(0);
  useFrame(() => { if (frames.current++ < 90) invalidate(); });
  return null;
}

/* Cámara con inercia: el objetivo nace del campo, nunca del puntero crudo. */
function Rig({ field }) {
  const camera = useThree((s) => s.camera);
  const look = useRef([0, 0]);
  useFrame((_, delta) => {
    const d = dt60(delta);
    const inf = field.influence;
    const tz = START_Z - (START_Z - REST_Z) * step(0, 0.5, field.progress) + field.exit * 0.55;
    camera.position.x = damp(camera.position.x, field.px * 0.44 * inf, 1.1, d);
    camera.position.y = damp(camera.position.y, field.py * 0.3 * inf + field.exit * 0.24, 1.1, d);
    camera.position.z = damp(camera.position.z, tz, 1.5, d);
    look.current[0] = damp(look.current[0], field.px * 0.07 * inf, 1.4, d);
    look.current[1] = damp(look.current[1], field.py * 0.05 * inf, 1.4, d);
    camera.lookAt(look.current[0], look.current[1], 0);
  });
  return null;
}

/* Ventana 4:5: escala la composición y traduce el cursor a unidades locales.
   El encuadre se calcula sobre REST_Z (la distancia de cámara en reposo), no
   sobre el viewport vivo: durante la entrada la cámara hace dolly y el 4:5
   quedaría mal medido. */
function Frame({ field, children }) {
  const size = useThree((s) => s.size);
  const fit = useMemo(() => {
    const h = 2 * Math.tan((FOV * Math.PI) / 360) * REST_Z;
    const w = h * (size.width / Math.max(1, size.height));
    const box = Math.min(h * 0.84, (w * 0.94) / 0.8);
    return { scale: box / DESIGN_H, halfW: w / 2, halfH: h / 2 };
  }, [size.width, size.height]);
  useFrame(() => {
    field.wx = (field.px * fit.halfW) / fit.scale;
    field.wy = (field.py * fit.halfH) / fit.scale;
  });
  return <group scale={fit.scale}>{children}</group>;
}

/* Luz de cursor: un highlight mínimo, nunca un spotlight. */
function CursorLight({ field }) {
  const light = useRef();
  const viewport = useThree((s) => s.viewport);
  useFrame((_, delta) => {
    const d = dt60(delta);
    light.current.position.set((field.px * viewport.width) / 2, (field.py * viewport.height) / 2, 1.15);
    light.current.intensity = damp(light.current.intensity, field.influence * 2.4 * step(0.55, 0.95, field.progress), 2, d);
  });
  return <pointLight ref={light} color={ACID} intensity={0} distance={3.2} decay={2} />;
}

/* ---------- 1 · FORMA CENTRAL ----------
   La deformación del material mueve vértices pero no recalcula normales: sola,
   la silueta ondula pero la superficie sigue sombreando como esfera lisa. El
   normal map procedural (ruido fBm, tileable, sin assets) da el microrrelieve
   de grafito que se ve de cerca sin romper los reflejos. */
function useGraphiteNormals(size = 128) {
  return useMemo(() => {
    let s = 1337;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const grid = 32;
    const base = new Float32Array(grid * grid);
    for (let i = 0; i < base.length; i++) base[i] = rnd();
    const at = (x, y) => base[(((y % grid) + grid) % grid) * grid + (((x % grid) + grid) % grid)];
    const noise = (x, y) => {
      const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
      const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
      return lerp(lerp(at(x0, y0), at(x0 + 1, y0), u), lerp(at(x0, y0 + 1), at(x0 + 1, y0 + 1), u), v);
    };
    const h = new Float32Array(size * size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let amp = 1, freq = 4, sum = 0, norm = 0;
        for (let o = 0; o < 4; o++) {
          sum += noise((x / size) * freq, (y / size) * freq) * amp;
          norm += amp; amp *= 0.5; freq *= 2;
        }
        h[y * size + x] = sum / norm;
      }
    }
    const hAt = (x, y) => h[(((y % size) + size) % size) * size + (((x % size) + size) % size)];
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (hAt(x - 1, y) - hAt(x + 1, y)) * 3;
        const ny = (hAt(x, y - 1) - hAt(x, y + 1)) * 3;
        const len = Math.hypot(nx, ny, 1);
        const i = (y * size + x) * 4;
        data[i] = ((nx / len) * 0.5 + 0.5) * 255;
        data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
        data[i + 2] = (1 / len) * 0.5 * 255 + 127.5;
        data[i + 3] = 255;
      }
    }
    const tex = new DataTexture(data, size, size);
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(3, 2);
    tex.needsUpdate = true;
    return tex;
  }, [size]);
}

/* Escultura estática: desplazamos la geometría una sola vez y recalculamos
   normales, así la irregularidad existe de verdad en la superficie (la del
   material solo curva la silueta). Frecuencias bajas = bultos amplios, no ruido. */
const hash3 = (x, y, z) => {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
};
const vnoise3 = (x, y, z) => {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const l = (a, b, t) => a + (b - a) * t;
  return l(
    l(l(hash3(xi, yi, zi), hash3(xi + 1, yi, zi), u), l(hash3(xi, yi + 1, zi), hash3(xi + 1, yi + 1, zi), u), v),
    l(l(hash3(xi, yi, zi + 1), hash3(xi + 1, yi, zi + 1), u), l(hash3(xi, yi + 1, zi + 1), hash3(xi + 1, yi + 1, zi + 1), u), v),
    w
  );
};

function useSculptedForm(detail) {
  return useMemo(() => {
    const geo = mergeVertices(new IcosahedronGeometry(0.66, detail));
    const pos = geo.attributes.position;
    const v = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n =
        vnoise3(v.x * 1.7 + 4, v.y * 1.7, v.z * 1.7) * 0.68 +
        vnoise3(v.x * 3.4, v.y * 3.4 + 2, v.z * 3.4) * 0.32;
      v.multiplyScalar(1 + (n - 0.5) * 0.13);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [detail]);
}

function MainForm({ field, detail }) {
  const mesh = useRef();
  const mat = useRef();
  const normals = useGraphiteNormals();
  const geometry = useSculptedForm(detail);
  useFrame((state, delta) => {
    const d = dt60(delta);
    const t = state.clock.elapsedTime;
    // Aparece solo por opacidad, ya en su posición y escala finales: el dolly de
    // cámara terminó (progress .5) y la cápsula ya abrió sobre el centro.
    const a = step(0.54, 0.74, field.progress);
    const inf = field.influence;
    const idle = field.reduced ? 0 : 1;
    // Núcleo estable: float propio, sin desplazamiento por cursor. Solo queda
    // una inclinación mínima para que el reflejo verde tenga de dónde moverse.
    mesh.current.position.y = damp(mesh.current.position.y, Math.sin(t * 0.32) * 0.05 * idle, 2, d);
    mesh.current.rotation.y += d * 0.05 * idle;
    mesh.current.rotation.x = damp(mesh.current.rotation.x, Math.sin(t * 0.21) * 0.04 * idle - field.py * 0.05 * inf, 1.7, d);
    mesh.current.rotation.z = damp(mesh.current.rotation.z, field.px * 0.03 * inf, 1.7, d);
    mat.current.opacity = a;
    mat.current.distort = damp(mat.current.distort, 0.16 + 0.04 * inf, 1.2, d);
  });
  return (
    <mesh ref={mesh} geometry={geometry} scale={[1, 0.92, 1.06]} rotation={[0.22, 0.4, -0.16]}>
      <MeshDistortMaterial
        ref={mat}
        color={GRAPHITE}
        distort={0.16}
        speed={field.reduced ? 0 : 0.22}
        radius={0.92}
        normalMap={normals}
        normalScale={[0.22, 0.22]}
        roughness={0.38}
        metalness={0.62}
        clearcoat={0.35}
        clearcoatRoughness={0.62}
        envMapIntensity={1.05}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

/* ---------- 2 · ARCOS TÉCNICOS ---------- */
function Ring({ field, tilt, spin, arcs, appearAt }) {
  const group = useRef();
  const mats = useRef([]);
  useFrame((state, delta) => {
    const d = dt60(delta);
    const t = state.clock.elapsedTime;
    const a = step(appearAt, appearAt + 0.28, field.progress);
    const inf = field.influence;
    const idle = field.reduced ? 0 : 1;
    group.current.rotation.z += d * spin * idle;
    const restX = tilt[0] + Math.sin(t * 0.17) * 0.05 * idle + field.py * 0.3 * inf;
    const restY = tilt[1] + Math.cos(t * 0.13) * 0.05 * idle - field.px * 0.32 * inf;
    group.current.rotation.x = damp(group.current.rotation.x, lerp(tilt[0] - 0.95, restX, a), 1, d);
    group.current.rotation.y = damp(group.current.rotation.y, restY, 1, d);
    group.current.scale.setScalar(lerp(0.84, 1, a));
    for (let i = 0; i < mats.current.length; i++) {
      const m = mats.current[i];
      if (!m) continue;
      // El arco de acento solo se enciende con el cursor: el verde es estado.
      m.opacity = arcs[i].acid ? a * (0.1 + 0.9 * inf) : a * 0.92;
    }
  });
  return (
    <group ref={group}>
      {arcs.map((arc, i) => (
        <mesh
          key={i}
          position={[arc.off?.[0] || 0, arc.off?.[1] || 0, arc.z || 0]}
          rotation={[arc.lean?.[0] || 0, arc.lean?.[1] || 0, arc.start]}
        >
          <torusGeometry args={[arc.r, arc.tube || 0.0055, 5, Math.max(12, Math.round(arc.len * 26)), arc.len]} />
          <meshStandardMaterial
            ref={(m) => { mats.current[i] = m; }}
            color={arc.acid ? ACID : STONE}
            toneMapped={!arc.acid}
            roughness={0.42}
            metalness={arc.acid ? 0 : 0.35}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- 3 · PLANOS TÉCNICOS ---------- */
/* Marcas de plano técnico: ticks, columnas, cota y micro labels (dashes que a
   esta escala leen como texto). Todo geometría: sin fuentes dentro del 3D. */
function plateLines(w, h, detail = 1) {
  const hw = w / 2, hh = h / 2, p = [];
  const seg = (x1, y1, x2, y2) => p.push(x1, y1, 0, x2, y2, 0);

  seg(-hw, -hh, hw, -hh); seg(hw, -hh, hw, hh); seg(hw, hh, -hw, hh); seg(-hw, hh, -hw, -hh);

  const n = 12;
  for (let i = 0; i <= n; i++) { const x = -hw + (w * i) / n; seg(x, hh, x, hh - (i % 4 === 0 ? 0.052 : 0.026)); }
  for (let i = 1; i < 3; i++) { const x = -hw + (w * i) / 3; seg(x, -hh, x, hh); }

  if (detail > 0) {
    const lx = -hw + w * 0.07, ly = hh - h * 0.2;
    [0.085, 0.055, 0.105].forEach((len, i) => seg(lx, ly - i * 0.032, lx + len, ly - i * 0.032));
    const cx = hw - w * 0.16, cy = -hh + h * 0.28;
    seg(cx - 0.028, cy, cx + 0.028, cy); seg(cx, cy - 0.028, cx, cy + 0.028);
  }
  if (detail > 1) {
    const dy = -hh + h * 0.15, d0 = -hw + w * 0.07, d1 = -hw + w * 0.44;
    seg(d0, dy, d1, dy); seg(d0, dy - 0.018, d0, dy + 0.018); seg(d1, dy - 0.018, d1, dy + 0.018);
    for (let i = 1; i < 5; i++) { const y = -hh + (h * i) / 5; seg(hw, y, hw - 0.03, y); }
  }
  return new Float32Array(p);
}

function Plate({ field, position, rotation, size, opacity, appearAt, detail = 1, par = 0.16, ink = 0.4, seed = 0 }) {
  const group = useRef();
  const surface = useRef();
  const stroke = useRef();
  const lines = useMemo(() => plateLines(size[0], size[1], detail), [size, detail]);
  useFrame((state, delta) => {
    const d = dt60(delta);
    const t = state.clock.elapsedTime;
    const a = step(appearAt, appearAt + 0.26, field.progress);
    const inf = field.influence;
    const idle = field.reduced ? 0 : 1;
    // par gradúa la respuesta por plano de profundidad: cerca responde más.
    group.current.position.x = damp(group.current.position.x, position[0] + field.px * par * inf, 1.3, d);
    group.current.position.y = damp(
      group.current.position.y,
      position[1] + Math.sin(t * (0.19 + seed * 0.021) + seed) * 0.02 * idle + field.py * par * 0.7 * inf,
      1.3,
      d
    );
    group.current.position.z = lerp(position[2] - 0.7, position[2], a);
    surface.current.opacity = a * opacity;
    stroke.current.opacity = a * ink;
  });
  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={size} />
        <meshStandardMaterial
          ref={surface}
          color={PAPER}
          side={DoubleSide}
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={stroke} color={RULE} transparent opacity={0} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* ---------- 4 · MARCAS DE CORTE (mismo lenguaje que PhotoFrame) ---------- */
function CropMarks({ field }) {
  const group = useRef();
  const mat = useRef();
  const geo = useMemo(() => {
    const hw = DESIGN_W / 2, hh = DESIGN_H / 2, L = 0.14, p = [];
    for (const [sx, sy] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
      p.push(sx * hw, sy * hh, 0, sx * hw - sx * L, sy * hh, 0);
      p.push(sx * hw, sy * hh, 0, sx * hw, sy * hh - sy * L, 0);
    }
    for (let i = 1; i < 4; i++) { const y = -hh + (DESIGN_H * i) / 4; p.push(-hw, y, 0, -hw + 0.06, y, 0); }
    return new Float32Array(p);
  }, []);
  useFrame((_, delta) => {
    const d = dt60(delta);
    const a = step(0.08, 0.34, field.progress);
    group.current.position.x = damp(group.current.position.x, field.px * 0.06 * field.influence, 1.2, d);
    group.current.position.y = damp(group.current.position.y, field.py * 0.04 * field.influence, 1.2, d);
    mat.current.opacity = a * 0.55;
  });
  return (
    <group ref={group} position={[0, 0, -0.2]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={mat} color={STONE} transparent opacity={0} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* ---------- 5 · NODOS ---------- */
const ACID_DIM = new Color(ACID).multiplyScalar(0.18);
const ACID_LIT = new Color(ACID);

function Node({ field, p, r, acid, index, tier = 1 }) {
  const mesh = useRef();
  const mat = useRef();
  const at = 0.7 + index * 0.035;
  useFrame((state, delta) => {
    const d = dt60(delta);
    const t = state.clock.elapsedTime;
    const a = step(at, at + 0.18, field.progress);
    const inf = field.influence;
    const dx = p[0] - field.wx, dy = p[1] - field.wy;
    const dist = Math.hypot(dx, dy) || 1;
    const push = (0.16 * inf * tier) / (1 + dist * dist * 1.6);
    mesh.current.position.x = damp(mesh.current.position.x, p[0] + (dx / dist) * push, 1.6, d);
    mesh.current.position.y = damp(
      mesh.current.position.y,
      p[1] + (dy / dist) * push + Math.sin(t * 0.4 + index) * 0.012 * (field.reduced ? 0 : 1),
      1.6,
      d
    );
    mesh.current.scale.setScalar(a * (1 + push * 1.6));
    // El nodo verde vive apagado y se enciende con la cercanía del cursor.
    if (acid && mat.current) mat.current.color.copy(ACID_DIM).lerp(ACID_LIT, Math.min(1, push * 7 + inf * 0.2));
  });
  return (
    <mesh ref={mesh} position={p} scale={0}>
      <icosahedronGeometry args={[r, 2]} />
      {acid ? (
        <meshBasicMaterial ref={mat} color={ACID} toneMapped={false} />
      ) : (
        <meshStandardMaterial color={PAPER} roughness={0.5} metalness={0.2} />
      )}
    </mesh>
  );
}

/* ---------- 6 · PARTÍCULAS ---------- */
function Particles({ field, count }) {
  const points = useRef();
  const mat = useRef();
  // Bandas de profundidad en vez de nube isotrópica: una nube uniforme lee como
  // campo de estrellas; en bandas (y más ancha que alta) lee como partículas
  // de una composición, y el sizeAttenuation hace el resto del trabajo.
  const positions = useMemo(() => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
    const near = Math.round(count * 0.25), mid = Math.round(count * 0.4);
    const bands = [
      { n: near, z: [0.55, 1.25], sx: 1.5, sy: 0.95 },
      { n: mid, z: [-0.35, 0.3], sx: 2.1, sy: 1.25 },
      { n: count - near - mid, z: [-1.7, -0.85], sx: 2.6, sy: 1.5 },
    ];
    const a = new Float32Array(count * 3);
    let i = 0;
    for (const b of bands) {
      for (let k = 0; k < b.n; k++, i++) {
        a[i * 3] = rnd() * b.sx;
        a[i * 3 + 1] = rnd() * b.sy;
        a[i * 3 + 2] = b.z[0] + ((rnd() + 1) / 2) * (b.z[1] - b.z[0]);
      }
    }
    return a;
  }, [count]);
  useFrame((state, delta) => {
    const d = dt60(delta);
    const t = state.clock.elapsedTime;
    const idle = field.reduced ? 0 : 1;
    points.current.rotation.y = t * 0.014 * idle;
    points.current.position.x = damp(points.current.position.x, field.px * 0.2 * field.influence, 1, d);
    points.current.position.y = damp(
      points.current.position.y,
      Math.sin(t * 0.16) * 0.03 * idle + field.py * 0.14 * field.influence,
      1,
      d
    );
    mat.current.opacity = step(0.16, 0.5, field.progress) * 0.5;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={mat} color={PAPER} size={0.016} sizeAttenuation transparent opacity={0} depthWrite={false} />
    </points>
  );
}

/* Arcos técnicos, no órbitas: además de radio, profundidad e inclinación
   propios, cada uno tiene su CENTRO desplazado (off). Compartir centro con la
   esfera es lo que los hacía leer como órbitas, por más fragmentados que fueran. */
const PI = Math.PI;
const ARCS_A = [
  { r: 1.08, start: 0.1, len: PI * 0.52, z: 0.12, tube: 0.006, off: [0.14, -0.06] },
  { r: 0.86, start: PI * 0.86, len: PI * 0.26, z: 0.52, tube: 0.0045, lean: [0.16, 0], off: [-0.3, 0.22] },
  { r: 1.5, start: PI * 1.36, len: PI * 0.09, z: -0.38, tube: 0.007, lean: [-0.1, 0.08], off: [0.42, 0.3] },
];
const ARCS_B = [
  { r: 1.34, start: PI * 0.08, len: PI * 0.34, z: -0.62, tube: 0.005, off: [-0.22, 0.12] },
  { r: 1.1, start: PI * 0.62, len: PI * 0.06, z: 0.46, tube: 0.007, acid: true, off: [0.36, -0.3] },
  { r: 1.72, start: PI * 1.2, len: PI * 0.16, z: -0.24, tube: 0.0045, lean: [0.12, -0.1], off: [-0.46, -0.24] },
];

/* Escalera de profundidad: fondo tenue y quieto, medio, y una placa en primer
   plano que se sale del encuadre. Mismos tres objetos, no más. */
const PLATES = [
  { position: [-0.92, 0.36, -2.45], rotation: [0.06, 0.48, -0.05], size: [2.05, 1.18], opacity: 0.03, appearAt: 0.1, detail: 1, par: 0.05, ink: 0.24, seed: 0 },
  { position: [0.82, -0.52, -1.05], rotation: [-0.1, -0.52, 0.07], size: [1.3, 0.84], opacity: 0.055, appearAt: 0.16, detail: 2, par: 0.17, ink: 0.44, seed: 1.7 },
  { position: [-1.26, -0.8, 1.25], rotation: [0.05, 0.64, 0.11], size: [1.3, 0.54], opacity: 0.026, appearAt: 0.22, detail: 1, par: 0.34, ink: 0.52, seed: 3.4 },
];

/* Nodos: tier gradúa cuánto los empuja el cursor según su profundidad. */
const NODES = [
  { p: [-1.18, 0.54, 0.44], r: 0.026, acid: false, tier: 1.15 },
  { p: [1.12, -0.28, 0.5], r: 0.03, acid: true, tier: 1.3 },
  { p: [0.24, 1.16, -0.3], r: 0.02, acid: false, tier: 0.8 },
  { p: [-0.52, -1.14, 0.06], r: 0.024, acid: false, tier: 1 },
  { p: [1.42, 0.66, -0.82], r: 0.014, acid: true, tier: 0.5 },
];

export default function VisualSystemScene({ field, tier = "full", reduced = false, frameloop = "always" }) {
  const lite = tier === "lite";
  return (
    <Canvas
      flat
      frameloop={reduced ? "demand" : frameloop}
      dpr={lite ? [1, 1.5] : [1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, START_Z], fov: FOV }}
      performance={{ min: 0.5 }}
      style={{ pointerEvents: "none" }}
    >
      <FieldUpdater field={field} />
      <Rig field={field} />
      {reduced && <Settle />}

      <ambientLight intensity={0.26} color={PAPER} />
      <directionalLight position={[-3.2, 3.6, 3]} intensity={2.3} color={PAPER} />
      <directionalLight position={[3.6, -1.4, -2.2]} intensity={0.72} color={RULE} />
      {!lite && !reduced && <CursorLight field={field} />}

      <Environment frames={1} resolution={96}>
        <Lightformer form="rect" intensity={2.4} color={PAPER} position={[-2.6, 2.8, 2.4]} scale={[4, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.5} color={RULE} position={[3.4, -0.8, -2.4]} scale={[3, 4, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={0.21} color={ACID} position={[1.9, -1.7, 1.7]} scale={[0.34, 0.34, 1]} target={[0, 0, 0]} />
      </Environment>

      <Frame field={field}>
        {PLATES.slice(0, lite ? 2 : 3).map((plate, i) => <Plate key={i} field={field} {...plate} />)}
        <CropMarks field={field} />
        <MainForm field={field} detail={lite ? 8 : 16} />
        <Ring field={field} tilt={[-0.58, 0.3]} spin={0.05} appearAt={0.52} arcs={ARCS_A} />
        {!lite && <Ring field={field} tilt={[0.46, -0.52]} spin={-0.032} appearAt={0.6} arcs={ARCS_B} />}
        {NODES.slice(0, lite ? 3 : 5).map((node, i) => <Node key={i} field={field} index={i} {...node} />)}
        <Particles field={field} count={lite ? 10 : 22} />
      </Frame>
    </Canvas>
  );
}
