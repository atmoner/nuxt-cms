export const useBlog = () => {
  // Récupérer tous les articles
  const getArticles = async (params?: {
    status?: string
    limit?: number
    offset?: number
    search?: string
  }) => {
    const query = new URLSearchParams()

    if (params?.status) query.append('status', params.status)
    if (params?.limit) query.append('limit', params.limit.toString())
    if (params?.offset) query.append('offset', params.offset.toString())
    if (params?.search) query.append('search', params.search)

    const queryString = query.toString()
    const url = `/api/nuxt-cms/blog${queryString ? `?${queryString}` : ''}`

    return await $fetch(url)
  }

  // Récupérer un article par ID
  const getArticle = async (id: string) => {
    return await $fetch(`/api/nuxt-cms/blog/${id}`)
  }

  // Créer un nouvel article
  const createArticle = async (articleData: {
    title: string
    slug: string
    content: string
    excerpt?: string
    featured_image?: string
    meta_description?: string
    meta_keywords?: string
    author?: string
    category?: string
    tags?: string[]
    status?: 'published' | 'draft'
  }) => {
    return await $fetch('/api/nuxt-cms/blog', {
      method: 'POST',
      body: articleData,
    })
  }

  // Mettre à jour un article
  const updateArticle = async (id: string, articleData: {
    title: string
    slug: string
    content: string
    excerpt?: string
    featured_image?: string
    meta_description?: string
    meta_keywords?: string
    author?: string
    category?: string
    tags?: string[]
    status?: 'published' | 'draft'
  }) => {
    return await $fetch(`/api/nuxt-cms/blog/${id}`, {
      method: 'PUT',
      body: articleData,
    })
  }

  // Supprimer un article
  const deleteArticle = async (id: string) => {
    return await $fetch(`/api/nuxt-cms/blog/${id}`, {
      method: 'DELETE',
    })
  }

  // Récupérer les articles publiés pour l'affichage public
  const getPublishedArticles = async (limit?: number) => {
    return await getArticles({
      status: 'published',
      limit,
    })
  }

  return {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getPublishedArticles,
  }
}
