import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, ExternalLink, Github, ArrowLeft, Calendar, Tag } from 'lucide-react';

interface PortfolioProjectDetail {
  slug: string;
  title: string;
  summary: string;
  image: string;
  status: 'live' | 'development' | 'completed';
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  content: string;
}

export default function PortfolioDetail() {
  const { t, i18n } = useTranslation();
  const params = useParams<{ slug: string }>();
  
  const { data: project, isLoading, error } = useQuery<PortfolioProjectDetail>({
    queryKey: [`/portfolio/${params.slug}`, i18n.language],
    queryFn: async () => {
      const { staticDataService } = await import('@/lib/staticData');
      return staticDataService.getPortfolioProjectByLanguage(params.slug!, i18n.language);
    },
    enabled: !!params.slug,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'development':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    return t(`portfolio.status.${status}`) || status;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-12 w-full mb-6" />
            <Skeleton className="h-6 w-3/4 mb-6" />
            <div className="flex items-center space-x-4 mb-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Image Skeleton */}
          <Skeleton className="h-64 w-full mb-8" />

          {/* Content Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The portfolio project you're looking for doesn't exist.
            </p>
            <Link href="/portfolio">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('portfolio.buttons.backToPortfolio')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link 
                href="/portfolio"
                className="hover:text-gray-700 dark:hover:text-gray-300"
              >
                {t('portfolio.title')}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-3 h-3 mx-2" />
              <span className="truncate">{project.title}</span>
            </li>
          </ol>
        </nav>

        {/* Project Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Badge className={`text-sm font-medium ${getStatusColor(project.status)}`}>
              {getStatusLabel(project.status)}
            </Badge>
            {project.featured && (
              <Badge variant="secondary" className="text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {project.demoUrl && (
              <Button size="lg" onClick={() => window.open(project.demoUrl, '_blank')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('portfolio.buttons.liveDemo')}
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="lg" onClick={() => window.open(project.githubUrl, '_blank')}>
                <Github className="w-4 h-4 mr-2" />
                {t('portfolio.buttons.viewCode')}
              </Button>
            )}
          </div>
        </header>

        {/* Project Image */}
        <div className="mb-8 overflow-hidden rounded-xl">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Technologies */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('portfolio.sections.technologiesUsed')}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Content */}
        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  {children}
                </p>
              ),
              code: ({ children, className }) => {
                const isBlock = className?.includes('language-');
                if (isBlock) {
                  return (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6 overflow-x-auto">
                      <pre className="text-sm text-gray-800 dark:text-gray-200">
                        <code>{children}</code>
                      </pre>
                    </div>
                  );
                }
                return (
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              },
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{children}</span>
                </li>
              ),
              img: ({ src, alt }) => (
                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={src} 
                    alt={alt || ''} 
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  {alt && (
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 italic text-center">
                      {alt}
                    </div>
                  )}
                </div>
              ),
            }}
          >
            {project.content}
          </ReactMarkdown>
        </article>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Link href="/portfolio">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('portfolio.buttons.backToPortfolio')}
              </Button>
            </Link>
            <div className="flex space-x-4">
              {project.demoUrl && (
                <Button variant="ghost" size="sm" onClick={() => window.open(project.demoUrl, '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('portfolio.buttons.liveDemo')}
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="ghost" size="sm" onClick={() => window.open(project.githubUrl, '_blank')}>
                  <Github className="w-4 h-4 mr-2" />
                  {t('portfolio.buttons.viewCode')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}