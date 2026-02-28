import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TerminalWindowProps {
  delay?: number;
}

export function TerminalWindow({ delay = 0 }: TerminalWindowProps) {
  const [displayedText, setDisplayedText] = useState('');
  const commands = [
    '$ npm install --save awesomeness',
    '> Compiling mission parameters...',
    '> Initializing hero mode...',
    '✓ Ready to save the world!',
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;

    const interval = setInterval(() => {
      if (currentLine < commands.length) {
        if (currentChar < commands[currentLine].length) {
          setDisplayedText((prev) => prev + commands[currentLine][currentChar]);
          currentChar++;
        } else {
          setDisplayedText((prev) => prev + '\n');
          currentLine++;
          currentChar = 0;
        }
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="bg-slate-900/90 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-red-500/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm ml-2">
          <Terminal className="w-4 h-4" />
          <span>jarvis-terminal</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm text-green-400 h-40 overflow-hidden">
        <pre className="whitespace-pre-wrap">{displayedText}</pre>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-green-400 ml-1"
        />
      </div>
    </motion.div>
  );
}
