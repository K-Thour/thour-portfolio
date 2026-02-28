import {
  Code2,
  Smartphone,
  Sparkles,
  Cloud,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceProcess {
  title: string;
  description: string;
}

export interface ServiceData {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
  process: ServiceProcess[];
}

export const servicesData: Record<string, ServiceData> = {
  'web-development': {
    icon: Code2,
    title: 'Web Development',
    subtitle: 'Modern Web Applications',
    description:
      'Build powerful, scalable web applications using the latest technologies and best practices. From concept to deployment, I deliver exceptional digital experiences.',
    image:
      'https://images.unsplash.com/photo-1760842543713-108c3cadbba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwY2lyY3VpdHN8ZW58MXx8fHwxNzcxNjY3Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Responsive Design for All Devices',
      'SEO Optimized & Fast Performance',
      'Modern UI/UX Implementation',
      'Progressive Web Apps (PWA)',
      'Server-Side Rendering (SSR)',
      'API Integration & Development',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'GraphQL',
    ],
    process: [
      {
        title: 'Discovery & Planning',
        description:
          'Understanding your vision, goals, and technical requirements.',
      },
      {
        title: 'Design & Architecture',
        description:
          'Creating scalable architecture and beautiful user interfaces.',
      },
      {
        title: 'Development & Testing',
        description:
          'Building robust features with comprehensive testing coverage.',
      },
      {
        title: 'Deployment & Support',
        description:
          'Launching to production with ongoing maintenance and support.',
      },
    ],
  },
  'mobile-apps': {
    icon: Smartphone,
    title: 'Mobile Apps',
    subtitle: 'Cross-Platform Development',
    description:
      'Create native-quality mobile applications for iOS and Android using React Native and modern mobile development frameworks.',
    image:
      'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzEzOTg3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Cross-Platform Development',
      'Native Performance & Feel',
      'Offline Support & Caching',
      'Push Notifications',
      'App Store Deployment',
      'Real-time Features',
    ],
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Redux',
      'Firebase',
      'REST APIs',
    ],
    process: [
      {
        title: 'Requirements Analysis',
        description: 'Defining features, platforms, and user experience goals.',
      },
      {
        title: 'UI/UX Design',
        description:
          'Crafting intuitive interfaces following platform guidelines.',
      },
      {
        title: 'Development & Integration',
        description: 'Building features and integrating with backend services.',
      },
      {
        title: 'Testing & Launch',
        description: 'Thorough testing and App Store/Play Store submission.',
      },
    ],
  },
  'ai-integration': {
    icon: Sparkles,
    title: 'AI Integration',
    subtitle: 'Intelligent Automation',
    description:
      'Leverage cutting-edge AI technologies to add intelligent features, automation, and data-driven insights to your applications.',
    image:
      'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzE0NzYzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'GPT-4 & Large Language Models',
      'Natural Language Processing',
      'Image Recognition & Generation',
      'Predictive Analytics',
      'Chatbots & Virtual Assistants',
      'Machine Learning Models',
    ],
    technologies: [
      'OpenAI',
      'TensorFlow',
      'Python',
      'Langchain',
      'Hugging Face',
      'FastAPI',
    ],
    process: [
      {
        title: 'Use Case Definition',
        description:
          'Identifying AI opportunities and defining success metrics.',
      },
      {
        title: 'Model Selection',
        description: 'Choosing the right AI models and training approaches.',
      },
      {
        title: 'Integration & Training',
        description: 'Implementing AI features and fine-tuning models.',
      },
      {
        title: 'Optimization & Monitoring',
        description: 'Ensuring performance, accuracy, and cost efficiency.',
      },
    ],
  },
  'cloud-solutions': {
    icon: Cloud,
    title: 'Cloud Solutions',
    subtitle: 'Scalable Infrastructure',
    description:
      'Design and deploy cloud-native applications with auto-scaling, high availability, and modern DevOps practices.',
    image:
      'https://images.unsplash.com/photo-1562459958-b5c0334a4e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBmcm9zdCUyMHdpbnRlciUyMG1vdW50YWlufGVufDF8fHx8MTc3MTU2NTgyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'AWS, Azure, GCP Deployment',
      'Container Orchestration',
      'CI/CD Pipeline Setup',
      'Auto-scaling & Load Balancing',
      'Infrastructure as Code',
      'Monitoring & Logging',
    ],
    technologies: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
      'CloudWatch',
    ],
    process: [
      {
        title: 'Infrastructure Design',
        description: 'Planning scalable, secure cloud architecture.',
      },
      {
        title: 'Setup & Configuration',
        description: 'Provisioning resources and configuring services.',
      },
      {
        title: 'Deployment Automation',
        description: 'Building CI/CD pipelines for seamless releases.',
      },
      {
        title: 'Monitoring & Optimization',
        description: 'Ensuring reliability and optimizing costs.',
      },
    ],
  },
};
