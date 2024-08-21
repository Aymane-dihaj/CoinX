/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor: '#FFD700',
      },
      boxShadow: {
        phoneShadow: '0px 0px 0px yellow, 0 1px 2px rgba(204, 204, 204, 1)',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif']
      }
    },
  },
  plugins: [],
}
