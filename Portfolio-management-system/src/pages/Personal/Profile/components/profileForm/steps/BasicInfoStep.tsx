import React from "react";
import { motion } from "motion/react";
import { User, Mail, Phone, AlertCircle } from "lucide-react";
import utils from "../../../../../../utils";
import { profileBasicInfoSchema } from "../../../../../../validations/profile";

const { cn } = utils.tailwindUtils;

interface BasicInfoStepProps {
  form: any;
  isDark?: boolean;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      {/* Name Field */}
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              profileBasicInfoSchema.validateSyncAt("name", { name: value });
              return undefined;
            } catch (err: any) {
              return err.message;
            }
          },
        }}
      >
        {(field: any) => {
          const hasError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;
          return (
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Full Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Alex Hunter"
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    hasError
                      ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                      : "border-border/50",
                  )}
                />
              </div>
              {hasError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{field.state.meta.errors.join(", ")}</span>
                </motion.p>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Email Field */}
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              profileBasicInfoSchema.validateSyncAt("email", { email: value });
              return undefined;
            } catch (err: any) {
              return err.message;
            }
          },
        }}
      >
        {(field: any) => {
          const hasError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;
          return (
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Email Address <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="alex@domain.com"
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    hasError
                      ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                      : "border-border/50",
                  )}
                />
              </div>
              {hasError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{field.state.meta.errors.join(", ")}</span>
                </motion.p>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Phone Field */}
      <form.Field
        name="phoneNumber"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              profileBasicInfoSchema.validateSyncAt("phoneNumber", {
                phoneNumber: value,
              });
              return undefined;
            } catch (err: any) {
              return err.message;
            }
          },
        }}
      >
        {(field: any) => {
          const hasError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;
          return (
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    hasError
                      ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                      : "border-border/50",
                  )}
                />
              </div>
              {hasError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{field.state.meta.errors.join(", ")}</span>
                </motion.p>
              )}
            </div>
          );
        }}
      </form.Field>
    </div>
  );
};

export default BasicInfoStep;
