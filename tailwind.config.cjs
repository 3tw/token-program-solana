module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    measure: {
      base: '66ch',
      sm: '33ch',
      md: '90ch',
      lg: '95rem',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
