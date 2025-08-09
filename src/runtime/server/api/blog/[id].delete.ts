import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler } from 'h3'
import { createError } from '#imports'

export default defineEventHandler(async (event: any) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Article ID is required',
    })
  }

  try {
    const blogPath = join(process.cwd(), 'data', 'blog.json')

    let articles: any[] = []
    try {
      const blogData = await readFile(blogPath, 'utf-8')
      articles = JSON.parse(blogData)
    }
    catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Article not found',
      })
    }

    const articleIndex = articles.findIndex((article: any) => article.id === id)

    if (articleIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Article not found',
      })
    }

    // Supprimer l'article
    const deletedArticle = articles.splice(articleIndex, 1)[0]

    // Sauvegarder
    await writeFile(blogPath, JSON.stringify(articles, null, 2))

    return {
      success: true,
      message: 'Article deleted successfully',
      deletedArticle,
    }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting blog article',
    })
  }
})
