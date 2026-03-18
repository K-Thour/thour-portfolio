import React, { useState } from "react";
import { motion } from "motion/react";
import { Snowflake } from "lucide-react";

export const LightBackground: React.FC = () => {
  const [snowflakes] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 3,
    })),
  );

  const [dots] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })),
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Snowflakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {snowflakes.map((s) => (
          <motion.div
            key={s.id}
            className="absolute text-blue-300"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
            }}
            animate={{
              y: [0, typeof window !== "undefined" ? window.innerHeight : 1000],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
            }}
          >
            <Snowflake className="w-4 h-4" />
          </motion.div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-100/50 to-transparent pointer-events-none" />
      </div>

      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((d) => (
          <motion.div
            key={d.id}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            style={{
              top: `${d.top}%`,
              left: `${d.left}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: d.duration,
              repeat: Infinity,
              delay: d.delay,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-600/10"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-400/10"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>
    </div>
  );
};
