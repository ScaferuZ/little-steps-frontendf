/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/components/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      background: '#FAFAFA',
      black: '#121212',
      primary: '#E6407B',
      secondary: '#CCC',
      highlight: '#FF2353',
      grey: '#605B57'
    },
    extend: {}
  },
  plugins: []
}
