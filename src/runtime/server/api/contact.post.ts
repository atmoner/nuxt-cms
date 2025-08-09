import { createError } from 'h3'
import { defineEventHandler, readBody, getHeader } from 'h3'
import { promises as fs } from 'fs'
import { join } from 'path'

// Helper function to get client IP
function getClientIP(event: any) {
  return getHeader(event, 'x-forwarded-for') || 
         getHeader(event, 'x-real-ip') || 
         event.node.req.socket?.remoteAddress || 
         'unknown'
}

export default defineEventHandler(async (event) => {
  // Vérifier que c'est une requête POST
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Lire les données du formulaire
    const body = await readBody(event)

    // Validation basique
    if (!body.email || !body.message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and message are required'
      })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Préparer les données du contact
    const contactData = {
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email,
      phone: body.phone || '',
      subject: body.subject || 'Nouveau message de contact',
      message: body.message,
      gdprConsent: body.gdprConsent || false,
      timestamp: body.timestamp || new Date().toISOString(),
      ip: getClientIP(event),
      userAgent: getHeader(event, 'user-agent') || ''
    }

    // Option 1: Sauvegarder dans un fichier JSON (simple)
    try {
      const contactsFile = join(process.cwd(), 'playground/data/contacts.json')
      let contacts = []
      
      try {
        const existingData = await fs.readFile(contactsFile, 'utf-8')
        contacts = JSON.parse(existingData)
      } catch (error) {
        // Le fichier n'existe pas encore, on commence avec un tableau vide
        contacts = []
      }

      // Ajouter le nouveau contact
      contacts.push({
        id: Date.now().toString(),
        ...contactData
      })

      // Sauvegarder le fichier
      await fs.writeFile(contactsFile, JSON.stringify(contacts, null, 2))

    } catch (fileError) {
      console.error('Error saving contact to file:', fileError)
      // Continuer même si la sauvegarde en fichier échoue
    }

    // Option 2: Envoyer un email (si configuré)
    if (process.env.CONTACT_EMAIL) {
      try {
        // Ici vous pouvez intégrer votre service d'email préféré
        // Exemple avec Nodemailer, SendGrid, etc.
        console.log('Contact form submission:', {
          to: process.env.CONTACT_EMAIL,
          from: contactData.email,
          subject: `[Contact Form] ${contactData.subject}`,
          text: `
Nouveau message de contact:

Nom: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Téléphone: ${contactData.phone}
Sujet: ${contactData.subject}

Message:
${contactData.message}

---
Envoyé le: ${contactData.timestamp}
IP: ${contactData.ip}
User Agent: ${contactData.userAgent}
GDPR Consent: ${contactData.gdprConsent ? 'Oui' : 'Non'}
          `
        })

        // TODO: Implémenter l'envoi d'email réel ici
        // await sendEmail(emailData)

      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Continuer même si l'envoi d'email échoue
      }
    }

    // Option 3: Envoyer vers un webhook (si configuré)
    if (process.env.CONTACT_WEBHOOK_URL) {
      try {
        await $fetch(process.env.CONTACT_WEBHOOK_URL, {
          method: 'POST',
          body: contactData,
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Source': 'nuxt-cms-contact-form'
          }
        })
      } catch (webhookError) {
        console.error('Error sending to webhook:', webhookError)
        // Continuer même si le webhook échoue
      }
    }

    // Retourner une réponse de succès
    return {
      success: true,
      message: 'Contact form submitted successfully',
      id: Date.now().toString()
    }

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Si c'est déjà une erreur HTTP, la relancer
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Sinon, créer une erreur générique
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})

