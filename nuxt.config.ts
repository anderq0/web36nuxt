// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // nitro:{
  //   plugins: ['plugins/extend-html.ts']
  // }
  vite:{
    base: '/web36nuxt/'
  },

  modules: ['nuxt-signature-pad']
})