import { type BlogPost } from '@/types';

interface BlogMetadata {
  title: string;
  date: string;
  category: string;
  summary: string;
  tags: string[];
  readTime: number;
  author: string;
}

class DynamicBlogService {
  private cache = new Map<string, BlogPost[]>();
  private readonly baseUrl = '/blog';

  /**
   * Get all available blog posts from the /blog folder structure
   */
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const cacheKey = 'all-posts';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const posts: BlogPost[] = [];
    const languages = ['en', 'ko'];
    
    for (const language of languages) {
      const languagePosts = await this.getBlogPostsByLanguage(language);
      posts.push(...languagePosts);
    }

    this.cache.set(cacheKey, posts);
    return posts;
  }

  /**
   * Get blog posts for a specific language
   */
  async getBlogPostsByLanguage(language: string): Promise<BlogPost[]> {
    const cacheKey = `posts-${language}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const posts: BlogPost[] = [];
    
    try {
      // Get available categories by trying to fetch from known structure
      const categories = await this.getAvailableCategories(language);
      
      for (const category of categories) {
        const categoryPosts = await this.getPostsFromCategory(language, category);
        posts.push(...categoryPosts);
      }
    } catch (error) {
      console.warn(`No posts found for language: ${language}`, error);
    }

    this.cache.set(cacheKey, posts);
    return posts;
  }

  /**
   * Get blog posts for a specific category
   */
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const allPosts = await this.getAllBlogPosts();
    return allPosts.filter(post => post.category === category);
  }

  /**
   * Get a specific blog post by slug, language, and optional category
   */
  async getBlogPost(slug: string, language: string, category?: string): Promise<BlogPost | undefined> {
    const posts = await this.getBlogPostsByLanguage(language);
    
    let post = posts.find(p => p.slug === slug);
    
    if (category && post) {
      post = posts.find(p => p.slug === slug && p.category === category);
    }
    
    return post;
  }

  /**
   * Get all unique categories from all posts
   */
  async getAllCategories(): Promise<string[]> {
    const allPosts = await this.getAllBlogPosts();
    const categories = Array.from(new Set(allPosts.map(post => post.category)));
    return categories.sort();
  }

  /**
   * Get available categories for a specific language by dynamically discovering folder structure
   */
  private async getAvailableCategories(language: string): Promise<string[]> {
    const availableCategories: string[] = [];
    
    // Try to discover categories by testing common naming patterns and actual folders
    // This approach works by attempting to fetch from potential category directories
    const potentialCategories = [
      // Common technical categories
      'frontend', 'backend', 'devops', 'engineering', 'fullstack',
      'react', 'nodejs', 'javascript', 'typescript', 'python',
      'database', 'security', 'performance', 'testing', 'deployment',
      // Numbered categories (for flexible organization)
      'category1', 'category2', 'category3', 'category4', 'category5',
      // General categories
      'tutorial', 'guide', 'tips', 'news', 'opinion', 'review',
      'architecture', 'design', 'ux', 'ui', 'mobile', 'web',
      // Specific technologies
      'aws', 'docker', 'kubernetes', 'microservices', 'api',
      'graphql', 'rest', 'sql', 'nosql', 'redis', 'mongodb'
    ];

    // Test each potential category by trying to fetch posts from it
    const categoryPromises = potentialCategories.map(async (category) => {
      try {
        const posts = await this.getPostsFromCategory(language, category);
        if (posts.length > 0) {
          return category;
        }
      } catch (error) {
        // Category doesn't exist or has no posts
      }
      return null;
    });

    const results = await Promise.all(categoryPromises);
    const foundCategories = results.filter((category): category is string => category !== null);
    
    availableCategories.push(...foundCategories);
    
    // Sort categories alphabetically
    return availableCategories.sort();
  }

  /**
   * Get all posts from a specific category folder by trying comprehensive filename patterns
   */
  private async getPostsFromCategory(language: string, category: string): Promise<BlogPost[]> {
    const posts: BlogPost[] = [];
    
    // Generate comprehensive list of potential filenames based on category and common patterns
    const possibleFiles = this.generatePotentialFilenames(category);

    // Try each potential filename
    const filePromises = possibleFiles.map(async (filename) => {
      try {
        const post = await this.loadPostFromFile(language, category, filename);
        return post;
      } catch (error) {
        // File doesn't exist, return null
        return null;
      }
    });

    const results = await Promise.all(filePromises);
    const validPosts = results.filter((post): post is BlogPost => post !== null);
    
    return validPosts;
  }

  /**
   * Generate potential filenames based on category and common naming patterns
   */
  private generatePotentialFilenames(category: string): string[] {
    const filenames: string[] = [];
    
    // Category-specific common files
    const categorySpecificFiles: Record<string, string[]> = {
      frontend: [
        'modern-css-techniques.md', 'react-patterns.md', 'vue-composition-api.md',
        'responsive-design.md', 'web-components.md', 'frontend-architecture.md',
        'css-grid-flexbox.md', 'javascript-frameworks.md', 'ui-ux-design.md',
        'performance-optimization.md' // Added for Korean frontend post
      ],
      backend: [
        'performance-optimization.md', 'api-design.md', 'database-optimization.md',
        'microservices.md', 'node-security.md', 'server-architecture.md',
        'rest-api-best-practices.md', 'graphql-guide.md', 'caching-strategies.md'
      ],
      devops: [
        'kubernetes-guide.md', 'docker-best-practices.md', 'ci-cd-pipeline.md',
        'aws-deployment.md', 'monitoring-logging.md', 'infrastructure-as-code.md',
        'terraform-guide.md', 'jenkins-pipeline.md', 'containerization.md'
      ],
      security: [
        'web-security-best-practices.md', 'authentication-authorization.md', 'owasp-top10.md',
        'secure-coding.md', 'penetration-testing.md', 'security-audit.md'
      ],
      database: [
        'sql-optimization.md', 'nosql-vs-sql.md', 'database-design.md',
        'mongodb-guide.md', 'postgresql-tips.md', 'redis-caching.md'
      ],
      testing: [
        'testing-strategies.md', 'unit-testing.md', 'integration-testing.md',
        'e2e-testing.md', 'test-driven-development.md', 'jest-testing.md'
      ]
    };

    // Add category-specific files
    if (categorySpecificFiles[category]) {
      filenames.push(...categorySpecificFiles[category]);
    }

    // Common filename patterns for any category
    const commonPatterns = [
      // Direct category name variations
      `${category}.md`,
      `${category}-guide.md`,
      `${category}-tutorial.md`,
      `${category}-best-practices.md`,
      `${category}-tips.md`,
      `${category}-introduction.md`,
      `${category}-overview.md`,
      
      // Generic common files
      'index.md', 'introduction.md', 'getting-started.md', 'overview.md',
      'guide.md', 'tutorial.md', 'best-practices.md', 'tips-tricks.md',
      'advanced.md', 'intermediate.md', 'beginner.md',
      
      // Date-based patterns (common blog naming)
      '2024-guide.md', '2024-trends.md', '2024-update.md',
      'latest-trends.md', 'new-features.md', 'whats-new.md',
      
      // Numbered patterns (for sequential content)
      '01-introduction.md', '02-basics.md', '03-advanced.md',
      'part-1.md', 'part-2.md', 'part-3.md',
      'chapter-1.md', 'chapter-2.md', 'chapter-3.md',
      
      // Common technical topics
      'performance.md', 'optimization.md', 'architecture.md',
      'patterns.md', 'design-patterns.md', 'best-practices.md',
      'troubleshooting.md', 'debugging.md', 'monitoring.md'
    ];

    filenames.push(...commonPatterns);
    
    // Remove duplicates and return
    return Array.from(new Set(filenames));
  }

  /**
   * Load a blog post from a markdown file
   */
  private async loadPostFromFile(language: string, category: string, filename: string): Promise<BlogPost | null> {
    try {
      const url = `${this.baseUrl}/${language}/${category}/${filename}`;
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
      const metadata: Partial<BlogMetadata> = {};
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
        } else {
          (metadata as any)[key] = value;
        }
      });

      // Generate slug from filename
      const slug = filename.replace('.md', '');
      
      // Generate unique ID based on slug and language
      const id = this.generateId(slug, language);

      return {
        id,
        slug,
        title: metadata.title || 'Untitled',
        summary: metadata.summary || '',
        content,
        category: metadata.category || category,
        language,
        date: metadata.date || new Date().toISOString().split('T')[0],
        readTime: metadata.readTime || 5,
        views: 0, // Initialize with 0 views
        tags: metadata.tags || [],
        author: metadata.author || 'Anonymous'
      };
    } catch (error) {
      console.error(`Error loading post ${language}/${category}/${filename}:`, error);
      return null;
    }
  }

  /**
   * Generate a unique ID for a blog post
   */
  private generateId(slug: string, language: string): number {
    // Create a simple hash for consistent IDs
    const str = `${slug}-${language}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Clear cache (useful for development or when posts are updated)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Increment view count for a blog post (placeholder implementation)
   */
  async incrementViews(id: number): Promise<void> {
    // In a real implementation, this would update a database or analytics service
    // For now, we'll just log it
    console.log(`Incrementing views for post ID: ${id}`);
  }
}

export const dynamicBlogService = new DynamicBlogService();
