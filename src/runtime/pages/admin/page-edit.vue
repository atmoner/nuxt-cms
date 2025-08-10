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
                Page edit
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ form.title }}
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <button
                class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                @click="navigateTo('/nuxt-cms/admin/blog')"
              >
                Back
              </button>
            </div>
          </div>
        </header>
        <div class="flex h-screen bg-gray-100">
          <!-- sidebar -->
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
                        @click="savePageComponents"
                        :disabled="formLoading"
                        class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <span v-if="formLoading">Sauvegarde...</span>
                        <span v-else>Sauvegarder les composants</span>
                      </button>
                    </div>
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

          <!-- Main content -->
<!--           <div class="flex flex-col flex-1 overflow-y-auto">
            <div class="p-4">
 
              <div class="p-6 overflow-auto h-full">
                <form
                  class="max-w-4xl mx-auto"
                  @submit.prevent="submitForm"
                >
                  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
 
                    <div>
                      <label
                        for="title"
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Titre <span class="text-red-500">*</span>
                      </label>
                      <input
                        id="title"
                        v-model="form.title"
                        type="text"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Entrez le titre de la page"
                        @input="generateSlug"
                      >
                    </div> 
                    <div>
                      <label
                        for="slug"
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Slug (URL) <span class="text-red-500">*</span>
                      </label>
                      <div class="flex">
                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          /page/
                        </span>
                        <input
                          id="slug"
                          v-model="form.slug"
                          type="text"
                          required
                          class="flex-1 block w-full border-gray-300 rounded-none rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="url-de-la-page"
                        >
                      </div>
                      <p class="mt-1 text-sm text-gray-500">
                        L'URL sera : /page/{{ form.slug }}
                      </p>
                    </div>
 
                    <div>
                      <label
                        for="status"
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >Statut</label>
                      <select
                        id="status"
                        v-model="form.status"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="published">
                          Publié
                        </option>
                        <option value="draft">
                          Brouillon
                        </option>
                      </select>
                    </div>
 
                    <div>
                      <label
                        for="content"
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Contenu <span class="text-red-500">*</span>
                      </label>
 
                      <div
                        :class="[
                          'mb-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50',
                        ]"
                        @drop="handleDrop"
                        @dragover.prevent
                        @dragenter.prevent
                        @dragenter="isDragging = true"
                        @dragleave="isDragging = false"
                      >
                        <div class="space-y-2">
                          <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div class="text-sm text-gray-600">
                            <p><strong>Glissez et déposez des éléments ici</strong></p>
                            <p>ou utilisez les boutons ci-dessous pour insérer des éléments</p>
                          </div>
                        </div>
                      </div>
 
                      <div class="mb-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                          @click="insertElement('image')"
                        >
                          <svg
                            class="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Image
                        </button>
                        <button
                          type="button"
                          class="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                          @click="insertElement('video')"
                        >
                          <svg
                            class="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Vidéo
                        </button>
                        <button
                          type="button"
                          class="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                          @click="insertElement('link')"
                        >
                          <svg
                            class="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                          Lien
                        </button>
                        <button
                          type="button"
                          class="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                          @click="insertElement('table')"
                        >
                          <svg
                            class="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1z"
                            />
                          </svg>
                          Tableau
                        </button>
                        <button
                          type="button"
                          class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                          @click="insertElement('code')"
                        >
                          <svg
                            class="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                          Code
                        </button>
                      </div>

                      <textarea
                        id="content"
                        ref="contentTextarea"
                        v-model="form.content"
                        rows="12"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Rédigez le contenu de votre page en Markdown..."
                      />
                      <p class="mt-1 text-sm text-gray-500">
                        Vous pouvez utiliser la syntaxe Markdown pour formater votre contenu.
                      </p>
                    </div>
 
                    <div class="border-t pt-6">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">
                        Référencement (SEO)
                      </h3>
 
                      <div class="mb-4">
                        <label
                          for="meta_description"
                          class="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Description META
                        </label>
                        <textarea
                          id="meta_description"
                          v-model="form.meta_description"
                          rows="3"
                          maxlength="160"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Description courte de la page (recommandé : 150-160 caractères)"
                        />
                        <p class="mt-1 text-sm text-gray-500">
                          {{ form.meta_description.length }}/160 caractères
                        </p>
                      </div>
 
                      <div>
                        <label
                          for="meta_keywords"
                          class="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Mots-clés META
                        </label>
                        <input
                          id="meta_keywords"
                          v-model="form.meta_keywords"
                          type="text"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="mot-clé1, mot-clé2, mot-clé3"
                        >
                        <p class="mt-1 text-sm text-gray-500">
                          Séparez les mots-clés par des virgules
                        </p>
                      </div>
                    </div>
 
                    <div class="flex justify-end space-x-4 pt-6 border-t">
                      <NuxtLink
                        to="/nuxt-cms/admin/pages"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Annuler
                      </NuxtLink>
                      <button
                        type="submit"
                        :disabled="formLoading"
                        class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
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
                        {{ formLoading ? 'Modification...' : 'Modifier la page' }}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { useAuth } from '../composables/useAuth'

