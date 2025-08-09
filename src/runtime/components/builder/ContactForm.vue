<template>
  <section class="bg-white py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ config.title || 'Contactez-nous' }}
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-600">
          {{ config.subtitle || 'Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.' }}
        </p>
      </div>

      <div class="mx-auto mt-12 max-w-xl">
        <!-- Success Message -->
        <div 
          v-if="showSuccess" 
          class="mb-6 rounded-md bg-green-50 p-4 border border-green-200"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                {{ config.successMessage || 'Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div 
          v-if="showError" 
          class="mb-6 rounded-md bg-red-50 p-4 border border-red-200"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- First Name -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">
                {{ config.fields?.firstName?.label || 'Prénom' }}
                <span v-if="config.fields?.firstName?.required !== false" class="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                :required="config.fields?.firstName?.required !== false"
                :placeholder="config.fields?.firstName?.placeholder || 'Votre prénom'"
                class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.firstName }"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
            </div>

            <!-- Last Name -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">
                {{ config.fields?.lastName?.label || 'Nom' }}
                <span v-if="config.fields?.lastName?.required !== false" class="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                :required="config.fields?.lastName?.required !== false"
                :placeholder="config.fields?.lastName?.placeholder || 'Votre nom'"
                class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.lastName }"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ config.fields?.email?.label || 'Email' }}
              <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :placeholder="config.fields?.email?.placeholder || 'votre@email.com'"
              class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Phone (Optional) -->
          <div v-if="config.fields?.phone?.show !== false">
            <label for="phone" class="block text-sm font-medium text-gray-700">
              {{ config.fields?.phone?.label || 'Téléphone' }}
              <span v-if="config.fields?.phone?.required" class="text-red-500">*</span>
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              :required="config.fields?.phone?.required"
              :placeholder="config.fields?.phone?.placeholder || '+33 6 12 34 56 78'"
              class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.phone }"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Subject -->
          <div v-if="config.fields?.subject?.show !== false">
            <label for="subject" class="block text-sm font-medium text-gray-700">
              {{ config.fields?.subject?.label || 'Sujet' }}
              <span v-if="config.fields?.subject?.required !== false" class="text-red-500">*</span>
            </label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              :required="config.fields?.subject?.required !== false"
              :placeholder="config.fields?.subject?.placeholder || 'Sujet de votre message'"
              class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.subject }"
            />
            <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700">
              {{ config.fields?.message?.label || 'Message' }}
              <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              required
              :placeholder="config.fields?.message?.placeholder || 'Votre message...'"
              class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.message }"
            ></textarea>
            <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
          </div>

          <!-- GDPR Consent (Optional) -->
          <div v-if="config.gdpr?.show">
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input
                  id="gdpr-consent"
                  v-model="form.gdprConsent"
                  type="checkbox"
                  :required="config.gdpr?.required !== false"
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  :class="{ 'border-red-300': errors.gdprConsent }"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="gdpr-consent" class="text-gray-600">
                  {{ config.gdpr?.text || 'J\'accepte que mes données soient utilisées pour me recontacter.' }}
                  <span v-if="config.gdpr?.required !== false" class="text-red-500">*</span>
                </label>
                <p v-if="errors.gdprConsent" class="mt-1 text-red-600">{{ errors.gdprConsent }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">{{ config.submitButton?.text || 'Envoyer le message' }}</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ config.submitButton?.loadingText || 'Envoi en cours...' }}
              </span>
            </button>
          </div>
        </form>

        <!-- Contact Info (Optional) -->
        <div v-if="config.contactInfo?.show" class="mt-12 pt-8 border-t border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ config.contactInfo?.title || 'Autres moyens de nous contacter' }}
          </h3>
          <div class="space-y-3">
            <div v-if="config.contactInfo?.email" class="flex items-center">
              <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a :href="`mailto:${config.contactInfo.email}`" class="text-blue-600 hover:text-blue-500">
                {{ config.contactInfo.email }}
              </a>
            </div>
            <div v-if="config.contactInfo?.phone" class="flex items-center">
              <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a :href="`tel:${config.contactInfo.phone}`" class="text-blue-600 hover:text-blue-500">
                {{ config.contactInfo.phone }}
              </a>
            </div>
            <div v-if="config.contactInfo?.address" class="flex items-start">
              <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-gray-600">{{ config.contactInfo.address }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface ContactField {
  label?: string
  placeholder?: string
  required?: boolean
  show?: boolean
}

