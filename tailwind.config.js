module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extends: {
      colors: {
        "main": "#29B5B8"
      },
    },
    fontFamily: {
      'body': ['"Raleway"'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
};
