<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notre équipe</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Nous sommes une équipe dynamique de professionnels passionnés qui travaillent ensemble pour créer des solutions exceptionnelles.
        </p>
      </div>
      <ul
        role="list"
        class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-1"
      >
        <li>
          <img
            class="aspect-[3/2] w-full rounded-2xl object-cover max-w-sm"
            :src="config.photoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
            :alt="config.name || 'John Doe'"
          />
          <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
            {{ config.name || 'John Doe' }}
          </h3>
          <p class="text-base leading-7 text-gray-600">{{ config.position || 'Développeur Senior' }}</p>
          <p class="mt-4 text-base leading-7 text-gray-600">{{ config.bio || 'Biographie du membre de l\'équipe' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TeamSectionConfig {
  name?: string
  position?: string
  bio?: string
  photoUrl?: string
}

interface Props {
  config?: TeamSectionConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    name: 'John Doe',
    position: 'Développeur Senior',
    bio: 'Biographie du membre de l\'équipe',
    photoUrl: ''
  })
})
</script>
