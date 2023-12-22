import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '0.125rem': '0.0625rem',
        '0.25': '0.125rem',
        '13': '3.25rem',
        '18': '4.5rem',
        '19.5': '4.825rem',
        '26': '6.5rem',
        '35': '8.75rem',
        '88': '22rem',
        '92': '24rem',
        '96': '26rem',
        '128': '32rem',
      },
      fontSize: {
        '10xl': ['10rem', '1'],
        '11xl': ['12rem', '1'],
        '12xl': ['14rem', '1'],
        '13xl': ['16rem', '1'],
        '14xl': ['18rem', '1'],
        '15xl': ['20rem', '1'],
        '20xl': ['30rem', '1'],
      },
      lineHeight: {
        '12': '3rem',
      },
    },
  },
  plugins: [],
};
export default config;
