/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          50: "#effee6", 100: "#dafccb", 200: "#b8f99d", 300: "#8cf264",
          400: "#6ae534", 500: "#4fcb16", 600: "#3ba20d", 700: "#2f7b10",
          800: "#296113", 900: "#245215",
        },
      },
      boxShadow: { glow: "0 0 40px -8px rgba(106,229,52,.45)" },
    },
  },
  plugins: [],
};
