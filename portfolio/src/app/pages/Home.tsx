import { Services } from '../components/Services';
import { TechStack } from '../components/TechStack';
import { Stats } from '../components/Stats';
import { useTheme } from '../context/ThemeContext';
import { HomeHero } from '../components/home/HomeHero';
import { HomeFeaturedProjects } from '../components/home/HomeFeaturedProjects';
import { HomeCta } from '../components/home/HomeCta';
import { SEOHead } from '../components/seo/SEOHead';

export function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div
      className={
        isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-blue-50'
      }
    >
      <SEOHead
        ogType="website"
        canonicalUrl="https://karanveerthour.com/"
      />

      {/* Hero Section */}
      <HomeHero />

      {/* Stats Section */}
      <Stats />

      {/* Tech Stack Section */}
      <TechStack />

      {/* Featured Projects Spotlight */}
      <HomeFeaturedProjects />

      {/* Services Section */}
      <Services />

      {/* Bottom Conversion CTA */}
      <HomeCta />
    </div>
  );
}
