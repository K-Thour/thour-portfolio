import React from "react";
import { Instagram, Linkedin, Github, AlertCircle } from "lucide-react";
import utils from "../../../../../../utils";
import { profileAdditionalInfoSchema } from "../../../../../../validations/profile";

const { cn } = utils.tailwindUtils;

interface SocialInputsProps {
  form: any;
  isDark?: boolean;
}

export const SocialInputs: React.FC<SocialInputsProps> = ({ form }) => {
  const socialInputs = [
    {
      icon: Instagram,
      field: "InstagramURL" as const,
      placeholder: "https://instagram.com/username",
      label: "Instagram Profile",
    },
    {
      icon: Linkedin,
      field: "LinkedInURL" as const,
      placeholder: "https://linkedin.com/in/username",
      label: "LinkedIn Profile",
    },
    {
      icon: Github,
      field: "GitHubURL" as const,
      placeholder: "https://github.com/username",
      label: "GitHub Profile",
    },
  ];

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-bold tracking-tight text-foreground">
          Social & Public Profiles
        </h4>
        <p className="text-xs text-muted-foreground">
          Public portfolio and developer handle links
        </p>
      </div>

      <div className="space-y-3">
        {socialInputs.map(({ icon: Icon, field, placeholder, label }) => (
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
            {(fieldState: any) => {
              const hasError =
                fieldState.state.meta.isTouched &&
                fieldState.state.meta.errors.length > 0;
              return (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={fieldState.state.value || ""}
                      onChange={(e) => fieldState.handleChange(e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        hasError
                          ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                          : "border-border/50",
                      )}
                      placeholder={placeholder}
                    />
                  </div>
                  {hasError && (
                    <p className="mt-1 text-xs text-destructive font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldState.state.meta.errors.join(", ")}</span>
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>
        ))}
      </div>
    </div>
  );
};

export default SocialInputs;
