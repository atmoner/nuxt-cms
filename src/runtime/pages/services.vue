<template>
  <NuxtLayout name="cms">
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold text-center mb-8">
        Nos Services
      </h1>

      <div class="max-w-4xl mx-auto">
        <!-- Section d'introduction -->
        <div class="text-center mb-12">
          <p class="text-lg text-gray-600 mb-8">
            Découvrez tous les services que nous proposons pour répondre à vos besoins.
          </p>
        </div>

        <!-- Liste des services -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <div class="mb-4">
                <svg
                  class="w-12 h-12 mx-auto text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800">
                Gestion de Contenu
              </h3>
              <p class="text-gray-600">
                Créez et gérez facilement votre contenu avec notre interface intuitive.
              </p>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <div class="mb-4">
                <svg
                  class="w-12 h-12 mx-auto text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800">
                Performance
              </h3>
              <p class="text-gray-600">
                Bénéficiez d'un site rapide et optimisé pour une excellente expérience utilisateur.
              </p>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <div class="mb-4">
                <svg
                  class="w-12 h-12 mx-auto text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800">
                Sécurité
              </h3>
              <p class="text-gray-600">
                Protégez vos données avec nos solutions de sécurité avancées.
              </p>
            </div>
          </div>
        </div>

        <!-- Section contact -->
        <div class="text-center mt-12 p-8 bg-gray-100 rounded-lg">
          <h2 class="text-2xl font-semibold mb-4">
            Besoin d'aide ?
          </h2>
          <p class="text-gray-600 mb-6">
            Notre équipe est là pour vous accompagner dans tous vos projets.
          </p>
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Cette page utilise le header CmsHeader qui gère automatiquement la navigation
</script>
