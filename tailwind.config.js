/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/dist/tailwind')],
  theme: {
    extend: {},
  },
  plugins: [],
};
