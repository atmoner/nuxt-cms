import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, createError, getRouterParam } from '#imports'

export default defineEventHandler(async (event: any) => {
  const pageId = getRouterParam(event, 'id')

  if (!pageId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Page ID is required',
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

    // Trouver la page à supprimer
    const pageIndex = pages.findIndex((page: any) => page.id === pageId)
    if (pageIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    // Supprimer la page
    const deletedPage = pages.splice(pageIndex, 1)[0]

    // Sauvegarder
    await writeFile(pagesPath, JSON.stringify(pages, null, 2))

    return { message: 'Page deleted successfully', page: deletedPage }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting page',
    })
  }
})
