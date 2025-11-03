# Project: Envision Construction Services Main Website

## Project Overview

This project is the main website for Envision Construction Services, a company that provides construction services in Florida. The website is built with Nuxt.js, a modern web framework for building Vue.js applications. It uses Nuxt Content for managing the website's content, particularly for projects, and Nuxt UI for the user interface components. The website is designed to be responsive and modern, with a clear and professional design.

### Key Technologies

- **Framework:** [Nuxt.js](https://nuxt.com/)
- **UI Framework:** [Nuxt UI](https://ui.nuxt.com/)
- **Content Management:** [Nuxt Content](https://content.nuxt.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via Nuxt UI)
- **Analytics:** [PostHog](https://posthog.com/)
- **Deployment:** [Vercel](https://vercel.com/)

### Architecture

The project follows a standard Nuxt.js project structure.

- **`app/`**: Contains the main application components, layouts, pages, and assets.
  - `app/app.vue`: The main application component.
  - `app/layouts/default.vue`: The default layout for the pages.
  - `app/pages/`: Contains the pages of the website.
  - `app/components/`: Contains the Vue components used throughout the website.
  - `app/assets/`: Contains the static assets like CSS and images.
- **`content/`**: Contains the content for the website, managed by Nuxt Content.
  - `content/projects/`: Contains the individual project files in Markdown format.
- **`server/`**: Contains the server-side API endpoints.
  - `server/api/projects/index.get.ts`: An API endpoint to fetch all projects.
- **`public/`**: Contains the public assets that are directly accessible.
- **`nuxt.config.ts`**: The main configuration file for the Nuxt.js application.
- **`package.json`**: Defines the project's dependencies and scripts.

## Building and Running

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

Install the project dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Production

To build the application for production:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

## Development Conventions

### Coding Style

The project uses [ESLint](https://eslint.org/) for code linting, with a configuration based on `@antfu/eslint-config`. It is recommended to use an editor with ESLint integration to ensure code quality and consistency.

To run the linter:

```bash
bun lint
```

To automatically fix linting issues:

```bash
bun lint:fix
```

### Git Hooks

The project uses [Husky](https://typicode.github.io/husky/) to run `lint-staged` before each commit. This ensures that all staged files are properly linted before they are committed to the repository.

### Content Management

The website's content is managed using Nuxt Content. The content is written in Markdown and is located in the `content/` directory. The schema for the content is defined in `content.config.ts` using `zod` for validation.

### API

The project has a server-side API endpoint to fetch all projects from the `content/projects/` directory. The API endpoint is located at `server/api/projects/index.get.ts`.

## Current Tasks

### Completed
- **Contact Form:**
  - [x] Integrated with Formspark for submissions.
- **Footer:**
  - [x] Updated footer links based on the sitemap.
- **Navigation:**
  - [x] Updated top-level navigation to include "Projects" and "Meet the Team".
- **Services Pages:**
  - [x] Created a main `services` page.
  - [x] Created individual pages for each service.
- **Team Members Page:**
  - [x] Set up Nuxt content for team members.
  - [x] Created a main index page for team members.
  - [x] Created a dynamic page for individual team members.

### Up Next
- **Location Maps:**
  - [ ] Add interactive maps to the contact page (User is working on this).
- **Typography Component:**
  - [ ] Create a reusable typography component.
- **Styling:**
  - [ ] Style the projects page.
    - [x] Full page layout (Mobile and Desktop)
    - [ ] Hero layout
    - [ ] Project list
    - [ ] Project cards
  - [ ] Style the individual project pages.
- **Hero Banners:**
  - [ ] Update hero banners for non-homepage pages.
