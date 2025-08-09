import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler } from 'h3'
import { createError } from '#imports'

export default defineEventHandler(async (event: any) => {
  try {
    const query = event.node.req.url ? new URL(event.node.req.url, 'http://localhost').searchParams : new URLSearchParams()
    const status = query.get('status')
    const limit = query.get('limit')
    const offset = query.get('offset')
    const search = query.get('search')

    // Lire le fichier blog.json
    const blogPath = join(process.cwd(), 'data', 'blog.json')

    try {
      const blogData = await readFile(blogPath, 'utf-8')
      let articles = JSON.parse(blogData)

      // Filtrer par statut si spécifié
      if (status) {
        articles = articles.filter((article: any) => article.status === status)
      }

      // Recherche si spécifiée
      if (search) {
        const searchLower = search.toString().toLowerCase()
        articles = articles.filter((article: any) =>
          article.title.toLowerCase().includes(searchLower)
          || article.content.toLowerCase().includes(searchLower)
          || article.excerpt.toLowerCase().includes(searchLower),
        )
      }

      // Trier par date de création (plus récent en premier)
      articles.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      // Pagination
      const totalArticles = articles.length
      const startIndex = offset ? Number.parseInt(offset.toString()) : 0
      const endIndex = limit ? startIndex + Number.parseInt(limit.toString()) : articles.length

      const paginatedArticles = articles.slice(startIndex, endIndex)

      return {
        articles: paginatedArticles,
        total: totalArticles,
        offset: startIndex,
        limit: limit ? Number.parseInt(limit.toString()) : articles.length,
      }
    }
    catch (error) {
      // Si le fichier n'existe pas, retourner un tableau vide
      return {
        articles: [],
        total: 0,
        offset: 0,
        limit: 0,
      }
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error reading blog articles',
    })
  }
})
