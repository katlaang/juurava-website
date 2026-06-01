/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Juurava — deep navy/purple base
        ink: '#030512',          // near-black blue
        deep: '#050716',         // hero background
        midnight: '#0A1030',     // section blocks
        slate: '#101846',        // card surface
        graphite: '#1E2867',     // borders
        steel: '#5060A6',        // muted text
        mist: '#B8C4EA',         // body text
        bone: '#E7EAF8',         // headings

        // Magenta/pink — primary accent (was 'ember')
        magenta: '#D21B9C',      // deep neon magenta
        pink: '#C718B5',
        rose: '#9B2BC4',
        plum: '#5F32C8',

        // Cyan/electric blue — secondary accent (was 'signal')
        cyan: '#168FE6',         // electric blue
        sky: '#0F67FF',          // saturated blue
        violet: '#6438E8',       // bridge between magenta and blue
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter Tight"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: { widest: '0.22em', ultra: '0.32em' },
      animation: {
        rise: 'rise 0.8s ease-out forwards',
        slowPulse: 'slowPulse 4s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
        scan: 'scan 3s linear infinite',
      },
      keyframes: {
        rise: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slowPulse: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.8 },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};
