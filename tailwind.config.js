/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        'phoneWidth': '400px',
        'phoneHeight': '845px',
        'menu': '300px',
      },
    },
  },
  daisyui: {
    themes: ["emerald", "night","winter", "pastel", "coffee", "autumn"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}

