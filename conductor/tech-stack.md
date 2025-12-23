# Technology Stack

This document outlines the core technologies used in the Envision Construction Services website project.

## Core Framework & Language

- **Nuxt 4:** A modern Vue.js framework for building optimized web applications.
- **Vue 3:** The underlying reactive UI framework.
- **TypeScript:** Ensuring type safety and better developer experience across the codebase.

## Frontend & UI

- **Nuxt UI v4:** Providing a set of high-quality UI components built on top of Tailwind CSS.
- **Tailwind CSS:** For utility-first styling and rapid UI development.
- **Motion-v & VueUse/Motion:** For creating fluid, high-performance animations and transitions.

## Content & Data

- **Nuxt Content v3:** Managing the project portfolio, team bios, and service descriptions using Markdown and a local SQLite database.
- **Better-SQLite3:** The high-performance database engine used by Nuxt Content.

## Tooling & Infrastructure

- **pnpm:** The fast, disk space efficient package manager.
- **PostHog:** Providing comprehensive product analytics and user tracking.
- **ESLint & Prettier:** For maintaining code quality and consistent formatting (using @antfu/eslint-config).
- **Husky & lint-staged:** For running quality checks before every commit.

## Deployment & Runtime

- **Node.js:** The primary runtime environment.
- **Vercel:** The deployment and hosting platform for the Nuxt application.
