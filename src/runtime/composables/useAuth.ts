import { useState, useCookie } from '#app'
import { computed, readonly } from 'vue'

export const useAuth = () => {
  const user = useState('auth.user', () => null)
  const token = useCookie('auth-token', {
    maxAge: 60 * 60 * 24, // 24 heures
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch('/api/nuxt-cms/auth/login', {
        method: 'POST',
        body: { username, password },
      })

      if (response.success && response.token) {
        token.value = response.token
        user.value = response.user
        return { success: true }
      }

      return { success: false, error: 'Erreur de connexion' }
    }
    catch (error: any) {
      return {
        success: false,
        error: error.data?.statusMessage || 'Erreur de connexion',
      }
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/nuxt-cms/auth/logout', {
        method: 'POST',
      })
    }
    catch (error) {
      // Même en cas d'erreur, on supprime les données locales
    }
    finally {
      token.value = null
      user.value = null
    }
  }

  const verifyToken = async () => {
    if (!token.value) {
      return false
    }

    try {
      const response = await $fetch('/api/nuxt-cms/auth/verify', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (response.success && response.user) {
        user.value = response.user
        return true
      }

      token.value = null
      user.value = null
      return false
    }
    catch (error) {
      token.value = null
      user.value = null
      return false
    }
  }

  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value
  })

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    logout,
    verifyToken,
  }
}
