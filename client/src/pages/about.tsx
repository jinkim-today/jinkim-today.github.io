import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, MapPin, Download, ExternalLink, Code, Zap, Users, Trophy } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const skills = [
    { name: 'TypeScript & JavaScript', level: 95, color: 'bg-blue-500' },
    { name: 'C++ & Systems Programming', level: 90, color: 'bg-red-500' },
    { name: 'React & Node.js', level: 92, color: 'bg-green-500' },
    { name: 'Python & PyTorch', level: 85, color: 'bg-purple-500' },
    { name: 'AWS & Docker', level: 88, color: 'bg-orange-500' },
    { name: 'PostgreSQL & Database Design', level: 85, color: 'bg-indigo-500' },
  ];

  const achievements = [
    { 
      icon: Trophy, 
      title: t('locale') === 'ko' ? '3개 인턴십' : '3 Internships',
      description: t('locale') === 'ko' ? 'Dialpad, Computrol, Intersystem 근무 경험' : 'Experience at Dialpad, Computrol, Intersystem'
    },
    { 
      icon: Users, 
      title: t('locale') === 'ko' ? '5+ 프로젝트' : '5+ Projects',
      description: t('locale') === 'ko' ? 'AI/ML, 풀스택, 비즈니스 프로젝트 완료' : 'AI/ML, full-stack, and business projects completed'
    },
    { 
      icon: Code, 
      title: t('locale') === 'ko' ? '6개 기술스택' : '6 Tech Stacks',
      description: t('locale') === 'ko' ? 'TypeScript, C++, Python, React, AWS 등' : 'TypeScript, C++, Python, React, AWS, and more'
    },
    { 
      icon: Zap, 
      title: t('locale') === 'ko' ? '90% 비용절감' : '90% Cost Reduction',
      description: t('locale') === 'ko' ? 'AWS Lambda에서 EC2로 마이그레이션 성과' : 'Achieved by migrating from AWS Lambda to EC2'
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Jin Kim
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {t('about.hero.subtitle') || (t('locale') === 'ko' ? 
              'SFU 컴퓨터과학과 학생이자 Dialpad 소프트웨어 엔지니어 인턴. 풀스택 개발, C++ 시스템 프로그래밍, AI/ML 프로젝트 경험을 보유하고 있습니다.' : 
              'Computer Science student at SFU and Software Engineer Intern at Dialpad. Experienced in full-stack development, C++ systems programming, and AI/ML projects.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              {t('about.hero.getInTouch')}
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-4 h-4 mr-2" />
              {t('about.hero.downloadResume')}
            </Button>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <achievement.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* About & Experience */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about.title')}
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a passionate full-stack developer with over 8 years of experience building 
                  scalable web applications. I specialize in modern JavaScript technologies and 
                  have a strong background in system architecture and performance optimization.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  My journey started with frontend development, but I've since expanded to become 
                  proficient across the entire technology stack. I love solving complex problems 
                  and creating elegant solutions that make a real impact.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('about.sections.coreExpertise')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Python'].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  San Francisco, CA
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@techblog.dev
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Progress */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about.sections.technicalSkills')}
              </h2>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('about.sections.connectWithMe')}
                </h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.sections.workTogether')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {t('about.sections.workTogetherDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                {t('about.sections.startConversation')}
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('about.sections.viewMyWork')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}