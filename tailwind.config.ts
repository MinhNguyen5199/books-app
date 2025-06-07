// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Mode Palette
        gray: {
          50: '#F8FAFC',   // Lightest for backgrounds in light mode
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A', // Main background for dark mode (slightly softer than pure black)
          950: '#020617', // Deeper black for even darker elements if needed
        },
        // Accent Colors (adjusted for dark mode compatibility)
        indigo: {
          300: '#A78BFA',
          400: '#818CF8', // Light mode accent
          500: '#6366F1',
          600: '#4F46E5', // Dark mode accent for text/icons
          700: '#4338CA',
          800: '#3730A3',
        },
        purple: {
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
        },
        rose: { // For highlight elements, calls to action
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
        },
        teal: { // For success, secondary accents
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        amber: { // For warnings, rating stars
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      keyframes: {
        // Keyframes for subtle, powerful animations
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)', borderRadius: '70% 50% 40% 60% / 50% 60% 30% 60%' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)', borderRadius: '60% 40% 50% 50% / 70% 40% 60% 30%' },
          '100%': { transform: 'translate(0px, 0px) scale(1)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        pulseLight: {
          '0%, 100%': { textShadow: '0 0 5px rgba(129, 140, 248, 0.4)' },
          '50%': { textShadow: '0 0 15px rgba(129, 140, 248, 0.8), 0 0 25px rgba(139, 92, 246, 0.6)' },
        },
        // For buttons or calls to action
        'float-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        // For gamification element, a subtle shake
        'shake-subtle': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(3px)' },
          '75%': { transform: 'translateX(-3px)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'blob': 'blob 10s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Longer animation for background
        'pulse-light': 'pulseLight 3s ease-in-out infinite',
        'float-bounce': 'float-bounce 2s infinite ease-in-out',
        'shake-subtle': 'shake-subtle 0.5s ease-in-out infinite alternate',
      },
      backgroundImage: {
        // Custom background patterns for hero sections
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;