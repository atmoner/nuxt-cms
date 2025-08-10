<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="flex h-screen">
      <aside class="w-64 bg-gray-900 text-white">
        <div class="p-4 border-b border-gray-800">
          <div class="flex items-center justify-between">
            <img
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo"
              class="h-8 w-auto"
            >
            <span class="text-xl font-bold">Admin Pro</span>
          </div>
        </div>

        <nav class="mt-5 px-2">
          <div class="space-y-4">
            <!-- Dashboard -->
            <NuxtLink
              to="/nuxt-cms/admin"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </NuxtLink>

            <!-- Pages -->
            <NuxtLink
              to="/nuxt-cms/admin/pages"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Pages
            </NuxtLink>

            <!-- Blog -->
            <NuxtLink
              to="/nuxt-cms/admin/blog"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Blog
            </NuxtLink>

            <!-- Contacts -->
            <NuxtLink
              to="/nuxt-cms/admin/contacts"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200"
            >
              <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacts
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="flex items-center justify-between px-6 py-4">
            <h1 class="text-2xl font-semibold text-gray-900">Messages de Contact</h1>
            <div class="flex items-center space-x-4">
              <button
                @click="loadContacts"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualiser
              </button>
              <button
                @click="logout"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        <!-- Content -->
        <main class="flex-1 overflow-y-auto p-6">
          <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Chargement des contacts...</p>
          </div>

          <div v-else-if="contacts.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun contact</h3>
            <p class="mt-1 text-sm text-gray-500">Aucun message de contact n'a été reçu pour le moment.</p>
          </div>

          <div v-else class="space-y-6">
            <!-- Statistiques -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Total des messages</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ contacts.length }}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Aujourd'hui</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ todayCount }}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Cette semaine</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ weekCount }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <!-- Liste des contacts -->
            <div class="bg-white shadow rounded-lg">
              <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Messages reçus</h2>
              </div>
              <ul class="divide-y divide-gray-200">
                <li 
                  v-for="contact in paginatedContacts" 
                  :key="contact.id"
                  class="px-6 py-4 hover:bg-gray-50"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                          <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span class="text-sm font-medium text-blue-700">
                              {{ (contact.firstName?.[0] || '') + (contact.lastName?.[0] || '') }}
                            </span>
                          </div>
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{ contact.firstName }} {{ contact.lastName }}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            {{ contact.email }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2">
                        <p class="text-sm font-medium text-gray-700">{{ contact.subject }}</p>
                        <p class="text-sm text-gray-500 line-clamp-2">{{ contact.message }}</p>
                      </div>
                    </div>
                    <div class="flex-shrink-0 flex items-center space-x-2">
                      <span class="text-xs text-gray-500">
                        {{ formatDate(contact.timestamp) }}
                      </span>
                      <button
                        @click="openContactModal(contact)"
                        class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Voir
                      </button>
                      <button
                        @click="deleteContact(contact.id)"
                        class="inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
              
              <!-- Pagination -->
              <div v-if="totalPages > 1" class="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                  <button
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Précédent
                  </button>
                  <button
                    @click="currentPage++"
                    :disabled="currentPage === totalPages"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Suivant
                  </button>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Affichage de
                      <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
                      à
                      <span class="font-medium">{{ Math.min(currentPage * perPage, contacts.length) }}</span>
                      sur
                      <span class="font-medium">{{ contacts.length }}</span>
                      résultats
                    </p>
                  </div>
                  <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        @click="currentPage--"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span class="sr-only">Précédent</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </button>
                      <button
                        v-for="page in visiblePages"
                        :key="page"
                        @click="currentPage = page"
                        :class="[
                          page === currentPage
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                          'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                        ]"
                      >
                        {{ page }}
                      </button>
                      <button
                        @click="currentPage++"
                        :disabled="currentPage === totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span class="sr-only">Suivant</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Modal de détail du contact -->
    <div
      v-if="selectedContact"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeContactModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Détails du contact</h3>
              <button @click="closeContactModal" class="text-gray-400 hover:text-gray-600">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedContact.firstName }} {{ selectedContact.lastName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="mt-1 text-sm text-gray-900">
                  <a :href="`mailto:${selectedContact.email}`" class="text-blue-600 hover:text-blue-500">
                    {{ selectedContact.email }}
                  </a>
                </p>
              </div>
              <div v-if="selectedContact.phone">
                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                <p class="mt-1 text-sm text-gray-900">
                  <a :href="`tel:${selectedContact.phone}`" class="text-blue-600 hover:text-blue-500">
                    {{ selectedContact.phone }}
                  </a>
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Sujet</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedContact.subject }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Message</label>
                <p class="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{{ selectedContact.message }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Date</label>
                  <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedContact.timestamp) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Consentement RGPD</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedContact.gdprConsent ? 'Oui' : 'Non' }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              @click="replyToContact"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
            >
              Répondre
            </button>
            <button
              @click="closeContactModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const { user, logout, verifyToken } = useAuth()

// État de la page
const loading = ref(true)
const contacts = ref([])
const selectedContact = ref(null)
const currentPage = ref(1)
const perPage = 10

// Calculer les statistiques
const todayCount = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return contacts.value.filter(contact => {
    const contactDate = new Date(contact.timestamp)
    contactDate.setHours(0, 0, 0, 0)
    return contactDate.getTime() === today.getTime()
  }).length
})

const weekCount = computed(() => {
  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return contacts.value.filter(contact => {
    const contactDate = new Date(contact.timestamp)
    return contactDate >= weekAgo
  }).length
})

// Pagination
const totalPages = computed(() => Math.ceil(contacts.value.length / perPage))
const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return contacts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Charger les contacts
const loadContacts = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/nuxt-cms/admin/contacts')
    contacts.value = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (error) {
    console.error('Erreur lors du chargement des contacts:', error)
  } finally {
    loading.value = false
  }
}

// Supprimer un contact
const deleteContact = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
    return
  }
  
  try {
    await $fetch(`/api/nuxt-cms/admin/contacts/${id}`, { method: 'DELETE' })
    contacts.value = contacts.value.filter(c => c.id !== id)
  } catch (error) {
    console.error('Erreur lors de la suppression du contact:', error)
    alert('Erreur lors de la suppression du contact')
  }
}

// Modal de détail
const openContactModal = (contact) => {
  selectedContact.value = contact
}

const closeContactModal = () => {
  selectedContact.value = null
}

const replyToContact = () => {
  if (selectedContact.value) {
    const subject = `Re: ${selectedContact.value.subject}`
    const body = `Bonjour ${selectedContact.value.firstName},\n\nMerci pour votre message du ${formatDate(selectedContact.value.timestamp)}.\n\n`
    const mailtoLink = `mailto:${selectedContact.value.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }
}

// Formater la date
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Vérifier l'authentification et charger les données
onMounted(async () => {
  const isValid = await verifyToken()
  if (!isValid) {
    await navigateTo('/nuxt-cms/admin/login')
    return
  }
  
  await loadContacts()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
