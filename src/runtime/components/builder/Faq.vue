<template>
  <div class="mx-auto flex max-w-5xl flex-col gap-12 px-8 py-24 md:flex-row">
    <div class="flex basis-1/2 flex-col text-left">
      <p class="text-primary mb-4 inline-block font-semibold">Insurance FAQ</p>
      <p class="text-base-content text-3xl font-extrabold sm:text-4xl">
        Frequently Asked Questions
      </p>
    </div>
    <ul class="basis-1/2">
      <li>
        <button
          class="border-base-content/10 relative flex w-full items-center gap-2 border-t py-5 text-left text-base font-semibold md:text-lg"
          aria-expanded="false"
          @click="toggleFAQ"
        >
          <span class="text-base-content flex-1">{{ config.question || 'Votre question ici' }}</span>
          <svg
            class="ml-auto h-4 w-4 flex-shrink-0 fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              :class="isOpen ? 'opacity-0' : 'opacity-100'"
              class="origin-center transform transition duration-200 ease-out"
            ></rect>
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              :class="isOpen ? 'rotate-0' : 'rotate-90'"
              class="origin-center transform transition duration-200 ease-out"
            ></rect>
          </svg>
        </button>
        <div
          :class="isOpen ? 'max-h-96' : 'max-h-0'"
          class="overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div class="pb-5 leading-relaxed">
            <div class="space-y-2 leading-relaxed">
              {{ config.answer || 'La réponse à votre question' }}
            </div>
          </div>
        </div>
      </li>
      <li>
        <button
          class="border-base-content/10 relative flex w-full items-center gap-2 border-t py-5 text-left text-base font-semibold md:text-lg"
          aria-expanded="false"
          onclick="toggleFAQ(this)"
        >
          <span class="text-base-content flex-1"
            >How can I customize my insurance coverage?</span
          >
          <svg
            class="ml-auto h-4 w-4 flex-shrink-0 fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="false origin-center transform transition duration-200 ease-out"
            ></rect>
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="false origin-center rotate-90 transform transition duration-200 ease-out"
            ></rect>
          </svg>
        </button>
        <div
          class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
          style="transition: max-height 0.3s ease-in-out 0s"
        >
          <div class="pb-5 leading-relaxed">
            <div class="space-y-2 leading-relaxed">
              Our insurance plans are customizable. You can tailor your coverage
              to meet your specific needs and budget.
            </div>
          </div>
                </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FaqConfig {
  question?: string
  answer?: string
}

interface Props {
  config?: FaqConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    question: 'Votre question ici',
    answer: 'La réponse à votre question'
  })
})

const isOpen = ref(false)

const toggleFAQ = () => {
  isOpen.value = !isOpen.value
}
</script>
