import { defineEventHandler, deleteCookie } from '#imports'

export default defineEventHandler(async (event: any) => {
  // Supprimer le cookie d'authentification
  deleteCookie(event, 'auth-token')

  return {
    success: true,
    message: 'Logged out successfully',
  }
})
