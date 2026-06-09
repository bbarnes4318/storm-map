import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        storm: {
          hail: "#3b82f6", // Ice/blue
          wind: "#f97316", // Orange
          tornado: "#ef4444", // Red
          severe: "#ea580c", // Severe thunderstorm orange
          flood: "#2563eb", // Flash flood blue
          watch: "#d97706", // Watch yellow/amber
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-hail': '0 0 12px rgba(59, 130, 246, 0.5)',
        'glow-wind': '0 0 12px rgba(249, 115, 22, 0.5)',
        'glow-tornado': '0 0 12px rgba(239, 68, 68, 0.5)',
      }
    },
  },
  plugins: [],
};
export default config;
