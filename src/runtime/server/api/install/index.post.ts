import { defineEventHandler, readBody, createError } from 'h3'
import { JSONFilePreset } from 'lowdb/node'
import path from 'node:path'
import { mkdir } from 'node:fs/promises'
import bcrypt from 'bcryptjs'

interface InstallConfig {
  domain: string
  admin_user: string
  admin_password: string
  email: string
  installed: boolean
  install_date: string
}

export default defineEventHandler(async (event) => {
  try {
    // Lire les données du formulaire
    const body = await readBody(event)

    // Valider les données requises
    if (!body.domain || !body.admin_user || !body.admin_password || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tous les champs sont requis',
      })
    }

    // Chemin vers le fichier de configuration
    const dataDir = path.join(process.cwd(), 'data')
    const configPath = path.join(dataDir, 'config.json')

    // Créer le répertoire data s'il n'existe pas
    try {
      await mkdir(dataDir, { recursive: true })
    }
    catch (error: any) {
      // Ignorer l'erreur si le répertoire existe déjà
      if (error.code !== 'EEXIST') {
        throw error
      }
    }

    // Configuration par défaut
    const defaultConfig: InstallConfig = {
      domain: '',
      admin_user: '',
      admin_password: '',
      email: '',
      installed: false,
      install_date: '',
    }

    // Initialiser ou charger la base de données
    const db = await JSONFilePreset(configPath, defaultConfig)

    // Hasher le mot de passe avant de le sauvegarder
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(body.admin_password, saltRounds)

    // Enregistrer les données d'installation
    await db.update((data) => {
      data.domain = body.domain
      data.admin_user = body.admin_user
      data.admin_password = hashedPassword
      data.email = body.email
      data.installed = true
      data.install_date = new Date().toISOString()
    })

    return {
      success: true,
      message: 'Installation terminée avec succès',
      data: {
        domain: body.domain,
        admin_user: body.admin_user,
        email: body.email,
        installed: true,
      },
    }
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'installation: ' + errorMessage,
    })
  }
})
