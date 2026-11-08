import { motion } from "motion/react";
import { Link } from "react-router";
import envConstraints from "../../../../constraints/env.constraints";
import { MessageSquare } from "lucide-react";

interface ContactCTAProps {
  isInView: boolean;
  isDark?: boolean;
}

export function ContactCTA({ isInView }: ContactCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.25 }}
      className="rounded-3xl p-8 md:p-12 text-center border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
        <MessageSquare className="w-6 h-6" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
        Interested in Working Together?
      </h3>
      <p className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm md:text-base leading-relaxed">
        Let's discuss how we can build high-impact digital experiences for your team.
      </p>
      <Link
        to={envConstraints.PORTFOLIO_WEB_BASE_URL + "/contact"}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-primary text-primary-foreground shadow-xs hover:shadow-md active:scale-[0.98] transition-all duration-200"
      >
        <span>Start a Conversation</span>
      </Link>
    </motion.div>
  );
}

