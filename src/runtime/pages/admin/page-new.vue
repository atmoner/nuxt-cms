<template>
  <div
    v-if="loading"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50"
  >
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto" />
      <p class="mt-6 text-gray-600 font-medium">
        Chargement...
      </p>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen bg-gray-50"
  >
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
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </NuxtLink>

            <!-- Pages -->
            <NuxtLink
              to="/nuxt-cms/admin/pages"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Pages
            </NuxtLink>

            <!-- Blog -->
            <NuxtLink
              to="/nuxt-cms/admin/blog"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 text-white group transition-all duration-200 hover:bg-gray-700"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Blog
            </NuxtLink>

            <!-- Services -->
            <NuxtLink
              to="/nuxt-cms/services"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Services
            </NuxtLink>
          </div>

          <!-- Log out -->
          <div class="pt-6 mt-6 border-t border-gray-800">
            <button
              class="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
              @click="logout"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <!-- Contenu principal -->
      <main class="flex-1 overflow-hidden">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="flex items-center justify-between px-6 py-4">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Nouvelle page
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ form.title || 'Titre de la nouvelle page' }}
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <button
                class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                @click="navigateTo('/nuxt-cms/admin/pages')"
              >
                Retour
              </button>
            </div>
          </div>
        </header>
        <div class="flex h-screen bg-gray-100">
          <!-- sidebar des composants -->
          <div class="hidden md:flex flex-col w-64 bg-gray-800">
            <div class="flex items-center justify-center h-16 bg-gray-900">
              <span class="text-white font-bold uppercase">Components</span>
            </div>
            <div class="flex flex-col flex-1 overflow-y-auto">
              <nav class="flex-1 px-2 py-4 bg-gray-800">
                <draggable
                  class="dragArea list-group"
                  :list="list1"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  item-key="id"
                  @change="log"
                >
                  <template #item="{ element }">
                    <div class="list-group-item flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 cursor-grab">
                      {{ element.name }}
                    </div>
                  </template>
                </draggable>
              </nav>
            </div>
          </div>

          <!-- Main content -->
          <div class="flex flex-col flex-1 overflow-y-auto" :class="{ 'mr-80': showConfigPanel }">
            <div class="p-4">
              <!-- Formulaire -->
              <div class="p-6 overflow-auto h-full">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-96">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Zone de construction</h3>
                    <div class="flex items-center space-x-4">
                      <label class="flex items-center">
                        <input 
                          v-model="autoSave" 
                          type="checkbox" 
                          class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                        <span class="ml-2 text-sm text-gray-600">Sauvegarde automatique</span>
                      </label>
                    </div>
                  </div>
                  <draggable
                    class="dragArea list-group min-h-64"
                    :list="list2"
                    group="people"
                    item-key="id"
                    @change="log"
                  >
                    <template #item="{ element, index }">
                      <div class="list-group-item mb-4 relative group">
                        <!-- Bouton de suppression -->
                        <button
                          class="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          @click="removeComponent(index)"
                        >
                          ×
                        </button> 
                        <div @click="openDetail(element, index)" class="cursor-pointer">
                          <Card v-if="element.component === 'Card'" :config="element.config" />
                          <HeroSection v-else-if="element.component === 'HeroSection'" :config="element.config" />
                          <Pricing v-else-if="element.component === 'Pricing'" :config="element.config" />
                          <Faq v-else-if="element.component === 'Faq'" :config="element.config" />
                          <TeamSection v-else-if="element.component === 'TeamSection'" :config="element.config" />
                          <ContactForm v-else-if="element.component === 'ContactForm'" :config="element.config" />
                        </div>
                      </div>
                    </template>
                  </draggable>
                  <div v-if="list2.length === 0" class="text-center py-12 text-gray-500">
                    <p>Glissez des composants ici pour construire votre page</p>
                  </div>
                  
                  <!-- Boutons d'action -->
                  <div v-if="list2.length > 0" class="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                      {{ list2.length }} composant(s) dans cette page
                    </div>
                    <div class="flex space-x-3">
                      <button
                        @click="showPageForm = true"
                        :disabled="formLoading"
                        class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <span v-if="formLoading">Création...</span>
                        <span v-else>Créer la page</span>
                      </button>
                    </div>
                  </div>
                  <div v-else class="mt-6 pt-4 border-t border-gray-200 text-center">
                    <p class="text-sm text-gray-500 mb-4">Ajoutez au moins un composant pour créer votre page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Configuration Panel -->
          <div 
            v-if="showConfigPanel" 
            class="fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 z-50 overflow-y-auto"
          >
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Configuration</h3>
              <button 
                @click="closeConfigPanel"
                class="text-gray-500 hover:text-gray-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="p-4">
              <!-- Configuration forms for different components -->
              <div v-if="selectedComponent">
                
                <!-- HeroSection Configuration -->
                <div v-if="selectedComponent.component === 'HeroSection'">
                  <h4 class="font-medium text-gray-900 mb-4">Configuration Hero Section</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Titre principal</label>
                      <input 
                        v-model="selectedComponent.config.title"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Votre titre principal"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                      <textarea 
                        v-model="selectedComponent.config.subtitle"
                        rows="3" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Votre sous-titre"
                      ></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Texte du bouton principal</label>
                      <input 
                        v-model="selectedComponent.config.buttonText"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Commencer"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Lien du bouton principal</label>
                      <input 
                        v-model="selectedComponent.config.buttonLink"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="/contact"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Texte du bouton secondaire</label>
                      <input 
                        v-model="selectedComponent.config.secondaryButtonText"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="En savoir plus"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Lien du bouton secondaire</label>
                      <input 
                        v-model="selectedComponent.config.secondaryButtonLink"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="/about"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
                      <input 
                        v-model="selectedComponent.config.imageUrl"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                      <div v-if="selectedComponent.config.imageUrl" class="mt-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
                        <img 
                          :src="selectedComponent.config.imageUrl" 
                          :alt="selectedComponent.config.imageAlt"
                          class="w-full max-w-xs h-32 object-cover rounded border border-gray-200"
                          @error="$event.target.style.display = 'none'"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Texte alternatif de l'image</label>
                      <input 
                        v-model="selectedComponent.config.imageAlt"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Description de l'image"
                      />
                    </div>
                  </div>
                </div>

                <!-- Card Configuration -->
                <div v-if="selectedComponent.component === 'Card'">
                  <h4 class="font-medium text-gray-900 mb-4">Configuration Carte</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                      <input 
                        v-model="selectedComponent.config.category"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Catégorie"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                      <input 
                        v-model="selectedComponent.config.title"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Titre de la carte"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        v-model="selectedComponent.config.description"
                        rows="3" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Description de la carte"
                      ></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <input 
                        v-model="selectedComponent.config.imageUrl"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                      <div v-if="selectedComponent.config.imageUrl" class="mt-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
                        <img 
                          :src="selectedComponent.config.imageUrl" 
                          :alt="selectedComponent.config.imageAlt"
                          class="w-full max-w-xs h-32 object-cover rounded border border-gray-200"
                          @error="$event.target.style.display = 'none'"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Texte alternatif de l'image</label>
                      <input 
                        v-model="selectedComponent.config.imageAlt"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Description de l'image"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Lien</label>
                      <input 
                        v-model="selectedComponent.config.link"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="/page-de-destination"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
                      <input 
                        v-model="selectedComponent.config.buttonText"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="En savoir plus"
                      />
                    </div>
                  </div>
                </div>

                <!-- Pricing Configuration -->
                <div v-if="selectedComponent.component === 'Pricing'">
                  <h4 class="font-medium text-gray-900 mb-4">Configuration Tarifs</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
                      <input 
                        v-model="selectedComponent.config.title"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Simple, Transparent Pricing"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                      <input 
                        v-model="selectedComponent.config.subtitle"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Choisissez le plan qui vous convient"
                      />
                    </div>
                    
                    <!-- Plans Configuration -->
                    <div class="border-t pt-4">
                      <h5 class="font-medium text-gray-800 mb-3">Plans tarifaires</h5>
                      <div 
                        v-for="(plan, index) in selectedComponent.config.plans || []" 
                        :key="index"
                        class="border border-gray-200 rounded-lg p-4 mb-4"
                      >
                        <div class="flex items-center justify-between mb-3">
                          <h6 class="font-medium">Plan {{ index + 1 }}</h6>
                          <button 
                            @click="removePlan(index)"
                            class="text-red-500 hover:text-red-700 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                        
                        <div class="space-y-3">
                          <div class="grid grid-cols-2 gap-2">
                            <div>
                              <label class="block text-xs font-medium text-gray-600 mb-1">Nom du plan</label>
                              <input 
                                v-model="plan.name"
                                type="text" 
                                class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                placeholder="Basic"
                              />
                            </div>
                            <div>
                              <label class="block text-xs font-medium text-gray-600 mb-1">Prix</label>
                              <input 
                                v-model="plan.price"
                                type="text" 
                                class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                placeholder="$29"
                              />
                            </div>
                          </div>
                          
                          <div class="grid grid-cols-2 gap-2">
                            <div>
                              <label class="block text-xs font-medium text-gray-600 mb-1">Période</label>
                              <input 
                                v-model="plan.period"
                                type="text" 
                                class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                placeholder="month"
                              />
                            </div>
                            <div>
                              <label class="block text-xs font-medium text-gray-600 mb-1">Plan vedette</label>
                              <input 
                                v-model="plan.featured"
                                type="checkbox" 
                                class="rounded border-gray-300"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label class="block text-xs font-medium text-gray-600 mb-1">Fonctionnalités (une par ligne)</label>
                            <textarea 
                              :value="plan.features?.join('\\n') || ''"
                              @input="updatePlanFeatures(index, $event.target.value)"
                              rows="3" 
                              class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                              placeholder="Fonctionnalité 1&#10;Fonctionnalité 2"
                            ></textarea>
                          </div>
                          
                          <div class="grid grid-cols-2 gap-2">
                            <div>
                              <label class="block text-xs font-medium text-gray-600 mb-1">Texte du bouton</label>
                              <input 
                                v-model="plan.buttonText"
                                type="text" 
                                class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                placeholder="Get Started"
                              />
                            </div>
                            <div>
                              <label class="block text-xs font-medium text-gray-600 mb-1">Lien du bouton</label>
                              <input 
                                v-model="plan.buttonLink"
                                type="text" 
                                class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                placeholder="#"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        @click="addPlan"
                        class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                      >
                        + Ajouter un plan
                      </button>
                    </div>
                  </div>
                </div>

                <!-- FAQ Configuration -->
                <div v-if="selectedComponent.component === 'Faq'">
                  <h4 class="font-medium text-gray-900 mb-4">Configuration FAQ</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Question</label>
                      <input 
                        v-model="selectedComponent.config.question"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Votre question ici"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Réponse</label>
                      <textarea 
                        v-model="selectedComponent.config.answer"
                        rows="4" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="La réponse à votre question"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- TeamSection Configuration -->
                <div v-if="selectedComponent.component === 'TeamSection'">
                  <h4 class="font-medium text-gray-900 mb-4">Configuration Section Équipe</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <input 
                        v-model="selectedComponent.config.name"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                      <input 
                        v-model="selectedComponent.config.position"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Développeur Senior"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea 
                        v-model="selectedComponent.config.bio"
                        rows="3" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Biographie du membre de l'équipe"
                      ></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                      <input 
                        v-model="selectedComponent.config.photoUrl"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <div v-if="selectedComponent.config.photoUrl" class="mt-2">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Aperçu de la photo</label>
                      <img 
                        :src="selectedComponent.config.photoUrl" 
                        :alt="selectedComponent.config.name"
                        class="w-20 h-20 rounded-full object-cover border border-gray-200"
                        @error="$event.target.style.display = 'none'"
                      />
                    </div>
                  </div>
                </div>

                <!-- ContactForm Configuration -->
                <div v-if="selectedComponent.component === 'ContactForm'">
                  <h4 class="font-medium text-gray-900 mb-4">Configuration Formulaire de Contact</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                      <input 
                        v-model="selectedComponent.config.title"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Contactez-nous"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                      <textarea 
                        v-model="selectedComponent.config.subtitle"
                        rows="2" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Nous sommes là pour vous aider..."
                      ></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Message de succès</label>
                      <input 
                        v-model="selectedComponent.config.successMessage"
                        type="text" 
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="Votre message a été envoyé avec succès !"
                      />
                    </div>
                  </div>
                </div>

                <!-- Save button -->
                <div class="mt-6 pt-4 border-t border-gray-200">
                  <div class="flex space-x-2">
                    <button 
                      @click="saveComponentConfig"
                      class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Sauvegarder
                    </button>
                    <button 
                      @click="closeConfigPanel"
                      class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal de création de page -->
    <div 
      v-if="showPageForm" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showPageForm = false"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Informations de la page</h2>
            <button 
              @click="showPageForm = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="createPage" class="space-y-4">
            <!-- Titre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Titre <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez le titre de la page"
                @input="generateSlug"
              />
            </div>

            <!-- Slug -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL) <span class="text-red-500">*</span>
              </label>
              <div class="flex">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  /page/
                </span>
                <input
                  v-model="form.slug"
                  type="text"
                  required
                  class="flex-1 border border-gray-300 rounded-none rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="url-de-la-page"
                />
              </div>
              <p class="mt-1 text-sm text-gray-500">
                L'URL sera : /page/{{ form.slug }}
              </p>
            </div>

            <!-- Statut -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                v-model="form.status"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description courte</label>
              <textarea
                v-model="form.content"
                rows="3"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Description courte de la page..."
              ></textarea>
            </div>

            <!-- SEO -->
            <div class="border-t pt-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Référencement (SEO)</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description META</label>
                  <textarea
                    v-model="form.meta_description"
                    rows="2"
                    maxlength="160"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description courte pour les moteurs de recherche"
                  ></textarea>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ form.meta_description.length }}/160 caractères
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Mots-clés META</label>
                  <input
                    v-model="form.meta_keywords"
                    type="text"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="mot-clé1, mot-clé2, mot-clé3"
                  />
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                @click="showPageForm = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="formLoading"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded-md transition-colors flex items-center"
              >
                <svg
                  v-if="formLoading"
                  class="animate-spin h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {{ formLoading ? 'Création...' : 'Créer la page' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'

