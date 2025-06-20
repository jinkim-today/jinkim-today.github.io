import { type BlogPost, type BlogPostMetadata } from '@/types';

// Static blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "responsive-design-with-images",
    title: "Modern Responsive Design with Images and Media",
    summary: "Learn how to create responsive designs that work perfectly with images, videos, and other media elements across all device sizes.",
    content: `# Modern Responsive Design with Images and Media

Creating responsive designs that handle media elements effectively is crucial for modern web development. This guide covers best practices for images, videos, and other media in responsive layouts.

## Key Principles

### 1. Flexible Images
Always use CSS to make images responsive:

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

### 2. Picture Element
Use the picture element for art direction:

\`\`\`html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description">
</picture>
\`\`\`

### 3. CSS Grid and Flexbox
Modern layout techniques provide better control:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

## Conclusion

Responsive design with media requires careful planning but results in better user experiences across all devices.`,
    category: "frontend",
    language: "en", 
    date: "2024-01-19",
    readTime: 4,
    views: 234,
    tags: ["responsive", "css", "design", "frontend", "images", "media"]
  },
  {
    id: 2,
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications with TypeScript", 
    summary: "Learn best practices for structuring large React applications using TypeScript, including advanced patterns for component composition and state management.",
    content: `# Building Scalable React Applications with TypeScript

Building scalable React applications requires careful consideration of architecture, patterns, and TypeScript integration.

## Project Structure

### Folder Organization
\`\`\`
src/
  components/
    ui/           # Reusable UI components
    forms/        # Form components
    layout/       # Layout components
  hooks/          # Custom React hooks
  lib/           # Utility functions
  pages/         # Page components
  types/         # TypeScript type definitions
\`\`\`

### Component Patterns

#### Compound Components
\`\`\`tsx
interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}

const Tabs = ({ children, defaultValue }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};
\`\`\`

## State Management

### Context + Reducer Pattern
\`\`\`tsx
interface AppState {
  user: User | null;
  loading: boolean;
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
\`\`\`

## Conclusion

Following these patterns will help you build maintainable and scalable React applications.`,
    category: "engineering",
    language: "en",
    date: "2024-01-15", 
    readTime: 8,
    views: 456,
    tags: ["react", "typescript", "architecture", "frontend"]
  },
  {
    id: 3,
    slug: "responsive-design-with-images",
    title: "이미지와 미디어를 활용한 현대적 반응형 디자인",
    summary: "모든 기기 크기에서 완벽하게 작동하는 이미지, 비디오 및 기타 미디어 요소가 포함된 반응형 디자인을 만드는 방법을 배워보세요.",
    content: `# 이미지와 미디어를 활용한 현대적 반응형 디자인

미디어 요소를 효과적으로 다루는 반응형 디자인을 만드는 것은 현대 웹 개발에서 매우 중요합니다. 이 가이드는 반응형 레이아웃에서 이미지, 비디오 및 기타 미디어의 모범 사례를 다룹니다.

## 핵심 원칙

### 1. 유연한 이미지
CSS를 사용하여 항상 이미지를 반응형으로 만드세요:

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

### 2. Picture 요소
아트 디렉션을 위해 picture 요소를 사용하세요:

\`\`\`html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="설명">
</picture>
\`\`\`

### 3. CSS Grid와 Flexbox
현대적인 레이아웃 기법으로 더 나은 제어를 제공합니다:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

## 결론

미디어가 포함된 반응형 디자인은 신중한 계획이 필요하지만 모든 기기에서 더 나은 사용자 경험을 제공합니다.`,
    category: "frontend",
    language: "ko",
    date: "2024-01-19",
    readTime: 4,
    views: 156,
    tags: ["responsive", "css", "design", "frontend", "images", "media"]
  },
  {
    id: 3,
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques for 2024",
    summary: "Explore cutting-edge CSS features like container queries, cascade layers, and new color functions that are reshaping web design.",
    content: `# Modern CSS Techniques for 2024

CSS continues to evolve rapidly, bringing powerful new features that make web development more efficient and expressive.`,
    category: "frontend",
    language: "en",
    date: "2024-01-20",
    readTime: 7,
    views: 234,
    tags: ["css", "frontend", "web-design", "modern", "responsive"]
  },
  {
    id: 4,
    slug: "node-js-performance",
    title: "Node.js Performance Optimization Strategies",
    summary: "Learn proven techniques to optimize Node.js applications for maximum performance, including clustering, caching, and profiling.",
    content: `# Node.js Performance Optimization Strategies

Node.js performance optimization is crucial for building scalable server-side applications.`,
    category: "backend",
    language: "en", 
    date: "2024-01-12",
    readTime: 9,
    views: 187,
    tags: ["nodejs", "backend", "performance", "optimization", "javascript"]
  },
  {
    id: 5,
    slug: "docker-best-practices",
    title: "Docker Best Practices for Production Deployments",
    summary: "Master Docker optimization techniques for secure, efficient, and scalable container deployments in production environments.",
    content: `# Docker Best Practices for Production Deployments

Docker has revolutionized application deployment, but production-ready containers require careful optimization.`,
    category: "devops",
    language: "en",
    date: "2024-01-08", 
    readTime: 10,
    views: 156,
    tags: ["docker", "devops", "containers", "deployment", "security"]
  },
  {
    id: 6,
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for Modern Web Development",
    summary: "Discover essential TypeScript patterns, advanced types, and best practices that will make your code more maintainable and type-safe.",
    content: `# TypeScript Best Practices for Modern Web Development

TypeScript has become an essential tool for modern web development, providing type safety and enhanced developer experience.`,
    category: "development",
    language: "en",
    date: "2024-01-10",
    readTime: 6,
    views: 201,
    tags: ["typescript", "javascript", "development", "best-practices", "types"]
  }
];

