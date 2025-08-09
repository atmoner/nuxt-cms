import { defineNuxtRouteMiddleware, useCookie, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // Ce middleware ne s'exécute que côté client
  if (import.meta.server) return

  const token = useCookie('auth-token')

  // Si pas de token et on essaie d'accéder à une page admin (sauf login)
  if (!token.value && to.path.startsWith('/nuxt-cms/admin') && to.path !== '/nuxt-cms/admin/login') {
    return navigateTo('/nuxt-cms/admin/login')
  }

  // Si on a un token et on essaie d'accéder à la page de login, rediriger vers admin
  if (token.value && to.path === '/nuxt-cms/admin/login') {
    return navigateTo('/nuxt-cms/admin')
  }
})
