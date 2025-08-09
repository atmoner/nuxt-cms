import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, readBody, createError, getRouterParam } from '#imports'

export default defineEventHandler(async (event: any) => {
  const pageId = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!pageId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Page ID is required',
    })
  }

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
      throw createError({
        statusCode: 404,
        statusMessage: 'Pages file not found',
      })
    }

    // Trouver la page à modifier
    const pageIndex = pages.findIndex((page: any) => page.id === pageId)
    if (pageIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    // Vérifier que le slug n'existe pas déjà pour une autre page
    const existingPage = pages.find((page: any) => page.slug === body.slug && page.id !== pageId)
    if (existingPage) {
      throw createError({
        statusCode: 409,
        statusMessage: 'A page with this slug already exists',
      })
    }

    // Mettre à jour la page
    const updatedPage = {
      ...pages[pageIndex],
      title: body.title,
      slug: body.slug,
      content: body.content,
      meta_description: body.meta_description || pages[pageIndex].meta_description || '',
      meta_keywords: body.meta_keywords || pages[pageIndex].meta_keywords || '',
      status: body.status || pages[pageIndex].status || 'published',
      updated_at: new Date().toISOString(),
    }

    pages[pageIndex] = updatedPage

    // Sauvegarder
    await writeFile(pagesPath, JSON.stringify(pages, null, 2))

    return updatedPage
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating page',
    })
  }
})
