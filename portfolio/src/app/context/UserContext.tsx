import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicUser } from '../../services/api';

export interface UserData {
  name: string;
  email: string;
  phoneNumber?: string;
  image: string;
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL?: string;
  LinkedInURL?: string;
  GitHubURL?: string;
  hobbies: string[];
  languages: { name: string; level: string }[];
}

interface UserContextType {
  userData: UserData | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTQxMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080';

const FALLBACK_USER: UserData = {
  name: 'Karanveer Thour',
  email: 'karan@thour.com',
  image: DEFAULT_IMAGE,
  experience: 5,
  completedProjects: 50,
  solvedProblems: 200,
  happyClients: 30,
  hobbies: ['Full Stack Developer', 'AI Enthusiast', 'Tech Innovator'],
  languages: [{ name: 'English', level: 'native' }],
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchPublicUser()
      .then((data) => {
        if (!active) return;
        if (data) {
          setUserData({
            ...data,
            name: data.name || FALLBACK_USER.name,
            image: data.image?.url || FALLBACK_USER.image,
            experience:
              typeof data.experience === 'number'
                ? data.experience
                : FALLBACK_USER.experience,
            completedProjects:
              typeof data.completedProjects === 'number'
                ? data.completedProjects
                : FALLBACK_USER.completedProjects,
            solvedProblems:
              typeof data.solvedProblems === 'number'
                ? data.solvedProblems
                : FALLBACK_USER.solvedProblems,
            happyClients:
              typeof data.happyClients === 'number'
                ? data.happyClients
                : FALLBACK_USER.happyClients,
            hobbies:
              data.hobbies && data.hobbies.length > 0
                ? data.hobbies
                : FALLBACK_USER.hobbies,
          });
        } else {
          setUserData(FALLBACK_USER);
        }
      })
      .catch((err) => {
        console.error('Failed to load user info:', err);
        if (active) {
          setUserData(FALLBACK_USER);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
