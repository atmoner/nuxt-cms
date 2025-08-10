<template>
  <div
    v-if="loading"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50"
  >
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto" />
      <p class="mt-6 text-gray-600 font-medium">
        Chargement de l'article...
      </p>
    </div>
  </div>

  <div
    v-else-if="error"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50"
  >
    <div class="text-center">
      <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
        <div class="text-red-600 font-medium mb-2">
          Erreur
        </div>
        <p class="text-red-500 text-sm mb-4">
          {{ error }}
        </p>
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          @click="navigateTo('/nuxt-cms/admin/blog')"
        >
          Retour à la liste
        </button>
      </div>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-900 text-white">
        <div class="p-4 border-b border-gray-800">
          <div class="flex items-center justify-between">
            <img
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo"
              class="h-8 w-auto"
            >
            <span class="text-xl font-bold">Admin Pro</span>
          </div>
        </div>

        <nav class="mt-5 px-2">
          <div class="space-y-4">
            <!-- Dashboard -->
            <NuxtLink
              to="/nuxt-cms/admin"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </NuxtLink>

            <!-- Pages -->
            <NuxtLink
              to="/nuxt-cms/admin/pages"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Pages
            </NuxtLink>

            <!-- Blog -->
            <NuxtLink
              to="/nuxt-cms/admin/blog"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Blog
            </NuxtLink>

            <!-- Services -->
            <NuxtLink
              to="/nuxt-cms/services"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Services
            </NuxtLink>
          </div>

          <!-- Log out -->
          <div class="pt-6 mt-6 border-t border-gray-800">
            <button
              class="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
              @click="logout"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-hidden">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="flex items-center justify-between px-6 py-4">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Modifier l'article
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ form.title }}
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <button
                class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                @click="navigateTo('/nuxt-cms/admin/blog')"
              >
                Annuler
              </button>
            </div>
          </div>
        </header>

        <!-- Form Content -->
        <div class="p-6 overflow-auto h-full">
          <form
            class="max-w-4xl mx-auto"
            @submit.prevent="saveArticle"
          >
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <!-- Title and Slug -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Titre de l'article *
                  </label>
                  <input
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Entrez le titre de votre article"
                    @input="generateSlugFromTitle"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL) *
                  </label>
                  <input
                    v-model="form.slug"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="url-de-larticle"
                  >
                </div>
              </div>

              <!-- Author, Category, Status -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Auteur
                  </label>
                  <input
                    v-model="form.author"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nom de l'auteur"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <input
                    v-model="form.category"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Catégorie de l'article"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    v-model="form.status"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="draft">
                      Brouillon
                    </option>
                    <option value="published">
                      Publié
                    </option>
                  </select>
                </div>
              </div>

              <!-- Featured Image -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Image de couverture
                </label>
                <input
                  v-model="form.featured_image"
                  type="url"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://exemple.com/image.jpg"
                >
              </div>

              <!-- Excerpt -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Extrait
                </label>
                <textarea
                  v-model="form.excerpt"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Un résumé de votre article..."
                />
              </div>

              <!-- Content -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Contenu de l'article *
                </label>
                <textarea
                  v-model="form.content"
                  rows="15"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
                  placeholder="Rédigez le contenu de votre article ici..."
                />
              </div>

              <!-- Tags -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span
                    v-for="(tag, index) in form.tags"
                    :key="index"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {{ tag }}
                    <button
                      type="button"
                      class="ml-2 text-indigo-600 hover:text-indigo-800"
                      @click="removeTag(index)"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="newTag"
                    type="text"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Ajouter un tag"
                    @keyup.enter="addTag"
                  >
                  <button
                    type="button"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                    @click="addTag"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              <!-- SEO Section -->
              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">
                  Optimisation SEO
                </h3>

                <div class="grid grid-cols-1 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Description Meta
                    </label>
                    <textarea
                      v-model="form.meta_description"
                      rows="2"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Description pour les moteurs de recherche (160 caractères max)"
                      maxlength="160"
                    />
                    <p class="text-xs text-gray-500 mt-1">
                      {{ form.meta_description.length }}/160 caractères
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Mots-clés Meta
                    </label>
                    <input
                      v-model="form.meta_keywords"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="mot-clé1, mot-clé2, mot-clé3"
                    >
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="border-t border-gray-200 pt-6 mt-6">
                <div class="flex justify-end space-x-4">
                  <button
                    type="button"
                    class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    @click="navigateTo('/nuxt-cms/admin/blog')"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    :disabled="saving"
                    class="px-6 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    @click="saveDraft"
                  >
                    Enregistrer en brouillon
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg font-medium transition-colors"
                  >
                    <span v-if="saving">Mise à jour...</span>
                    <span v-else">Mettre à jour</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import { useAuth } from '../../../composables/useAuth'
