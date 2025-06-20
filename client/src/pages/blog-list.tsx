import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { BlogPostCard } from '@/components/blog-post-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Clock } from 'lucide-react';
import { type BlogPost } from '@/types';

export default function BlogList() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/blog', i18n.language],
    queryFn: async () => {
      const { staticDataService } = await import('@/lib/staticData');
      return staticDataService.getAllBlogPosts();
    },
  });

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      if (post.tags && post.language === i18n.language) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [posts, i18n.language]);

  // Filter posts based on current language, category, and tag
  const filteredPosts = posts.filter(post => {
    const matchesLanguage = post.language === i18n.language;
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesLanguage && matchesCategory && matchesTag;
  });

  // Group posts by year for timeline view
  const postsByYear = useMemo(() => {
    const grouped: { [year: string]: BlogPost[] } = {};
    filteredPosts.forEach(post => {
      const year = new Date(post.date).getFullYear().toString();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });
    // Sort posts within each year by date (newest first)
    Object.keys(grouped).forEach(year => {
      grouped[year].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    return grouped;
  }, [filteredPosts]);

  const categories = [
    { value: 'all', label: t('category.all') },
    { value: 'engineering', label: t('category.engineering') },
    { value: 'frontend', label: t('category.frontend') },
    { value: 'backend', label: t('category.backend') },
    { value: 'devops', label: t('category.devops') },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('blog.filterBy')}
            </span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Tags Section */}
            {allTags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedTag === '' ? 'default' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag('')}
                  >
                    All
                  </Badge>
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Stats
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Total Posts:</span>
                  <span className="font-medium">{filteredPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Categories:</span>
                  <span className="font-medium">{categories.length - 1}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tags:</span>
                  <span className="font-medium">{allTags.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="flex-1">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No blog posts match your current filters. Try changing the category or tags.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                  <div key={year} className="relative">
                    <div className="flex items-center mb-6">
                      <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{year}</h2>
                      <div className="flex-1 ml-4 border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="space-y-6 ml-9">
                      {postsByYear[year].map((post, index) => (
                        <div key={post.id} className="relative">
                          {index < postsByYear[year].length - 1 && (
                            <div className="absolute left-0 top-8 w-px h-full bg-gray-300 dark:bg-gray-600"></div>
                          )}
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-4 relative z-10"></div>
                            <div className="flex-1">
                              <BlogPostCard post={post} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}