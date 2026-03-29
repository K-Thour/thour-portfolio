import { motion } from "motion/react";

interface AchievementsStepProps {
  achievements: string[];
  isDark: boolean;
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}

export function AchievementsStep({
  achievements,
  isDark,
  onAdd,
  onRemove,
}: AchievementsStepProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      onAdd(input.value);
      input.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Achievements & Honors
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="achievement-input"
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="Dean's List, Scholarship, Award..."
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "achievement-input",
              ) as HTMLInputElement;
              onAdd(input.value);
              input.value = "";
            }}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
                : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
            }`}
          >
            Add
          </button>
        </div>
        <div className="space-y-2 mt-3">
          {achievements.map((achievement: string, index: number) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg flex items-center justify-between ${
                isDark ? "bg-slate-700/50" : "bg-blue-50"
              }`}
            >
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {achievement}
              </span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
