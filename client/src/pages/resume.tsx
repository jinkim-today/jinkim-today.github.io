import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone, Globe, Calendar, Download, ExternalLink, Award, Briefcase, GraduationCap, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Resume() {
  const { t, i18n } = useTranslation();
  
  const highlights = i18n.language === 'ko' ? [
    "풀스택 개발 및 C++ 시스템 프로그래밍 경험",
    "CI/CD 파이프라인으로 일일 2시간 엔지니어링 시간 절약",
    "AI 기반 결함 감지 시스템으로 실제 제조업체 서비스",
    "TypeScript, React, Python 생태계 전문가"
  ] : [
    "Full-stack development and C++ systems programming experience",
    "Achieved 2-hour daily engineering time savings with CI/CD pipelines",
    "Deployed AI-based defect detection for real manufacturing clients",
    "Expert in TypeScript, React, and Python ecosystem"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-4 border-white/30">
                  <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">
                  Jin Kim
                </h1>
                <p className="text-xl text-blue-100 mb-4">
                  {i18n.language === 'ko' ? '컴퓨터 과학 학생 & 소프트웨어 엔지니어' : 'Computer Science Student & Software Engineer'}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-blue-100 mb-6">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    jinkim.today@gmail.com
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    (778) 863-3853
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {i18n.language === 'ko' ? '밴쿠버, 캐나다' : 'Vancouver, BC'}
                  </span>
                  <span className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    github.com/jinkim-today
                  </span>
                </div>
                <div className="flex gap-4">
                  <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30">
                    <Download className="w-4 h-4 mr-2" />
                    {t('resume.buttons.downloadPdf')}
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('resume.buttons.viewPortfolio')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  {t('resume.sections.summary')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {i18n.language === 'ko' 
                    ? '사이먼 프레이저 대학교에서 컴퓨터 과학을 전공하는 열정적인 소프트웨어 엔지니어입니다. 풀스택 개발, C++ 시스템 프로그래밍, AI/ML에 전문성을 가지고 있습니다. 실제 제조업체와 협력하여 AI 기반 결함 감지 시스템을 구축하고, CI/CD 파이프라인을 통해 개발 효율성을 크게 향상시킨 경험이 있습니다.'
                    : 'Passionate Computer Science student at Simon Fraser University with expertise in full-stack development, C++ systems programming, and AI/ML. Proven track record of building AI-based defect detection systems for real manufacturing clients and significantly improving development efficiency through CI/CD pipelines.'
                  }
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
                  {t('resume.sections.experience')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="relative pl-8">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Software Engineer Intern
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">Dialpad</p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
                        <p className="flex items-center md:justify-end">
                          <Calendar className="w-4 h-4 mr-1" />
                          Jan 2025 - Current
                        </p>
                        <p className="flex items-center md:justify-end">
                          <MapPin className="w-4 h-4 mr-1" />
                          Vancouver, BC
                        </p>
                      </div>
                    </div>
                    <ul className="list-none space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Identified and resolved 2 early-stage bugs by integrating libcurl into VoIP library using Gradle, Git patches, and Autoconf
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Diagnosed and resolved iOS simulator build failures, enabling automated command-line testing
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Standardized cross-platform debugging by synchronizing time metrics at C++ library level
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Streamlined developer onboarding, reducing setup time from 7 days to 2
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="relative pl-8">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Junior Developer Intern
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">Computrol Systems</p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
                        <p className="flex items-center md:justify-end">
                          <Calendar className="w-4 h-4 mr-1" />
                          Jan 2024 - Dec 2024
                        </p>
                        <p className="flex items-center md:justify-end">
                          <MapPin className="w-4 h-4 mr-1" />
                          Burnaby, BC
                        </p>
                      </div>
                    </div>
                    <ul className="list-none space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Integrated hardware terminals by implementing Qt C++ firmware update and full-stack PHP web interface
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Achieved 2-hour daily engineering time savings by implementing CI/CD pipelines using Azure Pipelines and C#
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Reduced customer support time by 30 minutes per case by creating simplified configuration tools
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative pl-8">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Full-stack Developer Intern
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">Intersystem Controls</p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
                        <p className="flex items-center md:justify-end">
                          <Calendar className="w-4 h-4 mr-1" />
                          Jan 2023 - Sep 2023
                        </p>
                        <p className="flex items-center md:justify-end">
                          <MapPin className="w-4 h-4 mr-1" />
                          Vancouver, BC
                        </p>
                      </div>
                    </div>
                    <ul className="list-none space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Implemented automated license key generation microservice using PHP, Node.js, Firebase, and AWS
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Built cross-platform stock management system with TypeScript, saving 1 hour daily
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Modernized legacy system by developing scalable React application, doubling development speed
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 text-green-500 mr-2" />
                  {t('resume.sections.education')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Bachelor of Computer Science
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Simon Fraser University</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Expected Graduation: December 2025 • Burnaby, BC
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 md:text-right mt-2 md:mt-0">
                    <p className="flex items-center md:justify-end">
                      <Calendar className="w-4 h-4 mr-1" />
                      Expected Dec 2025
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('resume.sections.skills')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">TypeScript</Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">JavaScript</Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">C++</Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Python</Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Java</Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">SQL</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Node.js</Badge>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">ReactJS</Badge>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">PostgreSQL</Badge>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">PyTorch</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">AWS</Badge>
                    <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">Docker</Badge>
                    <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">Git</Badge>
                    <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">Azure</Badge>
                    <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">Jira</Badge>
                    <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">Postman</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 text-yellow-500 mr-2" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ERP and Defect Detection System
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    React | AWS | PyTorch
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Partnered with manufacturing client on AI-based defect recognition system. Built web app using React, Raspberry Pi, PyTorch, and Docker.
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Photobyme Business
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Founder | May 2022 - Current
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Built automated photography business generating thousands in monthly sales. Improved website performance by 30% through optimization.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">LinkedIn</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">linkedin.com/in/kukjinkim</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">GitHub</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">github.com/jinkim-today</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}