# Portfolio Website

## Overview

This is a modern, professional portfolio website built to showcase frontend engineering and AI integration expertise. The site features a React-based frontend with Express.js backend, designed with glassmorphism aesthetics, smooth animations, and interactive components. It includes sections for hero introduction, about/timeline, project showcase, skills demonstration, testimonials, and contact form functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Component Library**: Shadcn/UI components providing consistent, accessible UI primitives
- **Animations**: Framer Motion for smooth page transitions, scroll-triggered animations, and interactive effects
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the full stack
- **API Design**: RESTful endpoints with structured error handling and logging middleware
- **Email Service**: Nodemailer for contact form submissions with SMTP configuration
- **Validation**: Zod schemas for runtime type validation and data sanitization

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud hosting
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Session Storage**: In-memory storage with extensible interface for future persistence

### Authentication and Authorization
- **Current Implementation**: Basic user schema with username/password structure
- **Storage**: In-memory user storage with interface for database integration
- **Security**: Prepared for session management and secure authentication flows

### Theme and Styling System
- **Design System**: Custom CSS variables supporting light/dark themes
- **Colors**: Neutral base palette with blue/purple accent gradients
- **Typography**: Inter font family with responsive sizing
- **Components**: Consistent styling across UI components with variant-based customization

### Development and Build Process
- **Development**: Hot module replacement with Vite dev server
- **Production Build**: Optimized bundling with ESBuild for server-side code
- **Type Checking**: Comprehensive TypeScript configuration across client/server/shared code
- **Code Organization**: Monorepo structure with shared schemas and utilities

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with validation resolvers
- **Backend Framework**: Express.js with TypeScript support and middleware
- **Database**: Drizzle ORM with PostgreSQL adapter and Neon serverless driver
- **Build Tools**: Vite, ESBuild, TypeScript compiler, PostCSS with Tailwind

### UI and Animation Libraries
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Animations**: Framer Motion for complex animations and gesture handling
- **Icons**: Lucide React for consistent iconography

### Utility Libraries
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **State Management**: TanStack React Query for server state and caching
- **Date Handling**: date-fns for date formatting and manipulation
- **Utility Functions**: clsx and tailwind-merge for conditional styling

### Email and Communication
- **Email Service**: Nodemailer for SMTP email sending
- **Validation**: Zod for runtime schema validation
- **Session Storage**: connect-pg-simple for PostgreSQL session store

### Development and DevOps
- **Type System**: TypeScript with comprehensive type definitions
- **Development Tools**: Replit-specific plugins for development environment
- **Package Management**: NPM with lock file for dependency consistency
- **Environment**: Node.js ESM modules with modern JavaScript features