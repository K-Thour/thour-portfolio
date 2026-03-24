import FieldWrapper from "../../../../../components/ui/fieldWrapper/FieldWrapper";
import { useAppSelector } from "../../../../../hooks/useRedux";

interface BasicInfoFieldsProps {
  formData: {
    name: string;
    category: string;
  };
  errors: Record<string, string | undefined>;
  categories: string[];
  onFormDataChange: (data: Record<string, string>) => void;
}

export function BasicInfoFields({
  formData,
  errors,
  categories,
  onFormDataChange,
}: BasicInfoFieldsProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <>
      <FieldWrapper label="Technology Name" isDark={isDark}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            onFormDataChange({ ...formData, name: e.target.value })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.name ? "border-red-500" : ""}`}
          placeholder="e.g., React, Node.js, Python"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </FieldWrapper>

      <FieldWrapper label="Category" isDark={isDark}>
        <select
          value={formData.category}
          onChange={(e) =>
            onFormDataChange({ ...formData, category: e.target.value })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.category ? "border-red-500" : ""}`}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </FieldWrapper>
    </>
  );
}
