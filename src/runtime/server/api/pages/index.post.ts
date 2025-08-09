import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, readBody, createError } from '#imports'

// Fonction simple pour générer un UUID
function generateId() {
  return 'page_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)

  // Validation des données
  if (!body.title || !body.slug || !body.content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title, slug and content are required',
    })
  }

  try {
    const pagesPath = join(process.cwd(), 'data', 'pages.json')

    // Lire les pages existantes
    let pages: any[] = []
    try {
      const pagesData = await readFile(pagesPath, 'utf-8')
      pages = JSON.parse(pagesData)
    }
    catch (error) {
      // Le fichier n'existe pas encore
    }

    // Vérifier que le slug n'existe pas déjà
    const existingPage = pages.find((page: any) => page.slug === body.slug)
    if (existingPage) {
      throw createError({
        statusCode: 409,
        statusMessage: 'A page with this slug already exists',
      })
    }

    // Créer la nouvelle page
    const newPage = {
      id: generateId(),
      title: body.title,
      slug: body.slug,
      content: body.content,
      meta_description: body.meta_description || '',
      meta_keywords: body.meta_keywords || '',
      status: body.status || 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Ajouter la page à la liste
    pages.push(newPage)

    // Sauvegarder
    await writeFile(pagesPath, JSON.stringify(pages, null, 2))

    return newPage
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating page',
    })
  }
})
