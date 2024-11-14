import flowbite from 'flowbite-react/tailwind'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.yellow,
          DEFAULT: colors.yellow[500],
        }
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

