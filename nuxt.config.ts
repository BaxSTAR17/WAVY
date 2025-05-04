// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@vite-pwa/nuxt'],
  compatibilityDate: '2025-03-26',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/login', '/faq']
    }
  },
  pwa: {
    manifest: {
      name: 'WAVY',
      short_name: 'WAVY',
      description: 'A dynamic podcast hosting and listening platform designed to simplify the creation, distribution, and discovery of podcasts',
      icons: [
        {
          src: 'icons/icon-64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icons/icon-144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
});