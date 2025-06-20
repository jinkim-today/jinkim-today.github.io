import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { type BlogPost } from '@/types';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { t, i18n } = useTranslation();

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

  return (
    <Link href={`/blog/${post.language}/${post.slug}`}>
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <Badge className={`text-xs font-medium ${getCategoryColor(post.category)}`}>
                {t(`category.${post.category}`, post.category)}
              </Badge>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center space-x-1 flex-wrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {post.summary}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span>{t('blog.readTime', { time: post.readTime })}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
