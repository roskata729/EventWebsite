import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#070B14",
          surface: "#0E1526",
          elevated: "#111B30",
          accent: "#D4AF37",
          accentSoft: "#F1D98A",
          foreground: "#F8FAFC",
          muted: "#CBD5E1",
        },
      },
      fontFamily: {
        heading: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "'Segoe UI'", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading-xl": ["2.25rem", { lineHeight: "1.2" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.25" }],
        "heading-md": ["1.5rem", { lineHeight: "1.3" }],
      },
      boxShadow: {
        premium: "0 18px 40px -20px rgba(212, 175, 55, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
