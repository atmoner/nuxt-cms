<template>
  <div
    v-if="loading"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50"
  >
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto" />
      <p class="mt-6 text-gray-600 font-medium">
        Chargement...
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
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Modifier la page
            </h1>
            <p class="mt-2 text-gray-600">
              Modifiez les informations de votre page
            </p>
          </div>
          <div class="flex space-x-3">
            <NuxtLink
              to="/nuxt-cms/admin/pages"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour à la liste
            </NuxtLink>
            <button
              :disabled="deleteLoading"
              class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              @click="deletePage"
            >
              <svg
                v-if="deleteLoading"
                class="animate-spin h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {{ deleteLoading ? 'Suppression...' : 'Supprimer' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Formulaire -->
      <div class="bg-white rounded-lg shadow-md">
        <form
          class="p-6 space-y-6"
          @submit.prevent="submitForm"
        >
          <!-- Titre -->
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Titre <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Entrez le titre de la page"
              @input="generateSlug"
            >
          </div>

          <!-- Slug -->
          <div>
            <label
              for="slug"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Slug (URL) <span class="text-red-500">*</span>
            </label>
            <div class="flex">
              <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                /page/
              </span>
              <input
                id="slug"
                v-model="form.slug"
                type="text"
                required
                class="flex-1 block w-full border-gray-300 rounded-none rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="url-de-la-page"
              >
            </div>
            <p class="mt-1 text-sm text-gray-500">
              L'URL sera : /page/{{ form.slug }}
            </p>
          </div>

          <!-- Statut -->
          <div>
            <label
              for="status"
              class="block text-sm font-medium text-gray-700 mb-2"
            >Statut</label>
            <select
              id="status"
              v-model="form.status"
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="published">
                Publié
              </option>
              <option value="draft">
                Brouillon
              </option>
            </select>
          </div>

          <!-- Contenu -->
          <div>
            <label
              for="content"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Contenu <span class="text-red-500">*</span>
            </label>

            <!-- Zone de drag and drop -->
            <div
              :class="[
                'mb-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50',
              ]"
              @drop="handleDrop"
              @dragover.prevent
              @dragenter.prevent
              @dragenter="isDragging = true"
              @dragleave="isDragging = false"
            >
              <div class="space-y-2">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="text-sm text-gray-600">
                  <p><strong>Glissez et déposez des éléments ici</strong></p>
                  <p>ou utilisez les boutons ci-dessous pour insérer des éléments</p>
                </div>
              </div>
            </div>

            <!-- Boutons d'insertion d'éléments -->
            <div class="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                @click="insertElement('image')"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Image
              </button>
              <button
                type="button"
                class="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                @click="insertElement('video')"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Vidéo
              </button>
              <button
                type="button"
                class="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                @click="insertElement('link')"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Lien
              </button>
              <button
                type="button"
                class="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                @click="insertElement('table')"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1z"
                  />
                </svg>
                Tableau
              </button>
              <button
                type="button"
                class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                @click="insertElement('code')"
              >
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Code
              </button>
            </div>

            <textarea
              id="content"
              ref="contentTextarea"
              v-model="form.content"
              rows="12"
              required
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Rédigez le contenu de votre page en Markdown..."
            />
            <p class="mt-1 text-sm text-gray-500">
              Vous pouvez utiliser la syntaxe Markdown pour formater votre contenu.
            </p>
          </div>

          <!-- SEO Section -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Référencement (SEO)
            </h3>

            <!-- Description META -->
            <div class="mb-4">
              <label
                for="meta_description"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Description META
              </label>
              <textarea
                id="meta_description"
                v-model="form.meta_description"
                rows="3"
                maxlength="160"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Description courte de la page (recommandé : 150-160 caractères)"
              />
              <p class="mt-1 text-sm text-gray-500">
                {{ form.meta_description.length }}/160 caractères
              </p>
            </div>

            <!-- Mots-clés META -->
            <div>
              <label
                for="meta_keywords"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Mots-clés META
              </label>
              <input
                id="meta_keywords"
                v-model="form.meta_keywords"
                type="text"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="mot-clé1, mot-clé2, mot-clé3"
              >
              <p class="mt-1 text-sm text-gray-500">
                Séparez les mots-clés par des virgules
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <NuxtLink
              to="/nuxt-cms/admin/pages"
              class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Annuler
            </NuxtLink>
            <button
              type="submit"
              :disabled="formLoading"
              class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <svg
                v-if="formLoading"
                class="animate-spin h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {{ formLoading ? 'Modification...' : 'Modifier la page' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const { user, logout, verifyToken } = useAuth()
