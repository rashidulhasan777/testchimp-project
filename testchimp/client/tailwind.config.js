/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

