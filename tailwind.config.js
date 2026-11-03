/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunshine: {
          light: '#FFF08A',
          DEFAULT: '#FFD84D',
          dark: '#E5BF2A',
        },
        warmOrange: {
          light: '#FFB870',
          DEFAULT: '#FF9B42',
          dark: '#E07C23',
        },
        dreamyPurple: {
          light: '#C79FE8',
          DEFAULT: '#A879D8',
          dark: '#8751B8',
        },
        softPink: {
          light: '#FFD3E2',
          DEFAULT: '#FFB6CE',
          dark: '#E68CA9',
        },
        skyBlue: {
          light: '#C5EDFF',
          DEFAULT: '#9EDFFF',
          dark: '#67C2F0',
        },
        cream: {
          DEFAULT: '#FFF9EC',
          card: '#FFFDF7',
        },
        hobiText: {
          DEFAULT: '#35234F',
          muted: '#685384',
        }
      },
      fontFamily: {
        heading: ['Fredoka', 'Quicksand', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'playful': '0 8px 0px 0px rgba(53, 35, 79, 0.15)',
        'playful-hover': '0 12px 0px 0px rgba(53, 35, 79, 0.18)',
        'playful-active': '0 2px 0px 0px rgba(53, 35, 79, 0.2)',
        'glow-sun': '0 0 35px rgba(255, 216, 77, 0.65)',
        'glow-purple': '0 0 35px rgba(168, 121, 216, 0.55)',
        'glow-pink': '0 0 35px rgba(255, 182, 206, 0.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(4deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.05)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        spinSlow: 'spinSlow 20s linear infinite',
      }
    },
  },
  plugins: [],
}
