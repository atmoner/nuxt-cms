import { defineEventHandler, getRouterParam, createError } from '#imports'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification
  await requireAuth(event)

  // Récupérer l'ID du contact à supprimer
  const contactId = getRouterParam(event, 'id')
  
  if (!contactId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Contact ID is required'
    })
  }

  try {
    const fs = await import('fs').then(m => m.default)
    const path = await import('path').then(m => m.default)
    
    const contactsFile = path.join(process.cwd(), 'playground/data/contacts.json')
    
    let contacts = []
    try {
      const data = fs.readFileSync(contactsFile, 'utf-8')
      contacts = JSON.parse(data)
    } catch (error) {
      contacts = []
    }

    // Filtrer pour supprimer le contact
    const initialLength = contacts.length
    contacts = contacts.filter((contact: { id: string }) => contact.id !== contactId)
    
    if (contacts.length === initialLength) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Contact not found'
      })
    }

    // Sauvegarder le fichier mis à jour
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2))

    return {
      success: true,
      message: 'Contact deleted successfully'
    }

  } catch (error) {
    console.error('Error deleting contact:', error)
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
