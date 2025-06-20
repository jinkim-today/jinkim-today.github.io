import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        resume: 'Resume',
        portfolio: 'Portfolio',
        blog: 'Blog'
      },
      home: {
        title: 'Welcome to My Tech Blog',
        subtitle: 'Exploring modern web development, software engineering, and technology trends'
      },
      blog: {
        title: 'Blog Posts',
        subtitle: 'Deep dives into software engineering, technology trends, and practical insights from the field.',
        filterBy: 'Filter by:',
        loadMore: 'Load More Posts',
        readMore: 'Read more',
        readTime: 'min read',
        allPosts: 'All Posts'
      },
      category: {
        all: 'All Categories',
        engineering: 'Engineering',
        frontend: 'Frontend',
        backend: 'Backend',
        devops: 'DevOps'
      },
      about: {
        title: 'About Me',
        description: 'I\'m a passionate software engineer with expertise in modern web technologies and a love for creating innovative solutions.',
        expertise: 'Expertise',
        contact: 'Contact',
        hero: {
          title: 'John Developer',
          subtitle: 'Passionate full-stack developer with over 8 years of experience building scalable web applications. I specialize in modern JavaScript technologies and have a strong background in system architecture and performance optimization.',
          getInTouch: 'Get in Touch',
          downloadResume: 'Download Resume'
        },
        achievements: {
          experience: '8+ Years Experience',
          experienceDesc: 'Building scalable web applications',
          projects: '50+ Projects',
          projectsDesc: 'Successfully delivered to clients',
          technologies: '10+ Technologies',
          technologiesDesc: 'Mastered across full stack',
          performance: '40% Performance',
          performanceDesc: 'Average improvement in projects'
        },
        sections: {
          coreExpertise: 'Core Expertise',
          technicalSkills: 'Technical Skills',
          connectWithMe: 'Connect With Me',
          workTogether: 'Let\'s Work Together',
          workTogetherDesc: 'I\'m always interested in discussing new opportunities, challenging projects, or just connecting with fellow developers. Feel free to reach out!',
          startConversation: 'Start a Conversation',
          viewMyWork: 'View My Work'
        }
      },
      resume: {
        title: 'Resume',
        sections: {
          summary: 'Professional Summary',
          experience: 'Professional Experience',
          education: 'Education',
          skills: 'Technical Skills',
          certifications: 'Certifications',
          languages: 'Languages'
        },
        buttons: {
          downloadPdf: 'Download PDF',
          viewPortfolio: 'View Portfolio'
        }
      },
      portfolio: {
        title: 'Portfolio',
        subtitle: 'A showcase of my recent projects and technical expertise. Each project demonstrates different aspects of modern web development, from full-stack applications to specialized tools and innovative solutions.',
        buttons: {
          liveDemo: 'Live Demo',
          viewCode: 'Code',
          backToPortfolio: 'Back to Portfolio',
          startConversation: 'Start a Conversation',
          viewMyWork: 'View My Work'
        },
        status: {
          live: 'Live',
          development: 'In Development',
          completed: 'Completed'
        },
        sections: {
          technologiesUsed: 'Technologies Used'
        }
      }
    }
  },
  ko: {
    translation: {
      nav: {
        home: '홈',
        about: '소개',
        resume: '이력서',
        portfolio: '포트폴리오',
        blog: '블로그'
      },
      home: {
        title: '나의 기술 블로그에 오신 것을 환영합니다',
        subtitle: '현대적인 웹 개발, 소프트웨어 엔지니어링, 그리고 기술 트렌드를 탐구합니다'
      },
      blog: {
        title: '블로그 포스트',
        subtitle: '소프트웨어 엔지니어링, 기술 트렌드, 그리고 현장에서의 실용적인 통찰력을 깊이 있게 다룹니다.',
        filterBy: '필터:',
        loadMore: '더 보기',
        readMore: '더 읽기',
        readTime: '분 읽기',
        allPosts: '모든 포스트'
      },
      category: {
        all: '모든 카테고리',
        engineering: '엔지니어링',
        frontend: '프론트엔드',
        backend: '백엔드',
        devops: '데브옵스'
      },
      about: {
        title: '소개',
        description: '현대 웹 기술에 대한 전문성과 혁신적인 솔루션 개발에 대한 열정을 가진 소프트웨어 엔지니어입니다.',
        expertise: '전문 분야',
        contact: '연락처',
        hero: {
          title: '김영호 개발자',
          subtitle: '8년 이상의 경험을 가진 열정적인 풀스택 개발자로, 확장 가능한 웹 애플리케이션 구축을 전문으로 합니다. 현대적인 JavaScript 기술에 특화되어 있으며 시스템 아키텍처와 성능 최적화에 대한 강력한 배경을 가지고 있습니다.',
          getInTouch: '연락하기',
          downloadResume: '이력서 다운로드'
        },
        achievements: {
          experience: '8년+ 경험',
          experienceDesc: '확장 가능한 웹 애플리케이션 구축',
          projects: '50+ 프로젝트',
          projectsDesc: '고객에게 성공적으로 전달',
          technologies: '10+ 기술',
          technologiesDesc: '풀스택 전반에 걸친 숙련도',
          performance: '40% 성능',
          performanceDesc: '프로젝트 평균 개선률'
        },
        sections: {
          coreExpertise: '핵심 전문 분야',
          technicalSkills: '기술 스킬',
          connectWithMe: '연결하기',
          workTogether: '함께 일해요',
          workTogetherDesc: '새로운 기회, 도전적인 프로젝트에 대한 논의나 동료 개발자들과의 연결에 항상 관심이 있습니다. 언제든지 연락주세요!',
          startConversation: '대화 시작하기',
          viewMyWork: '내 작업 보기'
        }
      },
      resume: {
        title: '이력서',
        sections: {
          summary: '전문 요약',
          experience: '전문 경험',
          education: '교육',
          skills: '기술 스킬',
          certifications: '자격증',
          languages: '언어'
        },
        buttons: {
          downloadPdf: 'PDF 다운로드',
          viewPortfolio: '포트폴리오 보기'
        }
      },
      portfolio: {
        title: '포트폴리오',
        subtitle: '최근 프로젝트와 기술적 전문성을 보여드립니다. 각 프로젝트는 풀스택 애플리케이션부터 전문 도구와 혁신적인 솔루션까지 현대 웹 개발의 다양한 측면을 보여줍니다.',
        buttons: {
          liveDemo: '라이브 데모',
          viewCode: '코드',
          backToPortfolio: '포트폴리오로 돌아가기',
          startConversation: '대화 시작하기',
          viewMyWork: '내 작업 보기'
        },
        status: {
          live: '라이브',
          development: '개발 중',
          completed: '완료됨'
        },
        sections: {
          technologiesUsed: '사용된 기술'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    // Map Korean locale properly
    load: 'languageOnly',
  });

export default i18n;
