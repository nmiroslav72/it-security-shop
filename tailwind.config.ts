import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1d3eb8",
          dark: "#152a85",
          light: "#3d5fd9",
        },
        accent: {
          DEFAULT: "#f6d000",
          dark: "#e3bf00",
        },
        ink: {
          DEFAULT: "#0b1020",
          muted: "#4a5168",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(15, 23, 42, 0.12)",
        card: "0 12px 32px -16px rgba(15, 23, 42, 0.18)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
