/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/dist/tailwind')],
  theme: {
    extend: {
      colors: {
        primary: '#4b8457',
        bg: '#f8f8f8',
        'text-green': '#306739',
        'text-main': '#0f1712',
        'green-bg': '#0f1712',
        'light-green-bg': '#e9f4ee',
      },
    },
  },
  plugins: [],
};
