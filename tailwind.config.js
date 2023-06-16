/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["emerald", "night"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}

