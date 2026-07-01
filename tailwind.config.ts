import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2F6BFF",
          50: "#EEF3FF",
          100: "#DCE6FF",
          200: "#B9CDFF",
          300: "#8FAEFF",
          600: "#2F6BFF",
          700: "#1E54E6",
          800: "#1842B4",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          soft: "#64748B",
        },
        // Brand palette (soft accents + backgrounds) from the MoliVerse logo
        floral: "#F7F4EA",
        lavender: "#DED9E2",
        periwinkle: "#C0B9DD",
        wisteria: "#80A1D4",
        aqua: {
          DEFAULT: "#75C9C8",
          100: "#DDF2F1",
          500: "#4FB9B7",
          600: "#2FA6A4",
          700: "#1F8A88",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        lift: "0 8px 30px rgba(47,107,255,0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
