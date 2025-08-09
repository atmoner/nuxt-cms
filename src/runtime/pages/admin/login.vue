<template>
  <main
    id="content"
    role="main"
    class="w-full max-w-md mx-auto p-6"
  >
    <div class="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
            Administration CMS
          </h1>
          <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Connectez-vous à votre compte administrateur
          </p>
        </div>

        <div class="mt-5">
          <form @submit.prevent="handleLogin">
            <div class="grid gap-y-4">
              <div>
                <label
                  for="username"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >Nom d'utilisateur</label>
                <div class="relative">
                  <input
                    id="username"
                    v-model="loginForm.username"
                    name="username"
                    type="text"
                    required
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    placeholder="Nom d'utilisateur"
                  >
                </div>
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >Mot de passe</label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="loginForm.password"
                    name="password"
                    type="password"
                    required
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    placeholder="Mot de passe"
                  >
                </div>
              </div>

              <!-- Messages d'erreur -->
              <div
                v-if="error"
                class="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md text-sm"
              >
                {{ error }}
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  v-if="loading"
                  class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                />
                {{ loading ? 'Connexion...' : 'Se connecter' }}
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
import { ref, onMounted } from 'vue'
import { verifyToken, login } from '#auth'

// Vérifier si l'utilisateur est déjà connecté
onMounted(async () => {
  if (await verifyToken()) {
    await navigateTo('/nuxt-cms/admin')
  }
})

const loginForm = ref({
  username: 'admin',
  password: '',
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await login(loginForm.value.username, loginForm.value.password)

    if (result.success) {
      await navigateTo('/nuxt-cms/admin')
    }
    else {
      error.value = result.error || 'Erreur de connexion'
    }
  }
  catch (err) {
    error.value = 'Erreur de connexion. Veuillez réessayer.'
  }
  finally {
    loading.value = false
  }
}
</script>
