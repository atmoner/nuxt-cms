<template>
  <div class="raw-displayer">
    <h4 class="text-lg font-semibold mb-4 text-gray-800">{{ title }}</h4>
    <div class="bg-white border border-gray-300 rounded-lg p-4 min-h-[200px]">
      <div v-if="value && value.length > 0" class="space-y-2">
        <div
          v-for="(item, index) in value"
          :key="item.id || index"
          class="p-3 bg-gray-50 border border-gray-200 rounded-md"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-900">{{ item.name }}</span>
            <span class="text-sm text-gray-500">{{ item.component }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-8">
        <p>Aucun élément</p>
        <p class="text-sm mt-2">Glissez des composants ici pour construire votre page</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.raw-displayer {
  @apply w-full;
}
</style>
