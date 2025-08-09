import { defineEventHandler, createError } from '#imports'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification
  await requireAuth(event)

  try {
    // Lire le fichier des contacts
    const fs = await import('fs').then(m => m.default)
    const path = await import('path').then(m => m.default)
    
    const contactsFile = path.join(process.cwd(), 'playground/data/contacts.json')
    
    let contacts = []
    try {
      const data = fs.readFileSync(contactsFile, 'utf-8')
      contacts = JSON.parse(data)
    } catch (error) {
      // Le fichier n'existe pas ou est vide
      contacts = []
    }

    return contacts

  } catch (error) {
    console.error('Error loading contacts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