const { user, logout, verifyToken } = useAuth()
const route = useRoute()
const loading = ref(true)
const formLoading = ref(false)
const deleteLoading = ref(false)
const isDragging = ref(false)
const contentTextarea = ref(null)
const showConfigPanel = ref(false)
const selectedComponent = ref(null)
const selectedComponentIndex = ref(-1)
const autoSave = ref(false) // Option pour la sauvegarde automatique

// Récupération de l'ID depuis l'URL avec gestion du format
const pageId = computed(() => {
  // L'id peut être dans différents paramètres selon la route
  return route.query.id || route.params.id || null
})

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
  
  // Déclencher la sauvegarde automatique
  debouncedAutoSave()
}, { deep: true })

// Variable pour éviter les boucles infinies
let isUpdatingConfig = false
let autoSaveTimer = null

// Fonction de sauvegarde automatique avec debounce
const debouncedAutoSave = () => {
  if (!autoSave.value) return
  
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer)
  }
  
  autoSaveTimer = setTimeout(async () => {
    try {
      await savePageComponents()
      console.log('Sauvegarde automatique effectuée')
    } catch (error) {
      console.log('Erreur lors de la sauvegarde automatique:', error)
    }
  }, 2000) // Attendre 2 secondes après le dernier changement
}

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

// Formulaire
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
  if (!loading.value && pageId.value) {
    await loadPage()
  }
  else if (!pageId.value) {
    alert('ID de page manquant')
    await navigateTo('/nuxt-cms/admin/pages')
  }

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

const loadPage = async () => {
  try {
    const articleId = route.query.id
    console.log('Chargement de la page avec ID:', articleId)
    if (!articleId) {
      throw new Error('ID de l\'article manquant')
    }

    // Charger les informations de la page
    const page = await $fetch(`/api/nuxt-cms/pages/${articleId}`, {
      method: 'GET',
    })

    if (page && page.id) {
      form.value = {
        title: page.title,
        slug: page.slug,
        content: page.content,
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
        status: page.status,
      }

      // Charger les composants de la page
      await loadPageComponents()
    }
    else {
      throw new Error('Page non trouvée')
    }
  }
  catch (error) {
    console.error('Erreur lors du chargement:', error)
    alert('Erreur lors du chargement de la page')
    await navigateTo('/nuxt-cms/admin/pages')
  }
}

// Nouvelle fonction pour charger les composants
const loadPageComponents = async () => {
  try {
    const articleId = route.query.id
    if (!articleId) return

    const response = await $fetch(`/api/nuxt-cms/pages/${articleId}/components`, {
      method: 'GET',
    })

    if (response && response.components) {
      list2.value = response.components
      console.log('Composants chargés:', response.components)
    }
  }
  catch (error) {
    console.error('Erreur lors du chargement des composants:', error)
    // Ne pas afficher d'erreur si les composants n'existent pas encore
    list2.value = []
  }
}

