import React from "react";
import { Plus, X } from "lucide-react";
import { useStore } from "@tanstack/react-form";

interface LanguagesInputProps {
  form: any;
  isDark?: boolean;
}

interface Language {
  name: string;
  proficiency: number;
}

function LanguageItem({
  lang,
  index,
  onRemove,
}: {
  lang: Language;
  index: number;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="p-3.5 rounded-2xl bg-accent/30 border border-border/40 flex items-center justify-between gap-3">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-semibold text-xs text-foreground">
            {lang.name}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {lang.proficiency}%
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden bg-accent/80">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${lang.proficiency}%` }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        aria-label={`Remove ${lang.name}`}
        className="p-1 text-muted-foreground hover:text-destructive active:scale-95 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export const LanguagesInput: React.FC<LanguagesInputProps> = ({ form }) => {
  const [langName, setLangName] = React.useState("");
  const [proficiency, setProficiency] = React.useState(50);

  const languages = useStore(
    form.store,
    (state: any) => state.values.languages || [],
  );

  const handleAddLanguage = () => {
    if (langName.trim()) {
      form.setFieldValue("languages", [
        ...languages,
        { name: langName.trim(), proficiency },
      ]);
      setLangName("");
      setProficiency(50);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    form.setFieldValue(
      "languages",
      languages.filter((_: any, i: number) => i !== index),
    );
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-foreground mb-1.5">
        Languages & Spoken Proficiency
      </label>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border/50 bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="e.g. English, Spanish, Japanese"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddLanguage();
              }
            }}
          />
          <div className="relative w-20">
            <input
              type="number"
              min="0"
              max="100"
              value={proficiency}
              onChange={(e) => setProficiency(Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)))}
              className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-6 text-center"
              placeholder="%"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
              %
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddLanguage}
            aria-label="Add language"
            className="px-4 py-2.5 rounded-xl font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 pt-1">
          {languages.map((lang: Language, index: number) => (
            <LanguageItem
              key={index}
              lang={lang}
              index={index}
              onRemove={handleRemoveLanguage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagesInput;
