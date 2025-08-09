import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, createError } from '#imports'

export default defineEventHandler(async (event: any) => {
  try {
    // Lire le fichier pages.json
    const pagesPath = join(process.cwd(), 'data', 'pages.json')

    try {
      const pagesData = await readFile(pagesPath, 'utf-8')
      const pages = JSON.parse(pagesData)
      return pages
    }
    catch (error) {
      // Si le fichier n'existe pas, retourner un tableau vide
      return []
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error reading pages',
    })
  }
})
