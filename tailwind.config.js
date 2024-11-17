// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#F9F7F7',
          lighter: '#DBE2EF',
          primary: '#3F72AF',
          dark: '#112D4E',
        },
      },
      fontFamily: {
        poppins: ['"Quicksand"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
