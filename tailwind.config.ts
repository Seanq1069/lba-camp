import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#152852', dark: '#0c1a38', light: '#25407a' },
        brick: { DEFAULT: '#a6192e', dark: '#821323' },
        cream: '#f7f5f0',
      },
    },
  },
  plugins: [],
};
export default config;
