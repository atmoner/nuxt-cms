import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, readBody } from 'h3'
import { createError } from '#imports'

export default defineEventHandler(async (event: any) => {
  const id = event.context.params?.id
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Article ID is required',
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

    // Vérifier que le slug n'existe pas déjà pour un autre article
    const existingArticle = articles.find((article: any) =>
      article.slug === body.slug && article.id !== id,
    )
    if (existingArticle) {
      throw createError({
        statusCode: 409,
        statusMessage: 'An article with this slug already exists',
      })
    }

    // Mettre à jour l'article
    const updatedArticle = {
      ...articles[articleIndex],
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || articles[articleIndex].excerpt,
      featured_image: body.featured_image !== undefined ? body.featured_image : articles[articleIndex].featured_image,
      meta_description: body.meta_description !== undefined ? body.meta_description : articles[articleIndex].meta_description,
      meta_keywords: body.meta_keywords !== undefined ? body.meta_keywords : articles[articleIndex].meta_keywords,
      author: body.author !== undefined ? body.author : articles[articleIndex].author,
      category: body.category !== undefined ? body.category : articles[articleIndex].category,
      tags: body.tags !== undefined ? body.tags : articles[articleIndex].tags,
      status: body.status !== undefined ? body.status : articles[articleIndex].status,
      updated_at: new Date().toISOString(),
    }

    articles[articleIndex] = updatedArticle

    // Sauvegarder
    await writeFile(blogPath, JSON.stringify(articles, null, 2))

    return updatedArticle
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating blog article',
    })
  }
})
