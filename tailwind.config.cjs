module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
