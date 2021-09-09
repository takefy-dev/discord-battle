module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: '#161F2D',
        primary: '#A4ADE9',
        secondary: '#A4ADE9',
        submain: '#9099d3',
        back: '#323F4A'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