const route = useRoute()
const loading = ref(true)
const formLoading = ref(false)
const deleteLoading = ref(false)
const isDragging = ref(false)
const contentTextarea = ref(null)

// Récupération de l'ID depuis l'URL avec gestion du format
const pageId = computed(() => {
  // L'id peut être dans différents paramètres selon la route
  return route.query.id || route.params.id || null
})

// Formulaire
const form = ref({
  title: '',
  slug: '',
  content: '',
  meta_description: '',
  meta_keywords: '',
  status: 'published',
})


onMounted(async () => {
  await checkAuth()
  if (!loading.value && pageId.value) {
    await loadPage()
  }
  else if (!pageId.value) {
    alert('ID de page manquant')
    await navigateTo('/nuxt-cms/admin/pages')
  }

  // Empêcher le comportement par défaut du drag and drop sur toute la page
  document.addEventListener('dragover', e => e.preventDefault())
  document.addEventListener('drop', e => e.preventDefault())
})

onUnmounted(() => {
  // Nettoyer les event listeners
  document.removeEventListener('dragover', e => e.preventDefault())
  document.removeEventListener('drop', e => e.preventDefault())
})

const checkAuth = async () => {
  const isValid = await verifyToken()

  if (!isValid) {
    await navigateTo('/nuxt-cms/admin/login')
    return
  }

  loading.value = false
}

const loadPage = async () => {
  try {
    const articleId = route.query.id
    console.log('Chargement de la page avec ID:', articleId)
    if (!articleId) {
      throw new Error('ID de l\'article manquant')
    }

    const page = await $fetch(`/api/nuxt-cms/pages/${articleId}`, {
      method: 'GET',
    })

    if (page && page.id) {
      form.value = {
        title: page.title,
        slug: page.slug,
        content: page.content,
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
        status: page.status,
      }
    }
    else {
      throw new Error('Page non trouvée')
    }
  }
  catch (error) {
    console.error('Erreur lors du chargement:', error)
    alert('Erreur lors du chargement de la page')
    await navigateTo('/nuxt-cms/admin/pages')
  }
}

const generateSlug = () => {
  if (form.value.title) {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
}

const submitForm = async () => {
  formLoading.value = true

  try {
    const response = await $fetch(`/api/nuxt-cms/pages/${pageId.value}`, {
      method: 'PUT',
      body: form.value,
    })

    if (response && response.id) {
      // Afficher un message de succès
      await navigateTo('/nuxt-cms/admin/pages')
    }
    else {
      throw new Error('Erreur lors de la modification')
    }
  }
  catch (error) {
    console.error('Erreur lors de la modification:', error)
    alert('Erreur lors de la modification de la page: ' + error.message)
  }
  finally {
    formLoading.value = false
  }
}

const deletePage = async () => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ? Cette action est irréversible.')) {
    return
  }

  deleteLoading.value = true

  try {
    const response = await $fetch(`/api/nuxt-cms/pages/${pageId.value}`, {
      method: 'DELETE',
    })

    if (response && response.message) {
      await navigateTo('/nuxt-cms/admin/pages')
    }
    else {
      throw new Error('Erreur lors de la suppression')
    }
  }
  catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert('Erreur lors de la suppression de la page: ' + error.message)
  }
  finally {
    deleteLoading.value = false
  }
}

