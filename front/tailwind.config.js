 /** @type {import('tailwindcss').Config} */
 export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        'card': '#F5F5F5',
      }
    },
  },
  plugins: [],
}