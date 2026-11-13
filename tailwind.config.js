/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#000000',
        surface: '#181818',
        'surface-elevated': '#1F1F1F',
        'surface-highlight': '#272727',
        gold: {
          DEFAULT: '#C9A24B',
          light: '#DEC177',
          dark: '#8C6C26',
          dim: 'rgba(201, 162, 75, 0.15)',
        },
        emerald: {
          DEFAULT: '#1FA37A',
          light: '#28C795',
          dim: 'rgba(31, 163, 122, 0.15)',
        },
        crimson: {
          DEFAULT: '#D04753',
          dim: 'rgba(208, 71, 83, 0.15)',
        },
        text: {
          primary: '#F2F1ED',
          muted: '#8A8F98',
          subtle: '#585E6A',
        },
        border: {
          hairline: '#1E232D',
          hover: 'rgba(201, 162, 75, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 40s linear infinite',
        'float': 'float 6s cubic-bezier(0.22, 1, 0.36, 1) infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-8px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'institutional': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