// Static portfolio projects data
const portfolioProjects = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    summary: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL featuring real-time inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    status: "live" as const,
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/example/ecommerce",
    featured: true
  },
  {
    slug: "ai-chatbot-system",
    title: "AI Chatbot System",
    summary: "An intelligent customer service chatbot powered by natural language processing and machine learning.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&crop=center",
    status: "completed" as const,
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/example/ai-chatbot",
    featured: true
  },
  {
    slug: "task-management-app", 
    title: "Task Management Application",
    summary: "A collaborative task management tool with real-time updates, built using React and Firebase.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    status: "development" as const,
    technologies: ["React", "Firebase", "TypeScript", "Material-UI"],
    githubUrl: "https://github.com/example/task-app",
    featured: false
  },
  {
    slug: "blog-platform",
    title: "Personal Blog Platform",
    summary: "A modern, static blog platform built with React and Vite featuring bilingual support and markdown content.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center",
    status: "live" as const,
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "i18next"],
    demoUrl: "https://blog.example.com",
    githubUrl: "https://github.com/example/blog-platform",
    featured: false
  }
];

// Client-side data service
export class StaticDataService {
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return blogPosts;
  }

  async getBlogPostsByLanguage(language: string): Promise<BlogPost[]> {
    return blogPosts.filter(post => post.language === language);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return blogPosts.filter(post => post.category === category);
  }

  async getBlogPost(slug: string, language: string, category: string = ''): Promise<BlogPost | undefined> {
    // First try to load from markdown file in root language folder
    try {
      const response = await fetch(`/blog/${language}/${slug}.md`);
      
      if (response.ok) {
        const markdownContent = await response.text();
        
        // Parse frontmatter
        const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const content = frontmatterMatch[2];
          
          // Parse frontmatter fields
          const metadata: any = {};
          frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
              let value = valueParts.join(':').trim();
              
              if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
              }
              
              if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
              }
              
              metadata[key.trim()] = value;
            }
          });
          
          return {
            id: blogPosts.find(p => p.slug === slug)?.id || Date.now(),
            slug,
            ...metadata,
            content,
            category: metadata.category || category,
            language
          };
        }
      }
    } catch (error) {
      console.error('Error loading markdown file:', error);
    }
    
    // Try loading from each category subfolder
    const categories = ['frontend', 'backend', 'devops', 'development'];
    for (const cat of categories) {
      try {
        const response = await fetch(`/blog/${language}/${cat}/${slug}.md`);
        
        if (response.ok) {
          const markdownContent = await response.text();
          
          // Parse frontmatter
          const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const content = frontmatterMatch[2];
            
            // Parse frontmatter fields
            const metadata: any = {};
            frontmatter.split('\n').forEach(line => {
              const [key, ...valueParts] = line.split(':');
              if (key && valueParts.length > 0) {
                let value = valueParts.join(':').trim();
                
                if (value.startsWith('"') && value.endsWith('"')) {
                  value = value.slice(1, -1);
                }
                
                if (value.startsWith('[') && value.endsWith(']')) {
                  value = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
                }
                
                metadata[key.trim()] = value;
              }
            });
            
            return {
              id: blogPosts.find(p => p.slug === slug)?.id || Date.now(),
              slug,
              ...metadata,
              content,
              category: metadata.category || cat,
              language
            };
          }
        }
      } catch (error) {
        // Continue to next category
      }
    }
    
    // Fallback to static data
    return blogPosts.find(post => post.slug === slug && post.language === language);
  }

  async getAllCategories(): Promise<string[]> {
    const categories = [...new Set(blogPosts.map(post => post.category))];
    return categories.sort();
  }

  async getAllPortfolioProjects(): Promise<any[]> {
    return portfolioProjects;
  }

  async getPortfolioProject(slug: string): Promise<any | undefined> {
    return portfolioProjects.find(project => project.slug === slug);
  }

  async getPortfolioProjectByLanguage(slug: string, language: string): Promise<any | undefined> {
    try {
      const response = await fetch(`/portfolio/${language}/${slug}.md`);
      if (!response.ok) {
        throw new Error('Markdown file not found');
      }
      
      const markdownContent = await response.text();
      
      // Parse frontmatter (basic implementation)
      const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!frontmatterMatch) {
        throw new Error('Invalid markdown format');
      }
      
      const frontmatter = frontmatterMatch[1];
      const content = frontmatterMatch[2];
      
      // Parse frontmatter fields (basic YAML parsing)
      const metadata: any = {};
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          let value = valueParts.join(':').trim();
          
          // Remove quotes
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          
          // Parse arrays
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
          }
          
          metadata[key.trim()] = value;
        }
      });
      
      return {
        slug,
        ...metadata,
        content
      };
    } catch (error) {
      console.error('Error loading portfolio project:', error);
      // Fallback to static data
      return portfolioProjects.find(project => project.slug === slug);
    }
  }

  async incrementViews(id: number): Promise<void> {
    // In a static site, this would typically be handled by analytics
    // or a serverless function for view tracking
    const post = blogPosts.find(p => p.id === id);
    if (post) {
      post.views = (post.views || 0) + 1;
    }
  }
}

export const staticDataService = new StaticDataService();