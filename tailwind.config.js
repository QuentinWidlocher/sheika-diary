const path = require('path')
const tailwindColors = require('tailwindcss/colors')
const fromRoot = p => path.join(__dirname, p)

const shadesFromVariable = (varName) => ({
  '50': `var(--${varName}-50)`,
  '100': `var(--${varName}-100)`,
  '200': `var(--${varName}-200)`,
  '300': `var(--${varName}-300)`,
  '400': `var(--${varName}-400)`,
  '500': `var(--${varName}-500)`,
  '600': `var(--${varName}-600)`,
  '700': `var(--${varName}-700)`,
  '800': `var(--${varName}-800)`,
  '900': `var(--${varName}-900)`,
})

module.exports = {
  purge: {
    mode: 'layers',
    enabled: process.env.NODE_ENV === 'production',
    content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        base: {
          'DEFAULT': 'var(--base-0)',
          ...shadesFromVariable('base')
        },
        primary: shadesFromVariable('primary'),
        secondary: shadesFromVariable('secondary'),
        danger: shadesFromVariable('danger'),
      },
      boxShadow: {
        primary: 'var(--primary-shadow)',
        'primary-full': 'var(--primary-shadow-full)',
      },
      dropShadow: {
        primary: 'var(--primary-shadow)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
