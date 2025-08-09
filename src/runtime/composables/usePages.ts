import { ref, readonly } from 'vue'

interface Page {
  id: string
  title: string
  slug: string
  content: string
  meta_description?: string
  meta_keywords?: string
  status?: string
  created_at: string
  updated_at: string
}

export const usePages = () => {
  // États réactifs
  const pages = ref<Page[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Charger toutes les pages
  const fetchPages = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch('/api/nuxt-cms/pages')
      pages.value = data || []
      return data
    }
    catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des pages'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  // Charger une page par ID
  const fetchPage = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch(`/api/nuxt-cms/pages/${id}`)
      return data
    }
    catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement de la page'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  // Créer une nouvelle page
  const createPage = async (pageData: any) => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch('/api/nuxt-cms/pages', {
        method: 'POST',
        body: pageData,
      })
      // Ajouter la nouvelle page à la liste locale
      pages.value.push(data)
      return data
    }
    catch (err: any) {
      error.value = err.message || 'Erreur lors de la création de la page'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  // Mettre à jour une page
  const updatePage = async (id: string, pageData: any) => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch(`/api/nuxt-cms/pages/${id}`, {
        method: 'PUT',
        body: pageData,
      })
      // Mettre à jour la page dans la liste locale
      const index = pages.value.findIndex((page: any) => page.id === id)
      if (index !== -1) {
        pages.value[index] = data
      }
      return data
    }
    catch (err: any) {
      error.value = err.message || 'Erreur lors de la mise à jour de la page'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  // Supprimer une page
  const deletePage = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch(`/api/nuxt-cms/pages/${id}`, {
        method: 'DELETE',
      })
      // Supprimer la page de la liste locale
      const index = pages.value.findIndex((page: any) => page.id === id)
      if (index !== -1) {
        pages.value.splice(index, 1)
      }
      return data
    }
    catch (err: any) {
      error.value = err.message || 'Erreur lors de la suppression de la page'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  // Fonction utilitaire pour générer un slug à partir d'un titre
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '') // Supprime les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-') // Évite les tirets multiples
      .replace(/^-+|-+$/g, '') // Supprime les tirets en début/fin
  }

  return {
    pages: readonly(pages),
    loading: readonly(loading),
    error: readonly(error),
    fetchPages,
    fetchPage,
    createPage,
    updatePage,
    deletePage,
    generateSlug,
  }
}
