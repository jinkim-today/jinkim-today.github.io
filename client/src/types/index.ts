// Type definitions for the static blog

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  language: string;
  date: string;
  readTime: number;
  views?: number;
  tags?: string[];
}

export interface BlogPostMetadata {
  title: string;
  date: string;
  category: string;
  summary: string;
  tags?: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  summary: string;
  image: string;
  status: 'live' | 'development' | 'completed';
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface PortfolioProjectDetail extends PortfolioProject {
  content: string;
}

export interface PortfolioMetadata {
  title: string;
  summary: string;
  image: string;
  status: 'live' | 'development' | 'completed';
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}