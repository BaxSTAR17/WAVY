// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
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
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
});