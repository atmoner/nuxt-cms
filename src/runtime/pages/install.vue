<template>
  <main
    id="content"
    role="main"
    class="w-full max-w-md mx-auto p-6"
  >
    <!-- Écran de chargement pendant la vérification -->
    <div
      v-if="checkingInstallation"
      class="mt-7 bg-white rounded-xl shadow-lg border-2 border-indigo-300"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4" />
          <h2 class="text-lg font-semibold text-gray-700">
            Vérification de l'installation...
          </h2>
          <p class="text-sm text-gray-500 mt-2">
            Veuillez patienter
          </p>
        </div>
      </div>
    </div>

    <!-- Message si déjà installé -->
    <div
      v-else-if="isAlreadyInstalled"
      class="mt-7 bg-yellow-50 border-2 border-yellow-300 rounded-xl shadow-lg"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4">
            <svg
              class="w-full h-full text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h1 class="block text-2xl font-bold text-yellow-800 mb-4">
            CMS déjà installé
          </h1>
          <p class="text-yellow-700 mb-6">
            Le CMS Nuxt est déjà installé et configuré sur ce système.
          </p>

          <div class="space-y-3">
            <button
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
              @click="goToAdmin"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              Accéder à l'administration
            </button>

            <button
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-red-300 font-semibold bg-white text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm"
              @click="forceReinstall"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Réinstaller (attention: efface les données)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire d'installation -->
    <div
      v-else
      class="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
            Install nuxt-cms
          </h1>
        </div>

        <div class="mt-5">
          <form @submit.prevent="handleSubmit">
            <div class="grid gap-y-4">
              <div>
                <label
                  for="domain"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >Domain URL</label>
                <div class="relative">
                  <input
                    id="domain"
                    v-model="form.domain"
                    type="url"
                    name="domain"
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    placeholder="https://example.com"
                  >
                </div>
              </div>

              <div>
                <label
                  for="admin_user"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >Admin User</label>
                <div class="relative">
                  <input
                    id="admin_user"
                    v-model="form.admin_user"
                    type="text"
                    name="admin_user"
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    placeholder="admin"
                  >
                </div>
              </div>

              <div>
                <label
                  for="admin_password"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >Admin Password</label>
                <div class="relative">
                  <input
                    id="admin_password"
                    v-model="form.admin_password"
                    type="password"
                    name="admin_password"
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                  >
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >Email</label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    placeholder="admin@example.com"
                  >
                </div>
              </div>

              <!-- Messages d'état -->
              <div
                v-if="message"
                :class="messageClass"
                class="p-3 rounded-md text-sm"
              >
                {{ message }}
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  v-if="isLoading"
                  class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                />
                {{ isLoading ? 'Installation en cours...' : 'Install CMS' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
      <a
        class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
        href="#"
        target="_blank"
      >
        <svg
          class="w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        View Github
      </a>
      <a
        class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
        href="#"
      >

        Contact us!
      </a>
    </p>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// État du formulaire
const form = ref({
  domain: '',
  admin_user: '',
  admin_password: '',
  email: '',
})

// État de l'interface
const isLoading = ref(false)
const message = ref('')
const isSuccess = ref(false)
const isAlreadyInstalled = ref(false)
const checkingInstallation = ref(true)

// Classes CSS pour les messages
const messageClass = computed(() => {
  return isSuccess.value
    ? 'bg-green-100 border border-green-400 text-green-700'
    : 'bg-red-100 border border-red-400 text-red-700'
})

// Vérifier si l'installation est déjà faite
const checkInstallationStatus = async () => {
  try {
    const response = await $fetch('/api/nuxt-cms/install', {
      method: 'GET',
    })

    isAlreadyInstalled.value = response.installed || false
  }
  catch (error) {
    // Si l'API retourne une erreur, on considère que ce n'est pas installé
    isAlreadyInstalled.value = false
    console.log('Vérification de l\'installation:', error.data?.message || 'Non installé')
  }
  finally {
    checkingInstallation.value = false
  }
}

// Navigation vers l'admin
const goToAdmin = () => {
  navigateTo('/nuxt-cms/admin')
}

// Forcer la réinstallation
const forceReinstall = () => {
  if (confirm('Êtes-vous sûr de vouloir réinstaller ? Cela effacera toutes les données existantes.')) {
    isAlreadyInstalled.value = false
  }
}

// Gestion de la soumission du formulaire
const handleSubmit = async () => {
  isLoading.value = true
  message.value = ''

  try {
    const response = await $fetch('/api/nuxt-cms/install', {
      method: 'POST',
      body: form.value,
    })

    if (response.success) {
      isSuccess.value = true
      message.value = response.message || 'Installation terminée avec succès !'

      // Optionnel : rediriger après succès
      setTimeout(() => {
        navigateTo('/nuxt-cms/admin')
      }, 2000)
    }
  }
  catch (error) {
    isSuccess.value = false
    message.value = error.data?.message || 'Erreur lors de l\'installation. Veuillez réessayer.'
  }
  finally {
    isLoading.value = false
  }
}

// Vérifier le statut au montage du composant
onMounted(() => {
  checkInstallationStatus()
})
</script>