const { user, logout, verifyToken } = useAuth()
const loading = ref(true)
const formLoading = ref(false)
const showConfigPanel = ref(false)
const showPageForm = ref(false)
const selectedComponent = ref(null)
const selectedComponentIndex = ref(-1)
const autoSave = ref(false) // Option pour la sauvegarde automatique

// Listes pour le drag and drop
const list1 = ref([
  { name: 'Hero Section', id: 1, component: 'HeroSection' },
  { name: 'Card', id: 2, component: 'Card' },
  { name: 'Pricing', id: 3, component: 'Pricing' },
  { name: 'Faq', id: 4, component: 'Faq' },
  { name: 'Team Section', id: 5, component: 'TeamSection' },
  { name: 'Contact Form', id: 6, component: 'ContactForm' }
])

const list2 = ref([])

// Watch pour les changements dans list2 pour maintenir la réactivité
watch(list2, (newList) => {
  // S'assurer que chaque composant a une config initialisée
  newList.forEach((component) => {
    if (!component.config) {
      component.config = getDefaultConfig(component.component)
    }
  })
}, { deep: true })

// Variable pour éviter les boucles infinies
let isUpdatingConfig = false

// Watch pour les changements de configuration du composant sélectionné
watch(() => selectedComponent.value?.config, (newConfig, oldConfig) => {
  if (isUpdatingConfig || !selectedComponent.value || selectedComponentIndex.value < 0) {
    return
  }
  
  // Éviter la récursion en utilisant un flag
  isUpdatingConfig = true
  
  nextTick(() => {
    // Mettre à jour la configuration dans list2 seulement si nécessaire
    if (list2.value[selectedComponentIndex.value] && 
        JSON.stringify(list2.value[selectedComponentIndex.value].config) !== JSON.stringify(newConfig)) {
      list2.value[selectedComponentIndex.value].config = { ...newConfig }
      console.log('Configuration mise à jour automatiquement:', newConfig)
    }
    isUpdatingConfig = false
  })
}, { deep: true })

