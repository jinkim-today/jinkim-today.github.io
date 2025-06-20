import { useParams, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import { type BlogPost } from '@/types';

export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const params = useParams<{ language: string; slug: string }>();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/blog/${params.language}/${params.slug}`],
    queryFn: async () => {
      const { staticDataService } = await import('@/lib/staticData');
      return staticDataService.getBlogPost(params.slug!, params.language!, '');
    },
    enabled: !!params.language && !!params.slug,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (i18n.language === 'ko') {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      engineering: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      frontend: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      backend: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      devops: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
      database: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    };
    return colors[category as keyof typeof colors] || colors.engineering;
  };

  const getLanguageColor = (language: string) => {
    return language === 'en' 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
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
          <div className="mb-8 pb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-5 w-8" />
            </div>
            <Skeleton className="h-12 w-full mb-6" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

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

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
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
              <Link href="/">
                <a className="hover:text-gray-700 dark:hover:text-gray-300">Home</a>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-3 h-3 mx-2" />
              {t(`category.${post.category}`, post.category)}
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-3 h-3 mx-2" />
              <span className="truncate">{post.title}</span>
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Badge className={`text-sm font-medium ${getCategoryColor(post.category)}`}>
              {t(`category.${post.category}`, post.category)}
            </Badge>
            <Badge className={`text-sm font-medium ${getLanguageColor(post.language)}`}>
              {post.language === 'en' ? 'EN' : 'KR'}
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <span>•</span>
              <span>{t('blog.readTime', { time: post.readTime })}</span>
              <span>•</span>
              <span>{t('blog.views', { count: post.views || 0 })}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {post.summary}
          </div>
          
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
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
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {children}
                  </code>
                );
              },
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{children}</span>
                </li>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Share and Navigation */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('blog.sharePost')}
              </span>
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('blog.backToBlog')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
