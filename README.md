# JDV — Warm Editorial · V2

Identidad refinada sobre la dirección A. Misma arquitectura, textos y narrativa que v0.2; se eliminaron las variantes B y C.

```bash
npm install
npm run dev   # http://localhost:3000
```

Tecla **G**: grilla de 12 columnas (herramienta de revisión).

## Tipografía intercambiable

Todo sale de tres variables en `app/globals.css`:

```css
--font-display: "Bricolage Grotesque", "Geist", var(--font-fallback);
--font-body:    "Geist", var(--font-fallback);
--font-mono:    "Geist Mono", ...;
```

Para probar Satoshi, General Sans o Neue Montreal:

1. Copiar los `.woff2` a `public/fonts/`.
2. Descomentar los `@font-face` en `app/fonts.css`.
3. Cambiar la variable, por ejemplo `--font-display: "Satoshi", var(--font-fallback);`.
4. Poner `--display-stretch: 100%` (el 86 % actual es para el eje de ancho de Bricolage) y ajustar `--display-weight` / `--display-tracking` si hace falta.

## Green shape system

Una sola forma de acento (`.pill`) con cuatro estados. Aparece como máximo una vez por pantalla, nunca es texto ni fondo de sección.

| Dónde | Forma | Qué marca |
|---|---|---|
| Hero | cápsula texturada dentro del titular; se abre y se vuelve ventana | apertura |
| Problema | punto en la web que no cambió | lo que quedó igual |
| Momentos | el indicador activo se estira en cápsula | estado actual |
| Enfoque | punto que recorre la línea hasta "Lanzar" | destino |
| Capacidades / Proceso | cápsula o punto al hover o paso actual | foco |
| Servicios | cápsula junto al número de la fila abierta | fila activa |
| CTA final | la cápsula del hero vuelve al titular | cierre (bookend) |
| Formulario | línea de foco, punto en la opción elegida | foco |
| CTA primario / cursor | círculo del botón, etiqueta VIEW | acción |

## CTA system

| Nivel | Componente | Uso |
|---|---|---|
| Primary | `<Action>` | Hero, nav, CTA final (xl), enviar formulario. Círculo verde + píldora asimétrica en hover + float magnético en dos capas (contenedor ≤ 6px, círculo ≤ 5px extra, retorno elástico). |
| Secondary | `<Action variant="secondary">` | Ver proyectos, CTA dentro de servicios. Texto + ↗ + subrayado que se redibuja. |
| Text link | `<TextLink>` | Ver proyecto →. Mono + flecha que avanza. |

## Motion

Definido en `:root` (`--ease-out`, `--ease-soft`, `--ease-io`, `--t-*`) y en `SmoothScroll.jsx`:

- **Entrada:** fade + 16px (`data-reveal`).
- **Tipografía:** máscara + translate.
- **Imágenes:** escala y clip-path.
- **Hover:** físico.
- **Scroll:** Lenis con lerp 0.115.

## Nav

Toma el tono de la sección que tiene debajo. Se esconde al bajar y vuelve al subir, con el mismo fondo que la página. La sección activa se marca con el punto que se estira en cápsula verde.

## Cursor

Punto de 6px. Crece levemente sobre enlaces y CTA. Sobre proyectos muestra VIEW y sobre videos PLAY. No existe en táctil.

## WebGL (preparado, no implementado)

`components/stage/WebGLSlot.jsx` envuelve los dos candidatos:

- **hero:** estado de apertura + puntero.
- **rings:** paso del Problema, 0–6.

El archivo explica la interfaz `mount / update / destroy` para enchufar una escena más adelante.

## Iteración mobile (< 1024px, desktop sin cambios)

- **Hero (< 768px):** H1 más grande (12.4vw), interlineado y tracking más cerrados, cápsula más corta; spacing vertical rebalanceado.
- **Momentos:** el visual sale del flujo (absoluto), título y descripción quedan pegados como una unidad.
- **Enfoque:** secuencia fijada ligada al scroll. Cada frase activa su paso: línea vertical que se rellena de verde y el paso actual escalado.
- **Experiencia:** cada figura se reorganiza al entrar (desorden → orden del concepto), escala por scrub y dibuja su filete.
- **CTA final:** el borde negro se ancla a la parte visible. Empieza cerca del 20 % del progreso, está mayormente oscuro al 50 % y completo al ~72 %.

Los comportamientos JS usan `MOBILE` / `DESKTOP` de `lib/scroll.js` (mismo corte de 1024px que ya usaba el proyecto). Los ajustes tipográficos usan `max-width: 767px`.
