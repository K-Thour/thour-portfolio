import { motion } from "motion/react";
import { Globe, Bell, Moon, Palette, Sun, Monitor } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../../hooks/useRedux";
import { toast } from "../../../../components/ui/toast/toast";
import type { GeneralSettingsCardProps } from "../types";

export function GeneralSettingsCard({
  settings,
  onUpdate,
}: GeneralSettingsCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";
  const hasSyncedNotifications = useRef(false);

  // Sync notification setting with browser permission state on mount only
  useEffect(() => {
    if (hasSyncedNotifications.current) return;
    if (!("Notification" in window)) return;

    const browserPermission = Notification.permission;

    // If browser denied but setting is on → turn off
    if (browserPermission === "denied" && settings.notificationsEnabled) {
      onUpdate({ ...settings, notificationsEnabled: false });
    }
    // If browser granted but setting is off → turn on
    if (browserPermission === "granted" && !settings.notificationsEnabled) {
      onUpdate({ ...settings, notificationsEnabled: true });
    }

    hasSyncedNotifications.current = true;
  }, [settings, onUpdate]);

  // Listen for permission changes
  useEffect(() => {
    if (!("Notification" in window) || !("permissions" in navigator)) return;

    let permissionStatus: PermissionStatus | null = null;

    const handlePermissionChange = () => {
      if (!permissionStatus) return;

      const state = permissionStatus.state;
      if (state === "denied" && settings.notificationsEnabled) {
        onUpdate({ ...settings, notificationsEnabled: false });
      } else if (state === "granted" && !settings.notificationsEnabled) {
        onUpdate({ ...settings, notificationsEnabled: true });
      }
    };

    navigator.permissions.query({ name: "notifications" }).then((status) => {
      permissionStatus = status;
      status.addEventListener("change", handlePermissionChange);
    });

    return () => {
      permissionStatus?.removeEventListener("change", handlePermissionChange);
    };
  }, [settings, onUpdate]);

  const handleNotificationToggle = async () => {
    const newValue = !settings.notificationsEnabled;

    if (newValue) {
      // Requesting to enable notifications
      if (!("Notification" in window)) {
        toast({
          title: "Not Supported",
          description: "This browser does not support notifications",
          variant: "destructive",
        });
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        onUpdate({ ...settings, notificationsEnabled: true });
        // Show a test notification
        new Notification("Notifications Enabled", {
          body: "You will now receive updates and alerts",
          icon: "/vite.svg",
        });
      } else {
        // Permission denied, keep it off
        onUpdate({ ...settings, notificationsEnabled: false });
      }
    } else {
      // User is turning off notifications
      onUpdate({ ...settings, notificationsEnabled: false });

      // Show info that browser permission persists but app won't send notifications
      if ("Notification" in window && Notification.permission === "granted") {
        toast({
          title: "Notifications Disabled",
          description:
            "App notifications are now off. To completely disable browser notifications, please use your browser settings.",
          variant: "warning",
          duration: 6000,
        });
      }
    }
  };

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`p-6 rounded-2xl border ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-white/80 backdrop-blur-md border-blue-300/40 shadow-lg"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDark
              ? "bg-orange-500/20 text-orange-400"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          <Globe className="w-5 h-5" />
        </div>
        <h2
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          General Settings
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4" />
            <p
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Theme
            </p>
          </div>
          <div className="flex gap-2">
            {themes.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onUpdate({ ...settings, theme: value })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  settings.theme === value
                    ? isDark
                      ? "bg-linear-to-br from-red-600 to-yellow-500"
                      : "bg-linear-to-br from-blue-600 to-blue-400"
                    : isDark
                      ? "bg-slate-700 text-gray-400 hover:bg-slate-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <div>
              <p
                className={`font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Notifications
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Receive updates and alerts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleNotificationToggle}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              settings.notificationsEnabled
                ? isDark
                  ? "bg-green-500"
                  : "bg-blue-600"
                : isDark
                  ? "bg-slate-600"
                  : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.notificationsEnabled ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Auto-save
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Automatically save changes
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onUpdate({ ...settings, autoSave: !settings.autoSave })
            }
            className={`relative w-14 h-7 rounded-full transition-colors ${
              settings.autoSave
                ? isDark
                  ? "bg-green-500"
                  : "bg-blue-600"
                : isDark
                  ? "bg-slate-600"
                  : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.autoSave ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
