<template>
  <CmsHeader site-title="Mon Site CMS" />
  <NuxtLayout name="cms">
    <div
      v-if="loading"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto" />
        <p class="mt-6 text-gray-600 font-medium">
          Chargement de la page...
        </p>
      </div>
    </div>

    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <h1 class="text-4xl font-bold text-red-600 mb-4">
          Page non trouvée
        </h1>
        <p class="text-gray-600 mb-6">
          {{ error }}
        </p>
        <NuxtLink
          to="/"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md"
        >
          Retour à l'accueil
        </NuxtLink>
      </div>
    </div>

    <div v-else>
      <!-- Content -->
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article class="bg-white rounded-lg shadow-sm overflow-hidden">
 

          <!-- Page Components (from admin configuration) -->
          <div v-if="pageComponents && pageComponents.length > 0" class="px-6 py-8">
            <div class="space-y-10">
              <div
                v-for="(component, index) in pageComponents"
                :key="component.id || index"  
              >
                <!-- Dynamic component rendering based on component type -->
                <Card v-if="component.component === 'Card'" :config="component.config" />
                <HeroSection v-else-if="component.component === 'HeroSection'" :config="component.config" />
                <Pricing v-else-if="component.component === 'Pricing'" :config="component.config" />
                <Faq v-else-if="component.component === 'Faq'" :config="component.config" />
                <TeamSection v-else-if="component.component === 'TeamSection'" :config="component.config" />
                <ContactForm v-else-if="component.component === 'ContactForm'" :config="component.config" />
                <!-- Fallback for unknown component types -->
                <div v-else class="p-4 bg-gray-100 rounded-md">
                  <p class="text-gray-600">Composant non reconnu: {{ component.component }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Page Content (traditional text content) -->
<!--           <div v-if="page.content" class="px-6 py-8 border-t border-gray-200">
            <div class="prose prose-lg max-w-none">
              <div v-html="formatContent(page.content)" />
            </div>
          </div>
 
          <div v-if="!page.content && (!pageComponents || pageComponents.length === 0)" class="px-6 py-8 text-center text-gray-500">
            <p>Cette page n'a pas encore de contenu.</p>
          </div> -->
        </article>

        <!-- Navigation -->
        <div class="mt-8 flex justify-between">
          <NuxtLink
            to="/"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg
              class="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l'accueil
          </NuxtLink>
        </div>
      </main>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const slug = route.params.slug

const loading = ref(true)
const error = ref(null)
const page = ref(null)
const pageComponents = ref([])

// SEO
useHead({
  title: computed(() => page.value?.title || 'Page'),
  meta: [
    {
      name: 'description',
      content: computed(() => page.value?.meta_description || ''),
    },
    {
      name: 'keywords',
      content: computed(() => page.value?.meta_keywords || ''),
    },
  ],
})

onMounted(async () => {
  await loadPage()
})

const loadPage = async () => {
  loading.value = true
  error.value = null

  try {
    // Charger toutes les pages et trouver celle avec le bon slug
    const pages = await $fetch('/api/nuxt-cms/pages')
    const foundPage = pages.find(p => p.slug === slug && p.status === 'published')

    if (!foundPage) {
      error.value = 'Cette page n\'existe pas ou n\'est pas publiée.'
      return
    }

    page.value = foundPage

    // Charger les composants de la page si elle en a
    if (foundPage.id) {
      try {
        const componentsResponse = await $fetch(`/api/nuxt-cms/pages/${foundPage.id}/components`)
        pageComponents.value = componentsResponse.components || []
      } catch (err) {
        console.log('Aucun composant trouvé pour cette page:', err)
        pageComponents.value = []
      }
    }
  }
  catch (err) {
    console.error('Erreur lors du chargement de la page:', err)
    error.value = 'Erreur lors du chargement de la page.'
  }
  finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const formatContent = (content) => {
  // Convertir les retours à la ligne en paragraphes HTML simples
  return content
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
}
</script>

<style scoped>
.prose {
  color: #1f2937;
  line-height: 1.625;
}

.prose p {
  margin-bottom: 1rem;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  font-weight: 700;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h1 { font-size: 1.875rem; }
.prose h2 { font-size: 1.5rem; }
.prose h3 { font-size: 1.25rem; }
.prose h4 { font-size: 1.125rem; }

.prose ul,
.prose ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose a {
  color: #4f46e5;
  text-decoration: underline;
}

.prose a:hover {
  color: #3730a3;
}

.prose strong {
  font-weight: 600;
}

.prose em {
  font-style: italic;
}

.component-wrapper {
  width: 100%;
}

/* Override component margins for better page flow */
.component-wrapper :deep(.bg-white) {
  background-color: transparent;
}

.component-wrapper :deep(.py-24) {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

@media (min-width: 640px) {
  .component-wrapper :deep(.sm\\:py-32) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}
</style>
