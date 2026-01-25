import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        void: "#050505",
        "deep-slate": "#020617",
        "investment-emerald": "#10b981",
        "liquid-gold": "#f59e0b",
        primary: "#10b981",
        accent: "#f59e0b",
        surface: "#0b1220",
        "surface-border": "rgba(255,255,255,0.1)",
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.1), 0 18px 50px rgba(2,6,23,0.6)",
      },
      backgroundImage: {
        spotlight:
          "radial-gradient(600px circle at var(--spotlight-x,50%) var(--spotlight-y,0%), rgba(16,185,129,0.2), transparent 55%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
