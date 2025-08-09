interface ComponentsResponse {
  components?: any[]
}

export const usePageComponents = () => {
  /**
   * Charger les composants d'une page
   * @param {string} pageId - L'ID de la page
   * @returns {Promise<Array>} Les composants de la page
   */
  const loadComponents = async (pageId: string) => {
    if (!pageId) {
      throw new Error('Page ID is required')
    }

    try {
      const response = await $fetch<ComponentsResponse>(`/api/nuxt-cms/pages/${pageId}/components`, {
        method: 'GET',
      })

      return response.components || []
    } catch (error) {
      console.error('Erreur lors du chargement des composants:', error)
      return []
    }
  }

  /**
   * Sauvegarder les composants d'une page
   * @param {string} pageId - L'ID de la page
   * @param {Array} components - Les composants à sauvegarder
   * @returns {Promise<Object>} La réponse de l'API
   */
  const saveComponents = async (pageId: string, components: any[]) => {
    if (!pageId) {
      throw new Error('Page ID is required')
    }

    if (!Array.isArray(components)) {
      throw new Error('Components must be an array')
    }

    try {
      const response = await $fetch(`/api/nuxt-cms/pages/${pageId}/components`, {
        method: 'PUT',
        body: {
          components
        }
      })

      return response
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des composants:', error)
      throw error
    }
  }

  /**
   * Obtenir la configuration par défaut pour un type de composant
   * @param {string} componentType - Le type de composant
   * @returns {Object} La configuration par défaut
   */
  const getDefaultConfig = (componentType: string) => {
    const defaults = {
      HeroSection: () => ({
        title: 'Titre principal',
        subtitle: 'Votre sous-titre ici',
        buttonText: 'Commencer',
        buttonLink: '#'
      }),
      Card: () => ({
        title: 'Titre de la carte',
        description: 'Description de la carte',
        imageUrl: '',
        category: 'Catégorie',
        link: '#'
      }),
      Pricing: () => ({
        planName: 'Plan Basic',
        price: '29€/mois',
        features: 'Fonctionnalité 1\nFonctionnalité 2\nFonctionnalité 3'
      }),
      Faq: () => ({
        question: 'Votre question ici',
        answer: 'La réponse à votre question'
      }),
      TeamSection: () => ({
        name: 'John Doe',
        position: 'Développeur Senior',
        bio: 'Biographie du membre de l\'équipe',
        photoUrl: ''
      })
    }
    
    // Retourner une nouvelle instance à chaque appel
    const factory = defaults[componentType as keyof typeof defaults]
    return factory ? factory() : {}
  }

  /**
   * Valider un composant
   * @param {Object} component - Le composant à valider
   * @returns {boolean} True si le composant est valide
   */
  const validateComponent = (component: any) => {
    if (!component || typeof component !== 'object') {
      return false
    }

    if (!component.component || typeof component.component !== 'string') {
      return false
    }

    if (!component.config || typeof component.config !== 'object') {
      return false
    }

    return true
  }

  /**
   * Créer un nouveau composant avec configuration par défaut
   * @param {string} componentType - Le type de composant
   * @returns {Object} Le nouveau composant
   */
  const createComponent = (componentType: string) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: componentType,
      component: componentType,
      config: getDefaultConfig(componentType)
    }
  }

  return {
    loadComponents,
    saveComponents,
    getDefaultConfig,
    validateComponent,
    createComponent
  }
}
