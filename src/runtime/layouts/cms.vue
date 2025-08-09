<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header avec navigation dynamique -->
    <CmsHeader :site-title="siteConfig.title" />

    <!-- Contenu principal -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer optionnel -->
    <footer class="bg-gray-800 text-white py-8 mt-auto">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {{ currentYear }} {{ siteConfig.title }}. Tous droits réservés.</p>
        <p class="text-gray-400 text-sm mt-2">
          Propulsé par Nuxt CMS Module
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Configuration du site (peut être étendue avec un composable dédié)
const siteConfig = ref({
  title: 'Mon Site CMS',
  description: 'Site web géré par Nuxt CMS',
})

// Année actuelle pour le footer
const currentYear = new Date().getFullYear()

// Optionnel : charger la configuration depuis un fichier ou API
onMounted(async () => {
  try {
    // Ici vous pourriez charger la config depuis une API ou un fichier
    // const config = await $fetch('/api/config')
    // siteConfig.value = { ...siteConfig.value, ...config }
  }
  catch (err) {
    console.warn('Impossible de charger la configuration du site:', err)
  }
})
</script>

<style scoped>
/* Assurer que le layout prend toute la hauteur */
div {
  display: flex;
  flex-direction: column;
}
</style>
