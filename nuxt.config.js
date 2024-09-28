// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';


export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-dark',
          cssLayer: false
        }
      }
    },
    components: {
      prefix: '',
      exclude: []
    }
  },
  css: ['/public/styles/global.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/**'], // This will exclude all routes from automatic redirection
    },
  },
  routeRules: {
    '/admin/**': { middleware: 'auth' }
  },


})
