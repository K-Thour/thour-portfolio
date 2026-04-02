import { Plus, X } from "lucide-react";
import type { AdditionalInfoStepProps } from "../types";

type HobbiesInputProps = Pick<
  AdditionalInfoStepProps,
  "formData" | "isDark" | "onAddHobby" | "onRemoveHobby"
>;

export function HobbiesInput({
  formData,
  isDark,
  onAddHobby,
  onRemoveHobby,
}: HobbiesInputProps) {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${
          isDark ? "text-gray-300" : "text-gray-800"
        }`}
      >
        Hobbies & Interests
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id="hobbies-input"
          className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          }`}
          placeholder="Photography, Gaming, Reading..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              onAddHobby(input.value);
              input.value = "";
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            const input = document.getElementById(
              "hobbies-input",
            ) as HTMLInputElement;
            if (input) {
              onAddHobby(input.value);
              input.value = "";
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
      <div className="flex flex-wrap gap-2 mt-3">
        {formData.hobbies.map((hobby: string, index: number) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
              isDark ? "bg-slate-700 text-white" : "bg-blue-100 text-gray-900"
            }`}
          >
            {hobby}
            <button
              type="button"
              onClick={() => onRemoveHobby(index)}
              className="hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
