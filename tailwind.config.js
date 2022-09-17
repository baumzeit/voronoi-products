/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    ...Array.from({ length: 9 }, (_, idx) => 'animate-delay-' + (idx + 1) * 100),
    'items-start', 'items-center', 'items-end',
    'justify-start', 'justify-center', 'justify-end',
    'inset-0', 'text-left', 'text-center',
    'text-right'
  ],
  darkMode: ['class', '.dark-mode'],
  mode: 'jit',
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        highlight: 'var(--color-highlight)',
        brand: 'var(--color-brand)',
        brandLight: 'var(--color-brand-light)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'bg-primary': 'var(--bg-primary)',
        'bg-primaryLayer': 'var(--bg-primary-layer)',
        'bg-secondary': 'var(--bg-secondary)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        primaryLayer: 'var(--bg-primary-layer)',
        secondary: 'var(--bg-secondary)'
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)'
      },
      boxShadow: {
        'glow': '0px 0px 14px -10px rgba(250,250,250,0.62)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(farthest-side, var(--tw-gradient-stops))',
      },
      fontFamily: {
        display: 'Rubik, sans-serif',
        body: 'Karla, sans-serif'
      },
      animation: {
        fadeIn: 'fade-in 500ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        fadeInFast: 'fade-in 180ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        fadeInVeryFast: 'fade-in 120ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        fadeOut: 'fade-out 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards',
        spinVerySlow: 'spin 240s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
        'fade-out': {
          '100%': {
            opacity: 1
          },
          '0%': {
            opacity: 0,
            // height: 0,
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('./tailwind/twPluginAnimateDelay.js')
  ]
}
