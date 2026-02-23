import { Services } from '../components/Services';
import { TechStack } from '../components/TechStack';
import { Stats } from '../components/Stats';
import { useTheme } from '../context/ThemeContext';
import { HomeHero } from '../components/home/HomeHero';

interface HomeProps {
  profileImage?: string;
}

export function Home({ profileImage }: HomeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div
      className={
        isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-blue-50'
      }
    >
      {/* Hero Section */}
      <HomeHero profileImage={profileImage} />

      {/* Stats Section */}
      <Stats />

      {/* Tech Stack Section */}
      <TechStack />

      {/* Services Section */}
      <Services />
    </div>
  );
}
