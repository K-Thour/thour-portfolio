import React from "react";

export interface IconInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  isDark: boolean;
  icon: React.ReactNode;
  rightElement?: React.ReactNode;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isTouched?: boolean;
  hasError?: boolean;
}

const IconInput: React.FC<IconInputProps> = ({
  id,
  name,
  type,
  value,
  placeholder,
  isDark,
  icon,
  rightElement,
  onBlur,
  onChange,
  hasError,
}) => (
  <div
    className={`
    flex items-center gap-2.5 h-12 px-4 rounded-xl border transition-all duration-200
    ${
      isDark
        ? hasError
          ? "bg-slate-950/60 border-red-500/60 focus-within:border-red-500"
          : "bg-slate-950/60 border-slate-700/80 hover:border-slate-600 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
        : hasError
          ? "bg-white border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
          : "bg-white border-slate-200 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
    }
  `}
  >
    <span
      className={`flex items-center justify-center flex-shrink-0 transition-colors ${isDark ? "text-slate-500" : "text-slate-400"}`}
    >
      {icon}
    </span>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      className={`
        w-full h-full py-0 flex-1 bg-transparent text-sm md:text-base outline-none
        ${
          isDark
            ? "text-slate-200 placeholder:text-slate-600 autofill-text-dark"
            : "text-black placeholder:text-slate-500 autofill-text-light"
        }
      `}
    />
    {rightElement && (
      <span className="flex items-center justify-center flex-shrink-0">
        {rightElement}
      </span>
    )}
  </div>
);

export default IconInput;
