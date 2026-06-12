/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom design tokens for JuegaSports
        "bg-body": "#2b2f36",
        "bg-header": "#3a3f47",
        "bg-sidebar": "#4a4f57",
        "bg-panel": "#3a3f47",
        "bg-table-header": "#2c3e50",
        "bg-table-row-odd": "#3a3f47",
        "bg-table-row-even": "#4a4f57",
        "bg-tab": "#4a4f57",
        "bg-tab-active": "#3a3f47",
        "accent-blue": "#3498db",
        "accent-blue-hover": "#2980b9",
        "accent-red": "#e74c3c",
        "accent-red-hover": "#c0392b",
        "border-subtle": "#555a60",
        "text-primary": "#ffffff",
        "text-secondary": "#b0b5ba",
        "text-dark": "#333333",
        "locked": "#7f8c8d",
        "success": "#2ecc71",
        "warning": "#f39c12",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out-left": {
          from: { transform: "translateX(0)", opacity: "1" },
          to: { transform: "translateX(-30px)", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "pulse-red": {
          "0%": { backgroundColor: "#ff6b6b" },
          "100%": { backgroundColor: "#e74c3c" },
        },
        "balance-flash": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "slide-in-right": "slide-in-right 0.2s ease-out",
        "slide-out-left": "slide-out-left 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "pulse-red": "pulse-red 0.15s ease-out",
        "balance-flash": "balance-flash 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
