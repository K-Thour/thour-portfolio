import { motion } from "motion/react";
import { Globe, Bell, Palette, Sun, Moon, Monitor, Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "../../../../components/ui/toast/toast";
import type { GeneralSettingsCardProps } from "../types";

export function GeneralSettingsCard({
  settings,
  onUpdate,
}: GeneralSettingsCardProps) {
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

    let isMounted = true;
    if (navigator?.permissions?.query) {
      navigator.permissions
        .query({ name: "notifications" as PermissionName })
        .then((status) => {
          if (!isMounted) return;
          permissionStatus = status;
          status.addEventListener("change", handlePermissionChange);
        })
        .catch(() => {});
    }

    return () => {
      isMounted = false;
      permissionStatus?.removeEventListener("change", handlePermissionChange);
    };
  }, [settings, onUpdate]);

  const handleNotificationToggle = async () => {
    const newValue = !settings.notificationsEnabled;

    if (newValue) {
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
        new Notification("Notifications Enabled", {
          body: "You will now receive updates and system alerts",
          icon: "/vite.svg",
        });
        toast({
          title: "Notifications Enabled",
          description: "Push notifications are now active.",
          variant: "success",
        });
      } else {
        onUpdate({ ...settings, notificationsEnabled: false });
        toast({
          title: "Permission Denied",
          description: "Notification permission was denied in your browser.",
          variant: "destructive",
        });
      }
    } else {
      onUpdate({ ...settings, notificationsEnabled: false });

      if ("Notification" in window && Notification.permission === "granted") {
        toast({
          title: "Notifications Disabled",
          description:
            "App notifications are now off. To completely revoke permissions, manage your browser site settings.",
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.15 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            General Preferences
          </h2>
          <p className="text-xs text-muted-foreground">
            System appearance and automated sync triggers
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Segmented Control */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Theme</span>
          </div>

          <div className="p-1 rounded-2xl bg-accent/40 border border-border/40 grid grid-cols-3 gap-1">
            {themes.map(({ value, icon: Icon, label }) => {
              const isSelected = settings.theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onUpdate({ ...settings, theme: value })}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs transition-all cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/25 border border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Push Notifications
              </p>
              <p className="text-xs text-muted-foreground">
                Receive browser alerts for inquiries and AI progress
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.notificationsEnabled}
            aria-label="Toggle notifications"
            onClick={handleNotificationToggle}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 ${
              settings.notificationsEnabled ? "bg-primary" : "bg-accent/90 border-border/60"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                settings.notificationsEnabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Auto-save Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/25 border border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Auto-Save Changes
              </p>
              <p className="text-xs text-muted-foreground">
                Automatically persist edits without manual confirmation
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.autoSave}
            aria-label="Toggle auto-save"
            onClick={() =>
              onUpdate({ ...settings, autoSave: !settings.autoSave })
            }
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 ${
              settings.autoSave ? "bg-primary" : "bg-accent/90 border-border/60"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                settings.autoSave ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
