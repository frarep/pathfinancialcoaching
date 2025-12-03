import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': {
          light: '#BFDBFE',
          DEFAULT: '#93C5FD',
        },
        'soft-yellow': {
          light: '#FDE68A',
          DEFAULT: '#FEF08A',
        },
        'brand-red': '#DC2626',
      },
      backgroundImage: {
        'peaceful-gradient': 'linear-gradient(135deg, #BFDBFE 0%, #FDE68A 100%)',
      },
    },
  },
  plugins: [],
}
export default config
