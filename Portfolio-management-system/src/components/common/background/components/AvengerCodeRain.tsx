import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const codeChars = "01{}[]<>/();:=+-*&|%$#@!";

export const AvengerCodeRain: React.FC = () => {
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
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-0 text-red-500 font-mono text-xs"
          style={{ left: `${col.id * 20}px` }}
          initial={{ y: -100 }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
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
  );
};
