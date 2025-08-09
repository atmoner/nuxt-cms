import { defineEventHandler, getCookie, getHeader, createError } from '#imports'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'nuxt-cms-secret-key-change-in-production'

export default defineEventHandler(async (event: any) => {
  const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token required',
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any

    return {
      success: true,
      user: {
        username: decoded.username,
        role: decoded.role,
      },
      valid: true,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    })
  }
})
