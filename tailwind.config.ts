import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f5f1e8",
        "paper-card": "#fffdf7",
        ink: {
          DEFAULT: "#1a1a1a",
          soft: "#4a4a44",
          muted: "#6b6b63",
        },
        accent: { DEFAULT: "#c0392b", soft: "#e8b4ad" },
        verified: { DEFAULT: "#1a7a4a", bg: "#eef6f0", border: "#cfe6d8" },
        rule: "#d8d2c4",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        dossier: "0 8px 30px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
