import { readFile } from 'node:fs/promises'
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

    // Trouver la page
    const page = pages.find((page: any) => page.id === pageId)
    if (!page) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    return page
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching page',
    })
  }
})
