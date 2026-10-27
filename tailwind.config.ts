import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#07070a",
        foreground: "#f5f5f7",
        muted: "#9a9aab",
      },
      boxShadow: { glow: "0 0 80px rgba(139, 92, 246, .18)" },
    },
  },
  plugins: [],
} satisfies Config;
