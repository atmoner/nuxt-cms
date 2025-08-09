<template>
  <div
    class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-6xl"
  >
    <div class="md:flex">
      <div class="md:shrink-0">
        <img
          class="h-48 w-full object-cover md:h-full md:w-48"
          :src="config.imageUrl"
          :alt="config.imageAlt"
        />
      </div>
      <div class="p-8">
        <div
          class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"
        >
          {{ config.category }}
        </div>
        <a
          :href="config.link"
          class="mt-1 block text-lg leading-tight font-medium text-black hover:underline"
          >{{ config.title }}
        </a>
        <p class="mt-2 text-slate-500">
          {{ config.description }}
        </p>
        <a
          v-if="config.buttonText"
          :href="config.link"
          class="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {{ config.buttonText }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CardConfig {
  id?: string
  imageUrl?: string
  imageAlt?: string
  category?: string
  title?: string
  description?: string
  link?: string
  buttonText?: string
}

interface Props {
  config?: CardConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    id: Math.random().toString(36).substr(2, 9),
    imageUrl: 'https://picsum.photos/400/300',
    imageAlt: 'Card image',
    category: 'Catégorie',
    title: 'Titre de la carte',
    description: 'Description de la carte',
    link: '#',
    buttonText: 'En savoir plus'
  })
})
</script>
