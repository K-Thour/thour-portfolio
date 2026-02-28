import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

interface CodeSnippetProps {
  delay?: number;
}

export function CodeSnippet({ delay = 0 }: CodeSnippetProps) {
  const codeLines = [
    { indent: 0, text: 'const developer = {', color: 'text-blue-400' },
    { indent: 1, text: "name: 'Your Name',", color: 'text-gray-300' },
    {
      indent: 1,
      text: "role: 'Full Stack Developer',",
      color: 'text-gray-300',
    },
    { indent: 1, text: 'skills: [', color: 'text-blue-400' },
    { indent: 2, text: "'React', 'Node.js',", color: 'text-green-400' },
    { indent: 2, text: "'AI/ML', 'Cloud',", color: 'text-green-400' },
    { indent: 1, text: '],', color: 'text-blue-400' },
    { indent: 1, text: "passion: '∞',", color: 'text-yellow-400' },
    { indent: 1, text: 'coffee: true', color: 'text-red-400' },
    { indent: 0, text: '};', color: 'text-blue-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-slate-900/90 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-red-500/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm ml-2">
          <Terminal className="w-4 h-4" />
          <span>developer.js</span>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-6 font-mono text-sm overflow-hidden">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: delay + index * 0.1,
            }}
            className="flex items-center"
            style={{ paddingLeft: `${line.indent * 1.5}rem` }}
          >
            <span className="text-gray-600 mr-4 select-none">{index + 1}</span>
            <span className={line.color}>{line.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
