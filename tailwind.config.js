/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom': '1000px',
      },
      keyframes: {
        growShrink: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.4)" },
        },
        growShrink2: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        growShrink: "growShrink 1.5s ease-in-out infinite",
        growShrink2: "growShrink 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

