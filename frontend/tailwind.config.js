module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: { extend: { screens: { 'lg-laptop': '1440px', '4k': '2560px' } } },
  variants: {
    extend: {},
  },
  plugins: [],
};
