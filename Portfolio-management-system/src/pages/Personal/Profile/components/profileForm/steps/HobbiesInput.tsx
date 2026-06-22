import React from "react";
import { Plus, X } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import utils from "../../../../../../utils";

const { cn } = utils.tailwindUtils;

interface HobbiesInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const HobbiesInput: React.FC<HobbiesInputProps> = ({ form, isDark }) => {
  const hobbies = useStore(
    form.store,
    (state: any) => state.values.hobbies || [],
  );

  const handleAddHobby = (value: string) => {
    if (value.trim()) {
      form.setFieldValue("hobbies", [...hobbies, value.trim()]);
    }
  };

  const handleRemoveHobby = (index: number) => {
    form.setFieldValue(
      "hobbies",
      hobbies.filter((_: any, i: number) => i !== index),
    );
  };

  return (
    <div>
      <label
        className={cn(
          "block text-sm font-medium mb-2",
          isDark ? "text-gray-300" : "text-gray-800",
        )}
      >
        Hobbies & Interests
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id="hobbies-input"
          className={cn(
            "flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all",
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:ring-red-500 focus:border-red-500"
              : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500",
          )}
          placeholder="Photography, Gaming, Reading..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              handleAddHobby(input.value);
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
              handleAddHobby(input.value);
              input.value = "";
            }
          }}
          className={cn(
            "px-4 py-3 rounded-xl font-medium transition-all hover:shadow-lg",
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500 text-white"
              : "bg-linear-to-r from-blue-600 to-blue-500 text-white",
          )}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {hobbies.map((hobby: string, index: number) => (
          <span
            key={index}
            className={cn(
              "px-3 py-1 rounded-full text-sm flex items-center gap-2",
              isDark ? "bg-slate-700 text-white" : "bg-blue-100 text-gray-900",
            )}
          >
            {hobby}
            <button
              type="button"
              onClick={() => handleRemoveHobby(index)}
              className="hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HobbiesInput;
