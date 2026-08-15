/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0D1636",
        sapphire: "#2E4C93",
        periwinkle: "#9FBBEF",
        blush: "#F3C9D7",
        ivory: "#FBF6EF",
        gold: "#D9A94F",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        script: ["Pinyon Script", "cursive"],
        ui: ["Jost", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
