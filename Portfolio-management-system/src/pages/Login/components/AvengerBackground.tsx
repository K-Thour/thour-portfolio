import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const codeChars = "01{}[]<>/();:=+-*&|%$#@!";

export const AvengerBackground: React.FC = () => {
  const [columns, setColumns] = useState(() => {
    if (typeof window === "undefined") return [];
    return Array.from(
      { length: Math.floor(window.innerWidth / 20) },
      (_, i) => ({
        id: i,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        chars: Array.from({ length: 20 }, () =>
          Math.floor(Math.random() * codeChars.length),
        ),
      }),
    );
  });

  const [particles] = useState(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })),
  );

  useEffect(() => {
    const handleResize = () => {
      setColumns((prev) => {
        const newCols = Math.floor(window.innerWidth / 20);
        if (newCols === prev.length) return prev;
        return Array.from({ length: newCols }, (_, i) => {
          if (i < prev.length) return prev[i];
          return {
            id: i,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            chars: Array.from({ length: 20 }, () =>
              Math.floor(Math.random() * codeChars.length),
            ),
          };
        });
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Code Rain */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {columns.map((col) => (
          <motion.div
            key={col.id}
            className="absolute top-0 text-red-500 font-mono text-xs"
            style={{ left: `${col.id * 20}px` }}
            initial={{ y: -100 }}
            animate={{
              y:
                typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
            }}
            transition={{
              duration: col.duration,
              repeat: Infinity,
              delay: col.delay,
              ease: "linear",
            }}
          >
            {col.chars.map((charIndex, i) => (
              <div key={`${col.id}-${i}`}>{codeChars[charIndex]}</div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Animated background stars/particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl bg-red-600/20"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl bg-yellow-500/20"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>
    </div>
  );
};
