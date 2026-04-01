import { motion } from "motion/react";
import { MapPin, MapPinned } from "lucide-react";
import type { ContactFormData } from "../../../types";

interface FormStepLocationProps {
  formData: ContactFormData;
  isDark: boolean;
  onUpdate: <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) => void;
}

export function FormStepLocation({
  formData,
  isDark,
  onUpdate,
}: FormStepLocationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500"
              : "bg-linear-to-r from-blue-600 to-blue-400"
          }`}
        >
          <MapPinned className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Physical Location
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            All fields are optional
          </p>
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Street Address
        </label>
        <div className="relative">
          <MapPin
            className={`absolute left-3 top-3 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />
          <textarea
            value={formData.address}
            onChange={(e) => onUpdate("address", e.target.value)}
            rows={2}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="123 Main Street, Suite 100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onUpdate("city", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="San Francisco"
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            State/Province
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => onUpdate("state", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="California"
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => onUpdate("country", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="United States"
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Zip/Postal Code
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => onUpdate("zipCode", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="94102"
          />
        </div>
      </div>
    </motion.div>
  );
}
