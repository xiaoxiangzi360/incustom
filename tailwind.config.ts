import {
  pg_colors,
  pg_fonts,
  pg_backgrounds,
} from './themes/pg-tailwindcss/tokens.cjs'

import { getFontsWithFallback } from './app/utils/font'
import { safelist } from './app/utils/colors'
import tailwindTypography from '@tailwindcss/typography'
import tailwindForms from '@tailwindcss/forms'
import tailwindCssPluginPinegrow from '@pinegrow/tailwindcss-plugin'

export default {
  darkMode: 'class',
  plugins: [
    tailwindTypography,
    tailwindForms,
    tailwindCssPluginPinegrow,
  ],

  theme: {
    extend: {
      // Nuxt UI can process colors extended directly, and not via plugin (as above), so the colors are added here instead of passing it to @pinegrow/tailwindcss-plugin above
      // Primary is added additionally as pp as it's required to set Nuxt UI's primary in app.config.ts. Other colors like secondary etc can be used in Nuxt UI component's color prop
      colors: {
        ...pg_colors, pp: pg_colors.primary, primary: {
          50: '#effdf5',
          100: '#d9fbe8',
          200: '#b3f5d1',
          300: '#75edae',
          400: '#00dc82',
          500: '#00c16a',
          600: '#00a155',
          700: '#007f45',
          800: '#016538',
          900: '#0a5331',
          950: '#052e16',
          DEFAULT: '#00c16a',
        },
      },
      fontFamily: pg_fonts,

    },
  },

  get content() {
    const _content = [
      '{.,app,*-layer}/components/**/*.{js,vue,ts}',
      '{.,app,*-layer}/layouts/**/*.vue',
      '{.,app,*-layer}/pages/**/*.vue',
      '{.,app,*-layer}/plugins/**/*.{js,ts}',
      '{.,app,*-layer}/app.vue',
      '{.,app,*-layer}/*.{mjs,js,ts}',
      '{.,*-layer}/nuxt.config.{js,ts}',
    ]
    return process.env.NODE_ENV === 'production'
      ? _content
      : [..._content, './_pginfo/**/*.{html,js}'] // used by Vue Desginer for live-designing during development
  },
}
