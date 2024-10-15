// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  vite:{
    base: '/web36nuxt/'
  },
  nitro:{
    plugins: ['plugins/extend-html.ts']
  }
})
