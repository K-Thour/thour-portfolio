import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "./hooks/useSettings";
import { SettingsHeader } from "./components/SettingsHeader";
import { AISettingsCard } from "./components/AISettingsCard";
import { ResumeSettingsCard } from "./components/ResumeSettingsCard";
import { GeneralSettingsCard } from "./components/GeneralSettingsCard";
import { SecuritySettingsCard } from "./components/SecuritySettingsCard";
import { AppBackground } from "../../../components/common/background/AppBackground";

export function Settings() {
  const navigate = useNavigate();
  const { settings, hasChanges, handlers } = useSettings();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6 mx-4 min-h-screen">
      <AppBackground />

      <SettingsHeader
        onSave={handlers.handleSave}
        onReset={handlers.handleReset}
        onBack={handleBack}
        hasChanges={hasChanges}
        autoSave={settings.general.autoSave}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AISettingsCard
          settings={settings.ai}
          onUpdate={handlers.handleUpdateAI}
        />
        <ResumeSettingsCard
          settings={settings.resume}
          onUpdate={handlers.handleUpdateResume}
        />
        <GeneralSettingsCard
          settings={settings.general}
          onUpdate={handlers.handleUpdateGeneral}
        />
        <SecuritySettingsCard />
      </motion.div>
    </div>
  );
}

export default Settings;
