const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
        indigo: colors.indigo,
        red: colors.red,
        yellow: colors.amber,
        blue: colors.blue,
        purple: colors.violet,
        pink: colors.pink,
        orange: colors.violet
      },
      boxShadow: {
        default: "0 4px 8px 0 rgba(0,0,0,.2)"
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
