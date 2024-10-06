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
      include: ['Editor'],
      exclude: []
    }
  },
  css: [
    '/assets/styles/global.css',
    '/assets/styles/scss/theme.scss',
    '/assets/css/tailwind.css',
    'primeicons/primeicons.css',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',

  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    preset: 'vercel',
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
  build: {
    transpile: ['primevue', 'quill-delta']
  },
  vite: {
    resolve: {
      alias: {
        'quill-delta': 'quill-delta/dist/Delta.js',
      },
    },
    optimizeDeps: {
      include: ['quill'],
    },
  },


})
