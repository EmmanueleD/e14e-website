/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff9f1c",
        secondary: "#64748b",
        accent: "#3b82f6"
      },
      fontFamily: {
        sans: ["Funnel Display", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light"]
  }
};
