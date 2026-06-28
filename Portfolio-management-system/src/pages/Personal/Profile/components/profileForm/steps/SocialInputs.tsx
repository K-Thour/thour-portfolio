import React from "react";
import { Instagram, Linkedin, Github } from "lucide-react";
import utils from "../../../../../../utils";
import { profileAdditionalInfoSchema } from "../../../../../../validations/profile";

const { cn } = utils.tailwindUtils;

interface SocialInputsProps {
  form: any;
  isDark: boolean;
}

export const SocialInputs: React.FC<SocialInputsProps> = ({ form, isDark }) => {
  const socialInputs = [
    {
      icon: Instagram,
      field: "InstagramURL" as const,
      placeholder: "Instagram profile URL",
    },
    {
      icon: Linkedin,
      field: "LinkedInURL" as const,
      placeholder: "LinkedIn profile URL",
    },
    {
      icon: Github,
      field: "GitHubURL" as const,
      placeholder: "GitHub profile URL",
    },
  ];

  return (
    <div>
      <h3
        className={cn(
          "text-lg font-bold mb-4",
          isDark ? "text-white" : "text-gray-900",
        )}
      >
        Social Media Links
      </h3>
      <div className="space-y-3">
        {socialInputs.map(({ icon: Icon, field, placeholder }) => (
          <form.Field
            key={field}
            name={field}
            validators={{
              onChange: ({ value }: { value: string }) => {
                try {
                  profileAdditionalInfoSchema.validateSyncAt(field, {
                    [field]: value,
                  });
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(fieldState: any) => (
              <div className="space-y-1">
                <div className="relative">
                  <Icon
                    className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
                      isDark ? "text-gray-500" : "text-gray-400",
                    )}
                  />
                  <input
                    type="url"
                    value={fieldState.state.value || ""}
                    onChange={(e) => fieldState.handleChange(e.target.value)}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                      isDark
                        ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                        : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                      fieldState.state.meta.isTouched &&
                        fieldState.state.meta.errors.length > 0
                        ? "border-red-500"
                        : "",
                    )}
                    placeholder={placeholder}
                  />
                </div>
                {fieldState.state.meta.isTouched &&
                  fieldState.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.state.meta.errors.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        ))}
      </div>
    </div>
  );
};

export default SocialInputs;