interface ContactInfo {
  show?: boolean
  title?: string
  email?: string
  phone?: string
  address?: string
}

interface GDPR {
  show?: boolean
  required?: boolean
  text?: string
}

interface SubmitButton {
  text?: string
  loadingText?: string
}

interface ContactFormConfig {
  title?: string
  subtitle?: string
  successMessage?: string
  fields?: {
    firstName?: ContactField
    lastName?: ContactField
    email?: ContactField
    phone?: ContactField
    subject?: ContactField
    message?: ContactField
  }
  gdpr?: GDPR
  submitButton?: SubmitButton
  contactInfo?: ContactInfo
  apiEndpoint?: string
  redirectAfterSubmit?: string
}

interface Props {
  config?: ContactFormConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    title: 'Contactez-nous',
    subtitle: 'Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.',
    successMessage: 'Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.',
    fields: {
      firstName: { label: 'Prénom', placeholder: 'Votre prénom', required: true },
      lastName: { label: 'Nom', placeholder: 'Votre nom', required: true },
      email: { label: 'Email', placeholder: 'votre@email.com', required: true },
      phone: { label: 'Téléphone', placeholder: '+33 6 12 34 56 78', required: false, show: true },
      subject: { label: 'Sujet', placeholder: 'Sujet de votre message', required: true, show: true },
      message: { label: 'Message', placeholder: 'Votre message...', required: true }
    },
    gdpr: {
      show: true,
      required: true,
      text: 'J\'accepte que mes données soient utilisées pour me recontacter.'
    },
    submitButton: {
      text: 'Envoyer le message',
      loadingText: 'Envoi en cours...'
    },
    contactInfo: {
      show: false
    },
    apiEndpoint: '/api/contact'
  })
})

// Form state
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  gdprConsent: false
})

// UI state
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Validation errors
const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  gdprConsent: ''
})

// Clear all errors
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}

// Validate form
const validateForm = () => {
  clearErrors()
  let isValid = true

  // First name validation
  if (props.config?.fields?.firstName?.required !== false && !form.firstName.trim()) {
    errors.firstName = 'Le prénom est requis'
    isValid = false
  }

  // Last name validation
  if (props.config?.fields?.lastName?.required !== false && !form.lastName.trim()) {
    errors.lastName = 'Le nom est requis'
    isValid = false
  }

  // Email validation
  if (!form.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'L\'email n\'est pas valide'
    isValid = false
  }

  // Phone validation (if required)
  if (props.config?.fields?.phone?.required && !form.phone.trim()) {
    errors.phone = 'Le téléphone est requis'
    isValid = false
  }

  // Subject validation
  if (props.config?.fields?.subject?.required !== false && !form.subject.trim()) {
    errors.subject = 'Le sujet est requis'
    isValid = false
  }

  // Message validation
  if (!form.message.trim()) {
    errors.message = 'Le message est requis'
    isValid = false
  }

  // GDPR validation
  if (props.config?.gdpr?.show && props.config?.gdpr?.required !== false && !form.gdprConsent) {
    errors.gdprConsent = 'Vous devez accepter les conditions'
    isValid = false
  }

  return isValid
}

// Reset form
const resetForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
  form.gdprConsent = false
  clearErrors()
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    const response = await $fetch(props.config?.apiEndpoint || '/api/contact', {
      method: 'POST',
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        gdprConsent: form.gdprConsent,
        timestamp: new Date().toISOString()
      }
    })

    // Success
    showSuccess.value = true
    resetForm()

    // Redirect if configured
    if (props.config?.redirectAfterSubmit) {
      setTimeout(() => {
        window.location.href = props.config!.redirectAfterSubmit!
      }, 2000)
    }

  } catch (error) {
    console.error('Error submitting contact form:', error)
    showError.value = true
    errorMessage.value = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