// Nouvelle fonction pour sauvegarder les composants
const savePageComponents = async () => {
  formLoading.value = true
  try {
    const articleId = route.query.id
    if (!articleId) {
      alert('ID de page manquant')
      return
    }

    const response = await $fetch(`/api/nuxt-cms/pages/${articleId}/components`, {
      method: 'PUT',
      body: {
        components: list2.value
      }
    })

    console.log('Composants sauvegardés:', response)
    
    // Afficher un message de succès
    const successMessage = document.createElement('div')
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md z-50'
    successMessage.textContent = 'Composants sauvegardés avec succès!'
    document.body.appendChild(successMessage)
    
    setTimeout(() => {
      document.body.removeChild(successMessage)
    }, 3000)
    
    return response
  }
  catch (error) {
    console.error('Erreur lors de la sauvegarde des composants:', error)
    alert('Erreur lors de la sauvegarde des composants')
    throw error
  }
  finally {
    formLoading.value = false
  }
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

const submitForm = async () => {
  formLoading.value = true

  try {
    const response = await $fetch(`/api/nuxt-cms/pages/${pageId.value}`, {
      method: 'PUT',
      body: form.value,
    })

    if (response && response.id) {
      // Afficher un message de succès
      await navigateTo('/nuxt-cms/admin/pages')
    }
    else {
      throw new Error('Erreur lors de la modification')
    }
  }
  catch (error) {
    console.error('Erreur lors de la modification:', error)
    alert('Erreur lors de la modification de la page: ' + error.message)
  }
  finally {
    formLoading.value = false
  }
}

const deletePage = async () => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ? Cette action est irréversible.')) {
    return
  }

  deleteLoading.value = true

  try {
    const response = await $fetch(`/api/nuxt-cms/pages/${pageId.value}`, {
      method: 'DELETE',
    })

    if (response && response.message) {
      await navigateTo('/nuxt-cms/admin/pages')
    }
    else {
      throw new Error('Erreur lors de la suppression')
    }
  }
  catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert('Erreur lors de la suppression de la page: ' + error.message)
  }
  finally {
    deleteLoading.value = false
  }
}

// Gestion du drag and drop
const handleDrop = async (event) => {
  event.preventDefault()
  isDragging.value = false

  const files = Array.from(event.dataTransfer.files)
  const text = event.dataTransfer.getData('text/plain')

  if (files.length > 0) {
    // Gérer les fichiers déposés
    for (const file of files) {
      await handleFileUpload(file)
    }
  }
  else if (text) {
    // Gérer le texte déposé (URLs, etc.)
    handleTextDrop(text)
  }
}

const handleFileUpload = async (file) => {
  try {
    // Pour cet exemple, nous générons un markdown basé sur le type de fichier
    let markdown = ''

    if (file.type.startsWith('image/')) {
      // Pour les images
      const fileName = file.name
      markdown = `![${fileName}](/uploads/images/${fileName})\n\n`

      // Vous pourriez ici uploader le fichier vers votre serveur
      console.log('Image à uploader:', file)
    }
    else if (file.type.startsWith('video/')) {
      // Pour les vidéos
      const fileName = file.name
      markdown = `<video controls>\n  <source src="/uploads/videos/${fileName}" type="${file.type}">\n  Votre navigateur ne supporte pas la balise vidéo.\n</video>\n\n`

      console.log('Vidéo à uploader:', file)
    }
    else {
      // Pour les autres fichiers
      const fileName = file.name
      markdown = `[📎 ${fileName}](/uploads/files/${fileName})\n\n`

      console.log('Fichier à uploader:', file)
    }

    insertAtCursor(markdown)

    // Afficher un message d'information
    alert(`Fichier "${file.name}" ajouté au contenu. N'oubliez pas d'uploader le fichier sur votre serveur.`)
  }
  catch (error) {
    console.error('Erreur lors du traitement du fichier:', error)
    alert('Erreur lors du traitement du fichier')
  }
}

