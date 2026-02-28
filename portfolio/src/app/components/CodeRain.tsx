import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function CodeRain() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: cols }, (_, i) => i));
  }, []);

  const codeChars = '01{}[]<>/();:=+-*&|%$#@!';

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {columns.map((col) => (
        <motion.div
          key={col}
          className="absolute top-0 text-red-500 font-mono text-xs"
          style={{ left: `${col * 20}px` }}
          initial={{ y: -100 }}
          animate={{ y: window.innerHeight }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>
              {codeChars[Math.floor(Math.random() * codeChars.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
