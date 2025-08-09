import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'

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
  if (!Array.isArray(body.components)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Components must be an array',
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

    // Mettre à jour les composants de la page
    pages[pageIndex].components = body.components
    pages[pageIndex].updated_at = new Date().toISOString()

    // Sauvegarder les pages
    await writeFile(pagesPath, JSON.stringify(pages, null, 2), 'utf-8')

    return {
      success: true,
      pageId: pageId,
      components: pages[pageIndex].components,
      message: 'Components updated successfully'
    }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating page components',
    })
  }
})
