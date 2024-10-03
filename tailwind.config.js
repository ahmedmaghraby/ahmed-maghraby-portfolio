/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      pointerEvents: ['group-hover'],
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0e1016',
        't-color':'#D9D9D9',
        main: '#f5d393',
        secondary: '#e68e2e',
      },
      linearGradients: {
        'bg-top': ['180deg', '#0e1016 0%', 'transparent 50%'],
        'bg-bottom': ['0deg', '#0e1016 0%', 'transparent 100%'],
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 5s linear infinite',
        'infinite-scroll-pause': 'infinite-scroll 5s linear paused',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(100%)' },
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
