import { readFile } from 'node:fs/promises'
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

    try {
      const blogData = await readFile(blogPath, 'utf-8')
      const articles = JSON.parse(blogData)

      const article = articles.find((article: any) => article.id === id)

      if (!article) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Article not found',
        })
      }

      return article
    }
    catch (error: any) {
      if (error.statusCode === 404) {
        throw error
      }

      throw createError({
        statusCode: 404,
        statusMessage: 'Article not found',
      })
    }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error reading blog article',
    })
  }
})
