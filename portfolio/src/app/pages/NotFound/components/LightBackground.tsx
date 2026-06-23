import { motion } from 'motion/react';
import { Snowflake } from 'lucide-react';

const snowflakes = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 5 + 5,
  delay: Math.random() * 3,
}));

const dots = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 2,
}));

export function LightBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {snowflakes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-blue-300/40"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{ y: [0, 800], opacity: [0.2, 0.7, 0.2], rotate: [0, 360] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'linear',
          }}
        >
          <Snowflake className="w-4 h-4" />
        </motion.div>
      ))}
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute w-1 h-1 rounded-full bg-blue-400/40"
          style={{ top: `${d.top}%`, left: `${d.left}%` }}
          animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.3, 1] }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
          }}
        />
      ))}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl bg-blue-600/5"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ top: '15%', left: '10%' }}
      />
    </div>
  );
}
