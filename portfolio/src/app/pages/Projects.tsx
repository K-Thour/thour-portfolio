import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ProjectsHeader } from '../components/projects/ProjectsHeader';
import {
  ProjectCard,
  type ProjectItem,
} from '../components/projects/ProjectCard';
import { ProjectsCta } from '../components/projects/ProjectsCta';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const projects = [
    {
      id: 'ai-code-assistant',
      title: 'AI Code Assistant',
      subtitle: isDark ? 'Machine Learning Project' : 'Wisdom of the Ancients',
      description:
        'Intelligent code completion and documentation tool powered by GPT-4, helping developers write better code faster.',
      image:
        'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzE0NzYzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Python', 'OpenAI', 'React', 'FastAPI'],
      link: '#',
      github: '#',
      status: 'Completed',
    },
    {
      id: 'dev-workspace-pro',
      title: 'Dev Workspace Pro',
      subtitle: isDark ? 'Productivity Platform' : 'Hall of Warriors',
      description:
        'All-in-one development environment with integrated tools, code editor, and collaboration features for remote teams.',
      image:
        'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzEzOTg3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Next.js', 'TypeScript', 'WebSocket', 'Docker'],
      link: '#',
      github: '#',
      status: 'In Progress',
    },
    {
      id: 'terminal-dashboard',
      title: 'Terminal Dashboard',
      subtitle: isDark ? 'Developer Tool' : 'Rune Stone Portal',
      description:
        'Beautiful terminal-based dashboard for monitoring servers, deployments, and real-time metrics with AI insights.',
      image:
        'https://images.unsplash.com/photo-1738255654134-1877cb984a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RpbmclMjBzY3JlZW4lMjBkYXJrfGVufDF8fHx8MTc3MTQ4MTc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Node.js', 'React', 'D3.js', 'Kubernetes'],
      link: '#',
      github: '#',
      status: 'Completed',
    },
    {
      id: 'smart-ecommerce',
      title: 'Smart E-Commerce',
      subtitle: isDark ? 'Full Stack Application' : 'Trading Empire',
      description:
        'AI-powered e-commerce platform with personalized recommendations, automated inventory, and analytics dashboard.',
      image:
        'https://images.unsplash.com/photo-1666723043169-22e29545675c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc3MTQ2NDc4MHww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Node.js', 'MongoDB', 'TensorFlow'],
      link: '#',
      github: '#',
      status: 'Completed',
    },
  ];

  return (
    <div
      className={`min-h-screen pt-24 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <ProjectsHeader isInView={isInView} />

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project as ProjectItem}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* CTA Section */}
          <ProjectsCta isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}
