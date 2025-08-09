import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, readBody, createError } from '#imports'

const JWT_SECRET = process.env.JWT_SECRET || 'nuxt-cms-secret-key-change-in-production'

export default defineEventHandler(async (event: any) => {
  const { username, password } = await readBody(event)

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required',
    })
  }

  try {
    // Lire le fichier de configuration
    const configPath = join(process.cwd(), 'data', 'config.json')
    const configData = await readFile(configPath, 'utf-8')
    const config = JSON.parse(configData)

    // Vérifier si l'installation est terminée
    if (!config.installed) {
      throw createError({
        statusCode: 403,
        statusMessage: 'CMS not installed yet',
      })
    }

    // Vérifier les identifiants
    if (username !== config.admin_user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
      })
    }

    // Vérifier le mot de passe
    // Vérifier si le mot de passe est hashé avec bcrypt
    let isPasswordValid = false

    if (config.admin_password.startsWith('$2')) {
      // Le mot de passe est hashé avec bcrypt
      isPasswordValid = await bcrypt.compare(password, config.admin_password)
    }
    else {
      // Le mot de passe n'est pas hashé (configuration legacy)
      // Pour la sécurité, on devrait éviter ce cas
      console.warn('⚠️  Mot de passe admin non hashé détecté. Veuillez réinstaller le CMS pour plus de sécurité.')
      isPasswordValid = password === config.admin_password
    }

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
      })
    }

    // Générer le JWT token
    const token = jwt.sign(
      {
        username: config.admin_user,
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // Expire dans 24h
      },
      JWT_SECRET,
    )

    // Retourner le token
    return {
      success: true,
      token,
      user: {
        username: config.admin_user,
        role: 'admin',
      },
    }
  }
  catch (error) {
    if ((error as any).statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
