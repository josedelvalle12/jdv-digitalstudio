/** @type {import('tailwindcss').Config} */
const c = (v) => `rgb(var(${v}) / <alpha-value>)`;
module.exports = {
  content: [__dirname + "/app/**/*.{js,jsx}", __dirname + "/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: c("--c-bg"),
        fg: c("--c-fg"),
        muted: c("--c-muted"),
        line: c("--c-line"),
        accent: c("--accent"),
        onaccent: c("--on-accent"),
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: { out: "cubic-bezier(.2,.7,.1,1)", io: "cubic-bezier(.65,0,.35,1)" },
    },
  },
  plugins: [],
};
