import { defineEventHandler, readBody, createError } from '#imports'
import bcrypt from 'bcryptjs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event: any) => {
  // Endpoint pour hasher le mot de passe admin dans config.json
  const { currentPassword, newPassword } = await readBody(event)

  if (!currentPassword || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Current password and new password are required',
    })
  }

  try {
    const configPath = join(process.cwd(), 'data', 'config.json')
    const configData = await readFile(configPath, 'utf-8')
    const config = JSON.parse(configData)

    // Vérifier le mot de passe actuel
    let isCurrentPasswordValid = false

    if (config.admin_password.startsWith('$2')) {
      // Le mot de passe est déjà hashé
      isCurrentPasswordValid = await bcrypt.compare(currentPassword, config.admin_password)
    }
    else {
      // Le mot de passe n'est pas hashé
      isCurrentPasswordValid = currentPassword === config.admin_password
    }

    if (!isCurrentPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Current password is incorrect',
      })
    }

    // Hasher le nouveau mot de passe
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    // Mettre à jour la configuration
    config.admin_password = hashedPassword

    await writeFile(configPath, JSON.stringify(config, null, 2))

    return {
      success: true,
      message: 'Password updated successfully',
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
