# Personal Tech Blog Application

## Overview

This is a full-stack tech blog application built with React and Express.js, featuring a bilingual (English/Korean) interface and dynamic markdown content loading. The application serves as a personal portfolio and blog platform with modern web technologies and responsive design.

## System Architecture

### Static Website Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for data management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Internationalization**: i18next for English/Korean language support
- **Theme**: Dark/light mode toggle with system preference detection
- **Build Tool**: Vite for fast development and optimized static builds

### Data Management
- **Static Data Service**: Client-side data management
- **Content Storage**: All blog posts and portfolio projects stored as static data
- **Type Safety**: TypeScript interfaces for all data structures
- **No Backend**: Fully client-side application for optimal performance

## Key Components

### Data Structure
1. **Blog Posts**: Static data with TypeScript interfaces
   - Content fields: slug, title, summary, content, category, language
   - Metadata: date, readTime, views, tags
   - Multi-language support with language field

2. **Portfolio Projects**: Static project data
   - Project details: title, summary, technologies, status
   - External links: demo URL, GitHub repository
   - Full content with markdown support

### Frontend Pages
- **Home**: Blog post listing with filtering by category/language
- **Blog Post**: Individual post view with markdown rendering
- **About**: Personal information and expertise showcase
- **Resume**: Professional experience and skills
- **Portfolio**: Project showcase with technical details

### UI Components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Support**: System-aware dark/light mode switching
- **Component Library**: shadcn/ui for consistent design patterns
- **Internationalization**: Full i18n support for UI text

## Data Flow

1. **Content Loading**: Posts can be loaded from database or markdown files
2. **Language Switching**: i18next handles locale changes and text updates
3. **Theme Management**: React Context provides theme state across components
4. **API Communication**: React Query manages server state with caching
5. **Routing**: Wouter handles client-side navigation with TypeScript support

## External Dependencies

### Core Framework Dependencies
- React ecosystem: react, react-dom, @vitejs/plugin-react
- Routing: wouter for lightweight client-side routing
- State management: @tanstack/react-query for data management
- Static data: TypeScript interfaces and client-side data service

### UI and Styling
- Tailwind CSS for utility-first styling
- shadcn/ui component library (@radix-ui components)
- Lucide React for icons
- class-variance-authority for component variants

### Development Tools
- TypeScript for type safety
- Vite for build tooling and development server
- ESBuild for production bundling
- TSX for TypeScript execution in development

## Deployment Strategy

### Development Environment
- **Development**: `npm run dev` - Vite development server
- **Hot Reload**: Vite HMR for instant frontend changes
- **Data**: Static data service with TypeScript interfaces

### Static Website Deployment
- **Build Command**: `npm run build`
- **Output**: `dist/` directory with optimized static files
- **Data**: Client-side static data service
- **Hosting**: Deploy to Vercel, Netlify, GitHub Pages, or any static host
- **Performance**: Instant loading, global CDN distribution, zero server costs

### Replit Configuration
- **Deployment**: Static website deployment via `.replit`
- **Build**: Automated build process with `npm run build`
- **Hosting**: Served from `dist/` directory

## Changelog

## Recent Changes

- June 20, 2025: Complete blog and portfolio markdown system implemented
- Created dynamic category-based blog structure: `/client/public/blog/{language}/{category}/`
- Blog categories: frontend, backend, devops, development (auto-detected from folder structure)
- Added comprehensive blog posts with images: React Performance, TypeScript, CSS, Node.js, Docker
- Enhanced markdown renderer with custom image display and captions
- Portfolio and blog both support full markdown content with frontmatter metadata
- Fixed duplicate image renderer and nested anchor tag warnings
- Static data service now loads markdown files dynamically with fallback support
- Categories are automatically generated from folder structure
- June 20, 2025: Initial blog setup complete
- Portfolio page fixed (Mail icon import)
- Language filtering simplified to match UI language selection
- Sample blog posts with images added (responsive design topic)
- Language codes standardized (en/ko instead of eng/kor)
- Portfolio converted to markdown-based system with detail pages
- Added portfolio project detail view with full content display
- Created sample portfolio projects with comprehensive content
- Added Korean/English language support for Portfolio, Resume, and About pages
- Implemented language-specific portfolio content loading
- Restructured portfolio folders: `/portfolio/eng/` for English, `/portfolio/kor/` for Korean
- Removed 'KR' language indicator from blog post cards, now shows tags instead
- Added proper Korean names and localized content for resume and other pages
- Separated home page (/) from blog page (/blog) with dedicated navigation
- Created new home page with hero section, features, and call-to-action areas
- Updated navigation to include Home, Blog as separate items
- Removed Home button from navigation (website title serves as home link)
- Modified home page to show welcome banner + blog posts below
- Enhanced blog page with left sidebar containing tags filter and stats
- Blog page now uses only timeline view grouped by year with visual timeline elements
- Implemented tag-based filtering allowing users to filter posts by specific tags
- Removed card backgrounds from Tags and Stats sections for cleaner, transparent design
- Reverted category filter design to previous simple dropdown style
- Updated resume page with Jin Kim's authentic information from provided PDF
- Replaced all placeholder content with real work experience, education, and skills
- Added authentic projects including ERP defect detection system and Photobyme business
- Converted to fully static website by removing all server components
- Created static data service to replace API calls for blog posts and portfolio
- Cleaned up unnecessary server files, database dependencies, and backend code
- Simplified to single build command for static deployment
- June 20, 2025: Fixed deployment configuration
- Updated Vite config to allow all hosts for Replit deployment
- Blog system fully functional with markdown loading and category-based structure

## User Preferences

Preferred communication style: Simple, everyday language.
Language filtering: Show posts based on selected UI language (en/ko) rather than separate language filter.
Content approach: Prefers markdown files over database storage for blog posts and portfolio projects.
Portfolio design: Keep current card design but click cards to navigate to detail pages with full markdown content.