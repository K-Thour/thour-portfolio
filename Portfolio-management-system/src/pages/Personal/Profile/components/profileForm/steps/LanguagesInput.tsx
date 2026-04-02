import { Plus, X } from "lucide-react";
import type { LanguagesInputProps } from "../types";
import type { Language } from "../../../types";

function LanguageItem({
  lang,
  index,
  isDark,
  onRemove,
}: {
  lang: Language;
  index: number;
  isDark: boolean;
  onRemove: (index: number) => void;
}) {
  return (
    <div
      className={`p-3 rounded-lg flex items-center justify-between ${
        isDark ? "bg-slate-700/50" : "bg-blue-50"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span
            className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {lang.name}
          </span>
          <span
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {lang.proficiency}%
          </span>
        </div>
        <div
          className={`h-2 rounded-full overflow-hidden ${
            isDark ? "bg-slate-900/50" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-full transition-all ${
              isDark
                ? "bg-linear-to-r from-red-600 to-yellow-500"
                : "bg-linear-to-r from-blue-600 to-blue-400"
            }`}
            style={{ width: `${lang.proficiency}%` }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="ml-3 hover:text-red-500"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export function LanguagesInput({
  formData,
  isDark,
  onAddLanguage,
  onRemoveLanguage,
}: LanguagesInputProps) {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${
          isDark ? "text-gray-300" : "text-gray-800"
        }`}
      >
        Languages
      </label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            id="language-name"
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="Language name (e.g., English)"
          />
          <input
            type="number"
            id="language-level"
            min="0"
            max="100"
            defaultValue="50"
            className={`w-24 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="%"
          />
          <button
            type="button"
            onClick={() => {
              const nameInput = document.getElementById(
                "language-name",
              ) as HTMLInputElement;
              const levelInput = document.getElementById(
                "language-level",
              ) as HTMLInputElement;
              if (nameInput && levelInput) {
                onAddLanguage(
                  nameInput.value,
                  parseInt(levelInput.value) || 50,
                );
                nameInput.value = "";
                levelInput.value = "50";
              }
            }}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
                : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2 mt-3">
          {formData.languages.map((lang: Language, index: number) => (
            <LanguageItem
              key={index}
              lang={lang}
              index={index}
              isDark={isDark}
              onRemove={onRemoveLanguage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
