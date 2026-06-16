import { useState, useEffect, useCallback } from "react";
import type { ProfileData } from "../types";
import { fetchCurrentUser, updateCurrentUser } from "../../../../services/api";

const defaultProfileData: ProfileData = {
  name: "",
  email: "",
  phoneNumber: "",
  image: { type: "url", url: "https://placehold.co/150", file: null },
  experience: 0,
  completedProjects: 0,
  solvedProblems: 0,
  happyClients: 0,
  InstagramURL: "",
  LinkedInURL: "",
  GitHubURL: "",
  hobbies: [],
  languages: [],
};

export function useProfile() {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const me = await fetchCurrentUser();
      const mapped = {
        name: me.name || "",
        email: me.email || "",
        phoneNumber: me.phoneNumber || "",
        image: {
          type: "url" as const,
          url: me.image?.url || "https://placehold.co/150",
          file: null,
        },
        experience: me.experience || 0,
        completedProjects: me.completedProjects || 0,
        solvedProblems: me.solvedProblems || 0,
        happyClients: me.happyClients || 0,
        InstagramURL: me.InstagramURL || "",
        LinkedInURL: me.LinkedInURL || "",
        GitHubURL: me.GitHubURL || "",
        hobbies: me.hobbies || [],
        languages: me.languages
          ? me.languages.map((l: any) => ({
              name: l.name,
              proficiency: l.level === "fluent" ? 100 : 80,
            }))
          : [],
      };
      setProfileData(mapped);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: ProfileData) => {
    const payload = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      image: data.image?.url ? { publicId: "profile", url: data.image.url } : undefined,
      experience: Number(data.experience),
      completedProjects: Number(data.completedProjects),
      solvedProblems: Number(data.solvedProblems),
      happyClients: Number(data.happyClients),
      InstagramURL: data.InstagramURL,
      LinkedInURL: data.LinkedInURL,
      GitHubURL: data.GitHubURL,
      hobbies: data.hobbies || [],
      languages: data.languages
        ? data.languages.map((l) => ({
            name: l.name,
            level: l.proficiency >= 90 ? "fluent" : "conversational",
          }))
        : [],
    };

    try {
      await updateCurrentUser(payload);
      await loadProfile();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    window.history.back();
  };

  return {
    profileData,
    loading,
    isModalOpen,
    handlers: {
      handleEdit,
      handleSubmit,
      handleCloseModal,
      handleBack,
    },
  };
}
