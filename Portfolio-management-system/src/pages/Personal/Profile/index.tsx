import { useProfile } from "./hooks/useProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileCard } from "./components/ProfileCard";
import { StatsGrid } from "./components/StatsGrid";
import { HobbiesCard } from "./components/HobbiesCard";
import { LanguagesCard } from "./components/LanguagesCard";
import { ProfileModal } from "./components/ProfileModal";
import { AppBackground } from "../../../components/common/background/AppBackground";
import Footer from "../../../layouts/footer/Footer";

export function Profile() {
  const { profileData, isModalOpen, handlers } = useProfile();

  return (
    <div className="space-y-6 mx-4">
      <AppBackground />
      <ProfileHeader
        onEdit={handlers.handleEdit}
        onBack={handlers.handleBack}
      />

      <ProfileCard profileData={profileData} />

      <StatsGrid profileData={profileData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HobbiesCard hobbies={profileData.hobbies} />
        <LanguagesCard languages={profileData.languages} />
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={handlers.handleCloseModal}
        onSubmit={handlers.handleSubmit}
        initialData={profileData}
      />
      <Footer />
    </div>
  );
}
