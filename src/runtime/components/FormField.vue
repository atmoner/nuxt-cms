<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <label class="text-sm font-medium text-gray-700">{{ label }}</label>
      <button 
        v-if="helpText"
        @click="showHelp = !showHelp"
        class="text-gray-400 hover:text-gray-600"
        type="button"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>
    </div>
    
    <div v-if="type === 'textarea'">
      <textarea 
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)"
        :rows="rows || 3"
        :placeholder="placeholder"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      ></textarea>
    </div>
    
    <div v-else-if="type === 'checkbox'">
      <label class="flex items-center">
        <input 
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="ml-2 text-sm text-gray-600">{{ checkboxLabel || 'Activer' }}</span>
      </label>
    </div>
    
    <div v-else-if="type === 'select'">
      <select 
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="" disabled>{{ placeholder || 'Sélectionnez une option' }}</option>
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    
    <div v-else>
      <input 
        :type="type || 'text'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        :placeholder="placeholder"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
    
    <div v-if="showHelp && helpText" class="text-xs text-gray-500 bg-gray-50 p-2 rounded">
      {{ helpText }}
    </div>
    
    <div v-if="error" class="text-xs text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  modelValue?: any
  label: string
  type?: string
  placeholder?: string
  helpText?: string
  error?: string
  rows?: number
  options?: Option[]
  checkboxLabel?: string
}

defineProps<Props>()
defineEmits(['update:modelValue'])

const showHelp = ref(false)
</script>
