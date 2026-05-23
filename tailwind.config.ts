import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
        quran: ["var(--font-quran)", "serif"],
      },
      colors: {
        brand: {
          50: "#f3faf7",
          100: "#d8efe5",
          200: "#b1dfca",
          300: "#82c8aa",
          400: "#54ae89",
          500: "#34926e",
          600: "#247558",
          700: "#1d5d48",
          800: "#194a3a",
          900: "#163d31",
        },
        rule: {
          idhhar: "#0ea5e9",
          idgham: "#22c55e",
          iqlab: "#f97316",
          ikhfa: "#a855f7",
          qalqalah: "#ef4444",
          madd: "#eab308",
          tafkheem: "#8b5cf6",
          tarqeeq: "#06b6d4",
        },
      },
    },
  },
  plugins: [],
};

export default config;
