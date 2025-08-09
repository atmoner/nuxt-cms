import { defineNuxtPlugin } from '#app'
import draggable from 'vuedraggable'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Nuxt CMS Plugin loaded!')

  // Register vuedraggable component globally
  nuxtApp.vueApp.component('draggable', draggable)

  // Initialisation des fonctionnalités d'authentification
  if (import.meta.client) {
    console.log('Auth system initialized')
  }
})
