import { useProfile } from "./hooks/useProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileCard } from "./components/ProfileCard";
import { StatsGrid } from "./components/StatsGrid";
import { HobbiesCard } from "./components/HobbiesCard";
import { LanguagesCard } from "./components/LanguagesCard";
import { ProfileModal } from "./components/ProfileModal";
import { AppBackground } from "../../../components/common/background/AppBackground";
import PageLoadingSkeleton from "../../../components/common/loading/PageLoadingSkeleton";

export function Profile() {
  const { profileData, loading, isModalOpen, handlers } = useProfile();

  if (loading && !profileData.name) {
    return (
      <div className="space-y-6 mx-4">
        <AppBackground />
        <PageLoadingSkeleton count={3} type="card" />
      </div>
    );
  }

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
        isLoading={loading}
        onClose={handlers.handleCloseModal}
        onSubmit={handlers.handleSubmit}
        initialData={profileData}
      />
    </div>
  );
}
