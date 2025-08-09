import bcrypt from 'bcryptjs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

async function testLogin() {
  try {
    console.log('🧪 Test de connexion avec mot de passe hashé...')

    // Lire la configuration
    const configPath = join(process.cwd(), 'data', 'config.json')
    const configData = await readFile(configPath, 'utf-8')
    const config = JSON.parse(configData)

    console.log('📋 Configuration chargée:')
    console.log(`   - Utilisateur: ${config.admin_user}`)
    console.log(`   - Hash commence par: ${config.admin_password.substring(0, 10)}...`)
    console.log(`   - Type de hash: ${config.admin_password.startsWith('$2') ? 'bcrypt' : 'texte clair'}`)

    // Test avec le bon mot de passe
    const testPassword = 'admin123456'
    const isValid = await bcrypt.compare(testPassword, config.admin_password)

    console.log(`\n🔑 Test avec mot de passe "${testPassword}":`)
    console.log(`   - Résultat: ${isValid ? '✅ Valide' : '❌ Invalide'}`)

    // Test avec un mauvais mot de passe
    const wrongPassword = 'wrongpassword'
    const isInvalid = await bcrypt.compare(wrongPassword, config.admin_password)

    console.log(`\n🔑 Test avec mauvais mot de passe "${wrongPassword}":`)
    console.log(`   - Résultat: ${isInvalid ? '❌ Erreur - devrait être invalide' : '✅ Correctement rejeté'}`)

    console.log('\n🎉 Tests terminés avec succès!')
  }
  catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    process.exit(1)
  }
}

testLogin()
