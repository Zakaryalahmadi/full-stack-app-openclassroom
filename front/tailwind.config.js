 /** @type {import('tailwindcss').Config} */
 export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        'card-primary': '#F5F5F5',
        'card-secondary': '#EEEEEE',
      },
      colors: {
        'primary': '#6C5CCF',
      }
    },
  },
  plugins: [],
}