import { useBlog } from '../../../composables/useBlog'

const route = useRoute()
const { logout } = useAuth()
const { getArticle, updateArticle } = useBlog()

// Reactive data
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const newTag = ref('')
const originalSlug = ref('')

const form = ref({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  featured_image: '',
  meta_description: '',
  meta_keywords: '',
  author: '',
  category: '',
  tags: [],
  status: 'draft',
})

// Methods
const generateSlugFromTitle = () => {
  // Only auto-generate slug if it matches the original or is empty
  if (!form.value.slug || form.value.slug === originalSlug.value) {
    if (form.value.title) {
      const slug = form.value.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim('-')

      form.value.slug = slug
    }
  }
}

const addTag = () => {
  if (newTag.value.trim() && !form.value.tags.includes(newTag.value.trim())) {
    form.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index) => {
  form.value.tags.splice(index, 1)
}

const saveDraft = async () => {
  form.value.status = 'draft'
  await saveArticle()
}

const saveArticle = async () => {
  try {
    saving.value = true

    // Validation
    if (!form.value.title.trim()) {
      throw new Error('Le titre est requis')
    }

    if (!form.value.slug.trim()) {
      throw new Error('Le slug est requis')
    }

    if (!form.value.content.trim()) {
      throw new Error('Le contenu est requis')
    }

    const articleData = {
      title: form.value.title.trim(),
      slug: form.value.slug.trim(),
      content: form.value.content.trim(),
      excerpt: form.value.excerpt.trim(),
      featured_image: form.value.featured_image.trim(),
      meta_description: form.value.meta_description.trim(),
      meta_keywords: form.value.meta_keywords.trim(),
      author: form.value.author.trim() || 'Admin',
      category: form.value.category.trim() || 'General',
      tags: form.value.tags,
      status: form.value.status,
    }

    // Utiliser route.params.id au lieu de route.query.id
    await updateArticle(route.params.id, articleData)

    // Redirect to blog list
    await navigateTo('/nuxt-cms/admin/blog')
  }
  catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    // You might want to show a toast notification here
    alert(error.message || 'Erreur lors de la mise à jour de l\'article')
  }
  finally {
    saving.value = false
  }
}

const loadArticle = async () => {
  try {
    // Utiliser route.params.id au lieu de route.query.id
    const articleId = route.params.id
    if (!articleId) {
      throw new Error('ID de l\'article manquant')
    }

    const article = await getArticle(articleId)

    // Populate form
    form.value = {
      title: article.title || '',
      slug: article.slug || '',
      content: article.content || '',
      excerpt: article.excerpt || '',
      featured_image: article.featured_image || '',
      meta_description: article.meta_description || '',
      meta_keywords: article.meta_keywords || '',
      author: article.author || 'Admin',
      category: article.category || 'General',
      tags: article.tags || [],
      status: article.status || 'draft',
    }

    originalSlug.value = article.slug
  }
  catch (err) {
    error.value = err.message || 'Erreur lors du chargement de l\'article'
  }
  finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await loadArticle()
})
</script>
