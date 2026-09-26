/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tandoor: '#1F1815',
        paper: '#FBF3E7',
        saffron: '#E8A23D',
        chili: '#C13B2C',
        chutney: '#6B8E4E',
        ink: '#2B211C',
        clay: '#8C5A3B',
        slate: '#F4EFE6',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
