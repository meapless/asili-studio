/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:   '#0B0A08',
        ink2:  '#13110D',
        ink3:  '#1B1812',
        sand:  '#ECE5D8',
        dim:   '#9A917F',
        clay:  '#C2683C',
        clayd: '#8F4A2A',
        line:  'rgba(236,229,216,0.12)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
