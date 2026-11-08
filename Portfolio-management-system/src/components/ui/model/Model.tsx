import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { sizeClasses } from "./constraints/constraints";
import type { ModalProps } from "./types";

let openModalCount = 0;

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className,
}: ModalProps) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    openModalCount++;
    if (openModalCount === 1) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    }

    return () => {
      openModalCount--;
      if (openModalCount === 0) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollYRef.current);
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 min-h-screen flex items-center justify-center"
          />

          {/* Modal */}
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className={`w-full ${sizeClasses[size]} ${className || ""} my-8`}
            >
              <div className={`rounded-3xl border border-border/50 flex flex-col max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] ${
                size === "sm" ? "overflow-visible" : "overflow-hidden"
              } bg-card/95 backdrop-blur-2xl shadow-2xl text-foreground`}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/40 shrink-0 bg-card/40">
                  <h2 
                    id="modal-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-foreground"
                  >
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    type="button"
                    aria-label="Close modal"
                    className="p-1.5 rounded-xl transition-all hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div
                  className={`p-6 flex-1 ${
                    size === "sm"
                      ? "overflow-visible"
                      : "overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/60 [&::-webkit-scrollbar-track]:bg-transparent"
                  }`}
                >
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
