import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nusa: {
          50: '#F9F7F2',
          100: '#F2ECE4',
          200: '#E6D9C8',
          300: '#D5C0A1',
          400: '#C4A47C',
          500: '#8C6B46',
          600: '#6D5236',
          700: '#543D2A',
          800: '#3E2C1E',
          900: '#2A1D15',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;