// Gestion du drag and drop
const handleDrop = async (event) => {
  event.preventDefault()
  isDragging.value = false

  const files = Array.from(event.dataTransfer.files)
  const text = event.dataTransfer.getData('text/plain')

  if (files.length > 0) {
    // Gérer les fichiers déposés
    for (const file of files) {
      await handleFileUpload(file)
    }
  }
  else if (text) {
    // Gérer le texte déposé (URLs, etc.)
    handleTextDrop(text)
  }
}

const handleFileUpload = async (file) => {
  try {
    // Pour cet exemple, nous générons un markdown basé sur le type de fichier
    let markdown = ''

    if (file.type.startsWith('image/')) {
      // Pour les images
      const fileName = file.name
      markdown = `![${fileName}](/uploads/images/${fileName})\n\n`

      // Vous pourriez ici uploader le fichier vers votre serveur
      console.log('Image à uploader:', file)
    }
    else if (file.type.startsWith('video/')) {
      // Pour les vidéos
      const fileName = file.name
      markdown = `<video controls>\n  <source src="/uploads/videos/${fileName}" type="${file.type}">\n  Votre navigateur ne supporte pas la balise vidéo.\n</video>\n\n`

      console.log('Vidéo à uploader:', file)
    }
    else {
      // Pour les autres fichiers
      const fileName = file.name
      markdown = `[📎 ${fileName}](/uploads/files/${fileName})\n\n`

      console.log('Fichier à uploader:', file)
    }

    insertAtCursor(markdown)

    // Afficher un message d'information
    alert(`Fichier "${file.name}" ajouté au contenu. N'oubliez pas d'uploader le fichier sur votre serveur.`)
  }
  catch (error) {
    console.error('Erreur lors du traitement du fichier:', error)
    alert('Erreur lors du traitement du fichier')
  }
}

const handleTextDrop = (text) => {
  // Vérifier si c'est une URL
  if (text.startsWith('http://') || text.startsWith('https://')) {
    // Détecter le type d'URL
    if (text.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      // Image
      const markdown = `![Image](${text})\n\n`
      insertAtCursor(markdown)
    }
    else if (text.match(/\.(mp4|webm|ogg)$/i)) {
      // Vidéo
      const markdown = `<video controls>\n  <source src="${text}">\n  Votre navigateur ne supporte pas la balise vidéo.\n</video>\n\n`
      insertAtCursor(markdown)
    }
    else if (text.includes('youtube.com') || text.includes('youtu.be')) {
      // Vidéo YouTube
      const videoId = extractYouTubeId(text)
      if (videoId) {
        const markdown = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>\n\n`
        insertAtCursor(markdown)
      }
    }
    else {
      // Lien normal
      const markdown = `[${text}](${text})\n\n`
      insertAtCursor(markdown)
    }
  }
  else {
    // Texte simple
    insertAtCursor(text + '\n\n')
  }
}

const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

const insertElement = (type) => {
  let markdown = ''

  switch (type) {
    case 'image':
      markdown = '![Description de l\'image](url-de-l-image.jpg)\n\n'
      break
    case 'video':
      markdown = '<video controls>\n  <source src="url-de-la-video.mp4" type="video/mp4">\n  Votre navigateur ne supporte pas la balise vidéo.\n</video>\n\n'
      break
    case 'link':
      markdown = '[Texte du lien](https://exemple.com)\n\n'
      break
    case 'table':
      markdown = '| Colonne 1 | Colonne 2 | Colonne 3 |\n|-----------|-----------|----------|\n| Cellule 1 | Cellule 2 | Cellule 3 |\n| Cellule 4 | Cellule 5 | Cellule 6 |\n\n'
      break
    case 'code':
      markdown = '```javascript\n// Votre code ici\nconsole.log("Hello World!");\n```\n\n'
      break
  }

  insertAtCursor(markdown)
}

const insertAtCursor = (text) => {
  if (contentTextarea.value) {
    const textarea = contentTextarea.value
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // Insérer le texte à la position du curseur
    const currentValue = form.value.content
    form.value.content = currentValue.substring(0, start) + text + currentValue.substring(end)

    // Repositionner le curseur après le texte inséré
    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    })
  }
  else {
    // Si pas de référence au textarea, ajouter à la fin
    form.value.content += text
  }
}
</script>
