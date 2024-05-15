/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'qblack': 'rgb(34 34 34/1)',
        'qblacktext': 'rgb(29 29 29/1)',
        'qgray': 'rgb(121 121 121/1)',
        'qgraytwo': '#8e8e8e',
        'qgrayBorder': 'rgb(239 239 239/1)',
        'qyellow': 'rgb(255 187 56/1)',
        'qred': 'rgb(239 38 44/1)',
        'qgrayLite': 'rgb(239 239 239/1)',
        'primarygray': 'rgb(248 248 248/1)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("@tailwindcss/typography"),
  ],
};
