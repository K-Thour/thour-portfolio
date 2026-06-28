import React from "react";
import { motion } from "motion/react";
import { User, Mail, Phone } from "lucide-react";
import utils from "../../../../../../utils";
import { profileBasicInfoSchema } from "../../../../../../validations/profile";

const { cn } = utils.tailwindUtils;

interface BasicInfoStepProps {
  form: any;
  isDark: boolean;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  form,
  isDark,
}) => {
  return (
    <div className="space-y-4">
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
        {(field: any) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-gray-300" : "text-gray-800",
              )}
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
                  isDark ? "text-gray-500" : "text-gray-400",
                )}
              />
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="John Doe"
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                    : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                  field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "",
                )}
              />
            </div>
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>

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
        {(field: any) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-gray-300" : "text-gray-800",
              )}
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
                  isDark ? "text-gray-500" : "text-gray-400",
                )}
              />
              <input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="john@example.com"
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                    : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                  field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "",
                )}
              />
            </div>
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>

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
        {(field: any) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-gray-300" : "text-gray-800",
              )}
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
                  isDark ? "text-gray-500" : "text-gray-400",
                )}
              />
              <input
                type="tel"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                    : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                  field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "",
                )}
              />
            </div>
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>
    </div>
  );
};

export default BasicInfoStep;
