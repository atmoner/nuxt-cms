<template>
  <div
    class="relative mx-auto flex max-w-screen-xl flex-col items-center px-4 sm:px-6 md:flex-row"
  >
    <div class="flex items-center py-5 md:w-1/2 md:pt-10 md:pr-10 md:pb-20">
      <div class="text-left">
        <h2
          class="text-4xl leading-10 font-extrabold tracking-tight text-gray-800 sm:text-5xl sm:leading-none md:text-6xl"
        >
          {{ config.title || 'Hero Section' }}
        </h2>
        <p
          class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
        >
          {{ config.subtitle || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate dignissim augue.' }}
        </p>
        <div class="mt-5 sm:flex md:mt-8">
          <div class="rounded-md shadow">
            <a
              :href="config.buttonLink || '#'"
              class="focus:shadow-outline-blue flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-8 py-3 text-base leading-6 font-medium text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none md:px-10 md:py-4 md:text-lg"
            >
              {{ config.buttonText || 'Getting started' }}
            </a>
          </div>
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              :href="config.secondaryButtonLink || '#'"
              class="focus:shadow-outline-blue flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base leading-6 font-medium text-blue-500 transition duration-150 ease-in-out hover:text-blue-600 focus:outline-none md:px-10 md:py-4 md:text-lg"
            >
              {{ config.secondaryButtonText || 'En savoir plus' }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center py-5 md:w-1/2 md:pt-10 md:pb-20 md:pl-10">
      <div class="relative w-full rounded p-3 md:p-8">
        <div class="w-full rounded-lg bg-white text-black">
          <img 
            :src="config.imageUrl || 'https://picsum.photos/400/300'" 
            :alt="config.imageAlt || 'Hero image'"
            class="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface HeroSectionConfig {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  imageUrl?: string
  imageAlt?: string
}

interface Props {
  config?: HeroSectionConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    title: 'Hero Section',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonText: 'Getting started',
    buttonLink: '#',
    secondaryButtonText: 'En savoir plus',
    secondaryButtonLink: '#',
    imageUrl: 'https://picsum.photos/400/300',
    imageAlt: 'Hero image'
  })
})
</script>
