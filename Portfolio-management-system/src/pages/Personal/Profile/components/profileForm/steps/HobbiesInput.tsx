import React from "react";
import { Plus, X } from "lucide-react";
import { useStore } from "@tanstack/react-form";

interface HobbiesInputProps {
  form: any;
  isDark?: boolean;
}

export const HobbiesInput: React.FC<HobbiesInputProps> = ({ form }) => {
  const [newHobby, setNewHobby] = React.useState("");
  const hobbies = useStore(
    form.store,
    (state: any) => state.values.hobbies || [],
  );

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      form.setFieldValue("hobbies", [...hobbies, newHobby.trim()]);
      setNewHobby("");
    }
  };

  const handleRemoveHobby = (index: number) => {
    form.setFieldValue(
      "hobbies",
      hobbies.filter((_: any, i: number) => i !== index),
    );
  };

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          Hobbies & Personal Interests
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border/50 bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="e.g. Photography, Open Source, Hiking..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddHobby();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddHobby}
            aria-label="Add hobby"
            className="px-4 py-2.5 rounded-xl font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {hobbies.map((hobby: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-accent/60 text-foreground border border-border/40 flex items-center gap-1.5 shadow-2xs"
          >
            <span>{hobby}</span>
            <button
              type="button"
              onClick={() => handleRemoveHobby(index)}
              aria-label={`Remove ${hobby}`}
              className="p-0.5 rounded-md hover:bg-destructive/20 hover:text-destructive transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HobbiesInput;
