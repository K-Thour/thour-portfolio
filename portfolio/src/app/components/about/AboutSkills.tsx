import { motion } from 'motion/react';
import { Code2, Database, Brain, Cloud, Smartphone, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router';

interface AboutSkillsProps {
  isInView: boolean;
}

export function AboutSkills({ isInView }: AboutSkillsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const navigate = useNavigate();

  const skills = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description:
        'Building responsive, performant interfaces with React, Next.js, and modern JavaScript frameworks.',
      techs: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      color: isDark ? 'from-red-600 to-red-400' : 'from-blue-600 to-blue-400',
    },
    {
      icon: Database,
      title: 'Backend & Databases',
      description:
        'Designing scalable APIs and robust database architectures for enterprise applications.',
      techs: ['Node.js', 'PostgreSQL', 'MongoDB', 'Redis'],
      color: isDark ? 'from-blue-600 to-blue-400' : 'from-blue-700 to-blue-500',
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description:
        'Integrating intelligent features using modern AI technologies and machine learning models.',
      techs: ['OpenAI', 'TensorFlow', 'Python', 'NLP'],
      color: isDark
        ? 'from-purple-600 to-purple-400'
        : 'from-blue-500 to-blue-300',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description:
        'Deploying and managing applications on cloud platforms with CI/CD pipelines.',
      techs: ['AWS', 'Docker', 'CI/CD', 'Kubernetes'],
      color: isDark
        ? 'from-green-600 to-green-400'
        : 'from-blue-400 to-blue-200',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description:
        'Creating cross-platform mobile experiences with React Native and modern tools.',
      techs: ['React Native', 'iOS', 'Android', 'PWA'],
      color: isDark ? 'from-pink-600 to-pink-400' : 'from-blue-600 to-blue-300',
    },
    {
      icon: Zap,
      title: 'Performance & Security',
      description:
        'Optimizing for speed, reliability, and implementing best security practices.',
      techs: ['Optimization', 'Testing', 'Security', 'Analytics'],
      color: isDark
        ? 'from-yellow-600 to-yellow-400'
        : 'from-blue-500 to-blue-400',
    },
  ];
  const link = '/services/web-development';

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {skills.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-2 group ${
              isDark
                ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50'
                : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-xl hover:shadow-blue-500/20'
            }`}
            onClick={() => navigate(link)}
          >
            <div
              className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg ${
                !isDark && 'shadow-blue-500/30'
              }`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3
              className={`text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {skill.title}
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              {skill.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {skill.techs.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-1 rounded-full text-xs ${
                    isDark
                      ? 'bg-slate-900/80 border border-red-500/20 text-gray-300'
                      : 'bg-blue-100 border border-blue-300/50 text-gray-800'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