const handleTextDrop = (text) => {
  // Vérifier si c'est une URL
  if (text.startsWith('http://') || text.startsWith('https://')) {
    // Détecter le type d'URL
    if (text.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      // Image
      const markdown = `![Image](${text})\n\n`
      insertAtCursor(markdown)
    }
    else if (text.match(/\.(mp4|webm|ogg)$/i)) {
      // Vidéo
      const markdown = `<video controls>\n  <source src="${text}">\n  Votre navigateur ne supporte pas la balise vidéo.\n</video>\n\n`
      insertAtCursor(markdown)
    }
    else if (text.includes('youtube.com') || text.includes('youtu.be')) {
      // Vidéo YouTube
      const videoId = extractYouTubeId(text)
      if (videoId) {
        const markdown = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>\n\n`
        insertAtCursor(markdown)
      }
    }
    else {
      // Lien normal
      const markdown = `[${text}](${text})\n\n`
      insertAtCursor(markdown)
    }
  }
  else {
    // Texte simple
    insertAtCursor(text + '\n\n')
  }
}

const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

const insertElement = (type) => {
  let markdown = ''

  switch (type) {
    case 'image':
      markdown = '![Description de l\'image](url-de-l-image.jpg)\n\n'
      break
    case 'video':
      markdown = '<video controls>\n  <source src="url-de-la-video.mp4" type="video/mp4">\n  Votre navigateur ne supporte pas la balise vidéo.\n</video>\n\n'
      break
    case 'link':
      markdown = '[Texte du lien](https://exemple.com)\n\n'
      break
    case 'table':
      markdown = '| Colonne 1 | Colonne 2 | Colonne 3 |\n|-----------|-----------|----------|\n| Cellule 1 | Cellule 2 | Cellule 3 |\n| Cellule 4 | Cellule 5 | Cellule 6 |\n\n'
      break
    case 'code':
      markdown = '```javascript\n// Votre code ici\nconsole.log("Hello World!");\n```\n\n'
      break
  }

  insertAtCursor(markdown)
}

const insertAtCursor = (text) => {
  if (contentTextarea.value) {
    const textarea = contentTextarea.value
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // Insérer le texte à la position du curseur
    const currentValue = form.value.content
    form.value.content = currentValue.substring(0, start) + text + currentValue.substring(end)

    // Repositionner le curseur après le texte inséré
    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    })
  }
  else {
    // Si pas de référence au textarea, ajouter à la fin
    form.value.content += text
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

// Fonction pour mettre à jour la configuration d'un composant spécifique
const updateComponentConfig = (index, newConfig) => {
  if (list2.value[index] && !isUpdatingConfig) {
    isUpdatingConfig = true
    
    list2.value[index].config = { ...newConfig }
    
    // Si ce composant est actuellement sélectionné, mettre à jour la référence
    if (selectedComponentIndex.value === index) {
      selectedComponent.value = list2.value[index]
    }
    
    nextTick(() => {
      isUpdatingConfig = false
    })
  }
}

// Computed pour obtenir la configuration actuelle du composant sélectionné
const currentComponentConfig = computed(() => {
  if (selectedComponent.value) {
    return getCurrentConfig(selectedComponent.value)
  }
  return {}
})

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

// Validation des URL d'images
const isValidImageUrl = (url) => {
  if (!url) return true // URL vide est valide
  const imageUrlPattern = /\.(jpg|jpeg|png|gif|webp|svg)$/i
  const httpPattern = /^https?:\/\//
  return httpPattern.test(url) && (imageUrlPattern.test(url) || url.includes('picsum.photos') || url.includes('unsplash.com'))
}

// Validation des liens
const isValidLink = (link) => {
  if (!link) return false
  return link.startsWith('http') || link.startsWith('/') || link.startsWith('#')
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

// Méthodes utilitaires pour la mise à jour de configuration
const updateConfigField = (field, value) => {
  if (selectedComponent.value && selectedComponent.value.config && !isUpdatingConfig) {
    isUpdatingConfig = true
    selectedComponent.value.config[field] = value
    
    // Forcer la mise à jour dans list2
    if (selectedComponentIndex.value >= 0) {
      list2.value[selectedComponentIndex.value].config[field] = value
    }
    
    nextTick(() => {
      isUpdatingConfig = false
    })
  }
}

// Méthode pour obtenir une valeur de configuration
const getConfigValue = (field) => {
  if (selectedComponent.value && selectedComponent.value.config) {
    return selectedComponent.value.config[field]
  }
  return ''
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


