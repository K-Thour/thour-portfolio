import FieldWrapper from "../../../../../components/ui/fieldWrapper/FieldWrapper";
import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";

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
  const { theme } = useAppSelector((state: RootState) => state.theme);
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
          className={`w-full px-4 py-3 rounded-xl border appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-size-[1.5rem] bg-position-[right_0.75rem_center] bg-no-repeat focus:outline-none focus:ring-2 cursor-pointer ${
            isDark
              ? "bg-slate-800 border-slate-600 text-white focus:ring-slate-500"
              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
          } ${errors.category ? "border-red-500" : ""}`}
        >
          <option
            value=""
            className={
              isDark ? "bg-slate-800 text-gray-400" : "bg-white text-gray-500"
            }
          >
            Select a category
          </option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className={
                isDark ? "bg-slate-800 text-white" : "bg-white text-gray-900"
              }
            >
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
