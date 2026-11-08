interface NameInputProps {
  isDark?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function NameInput({ value, onChange }: NameInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        Collection Name <span className="text-destructive">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Senior Frontend Showcase, Mobile Apps Review"
        className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-accent/30 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
      />
    </div>
  );
}

