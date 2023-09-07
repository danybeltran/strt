module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './(components)/**/*.{js,ts,jsx,tsx}'
  ],
  // darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      fontSize: ['responsive', 'hover', 'focus', 'active'],
      padding: ['responsive', 'hover', 'focus', 'active'],
      margin: ['responsive', 'hover', 'focus', 'active'],
      align: ['responsive', 'hover', 'focus', 'active'],
      translate: ['responsive', 'hover', 'focus', 'active']
    }
  },
  daisyui: {
    themes: ['light']
  },
  plugins: [require('daisyui')]
}
