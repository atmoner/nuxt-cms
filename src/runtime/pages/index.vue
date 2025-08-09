<template>
  <CmsHeader site-title="Mon Site CMS" />
  <NuxtLayout name="cms">
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto p-8">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-5xl font-bold text-gray-800 mb-6">
            Bienvenue sur votre site CMS
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre site web est maintenant opérationnel avec le module Nuxt CMS.
            Créez, gérez et publiez votre contenu en toute simplicité.
          </p>
        </div>

        <div class="max-w-6xl mx-auto">
          <!-- Aperçu des pages récentes -->
          <div class="mb-16">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">
              Contenu récent
            </h2>

            <div
              v-if="loading"
              class="flex justify-center py-12"
            >
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>

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
              </div>
            </div>

            <div
              v-else-if="recentPages.length > 0"
              class="grid md:grid-cols-2 gap-8"
            >
              <div
                v-for="page in recentPages"
                :key="page.id"
                class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="p-6">
                  <h3 class="text-xl font-bold mb-3">
                    <NuxtLink
                      :to="`/${page.slug}`"
                      class="text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {{ page.title }}
                    </NuxtLink>
                  </h3>

                  <p class="text-gray-600 mb-4 line-clamp-3">
                    {{ truncateContent(page.content) }}
                  </p>

                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">{{ formatDate(page.updated_at) }}</span>
                    <NuxtLink
                      :to="`/${page.slug}`"
                      class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Lire la suite
                      <svg
                        class="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
              </div>
            </div>

            <div
              v-else
              class="text-center py-12"
            >
              <div class="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
                <svg
                  class="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  Aucune page publiée
                </h3>
                <p class="text-gray-500">
                  Commencez par créer votre première page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Importer le composable usePages pour les pages récentes seulement
import { computed, onMounted } from 'vue'
import { usePages } from '../composables/usePages'

// Utiliser le composable pour récupérer les pages (pour les pages récentes)
const { pages, loading, error, fetchPages } = usePages()

// Pages récentes (limitées à 4)
const recentPages = computed(() => {
  return pages.value
    .filter(page => page.status === 'published')
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 4)
})

// Total des pages publiées
const totalPages = computed(() => {
  return pages.value.filter(page => page.status === 'published').length
})

// Fonctions utilitaires
const truncateContent = (content) => {
  if (!content) return ''
  const plainText = content.replace(/[#*\-•]/g, '').trim()
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Charger les pages au montage
onMounted(async () => {
  try {
    await fetchPages()
  }
  catch (err) {
    console.error('Erreur lors du chargement des pages:', err)
  }
})
</script>
