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
    class="min-h-screen bg-gray-50"
  >
    <!-- Header d'administration -->
    <AdminHeader site-title="Mon Site CMS" />

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Gestion des Pages
        </h1>
        <p class="mt-2 text-gray-600">
          Créez et gérez les pages de votre site
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500">{{ pages.length }} page(s) au total</span>
        </div>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
          @click="showModal = true; modalMode = 'create'; resetForm()"
        >
          <svg
            class="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Nouvelle page
        </button>
      </div>

      <!-- Pages List -->
      <div
        v-if="pagesLoading"
        class="text-center py-12"
      >
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto" />
        <p class="mt-4 text-gray-600">
          Chargement des pages...
        </p>
      </div>

      <div
        v-else-if="pages.length === 0"
        class="text-center py-12 bg-white rounded-lg shadow"
      >
        <svg
          class="h-16 w-16 mx-auto text-gray-400 mb-4"
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
          Aucune page créée
        </h3>
        <p class="text-gray-600 mb-6">
          Commencez par créer votre première page
        </p>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
          @click="showModal = true; modalMode = 'create'; resetForm()"
        >
          Créer ma première page
        </button>
      </div>

      <div
        v-else
        class="bg-white shadow rounded-lg overflow-hidden"
      >
        <ul class="divide-y divide-gray-200">
          <li
            v-for="page in pages"
            :key="page.id"
            class="p-6 hover:bg-gray-50"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ page.title }}
                  </h3>
                  <span
                    :class="page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ page.status === 'published' ? 'Publié' : 'Brouillon' }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">
                  <span class="font-medium">Slug:</span> {{ page.slug }}
                </p>
                <p class="text-xs text-gray-500 mt-2">
                  Créé le {{ formatDate(page.created_at) }} -
                  Modifié le {{ formatDate(page.updated_at) }}
                </p>
              </div>
              <div class="flex items-center space-x-3">
                <NuxtLink
                  :to="`/page/${page.slug}`"
                  target="_blank"
                  class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Voir
                </NuxtLink>
                <button
                  class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  @click="editPage(page)"
                >
                  Modifier
                </button>
                <button
                  class="text-red-600 hover:text-red-900 text-sm font-medium"
                  @click="deletePage(page.id)"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ modalMode === 'create' ? 'Créer une nouvelle page' : 'Modifier la page' }}
            </h3>

            <form
              class="space-y-4"
              @submit.prevent="savePage"
            >
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Titre de la page
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Entrez le titre de la page"
                >
              </div>

              <div>
                <label
                  for="slug"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Slug (URL)
                </label>
                <input
                  id="slug"
                  v-model="form.slug"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="url-de-la-page"
                >
              </div>

              <div>
                <label
                  for="content"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contenu
                </label>
                <textarea
                  id="content"
                  v-model="form.content"
                  rows="8"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Entrez le contenu de la page (Markdown supporté)"
                />
              </div>

              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Statut
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="draft">
                    Brouillon
                  </option>
                  <option value="published">
                    Publié
                  </option>
                </select>
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  @click="showModal = false"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="formLoading"
                  class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {{ formLoading ? 'Sauvegarde...' : (modalMode === 'create' ? 'Créer' : 'Modifier') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { usePages } from '../../composables/usePages'

const { user, logout, verifyToken } = useAuth()
const { pages, loading: pagesLoading, error, fetchPages } = usePages()
const loading = ref(true)

// États pour la modal
const showModal = ref(false)
const modalMode = ref('create') // 'create' or 'edit'
const formLoading = ref(false)

// Formulaire
const form = ref({
  id: null,
  title: '',
  slug: '',
  content: '',
  status: 'draft',
})

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Vérification de l'authentification au montage
onMounted(async () => {
  await checkAuth()
  if (!loading.value) {
    await fetchPages()
  }
})

const checkAuth = async () => {
  const isValid = await verifyToken()

  if (!isValid) {
    await navigateTo('/nuxt-cms/admin/login')
    return
  }

  loading.value = false
}

// Gestion des pages
const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    slug: '',
    content: '',
    status: 'draft',
  }
}

const editPage = (page) => {
  form.value = {
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: page.content,
    status: page.status,
  }
  modalMode.value = 'edit'
  showModal.value = true
}

const savePage = async () => {
  formLoading.value = true

  try {
    if (modalMode.value === 'create') {
      await $fetch('/api/nuxt-cms/pages', {
        method: 'POST',
        body: {
          title: form.value.title,
          slug: form.value.slug,
          content: form.value.content,
          status: form.value.status,
        },
      })
    }
    else {
      await $fetch(`/api/nuxt-cms/pages/${form.value.id}`, {
        method: 'PUT',
        body: {
          title: form.value.title,
          slug: form.value.slug,
          content: form.value.content,
          status: form.value.status,
        },
      })
    }

    showModal.value = false
    await fetchPages()
  }
  catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde')
  }
  finally {
    formLoading.value = false
  }
}

const deletePage = async (pageId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) {
    return
  }

  try {
    await $fetch(`/api/nuxt-cms/pages/${pageId}`, {
      method: 'DELETE',
    })
    await fetchPages()
  }
  catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert('Erreur lors de la suppression')
  }
}

// Auto-génération du slug depuis le titre
watch(() => form.value.title, (newTitle) => {
  if (modalMode.value === 'create' && newTitle) {
    form.value.slug = newTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
})
</script>
