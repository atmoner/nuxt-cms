<template>
  <div
    v-if="loading"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
  >
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto" />
      <p class="mt-6 text-gray-600 font-medium">
        Chargement de l'article...
      </p>
    </div>
  </div>

  <div
    v-else-if="error"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100"
  >
    <div class="text-center">
      <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
        <div class="text-red-600 font-medium mb-2">
          Article introuvable
        </div>
        <p class="text-red-500 text-sm mb-4">
          {{ error }}
        </p>
        <NuxtLink
          to="/blog"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Retour au blog
        </NuxtLink>
      </div>
    </div>
  </div>

  <div v-else>
    <CmsHeader :site-title="article.title" />
    <NuxtLayout name="cms">
      <article class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <!-- Featured Image -->
        <div
          v-if="article.featured_image"
          class="relative h-96 overflow-hidden"
        >
          <img
            :src="article.featured_image"
            :alt="article.title"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-black bg-opacity-40" />
          <div class="absolute bottom-8 left-8 right-8 text-white">
            <div class="max-w-4xl mx-auto">
              <span class="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-white bg-opacity-20 backdrop-blur-sm mb-4">
                {{ article.category }}
              </span>
              <h1 class="text-4xl md:text-5xl font-bold mb-4">
                {{ article.title }}
              </h1>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="max-w-4xl mx-auto px-8 py-12">
          <!-- Header (if no featured image) -->
          <header
            v-if="!article.featured_image"
            class="mb-12 text-center"
          >
            <span class="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 mb-6">
              {{ article.category }}
            </span>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {{ article.title }}
            </h1>
          </header>

          <!-- Article Meta -->
          <div class="flex flex-wrap items-center justify-between mb-8 pb-8 border-b border-gray-200">
            <div class="flex items-center space-x-6 text-sm text-gray-600">
              <div class="flex items-center">
                <svg
                  class="h-5 w-5 mr-2"
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
                Par {{ article.author }}
              </div>
              <div class="flex items-center">
                <svg
                  class="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ formatDate(article.created_at) }}
              </div>
              <div
                v-if="article.updated_at !== article.created_at"
                class="flex items-center"
              >
                <svg
                  class="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Mis à jour le {{ formatDate(article.updated_at) }}
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="flex items-center space-x-3">
              <span class="text-sm text-gray-600">Partager :</span>
              <button
                class="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                title="Partager sur Twitter"
                @click="shareOnTwitter"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button
                class="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                title="Partager sur Facebook"
                @click="shareOnFacebook"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                class="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                title="Partager sur LinkedIn"
                @click="shareOnLinkedIn"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Excerpt -->
          <div
            v-if="article.excerpt"
            class="mb-8"
          >
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <p class="text-lg text-gray-700 italic leading-relaxed">
                {{ article.excerpt }}
              </p>
            </div>
          </div>

          <!-- Article Content -->
          <div class="prose prose-lg max-w-none">
            <div
              class="text-gray-800 leading-relaxed"
              v-html="formattedContent"
            />
          </div>

          <!-- Tags -->
          <div
            v-if="article.tags && article.tags.length > 0"
            class="mt-12 pt-8 border-t border-gray-200"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Tags
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Navigation -->
          <div class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <NuxtLink
                to="/nuxt-cms/blog"
                class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <svg
                  class="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Retour au blog
              </NuxtLink>

              <div class="text-sm text-gray-500">
                Article {{ article.id }}
              </div>
            </div>
          </div>
        </div>
      </article>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const { getArticle } = useBlog()

// Reactive data
const loading = ref(true)
const error = ref('')
const article = ref({})

// Computed
const formattedContent = computed(() => {
  if (!article.value.content) return ''

  // Convert line breaks to HTML paragraphs
  return article.value.content
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
})

// Methods
const loadArticle = async () => {
  try {
    const slug = route.params.slug
    if (!slug) {
      throw new Error('Slug de l\'article manquant')
    }

    // Find article by slug - we'll need to get all articles and find by slug
    // since our API currently gets by ID
    const response = await $fetch('/api/nuxt-cms/blog', {
      params: { status: 'published' },
    })

    const foundArticle = response.articles.find(a => a.slug === slug)

    if (!foundArticle) {
      throw new Error('Article introuvable')
    }

    article.value = foundArticle

    // Update SEO meta
    useSeoMeta({
      title: article.value.title,
      ogTitle: article.value.title,
      description: article.value.meta_description || article.value.excerpt || article.value.content.substring(0, 160),
      ogDescription: article.value.meta_description || article.value.excerpt || article.value.content.substring(0, 160),
      ogImage: article.value.featured_image,
      keywords: article.value.meta_keywords,
    })
  }
  catch (err) {
    error.value = err.message || 'Erreur lors du chargement de l\'article'
  }
  finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(article.value.title)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank')
}

// Lifecycle
onMounted(async () => {
  await loadArticle()
})
</script>

<style scoped>
.prose {
  line-height: 1.75;
}

.prose p {
  margin-bottom: 1.25em;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  font-weight: 600;
  margin-top: 2em;
  margin-bottom: 1em;
}

.prose h1 { font-size: 2.25em; }
.prose h2 { font-size: 1.875em; }
.prose h3 { font-size: 1.5em; }
.prose h4 { font-size: 1.25em; }

.prose ul, .prose ol {
  margin: 1.25em 0;
  padding-left: 1.5em;
}

.prose li {
  margin: 0.5em 0;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1.5em 0;
  font-style: italic;
  color: #6b7280;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-size: 0.875em;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 1.5em 0;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}
</style>
