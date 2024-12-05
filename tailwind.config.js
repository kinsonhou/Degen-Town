/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Upheaval Pro"', 'sans-serif'],
        body: ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [],
};
