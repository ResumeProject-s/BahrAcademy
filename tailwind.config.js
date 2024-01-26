/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    theme: {
      extend: {
        transitionDuration: {
          fast: "200ms",
          normal: "400ms",
          slow: "1s",
        },
      },
    },
  },
  plugins: [],
};
