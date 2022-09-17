const plugin = require('tailwindcss/plugin')

const animateDelay = plugin(
  function ({ addUtilities, theme, e }) {
    const values = theme('animateDelay')
    const utilities = Object.entries(values).map(([key, value]) => {
      return {
        [`.${e(`animate-delay-${key}`)}`]: { animationDelay: `${value}` }
      }
    })
    addUtilities(utilities)
  },
  {
    theme: {
      animateDelay: {
        none: '0s',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        250: '250ms',
        300: '300ms',
        350: '350ms',
        400: '400ms',
        450: '450ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1000: '1000ms',
        1100: '1100ms',
        1200: '1200ms',
        1300: '1300ms',
        1400: '1400ms',
        1500: '1500ms',
      }
    }
  }
)
module.exports = animateDelay
