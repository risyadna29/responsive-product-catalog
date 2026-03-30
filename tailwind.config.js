/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#D42B2B',
          dark:    '#A01E1E',
          light:   '#FFE8E8',
        },
      },
    },
  },
  plugins: [],
};
