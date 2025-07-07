import { type PortfolioProject } from '@/types';

interface PortfolioMetadata {
  title: string;
  summary: string;
  image: string;
  status: 'live' | 'development' | 'completed';
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface PortfolioProjectDetail extends PortfolioProject {
  content: string;
}

class DynamicPortfolioService {
  private cache = new Map<string, PortfolioProjectDetail[]>();
  private readonly baseUrl = '/portfolio';

  /**
   * Get all available portfolio projects from the /portfolio folder structure
   */
  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    const cacheKey = 'all-projects';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const projects: PortfolioProjectDetail[] = [];
    const languages = ['en', 'ko'];
    
    for (const language of languages) {
      const languageProjects = await this.getPortfolioProjectsByLanguage(language);
      projects.push(...languageProjects);
    }

    this.cache.set(cacheKey, projects);
    return projects;
  }

  /**
   * Get portfolio projects for a specific language
   */
  async getPortfolioProjectsByLanguage(language: string): Promise<PortfolioProjectDetail[]> {
    const cacheKey = `projects-${language}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const projects: PortfolioProjectDetail[] = [];
    
    try {
      // Get available projects by trying to fetch from potential files
      const projectFiles = await this.getAvailableProjectFiles(language);
      
      for (const filename of projectFiles) {
        const project = await this.loadProjectFromFile(language, filename);
        if (project) {
          projects.push(project);
        }
      }
    } catch (error) {
      console.warn(`No projects found for language: ${language}`, error);
    }

    this.cache.set(cacheKey, projects);
    return projects;
  }

  /**
   * Get a specific portfolio project by slug and language
   */
  async getPortfolioProject(slug: string, language: string): Promise<PortfolioProjectDetail | undefined> {
    const projects = await this.getPortfolioProjectsByLanguage(language);
    return projects.find(p => p.slug === slug);
  }

  /**
   * Get portfolio project by language (compatibility with existing API)
   */
  async getPortfolioProjectByLanguage(slug: string, language: string): Promise<PortfolioProjectDetail | undefined> {
    return this.getPortfolioProject(slug, language);
  }

  /**
   * Get available project files for a specific language by trying comprehensive filename patterns
   */
  private async getAvailableProjectFiles(language: string): Promise<string[]> {
    const availableFiles: string[] = [];
    
    // Generate comprehensive list of potential project filenames
    const potentialFiles = this.generatePotentialProjectFilenames();

    // Test each potential filename
    const filePromises = potentialFiles.map(async (filename) => {
      try {
        const response = await fetch(`${this.baseUrl}/${language}/${filename}`);
        if (response.ok) {
          return filename;
        }
      } catch (error) {
        // File doesn't exist
      }
      return null;
    });

    const results = await Promise.all(filePromises);
    const foundFiles = results.filter((filename): filename is string => filename !== null);
    
    return foundFiles;
  }

  /**
   * Generate potential project filenames based on common naming patterns
   */
  private generatePotentialProjectFilenames(): string[] {
    const filenames: string[] = [];
    
    // Common project types and names
    const commonProjects = [
      // E-commerce & Business
      'ecommerce-platform.md', 'online-store.md', 'marketplace.md', 'crm-system.md',
      'inventory-management.md', 'pos-system.md', 'booking-platform.md', 'payment-gateway.md',
      
      // Web Applications
      'web-app.md', 'dashboard.md', 'admin-panel.md', 'user-portal.md',
      'content-management.md', 'blog-platform.md', 'social-network.md', 'forum.md',
      
      // Mobile & Desktop Apps
      'mobile-app.md', 'ios-app.md', 'android-app.md', 'desktop-app.md',
      'cross-platform-app.md', 'react-native-app.md', 'flutter-app.md', 'electron-app.md',
      
      // AI & Machine Learning
      'ai-chatbot.md', 'ml-model.md', 'data-analysis.md', 'recommendation-engine.md',
      'image-recognition.md', 'nlp-project.md', 'predictive-analytics.md', 'computer-vision.md',
      
      // DevOps & Infrastructure
      'kubernetes-deployment.md', 'ci-cd-pipeline.md', 'monitoring-system.md', 'cloud-migration.md',
      'docker-setup.md', 'terraform-infrastructure.md', 'automation-tools.md', 'backup-system.md',
      
      // Games & Entertainment
      'game-development.md', 'mobile-game.md', 'web-game.md', 'unity-game.md',
      'puzzle-game.md', 'arcade-game.md', 'educational-game.md', 'simulation-game.md',
      
      // APIs & Microservices
      'api-gateway.md', 'microservice.md', 'rest-api.md', 'graphql-api.md',
      'webhook-service.md', 'integration-platform.md', 'data-sync.md', 'real-time-api.md',
      
      // Development Tools
      'code-generator.md', 'build-tool.md', 'testing-framework.md', 'deployment-tool.md',
      'cli-tool.md', 'vscode-extension.md', 'npm-package.md', 'library.md',
      
      // Generic patterns
      'project-1.md', 'project-2.md', 'project-3.md', 'project-4.md', 'project-5.md',
      'portfolio-1.md', 'portfolio-2.md', 'portfolio-3.md',
      'main-project.md', 'featured-project.md', 'latest-project.md',
      'personal-project.md', 'client-project.md', 'open-source.md',
      'index.md', 'overview.md', 'showcase.md', 'demo.md'
    ];

    filenames.push(...commonProjects);
    
    // Remove duplicates and return
    return Array.from(new Set(filenames));
  }

  /**
   * Load a portfolio project from a markdown file
   */
  private async loadProjectFromFile(language: string, filename: string): Promise<PortfolioProjectDetail | null> {
    try {
      const url = `${this.baseUrl}/${language}/${filename}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        return null;
      }

      const markdownContent = await response.text();
      
      // Parse frontmatter
      const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!frontmatterMatch) {
        console.warn(`Invalid markdown format in ${url}`);
        return null;
      }

      const frontmatter = frontmatterMatch[1];
      const content = frontmatterMatch[2];
      
      // Parse frontmatter fields
      const metadata: Partial<PortfolioMetadata> = {};
      frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        
        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          const arrayValue = value.slice(1, -1)
            .split(',')
            .map(item => item.trim().replace(/"/g, ''));
          (metadata as any)[key] = arrayValue;
        } else if (key === 'featured') {
          // Parse boolean
          (metadata as any)[key] = value.toLowerCase() === 'true';
        } else {
          (metadata as any)[key] = value;
        }
      });

      // Generate slug from filename
      const slug = filename.replace('.md', '');

      return {
        slug,
        title: metadata.title || 'Untitled Project',
        summary: metadata.summary || '',
        image: metadata.image || '',
        status: metadata.status || 'completed',
        technologies: metadata.technologies || [],
        demoUrl: metadata.demoUrl,
        githubUrl: metadata.githubUrl,
        featured: metadata.featured || false,
        content
      };
    } catch (error) {
      console.error(`Error loading project ${language}/${filename}:`, error);
      return null;
    }
  }

  /**
   * Clear cache (useful for development or when projects are updated)
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const dynamicPortfolioService = new DynamicPortfolioService();
