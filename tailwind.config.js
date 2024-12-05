/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Upheaval Pro"', 'sans-serif'],
        body: ['"VT323"', 'monospace'],
      },
      colors: {
        brown: {
          100: '#FFFFFF',
          200: '#EAD4AA',
          300: '#E4A672',
          500: '#B86F50',
          700: '#743F39',
          800: '#3F2832',
          900: '#181425',
        },
        clay: {
          100: '#C0CBDC',
          300: '#8B9BB4',
          500: '#5A6988',
          700: '#3A4466', // 这是按钮使用的背景色
          900: '#181425',
        },
      },
    },
  },
  plugins: [],
};
