import { colors } from './src/styles/colors'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: { colors },
  },
  plugins: [],
}
