import { Quicksand } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        'gradient-start': '#4776E6',
        'gradient-mid': '#8E54E9',
        'gradient-end': '#4776E6',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
