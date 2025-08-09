<template>
  <header class="bg-gray-900 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Titre d'administration -->
        <div class="flex items-center">
          <NuxtLink
            to="/nuxt-cms/admin"
            class="text-xl font-bold text-white hover:text-gray-300 transition-colors"
          >
            {{ siteTitle }} - Admin
          </NuxtLink>
        </div>

        <!-- Navigation d'administration -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink
            to="/nuxt-cms/admin"
            class="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Tableau de bord
          </NuxtLink>

          <NuxtLink
            to="/nuxt-cms/admin/pages"
            class="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Gérer les pages
          </NuxtLink>

          <NuxtLink
            to="/"
            class="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Voir le site
          </NuxtLink>

          <!-- Bouton de déconnexion -->
          <button
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            @click="handleLogout"
          >
            Déconnexion
          </button>
        </nav>

        <!-- Menu mobile (hamburger) -->
        <div class="md:hidden">
          <button
            class="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            @click="toggleMobileMenu"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile déroulant -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden border-t border-gray-700 py-4 space-y-2"
      >
        <NuxtLink
          to="/nuxt-cms/admin"
          class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors font-medium"
          @click="closeMobileMenu"
        >
          Tableau de bord
        </NuxtLink>

        <NuxtLink
          to="/nuxt-cms/admin/pages"
          class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors font-medium"
          @click="closeMobileMenu"
        >
          Gérer les pages
        </NuxtLink>

        <NuxtLink
          to="/"
          class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors font-medium"
          @click="closeMobileMenu"
        >
          Voir le site
        </NuxtLink>

        <button
          class="block w-full text-left px-4 py-2 text-red-300 hover:text-red-200 hover:bg-gray-800 transition-colors font-medium"
          @click="handleLogout"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
// Importer le composable usePages pour les pages récentes seulement
import { onMounted } from 'vue'
// Props
defineProps({
  siteTitle: {
    type: String,
    default: 'CMS',
  },
})

// État du menu mobile
const mobileMenuOpen = ref(false)

// Fonctions pour le menu mobile
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Fonction de déconnexion
const handleLogout = async () => {
  try {
    // Appel à l'API de déconnexion
    await $fetch('/api/auth/logout', { method: 'POST' })

    // Redirection vers la page de connexion
    await navigateTo('/nuxt-cms/admin/login')
  }
  catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    // Redirection même en cas d'erreur
    await navigateTo('/nuxt-cms/admin/login')
  }
}

// Fermer le menu mobile si on redimensionne la fenêtre
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) { // md breakpoint
      mobileMenuOpen.value = false
    }
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
/* Assurer la consistance visuelle */
.router-link-active {
  @apply text-white font-semibold;
}
</style>
