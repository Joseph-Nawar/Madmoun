import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
      },
      colors: {
        primary: "#059669",
        accent: "#d97706",
        surface: "#0f172a",
        "surface-border": "rgba(255,255,255,0.1)",
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        spotlight:
          "radial-gradient(600px circle at var(--spotlight-x,50%) var(--spotlight-y,0%), rgba(5,150,105,0.25), transparent 55%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
