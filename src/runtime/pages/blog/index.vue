<template>
  <CmsHeader site-title="Blog" />
  <NuxtLayout name="cms">
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto p-8">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-5xl font-bold text-gray-800 mb-6">
            Notre Blog
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos derniers articles, actualités et conseils.
          </p>
        </div>

        <!-- Search and Filter -->
        <div class="max-w-2xl mx-auto mb-12">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Rechercher des articles..."
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  @input="debouncedSearch"
                >
              </div>
              <button
                class="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                @click="resetFilters"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div
          v-if="loading"
          class="flex justify-center py-12"
        >
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="text-center py-12"
        >
          <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <div class="text-red-600 font-medium mb-2">
              Erreur lors du chargement
            </div>
            <p class="text-red-500 text-sm">
              {{ error }}
            </p>
            <button
              class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              @click="loadArticles"
            >
              Réessayer
            </button>
          </div>
        </div>

        <!-- No Articles -->
        <div
          v-else-if="articles.length === 0"
          class="text-center py-12"
        >
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
            <svg
              class="h-16 w-16 text-gray-400 mx-auto mb-4"
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
            <p class="text-gray-500 text-sm">
              Aucun article ne correspond à votre recherche.
            </p>
          </div>
        </div>

        <!-- Articles Grid -->
        <div
          v-else
          class="max-w-6xl mx-auto"
        >
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="article in articles"
              :key="article.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <!-- Featured Image -->
              <div class="h-48 overflow-hidden bg-gray-200">
                <img
                  v-if="article.featured_image"
                  :src="article.featured_image"
                  :alt="article.title"
                  class="w-full h-full object-cover"
                >
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200"
                >
                  <svg
                    class="h-12 w-12 text-gray-400"
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

              <div class="p-6">
                <!-- Category and Date -->
                <div class="flex items-center justify-between mb-3">
                  <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ article.category }}
                  </span>
                  <span class="text-xs text-gray-500">
                    {{ formatDate(article.created_at) }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-xl font-bold mb-3">
                  <NuxtLink
                    :to="`/blog/${article.slug}`"
                    class="text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    {{ article.title }}
                  </NuxtLink>
                </h3>

                <!-- Excerpt -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                  {{ article.excerpt || article.content.substring(0, 150) + '...' }}
                </p>

                <!-- Author and Tags -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-xs text-gray-500">
                    <svg
                      class="h-4 w-4 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {{ article.author }}
                  </div>

                  <div
                    v-if="article.tags && article.tags.length > 0"
                    class="flex flex-wrap gap-1"
                  >
                    <span
                      v-for="tag in article.tags.slice(0, 2)"
                      :key="tag"
                      class="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-600"
                    >
                      #{{ tag }}
                    </span>
                    <span
                      v-if="article.tags.length > 2"
                      class="text-xs text-gray-400"
                    >
                      +{{ article.tags.length - 2 }}
                    </span>
                  </div>
                </div>

                <!-- Read More Button -->
                <div class="mt-4 pt-4 border-t border-gray-100">
                  <NuxtLink
                    :to="`/blog/${article.slug}`"
                    class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                  >
                    Lire la suite
                    <svg
                      class="h-4 w-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>

          <!-- Load More Button -->
          <div
            v-if="totalArticles > articles.length"
            class="text-center mt-12"
          >
            <button
              :disabled="loadingMore"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              @click="loadMore"
            >
              <span v-if="loadingMore">Chargement...</span>
              <span v-else>Charger plus d'articles</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// SEO
useSeoMeta({
  title: 'Blog',
  ogTitle: 'Blog',
  description: 'Découvrez nos derniers articles, actualités et conseils.',
  ogDescription: 'Découvrez nos derniers articles, actualités et conseils.',
})

// Reactive data
const loading = ref(false)
const loadingMore = ref(false)
const error = ref('')
const articles = ref([])
const totalArticles = ref(0)
const currentOffset = ref(0)
const pageSize = 9

// Search
const searchQuery = ref('')

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
    if (reset) {
      loading.value = true
      currentOffset.value = 0
    }
    else {
      loadingMore.value = true
    }

    error.value = ''

    const params = {
      status: 'published',
      limit: pageSize,
      offset: currentOffset.value,
    }

    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim()
    }

    const response = await $fetch('/api/nuxt-cms/blog', {
      params,
    })

    if (reset) {
      articles.value = response.articles
    }
    else {
      articles.value.push(...response.articles)
    }

    totalArticles.value = response.total
  }
  catch (err) {
    error.value = err.message || 'Erreur lors du chargement des articles'
    console.error('Erreur lors du chargement des articles:', err)
  }
  finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = async () => {
  currentOffset.value += pageSize
  await loadArticles(false)
}

const resetFilters = () => {
  searchQuery.value = ''
  loadArticles()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Lifecycle
onMounted(async () => {
  await loadArticles()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
