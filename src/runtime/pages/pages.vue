<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header réutilisable -->
    <CmsHeader site-title="Mon Site CMS" />

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Toutes les pages
        </h1>
        <p class="text-xl text-gray-600">
          Découvrez tout le contenu disponible sur notre site
        </p>
      </div>

      <div
        v-if="loading"
        class="text-center py-12"
      >
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto" />
        <p class="mt-6 text-gray-600 font-medium">
          Chargement des pages...
        </p>
      </div>

      <div
        v-else-if="publishedPages.length === 0"
        class="text-center py-12"
      >
        <svg
          class="h-24 w-24 mx-auto mb-6 text-gray-400"
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
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Aucune page disponible
        </h2>
        <p class="text-gray-600">
          Il n'y a actuellement aucune page publiée sur ce site.
        </p>
      </div>

      <div
        v-else
        class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="page in publishedPages"
          :key="page.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                Publié
              </span>
              <time class="text-sm text-gray-500">
                {{ formatDate(page.created_at) }}
              </time>
            </div>

            <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              <NuxtLink
                :to="`/nuxt-cms/page/${page.slug}`"
                class="hover:text-indigo-600 transition-colors"
              >
                {{ page.title }}
              </NuxtLink>
            </h2>

            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ getExcerpt(page.content) }}
            </p>

            <div class="flex items-center justify-between">
              <NuxtLink
                :to="`/nuxt-cms/page/${page.slug}`"
                class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
              >
                Lire la suite
                <svg
                  class="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </NuxtLink>

              <div
                v-if="page.updated_at !== page.created_at"
                class="text-xs text-gray-400"
              >
                Modifié le {{ formatDate(page.updated_at) }}
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination placeholder -->
      <div
        v-if="publishedPages.length > 0"
        class="mt-12 text-center"
      >
        <p class="text-gray-600">
          {{ publishedPages.length }} page(s) trouvée(s)
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
const loading = ref(true)
const pages = ref([])

// SEO
useHead({
  title: 'Toutes les pages - Mon Site',
  meta: [
    {
      name: 'description',
      content: 'Découvrez toutes les pages disponibles sur notre site.',
    },
  ],
})

onMounted(async () => {
  await loadPages()
})

const loadPages = async () => {
  loading.value = true

  try {
    const data = await $fetch('/api/pages')
    pages.value = data || []
  }
  catch (error) {
    console.error('Erreur lors du chargement des pages:', error)
    pages.value = []
  }
  finally {
    loading.value = false
  }
}

// Pages publiées uniquement, triées par date de création (plus récentes en premier)
const publishedPages = computed(() => {
  return pages.value
    .filter(page => page.status === 'published')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const getExcerpt = (content, maxLength = 150) => {
  if (!content) return ''

  // Supprimer les balises HTML et les retours à la ligne
  const plainText = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')

  if (plainText.length <= maxLength) {
    return plainText
  }

  return plainText.substring(0, maxLength).trim() + '...'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