// Formulaire pour les informations de base de la page
const form = ref({
  title: '',
  slug: '',
  content: '',
  meta_description: '',
  meta_keywords: '',
  status: 'published',
})

// Middleware de protection de la page
definePageMeta({
  middleware: 'auth',
})

onMounted(async () => {
  await checkAuth()

  // Empêcher le comportement par défaut du drag and drop sur toute la page
  document.addEventListener('dragover', e => e.preventDefault())
  document.addEventListener('drop', e => e.preventDefault())
})

onUnmounted(() => {
  // Nettoyer les event listeners
  document.removeEventListener('dragover', e => e.preventDefault())
  document.removeEventListener('drop', e => e.preventDefault())
})

const checkAuth = async () => {
  const isValid = await verifyToken()

  if (!isValid) {
    await navigateTo('/nuxt-cms/admin/login')
    return
  }

  loading.value = false
}

const generateSlug = () => {
  if (form.value.title) {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
}

// Nouvelle fonction pour créer la page avec les composants
const createPage = async () => {
  formLoading.value = true

  try {
    // D'abord créer la page de base
    const pageResponse = await $fetch('/api/nuxt-cms/pages', {
      method: 'POST',
      body: {
        title: form.value.title || 'Nouvelle page',
        slug: form.value.slug || 'nouvelle-page',
        content: form.value.content || 'Contenu de la nouvelle page',
        meta_description: form.value.meta_description || '',
        meta_keywords: form.value.meta_keywords || '',
        status: form.value.status || 'draft',
      },
    })

    if (pageResponse && pageResponse.id) {
      // Ensuite sauvegarder les composants si il y en a
      if (list2.value.length > 0) {
        await $fetch(`/api/nuxt-cms/pages/${pageResponse.id}/components`, {
          method: 'PUT',
          body: {
            components: list2.value
          }
        })
      }

      // Fermer le modal
      showPageForm.value = false

      // Rediriger vers la page d'édition de la nouvelle page
      await navigateTo(`/nuxt-cms/admin/page-edit?id=${pageResponse.id}`)
    }
    else {
      throw new Error('Erreur lors de la création de la page')
    }
  }
  catch (error) {
    console.error('Erreur lors de la création:', error)
    alert('Erreur lors de la création de la page: ' + error.message)
  }
  finally {
    formLoading.value = false
  }
}

// Configuration panel methods
const openDetail = (component, index) => {
  // Éviter la récursion pendant la mise à jour
  isUpdatingConfig = true
  
  selectedComponentIndex.value = index
  
  // Initialize config if it doesn't exist
  if (!list2.value[index].config) {
    list2.value[index].config = getDefaultConfig(component.component)
  }
  
  // Créer une référence au composant dans list2
  selectedComponent.value = list2.value[index]
  
  showConfigPanel.value = true
  
  // Réactiver les watchers après un délai
  nextTick(() => {
    isUpdatingConfig = false
  })
  
  console.log('Composant sélectionné:', selectedComponent.value)
}

const closeConfigPanel = () => {
  showConfigPanel.value = false
  selectedComponent.value = null
  selectedComponentIndex.value = -1
}

const getDefaultConfig = (componentType) => {
  const defaults = {
    HeroSection: () => ({
      title: 'Titre principal',
      subtitle: 'Votre sous-titre ici',
      buttonText: 'Commencer',
      buttonLink: '#',
      secondaryButtonText: 'En savoir plus',
      secondaryButtonLink: '#',
      imageUrl: 'https://picsum.photos/400/300',
      imageAlt: 'Hero image'
    }),
    Card: () => ({
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: 'https://picsum.photos/400/300',
      imageAlt: 'Card image',
      category: 'Catégorie',
      title: 'Titre de la carte',
      description: 'Description de la carte',
      link: '#',
      buttonText: 'En savoir plus'
    }),
    Pricing: () => ({
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choisissez le plan qui vous convient',
      plans: [
        {
          name: 'Basic',
          price: '$29',
          period: 'month',
          features: ['15 Websites', 'SSL (HTTPS)', 'SiteFast Domain'],
          buttonText: 'Get Started',
          buttonLink: '#',
          featured: true
        }
      ]
    }),
    Faq: () => ({
      question: 'Votre question ici',
      answer: 'La réponse à votre question'
    }),
    TeamSection: () => ({
      name: 'John Doe',
      position: 'Développeur Senior',
      bio: 'Biographie du membre de l\'équipe',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }),
    ContactForm: () => ({
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
        show: false,
        title: 'Autres moyens de nous contacter',
        email: '',
        phone: '',
        address: ''
      },
      apiEndpoint: '/api/contact'
    })
  }
  
  // Retourner une nouvelle instance à chaque appel
  const factory = defaults[componentType]
  return factory ? factory() : {}
}

