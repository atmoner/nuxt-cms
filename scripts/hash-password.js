import bcrypt from 'bcryptjs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

async function hashExistingPassword() {
  try {
    // Lire le fichier de configuration
    const configPath = join(process.cwd(), 'data', 'config.json')
    const configData = await readFile(configPath, 'utf-8')
    const config = JSON.parse(configData)

    // Vérifier si le mot de passe est déjà hashé
    if (config.admin_password.startsWith('$2')) {
      console.log('✅ Le mot de passe est déjà hashé.')
      return
    }

    console.log('🔄 Hachage du mot de passe admin...')

    // Hasher le mot de passe actuel
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(config.admin_password, saltRounds)

    // Mettre à jour la configuration
    config.admin_password = hashedPassword

    // Sauvegarder la configuration mise à jour
    await writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8')

    console.log('✅ Mot de passe hashé avec succès!')
    console.log('🔒 Votre mot de passe admin est maintenant sécurisé.')
  }
  catch (error) {
    console.error('❌ Erreur lors du hachage du mot de passe:', error.message)
    process.exit(1)
  }
}

hashExistingPassword()
