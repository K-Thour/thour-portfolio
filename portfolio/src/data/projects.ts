export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectData {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  status: string;
  date: string;
  team: string;
  technologies: string[];
  link: string;
  github: string;
  challenges: ProjectFeature[];
  features: string[];
  results: string[];
}

export const projectsData: Record<string, ProjectData> = {
  'ai-code-assistant': {
    title: 'AI Code Assistant',
    subtitle: 'Machine Learning Project',
    category: 'AI & Automation',
    description:
      'An intelligent code completion and documentation tool powered by GPT-4, designed to help developers write better code faster with AI-powered suggestions and automatic documentation generation.',
    image:
      'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzE0NzYzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Completed',
    date: 'January 2025',
    team: 'Solo Developer',
    technologies: [
      'Python',
      'OpenAI GPT-4',
      'React',
      'FastAPI',
      'PostgreSQL',
      'Docker',
    ],
    link: '#',
    github: '#',
    challenges: [
      {
        title: 'Context Understanding',
        description:
          'Ensuring the AI understands project context and coding patterns to provide relevant suggestions.',
      },
      {
        title: 'Real-time Performance',
        description:
          'Optimizing API calls and caching to deliver instant code completions without lag.',
      },
      {
        title: 'Privacy & Security',
        description:
          'Implementing secure code processing without exposing sensitive information.',
      },
    ],
    features: [
      'Intelligent code completion with context awareness',
      'Automatic documentation generation',
      'Code refactoring suggestions',
      'Multi-language support (Python, JavaScript, TypeScript)',
      'IDE integration (VS Code, JetBrains)',
      'Custom AI model fine-tuning',
    ],
    results: [
      '40% increase in development speed',
      '95% code suggestion accuracy',
      'Used by 500+ developers',
      '4.8/5 star rating on marketplace',
    ],
  },
  'dev-workspace-pro': {
    title: 'Dev Workspace Pro',
    subtitle: 'Productivity Platform',
    category: 'Web Application',
    description:
      'An all-in-one development environment with integrated tools, cloud-based code editor, and real-time collaboration features designed for remote development teams.',
    image:
      'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzEzOTg3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'In Progress',
    date: 'February 2025',
    team: '3 Developers',
    technologies: [
      'Next.js',
      'TypeScript',
      'WebSocket',
      'Docker',
      'Redis',
      'MongoDB',
    ],
    link: '#',
    github: '#',
    challenges: [
      {
        title: 'Real-time Collaboration',
        description:
          'Implementing operational transformation for simultaneous code editing by multiple users.',
      },
      {
        title: 'Performance at Scale',
        description: 'Handling thousands of concurrent users with low latency.',
      },
      {
        title: 'Container Orchestration',
        description:
          'Managing isolated development environments for each workspace.',
      },
    ],
    features: [
      'Cloud-based code editor with syntax highlighting',
      'Real-time collaborative coding',
      'Integrated terminal and debugging tools',
      'Git integration and version control',
      'Custom workspace templates',
      'Team chat and video conferencing',
    ],
    results: [
      'Currently in beta testing',
      '150+ active beta users',
      '99.9% uptime achieved',
      'Average session time: 3+ hours',
    ],
  },
  'terminal-dashboard': {
    title: 'Terminal Dashboard',
    subtitle: 'Developer Tool',
    category: 'DevOps & Monitoring',
    description:
      'A beautiful terminal-based dashboard for monitoring servers, deployments, and real-time metrics with AI-powered insights and anomaly detection.',
    image:
      'https://images.unsplash.com/photo-1738255654134-1877cb984a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RpbmclMjBzY3JlZW4lMjBkYXJrfGVufDF8fHx8MTc3MTQ4MTc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Completed',
    date: 'December 2024',
    team: 'Solo Developer',
    technologies: [
      'Node.js',
      'React',
      'D3.js',
      'Kubernetes',
      'Prometheus',
      'WebSocket',
    ],
    link: '#',
    github: '#',
    challenges: [
      {
        title: 'Data Visualization',
        description:
          'Creating intuitive charts and graphs for complex infrastructure metrics.',
      },
      {
        title: 'AI-Powered Insights',
        description:
          'Training models to detect anomalies and predict system issues.',
      },
      {
        title: 'Cross-Platform Support',
        description:
          'Ensuring compatibility across different terminal emulators and OS.',
      },
    ],
    features: [
      'Real-time server monitoring and alerts',
      'Kubernetes cluster visualization',
      'AI-powered anomaly detection',
      'Customizable dashboard layouts',
      'Multi-cloud support (AWS, GCP, Azure)',
      'Deployment tracking and rollback',
    ],
    results: [
      'Reduced incident detection time by 60%',
      '1000+ active installations',
      'Open source with 2.5k GitHub stars',
      'Featured in DevOps Weekly',
    ],
  },
  'smart-ecommerce': {
    title: 'Smart E-Commerce',
    subtitle: 'Full Stack Application',
    category: 'E-Commerce Platform',
    description:
      'An AI-powered e-commerce platform featuring personalized product recommendations, automated inventory management, and comprehensive analytics dashboard.',
    image:
      'https://images.unsplash.com/photo-1666723043169-22e29545675c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc3MTQ2NDc4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Completed',
    date: 'November 2024',
    team: '5 Developers',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'TensorFlow',
      'Stripe',
      'AWS',
    ],
    link: '#',
    github: '#',
    challenges: [
      {
        title: 'Recommendation Engine',
        description:
          'Building ML models for accurate product recommendations based on user behavior.',
      },
      {
        title: 'Payment Processing',
        description:
          'Implementing secure, multi-currency payment system with fraud detection.',
      },
      {
        title: 'Scalability',
        description:
          'Handling traffic spikes during sales events without performance degradation.',
      },
    ],
    features: [
      'AI-powered product recommendations',
      'Advanced search with filters',
      'Automated inventory management',
      'Multi-vendor support',
      'Real-time analytics dashboard',
      'Mobile-responsive design',
    ],
    results: [
      '$2M+ in monthly transactions',
      '30% increase in conversion rate',
      '10,000+ active users',
      '99.95% payment success rate',
    ],
  },
};
