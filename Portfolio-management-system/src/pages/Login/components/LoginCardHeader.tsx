import React from "react";
import { motion } from "motion/react";
import { LockKeyhole } from "lucide-react";
import type { theme } from "../../../interfaces/common/common.interface";

export const LoginCardHeader: React.FC<theme> = () => {
  return (
    <div className="flex flex-col items-center mb-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 border border-primary/20 shadow-inner text-primary"
      >
        <LockKeyhole className="w-7 h-7" />
      </motion.div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Admin Portal
      </h1>
      <p className="text-sm mt-1 text-muted-foreground">
        Sign in to access your portfolio control center
      </p>
    </div>
  );
};
