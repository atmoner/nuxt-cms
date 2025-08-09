import { defineNuxtModule, addPlugin, addComponent, createResolver, installModule, addServerHandler, addRouteMiddleware, addImports, addComponentsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-cms',
    configKey: 'nuxt-cms',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // From the runtime directory
    addComponent({
      name: 'CmsHeader', // name of the component to be used in vue templates
      filePath: resolver.resolve('runtime/components/CmsHeader.vue'),
    })

    addComponent({
      name: 'AdminHeader', // name of the component to be used in vue templates
      filePath: resolver.resolve('runtime/components/AdminHeader.vue'),
    })
    addComponent({
      name: 'rawDisplayer', // name of the component to be used in vue templates
      filePath: resolver.resolve('runtime/components/rawDisplayer.vue'),
    })

    addComponentsDir({
      path: resolver.resolve('runtime/components/builder/')
    })

    // Add auth middleware
    addRouteMiddleware({
      name: 'auth',
      path: resolver.resolve('./runtime/middleware/auth'),
    })

    // Add useAuth composable
    addImports({
      name: 'useAuth',
      from: resolver.resolve('./runtime/composables/useAuth'),
    })

    // Add usePages composable
    addImports({
      name: 'usePages',
      from: resolver.resolve('./runtime/composables/usePages'),
    })

    // Add useBlog composable
    addImports({
      name: 'useBlog',
      from: resolver.resolve('./runtime/composables/useBlog'),
    })

    // Install @nuxtjs/tailwindcss
    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolver.resolve('./runtime/pages/**/*.{vue,mjs,ts}'),
            resolver.resolve('./runtime/*.{mjs,js,ts}'),
          ],
        },
      },
    })
    // Create pages
    _nuxt.hook('pages:extend', (pages) => {
      // Inject the home page from the module
      pages.push({
        name: 'index',
        path: '/',
        file: resolver.resolve('./runtime/pages/index.vue'),
      })
      // Inject the install page from the module
      pages.push({
        name: 'install',
        path: '/nuxt-cms/install',
        file: resolver.resolve('./runtime/pages/install.vue'),
      })
      // Inject the pages listing page from the module
      pages.push({
        name: 'pages',
        path: '/nuxt-cms/pages',
        file: resolver.resolve('./runtime/pages/pages.vue'),
      })
      // Inject the dynamic page display from the module
      pages.push({
        name: 'page-slug',
        path: '/:slug',
        file: resolver.resolve('./runtime/pages/page/[slug].vue'),
      })
      // Inject the blog index page from the module
      pages.push({
        name: 'blog',
        path: '/blog',
        file: resolver.resolve('./runtime/pages/blog/index.vue'),
      })
      // Inject the dynamic blog post display from the module
      pages.push({
        name: 'blog-slug',
        path: '/blog/:slug',
        file: resolver.resolve('./runtime/pages/blog/[slug].vue'),
      })
      pages.push({
        name: 'admin',
        path: '/nuxt-cms/admin',
        file: resolver.resolve('./runtime/pages/admin/index.vue'),
      })
      pages.push({
        name: 'admin-pages',
        path: '/nuxt-cms/admin/pages',
        file: resolver.resolve('./runtime/pages/admin/pages.vue'),
      })
      // Inject the admin pages new page from the module
      pages.push({
        name: 'admin-pages-new',
        path: '/nuxt-cms/admin/page-new',
        file: resolver.resolve('./runtime/pages/admin/page-new.vue'),
      })
      pages.push({
        name: 'admin-pages-edit',
        path: '/nuxt-cms/admin/page-edit',
        file: resolver.resolve('./runtime/pages/admin/page-edit.vue'),
      })
      // Inject the admin blog listing page from the module
      pages.push({
        name: 'admin-blog',
        path: '/nuxt-cms/admin/blog',
        file: resolver.resolve('./runtime/pages/admin/blog.vue'),
      })
      // Inject the admin blog new post page from the module
      pages.push({
        name: 'admin-blog-new',
        path: '/nuxt-cms/admin/blog/new',
        file: resolver.resolve('./runtime/pages/admin/blog-new.vue'),
      })
      // Inject the admin blog edit post page from the module
      pages.push({
        name: 'admin-blog-edit',
        path: '/nuxt-cms/admin/blog-edit',
        file: resolver.resolve('./runtime/pages/admin/blog-edit.vue'),
      })
      // Inject the admin blog edit post page with dynamic route from the module
      pages.push({
        name: 'admin-blog-edit-dynamic',
        path: '/nuxt-cms/admin/blog/edit/:id',
        file: resolver.resolve('./runtime/pages/admin/blog/edit/[id].vue'),
      })
      pages.push({
        name: 'adminLogin',
        path: '/nuxt-cms/admin/login',
        file: resolver.resolve('./runtime/pages/admin/login.vue'),
      })
      pages.push({
        name: 'adminContact',
        path: '/nuxt-cms/admin/contacts',
        file: resolver.resolve('./runtime/pages/admin/contacts.vue'),
      })       
    })

    // Add server handler for the module
    addServerHandler({
      route: '/api/nuxt-cms/install',
      handler: resolver.resolve('./runtime/server/api/install/index.post'),
      method: 'post',
    })
    addServerHandler({
      route: '/api/nuxt-cms/install',
      handler: resolver.resolve('./runtime/server/api/install/index.get'),
      method: 'get',
    })

    // Add auth handlers
    addServerHandler({
      route: '/api/nuxt-cms/auth/login',
      handler: resolver.resolve('./runtime/server/api/auth/login.post'),
      method: 'post',
    })
    addServerHandler({
      route: '/api/nuxt-cms/auth/verify',
      handler: resolver.resolve('./runtime/server/api/auth/verify.post'),
      method: 'post',
    })
    addServerHandler({
      route: '/api/nuxt-cms/auth/logout',
      handler: resolver.resolve('./runtime/server/api/auth/logout.post'),
      method: 'post',
    })
    addServerHandler({
      route: '/api/nuxt-cms/auth/change-password',
      handler: resolver.resolve('./runtime/server/api/auth/change-password.post'),
      method: 'post',
    })

    // Add pages handlers
    addServerHandler({
      route: '/api/nuxt-cms/pages',
      handler: resolver.resolve('./runtime/server/api/pages/index.get'),
      method: 'get',
    })
    addServerHandler({
      route: '/api/nuxt-cms/pages',
      handler: resolver.resolve('./runtime/server/api/pages/index.post'),
      method: 'post',
    })
    addServerHandler({
      route: '/api/nuxt-cms/pages/:id',
      handler: resolver.resolve('./runtime/server/api/pages/[id].get'),
      method: 'get',
    })
    addServerHandler({
      route: '/api/nuxt-cms/pages/:id',
      handler: resolver.resolve('./runtime/server/api/pages/[id].put'),
      method: 'put',
    })
    addServerHandler({
      route: '/api/nuxt-cms/pages/:id',
      handler: resolver.resolve('./runtime/server/api/pages/[id].delete'),
      method: 'delete',
    })

    // Add page components handlers
    addServerHandler({
      route: '/api/nuxt-cms/pages/:id/components',
      handler: resolver.resolve('./runtime/server/api/pages/[id]/components.get'),
      method: 'get',
    })
    addServerHandler({
      route: '/api/nuxt-cms/pages/:id/components',
      handler: resolver.resolve('./runtime/server/api/pages/[id]/components.put'),
      method: 'put',
    })

    // Add blog handlers
    addServerHandler({
      route: '/api/nuxt-cms/blog',
      handler: resolver.resolve('./runtime/server/api/blog/index.get'),
      method: 'get',
    })
    addServerHandler({
      route: '/api/nuxt-cms/blog',
      handler: resolver.resolve('./runtime/server/api/blog/index.post'),
      method: 'post',
    })
    addServerHandler({
      route: '/api/nuxt-cms/blog/:id',
      handler: resolver.resolve('./runtime/server/api/blog/[id].get'),
      method: 'get',
    })
    addServerHandler({
      route: '/api/nuxt-cms/blog/:id',
      handler: resolver.resolve('./runtime/server/api/blog/[id].put'),
      method: 'put',
    })
    addServerHandler({
      route: '/api/nuxt-cms/blog/:id',
      handler: resolver.resolve('./runtime/server/api/blog/[id].delete'),
      method: 'delete',
    })

    // Add contact handler
    addServerHandler({
      route: '/api/contact',
      handler: resolver.resolve('./runtime/server/api/contact.post'),
      method: 'post',
    })

    // Add admin contacts handlers
    addServerHandler({
      route: '/api/nuxt-cms/admin/contacts',
      handler: resolver.resolve('./runtime/server/api/admin/contacts.get'),
      method: 'get',
    })
    addServerHandler({
      route: '/api/nuxt-cms/admin/contacts/:id',
      handler: resolver.resolve('./runtime/server/api/admin/contacts/[id].delete'),
      method: 'delete',
    })
  },
})
