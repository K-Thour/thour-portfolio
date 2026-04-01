import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
} from "lucide-react";
import type { ContactCardProps } from "../types";

export function ContactCard({
  contact,
  index,
  isDark,
  onView,
  onEdit,
  onDelete,
  onSetActive,
}: ContactCardProps) {
  return (
    <motion.div
      key={contact.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 rounded-2xl border group relative overflow-hidden ${
        contact.isActive
          ? isDark
            ? "bg-slate-800/50 border-red-500/50 ring-2 ring-red-500/30"
            : "bg-linear-to-br from-white to-blue-50 border-blue-500/60 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/20"
          : isDark
            ? "bg-slate-800/30 border-red-500/20 hover:border-red-500/40"
            : "bg-white border-blue-300/40 hover:border-blue-500/50 shadow-md hover:shadow-lg hover:shadow-blue-500/10"
      }`}
    >
      {/* Active Badge */}
      {contact.isActive && (
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
            isDark
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          <CheckCircle className="w-3 h-3" />
          ACTIVE
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3
            className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {contact.label}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail
                className={`w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
              <span
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {contact.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone
                className={`w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
              <span
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {contact.phone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin
                className={`w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
              <span
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {contact.city}, {contact.state}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-inherit">
          {!contact.isActive && (
            <button
              onClick={() => onSetActive(contact.id)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                isDark
                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                  : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
              }`}
            >
              <Circle className="w-4 h-4 mx-auto" />
            </button>
          )}
          {contact.isActive && (
            <div
              className={`flex-1 px-4 py-2 rounded-lg font-medium text-center ${
                isDark
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              <CheckCircle className="w-4 h-4 mx-auto" />
            </div>
          )}
          <button
            onClick={() => onView(contact)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark
                ? "bg-slate-700/50 text-white hover:bg-slate-700"
                : "bg-blue-100 text-gray-900 hover:bg-blue-200"
            }`}
          >
            <Eye className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => onEdit(contact)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark
                ? "bg-slate-700/50 text-white hover:bg-slate-700"
                : "bg-blue-100 text-gray-900 hover:bg-blue-200"
            }`}
          >
            <Edit2 className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            <Trash2 className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
