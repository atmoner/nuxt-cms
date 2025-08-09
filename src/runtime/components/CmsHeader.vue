<template>
  <header class="bg-white shadow-md border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Titre du site -->
        <div class="flex items-center">
          <NuxtLink
            to="/"
            class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            {{ siteTitle }}
          </NuxtLink>
        </div>

        <!-- Navigation principale -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Accueil
          </NuxtLink>

          <!-- Pages dynamiques depuis la BDD -->
          <template v-if="!loading && pages.length > 0">
            <NuxtLink
              v-for="page in publishedPages"
              :key="page.id"
              :to="`/${page.slug}`"
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {{ page.title }}
            </NuxtLink>
          </template>

          <!-- Blog -->
          <NuxtLink
            to="/blog"
            class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Blog
          </NuxtLink>

          <!-- Loader pour les pages -->
          <div
            v-if="loading"
            class="flex items-center space-x-2"
          >
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
            <span class="text-gray-500 text-sm">Chargement...</span>
          </div>
        </nav>

        <!-- Menu mobile (hamburger) -->
        <div class="md:hidden">
          <button
            class="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
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
        class="md:hidden border-t border-gray-200 py-4 space-y-2"
      >
        <NuxtLink
          to="/"
          class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
          @click="closeMobileMenu"
        >
          Accueil
        </NuxtLink>

        <!-- Pages dynamiques pour mobile -->
        <template v-if="!loading && pages.length > 0">
          <NuxtLink
            v-for="page in publishedPages"
            :key="page.id"
            :to="`/${page.slug}`"
            class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
            @click="closeMobileMenu"
          >
            {{ page.title }}
          </NuxtLink>
        </template>

        <!-- Blog pour mobile -->
        <NuxtLink
          to="/nuxt-cms/blog"
          class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
          @click="closeMobileMenu"
        >
          Blog
        </NuxtLink>

        <!-- Message d'erreur si problème de chargement -->
        <div
          v-if="error"
          class="px-4 py-2 text-red-600 text-sm"
        >
          Erreur lors du chargement des pages
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Importer le composable usePages pour les pages récentes seulement
import { computed, onMounted, ref } from 'vue'
import { usePages } from '../composables/usePages'

// Props
defineProps({
  siteTitle: {
    type: String,
    default: 'Mon Site CMS',
  },
})

// Composable pour gérer les pages
const { pages, loading, error, fetchPages } = usePages()

// État du menu mobile
const mobileMenuOpen = ref(false)

// Pages publiées seulement
const publishedPages = computed(() => {
  return pages.value.filter(page => page.status === 'published')
})

// Fonctions pour le menu mobile
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Charger les pages au montage du composant
onMounted(async () => {
  try {
    await fetchPages()
  }
  catch (err) {
    console.error('Erreur lors du chargement des pages:', err)
  }
})

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
/* Transitions pour le menu mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
