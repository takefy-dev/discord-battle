module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: '#161F2D',
        primary: '#A4ADE9',
        secondary: '#A4ADE9',
        submain: '#E9EBFA'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