// Fonction pour obtenir la configuration actuelle d'un composant
const getCurrentConfig = (component) => {
  return component.config || getDefaultConfig(component.component)
}

// Fonctions pour gérer les plans de tarification
const addPlan = () => {
  if (selectedComponent.value && selectedComponent.value.component === 'Pricing') {
    if (!selectedComponent.value.config.plans) {
      selectedComponent.value.config.plans = []
    }
    
    const newPlan = {
      name: 'Nouveau Plan',
      price: '$0',
      period: 'month',
      features: ['Fonctionnalité 1', 'Fonctionnalité 2'],
      buttonText: 'Choisir',
      buttonLink: '#',
      featured: false
    }
    
    selectedComponent.value.config.plans.push(newPlan)
  }
}

const removePlan = (index) => {
  if (selectedComponent.value && selectedComponent.value.config.plans) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plan ?')) {
      selectedComponent.value.config.plans.splice(index, 1)
    }
  }
}

const updatePlanFeatures = (planIndex, featuresText) => {
  if (selectedComponent.value && selectedComponent.value.config.plans) {
    const features = featuresText.split('\n').filter(f => f.trim() !== '')
    selectedComponent.value.config.plans[planIndex].features = features
  }
}

const saveComponentConfig = () => {
  if (selectedComponentIndex.value >= 0 && selectedComponent.value) {
    // Éviter la récursion
    isUpdatingConfig = true
    
    // Update the component in list2 with the new configuration
    list2.value[selectedComponentIndex.value] = { ...selectedComponent.value }
    
    console.log('Configuration sauvegardée:', list2.value[selectedComponentIndex.value])
    
    // Réactiver les watchers
    nextTick(() => {
      isUpdatingConfig = false
    })
  }
}

const removeComponent = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce composant ?')) {
    list2.value.splice(index, 1)
    // Close config panel if the deleted component was selected
    if (selectedComponentIndex.value === index) {
      closeConfigPanel()
    }
  }
}

const log = (evt) => {
  // console.log(evt);
}
</script>
