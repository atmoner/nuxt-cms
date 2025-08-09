import { defineEventHandler } from 'h3'
import { JSONFilePreset } from 'lowdb/node'
import path from 'node:path'
import { access } from 'node:fs/promises'

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
    // Vérifier si le fichier de configuration existe
    const configPath = path.join(process.cwd(), 'data', 'config.json')

    try {
      await access(configPath)

      // Charger la configuration
      const defaultConfig: InstallConfig = {
        domain: '',
        admin_user: '',
        admin_password: '',
        email: '',
        installed: false,
        install_date: '',
      }

      const db = await JSONFilePreset(configPath, defaultConfig)
      const config = db.data

      return {
        isInstalled: config.installed || false,
        message: config.installed
          ? 'CMS is already installed and configured.'
          : 'Welcome to Nuxt CMS! Please complete the installation.',
        installDate: config.install_date || null,
      }
    }
    catch (error) {
      // Le fichier n'existe pas
      return {
        isInstalled: false,
        message: 'Welcome to Nuxt CMS! Please complete the installation.',
      }
    }
  }
  catch (error) {
    return {
      isInstalled: false,
      message: 'Welcome to Nuxt CMS! Please complete the installation.',
      error: 'Unable to check installation status',
    }
  }
})
