import { defineEventHandler, getCookie, getHeader, createError } from '#imports'

const JWT_SECRET = process.env.JWT_SECRET || 'nuxt-cms-secret-key-change-in-production'

export async function verifyAuthToken(event: any) {
  try {
    const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return { success: false, message: 'No token provided' }
    }

    // Vérification JWT
    const jwt = await import('jsonwebtoken').then(m => m.default)
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      return { success: true, user: decoded }
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError)
      return { success: false, message: 'Invalid token' }
    }

  } catch (error) {
    console.error('Auth verification error:', error)
    return { success: false, message: 'Auth verification failed' }
  }
}

export async function requireAuth(event: any) {
  const authResult = await verifyAuthToken(event)
  if (!authResult.success) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  return authResult.user
}
