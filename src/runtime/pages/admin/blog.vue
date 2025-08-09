<template>
  <div
    v-if="loading"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50"
  >
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto" />
      <p class="mt-6 text-gray-600 font-medium">
        Vérification de l'authentification...
      </p>
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

        <!-- Search Bar -->
        <div class="p-4">
          <div class="relative">
            <input
              type="text"
              class="w-full bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search..."
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <nav class="mt-5 px-2">
          <!-- Main Navigation -->
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
                Gestion des Articles de Blog
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                Créez et gérez vos articles de blog
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <button
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center"
                @click="navigateTo('/nuxt-cms/admin/blog/new')"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Nouvel Article
              </button>
            </div>
          </div>
        </header>

        <!-- Content -->
        <div class="p-6 overflow-auto h-full">
          <!-- Search and Filters -->
          <div class="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Rechercher des articles..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  @input="debouncedSearch"
                >
              </div>
              <div class="flex gap-2">
                <select
                  v-model="statusFilter"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  @change="loadArticles"
                >
                  <option value="">
                    Tous les statuts
                  </option>
                  <option value="published">
                    Publié
                  </option>
                  <option value="draft">
                    Brouillon
                  </option>
                </select>
                <button
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  @click="resetFilters"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>

          <!-- Articles Loading -->
          <div
            v-if="articlesLoading"
            class="flex justify-center py-12"
          >
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>

          <!-- Articles Error -->
          <div
            v-else-if="articlesError"
            class="text-center py-12"
          >
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div class="text-red-600 font-medium mb-2">
                Erreur lors du chargement
              </div>
              <p class="text-red-500 text-sm">
                {{ articlesError }}
              </p>
              <button
                class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                @click="loadArticles"
              >
                Réessayer
              </button>
            </div>
          </div>

          <!-- Articles List -->
          <div v-else>
            <div
              v-if="articles.length === 0"
              class="text-center py-12"
            >
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <svg
                  class="h-12 w-12 text-gray-400 mx-auto mb-4"
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
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  Aucun article trouvé
                </h3>
                <p class="text-gray-500 text-sm mb-4">
                  Commencez par créer votre premier article de blog.
                </p>
                <button
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  @click="navigateTo('/nuxt-cms/admin/blog/new')"
                >
                  Créer un article
                </button>
              </div>
            </div>

            <div
              v-else
              class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Article
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auteur
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="article in articles"
                      :key="article.id"
                      class="hover:bg-gray-50"
                    >
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <div
                              v-if="article.featured_image"
                              class="h-10 w-10 rounded-lg overflow-hidden"
                            >
                              <img
                                :src="article.featured_image"
                                :alt="article.title"
                                class="h-full w-full object-cover"
                              >
                            </div>
                            <div
                              v-else
                              class="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center"
                            >
                              <svg
                                class="h-5 w-5 text-gray-400"
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
                            </div>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                              {{ article.title }}
                            </div>
                            <div class="text-sm text-gray-500">
                              {{ article.slug }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-900">
                        {{ article.author }}
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-900">
                        {{ article.category }}
                      </td>
                      <td class="px-6 py-4">
                        <span
                          class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                          :class="{
                            'bg-green-100 text-green-800': article.status === 'published',
                            'bg-yellow-100 text-yellow-800': article.status === 'draft',
                          }"
                        >
                          {{ article.status === 'published' ? 'Publié' : 'Brouillon' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {{ formatDate(article.created_at) }}
                      </td>
                      <td class="px-6 py-4 text-right text-sm font-medium">
                        <div class="flex justify-end space-x-2">
                          <button
                            class="text-indigo-600 hover:text-indigo-900 transition-colors"
                            @click="editArticle(article.id)"
                          >
                            Modifier
                          </button>
                          <button
                            class="text-red-600 hover:text-red-900 transition-colors"
                            @click="confirmDelete(article)"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div
              v-if="totalArticles > articles.length"
              class="mt-6 flex justify-center"
            >
              <button
                :disabled="loadingMore"
                class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                @click="loadMore"
              >
                <span v-if="loadingMore">Chargement...</span>
                <span v-else>Charger plus</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Confirmer la suppression
        </h3>
        <p class="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer l'article "{{ articleToDelete?.title }}" ? Cette action est irréversible.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            @click="cancelDelete"
          >
            Annuler
          </button>
          <button
            :disabled="deleting"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
            @click="deleteArticle"
          >
            <span v-if="deleting">Suppression...</span>
            <span v-else>Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth',
})

const { $fetch } = useNuxtApp()
const { logout } = useAuth()
const { getArticles, deleteArticle: deleteArticleApi } = useBlog()

// Reactive data
const loading = ref(true)
const articlesLoading = ref(false)
const articlesError = ref('')
const articles = ref([])
const totalArticles = ref(0)
const currentOffset = ref(0)
const pageSize = 10

// Filters
const searchQuery = ref('')
const statusFilter = ref('')

// Delete modal
const showDeleteModal = ref(false)
const articleToDelete = ref(null)
const deleting = ref(false)

// Load more
const loadingMore = ref(false)

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadArticles()
  }, 500)
}

// Methods
const loadArticles = async (reset = true) => {
  try {
    articlesLoading.value = reset
    articlesError.value = ''

    if (reset) {
      currentOffset.value = 0
    }

    const params = {
      limit: pageSize,
      offset: currentOffset.value,
    }

    if (statusFilter.value) {
      params.status = statusFilter.value
    }

    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim()
    }

    const response = await getArticles(params)

    if (reset) {
      articles.value = response.articles
    }
    else {
      articles.value.push(...response.articles)
    }

    totalArticles.value = response.total
  }
  catch (error) {
    articlesError.value = error.message || 'Erreur lors du chargement des articles'
  }
  finally {
    articlesLoading.value = false
    loadingMore.value = false
  }
}

const loadMore = async () => {
  loadingMore.value = true
  currentOffset.value += pageSize
  await loadArticles(false)
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  loadArticles()
}

const editArticle = (id) => {
  navigateTo(`/nuxt-cms/admin/blog-edit?id=${id}`)
}

const confirmDelete = (article) => {
  articleToDelete.value = article
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  articleToDelete.value = null
}

const deleteArticle = async () => {
  if (!articleToDelete.value) return

  try {
    deleting.value = true
    await deleteArticleApi(articleToDelete.value.id)

    // Remove from local array
    articles.value = articles.value.filter(a => a.id !== articleToDelete.value.id)
    totalArticles.value--

    showDeleteModal.value = false
    articleToDelete.value = null
  }
  catch (error) {
    console.error('Erreur lors de la suppression:', error)
    // You might want to show a toast notification here
  }
  finally {
    deleting.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Lifecycle
onMounted(async () => {
  try {
    loading.value = false
    await loadArticles()
  }
  catch (error) {
    loading.value = false
  }
})
</script>
