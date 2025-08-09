import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineEventHandler, readBody, createError } from 'h3'

// Fonction simple pour générer un UUID
function generateId() {
  return 'blog_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
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
    const blogPath = join(process.cwd(), 'data', 'blog.json')

    // Lire les articles existants
    let articles: any[] = []
    try {
      const blogData = await readFile(blogPath, 'utf-8')
      articles = JSON.parse(blogData)
    }
    catch (error) {
      // Le fichier n'existe pas encore
    }

    // Vérifier que le slug n'existe pas déjà
    const existingArticle = articles.find((article: any) => article.slug === body.slug)
    if (existingArticle) {
      throw createError({
        statusCode: 409,
        statusMessage: 'An article with this slug already exists',
      })
    }

    // Créer le nouvel article
    const newArticle = {
      id: generateId(),
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || '',
      featured_image: body.featured_image || '',
      meta_description: body.meta_description || '',
      meta_keywords: body.meta_keywords || '',
      author: body.author || 'Admin',
      category: body.category || 'General',
      tags: body.tags || [],
      status: body.status || 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Ajouter l'article au début du tableau
    articles.unshift(newArticle)

    // Sauvegarder
    await writeFile(blogPath, JSON.stringify(articles, null, 2))

    return newArticle
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating blog article',
    })
  }
})
