# Nuxt CMS

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A complete Nuxt 3 module for creating and managing a Content Management System (CMS) with admin interface, blog, and visual page builder.

## Features

### 🎨 **Visual Page Builder**
- Drag & drop interface for creating pages
- Pre-built components (Hero, Cards, FAQ, Pricing, Team, Contact)
- Real-time component configuration
- Live preview of modifications

### 📝 **Complete Blog System**
- Article creation and editing with rich editor
- Categories, tags, and status management
- Featured images and excerpts
- SEO optimization (meta descriptions, keywords)
- Pagination and search filters

### 🔐 **Secure Admin Interface**
- JWT authentication
- Modern and responsive dashboard
- Page and article management
- Contact and form management
- Dark/light interface with Tailwind CSS

### 📊 **Contact Management**
- Contact message reception and management
- Message viewing interface
- Email response system
- Pagination and search

### 🛠 **Integrated RESTful API**
- Endpoints for pages, blog, authentication
- JSON database with LowDB
- Automatic slug and ID management
- Data validation

### 🎯 **Ready-to-Use Components**
- `CmsHeader` - Customizable site header
- `AdminHeader` - Admin navigation
- `rawDisplayer` - Raw content display
- Builder components: `HeroSection`, `Card`, `Faq`, `Pricing`, `TeamSection`, `ContactForm`



## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-cms
```

Then start your application:

```bash
npm run dev
```

## Initial Configuration

1. **Access installation**: Visit `/nuxt-cms/install` to configure your CMS
2. **Create admin account**: Set your username and password
3. **Login**: Access administration via `/nuxt-cms/admin/login`

## URL Structure

### Public Pages
- `/` - Homepage
- `/blog` - Blog article list
- `/blog/[slug]` - Individual blog article
- `/[slug]` - Dynamic page created with the builder

### Administration
- `/nuxt-cms/install` - Initial installation
- `/nuxt-cms/admin/login` - Admin login
- `/nuxt-cms/admin` - Main dashboard
- `/nuxt-cms/admin/pages` - Page management
- `/nuxt-cms/admin/page-new` - Create new page
- `/nuxt-cms/admin/page-edit` - Edit page
- `/nuxt-cms/admin/blog` - Blog management
- `/nuxt-cms/admin/blog/new` - Create article
- `/nuxt-cms/admin/blog-edit` - Edit article
- `/nuxt-cms/admin/contacts` - Contact management

## Using Composables

### useAuth()
User authentication management:

```typescript
const { user, login, logout, verifyToken, isAuthenticated } = useAuth()

// Login
await login('username', 'password')

// Logout
await logout()

// Verify token
const isValid = await verifyToken()
```

### useBlog()
Blog article management:

```typescript
const { getArticles, getArticle, createArticle, updateArticle, deleteArticle } = useBlog()

// Get all articles
const articles = await getArticles({ status: 'published', limit: 10 })

// Create an article
await createArticle({
  title: 'My Article',
  slug: 'my-article',
  content: 'Article content...',
  status: 'published'
})
```

### usePages()
Page management:

```typescript
const { fetchPages, fetchPage, createPage, updatePage, deletePage } = usePages()

// Get all pages
const pages = await fetchPages()

// Create a page with components
await createPage({
  title: 'My Page',
  slug: 'my-page',
  components: [
    { component: 'HeroSection', config: { title: 'Welcome' } }
  ]
})
```

## API Endpoints

The module automatically exposes these endpoints:

### Authentication
- `POST /api/nuxt-cms/auth/login` - Login
- `POST /api/nuxt-cms/auth/logout` - Logout
- `POST /api/nuxt-cms/auth/verify` - Token verification

### Blog
- `GET /api/nuxt-cms/blog` - Article list
- `POST /api/nuxt-cms/blog` - Create article
- `GET /api/nuxt-cms/blog/[id]` - Get article
- `PUT /api/nuxt-cms/blog/[id]` - Update article
- `DELETE /api/nuxt-cms/blog/[id]` - Delete article

### Pages
- `GET /api/nuxt-cms/pages` - Page list
- `POST /api/nuxt-cms/pages` - Create page
- `GET /api/nuxt-cms/pages/[id]` - Get page
- `PUT /api/nuxt-cms/pages/[id]` - Update page
- `DELETE /api/nuxt-cms/pages/[id]` - Delete page

### Contacts
- `POST /api/contact` - Send contact message
- `GET /api/nuxt-cms/admin/contacts` - Contact list (admin)

## Customization

### Custom Builder Components

You can extend the page builder by creating your own components:

```vue
<!-- components/builder/MyComponent.vue -->
<template>
  <div class="my-component">
    <h2>{{ config.title }}</h2>
    <p>{{ config.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['config'])
</script>
```

### Styling

The module uses Tailwind CSS. You can customize styles by extending your Tailwind configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    // Your files...
  ],
  theme: {
    extend: {
      // Customizations...
    }
  }
}
```

## Module Configuration

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-cms'],
  'nuxt-cms': {
    // Configuration options (coming soon)
  }
})
```

## Data Structure

### Blog Article
```typescript
interface BlogArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  meta_description?: string
  meta_keywords?: string
  author: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}
```

### Page
```typescript
interface Page {
  id: string
  title: string
  slug: string
  meta_description?: string
  meta_keywords?: string
  components: PageComponent[]
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

interface PageComponent {
  id: string
  component: string
  config: Record<string, any>
}
```

## Security

- JWT authentication with secure cookies
- Server-side data validation
- Automatic CSRF protection
- Authentication middleware for admin routes
- Password hashing with bcrypt

## Contributing

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run tests
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

## Included Test Scripts

The module includes utility scripts in the `scripts/` folder:

- `hash-password.js` - Generate password hash for administration
- `test-login.js` - Test authentication API login

## Roadmap

### Upcoming Features
- [ ] Media system (image upload)
- [ ] Advanced WYSIWYG editor
- [ ] Customizable themes
- [ ] Comment system
- [ ] Multi-user management
- [ ] Content export/import
- [ ] GraphQL API
- [ ] External service integrations
- [ ] Advanced caching system
- [ ] Built-in analytics

## Support

If you encounter issues or have questions:

1. Check the [documentation](README.md)
2. Browse [GitHub issues](issues)
3. Create a new issue with the appropriate tag

## License

MIT License - see the [LICENSE](LICENSE) file for more details.

## Acknowledgments

This module uses the following technologies:
- [Nuxt 3](https://nuxt.com/) - Vue.js Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [LowDB](https://github.com/typicode/lowdb) - JSON Database
- [JWT](https://jwt.io/) - Authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password Hashing
- [Vue Draggable](https://github.com/SortableJS/vue.draggable.next) - Drag & Drop Interface


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-cms/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-cms

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-cms.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-cms

[license-src]: https://img.shields.io/npm/l/nuxt-cms.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-cms

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
