import React from "react";
import { motion } from "motion/react";

export const AvengerOrbs: React.FC = () => {
  return (
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
  );
};
