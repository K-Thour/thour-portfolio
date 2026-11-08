import { HeroCanvasWrapper } from '@/components/3d/HeroCanvasWrapper';
import { TechMarquee } from '@/components/ui/TechMarquee';
import { CinematicPerformanceGraph } from '@/components/ui/CinematicPerformanceGraph';
import { GlobalPresenceCard } from '@/components/ui/GlobalPresenceCard';
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Mail,
  Boxes,
} from 'lucide-react';
import {
  userService,
  projectService,
  serviceService,
  techService,
  experienceService,
} from '@/services/index';
import { PortfolioRedirectButton } from '@/components/ui/PortfolioRedirectButton';
import type { PublicUser, Project, Service, Technology, Experience } from '@/types/api';

// Safe string extractor to guarantee no object is ever rendered as a React child
function toSafeString(val: any, fallback = ''): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object' && val.name && typeof val.name === 'string') return val.name;
  if (typeof val === 'object' && val.title && typeof val.title === 'string') return val.title;
  return fallback;
}

export default async function HomePage() {
  // Resilient Server-Side Data Fetching from Backend APIs
  let user: PublicUser = {
    name: 'Karan Thour',
    title: 'Full-Stack Web Developer',
    email: 'contact@thour-portfolio.com',
    experience: 5,
    completedProjects: 24,
    solvedProblems: 500,
    happyClients: 18,
    hobbies: ['Web Apps', 'Clean UI Design', 'Modern Technology'],
  };
  let projects: Project[] = [];
  let services: Service[] = [];
  let _technologies: Technology[] = [];
  let experiences: Experience[] = [];

  try {
    const results = await Promise.allSettled([
      userService.getPublicUser(),
      projectService.getProjects(),
      serviceService.getServices(),
      techService.getTechnologies(),
      experienceService.getExperience(),
    ]);

    if (results[0].status === 'fulfilled' && results[0].value) user = { ...user, ...results[0].value };
    if (results[1].status === 'fulfilled' && Array.isArray(results[1].value) && results[1].value.length > 0) projects = results[1].value;
    if (results[2].status === 'fulfilled' && Array.isArray(results[2].value) && results[2].value.length > 0) services = results[2].value;
    if (results[3].status === 'fulfilled' && Array.isArray(results[3].value) && results[3].value.length > 0) _technologies = results[3].value;
    if (results[4].status === 'fulfilled' && Array.isArray(results[4].value) && results[4].value.length > 0) experiences = results[4].value;
  } catch {
    // Graceful offline fallback
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* ─── Hero Section with Three.js 3D Canvas ─────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-hero overflow-hidden"
      >
        {/* Three.js Interactive Ambient Background Canvas */}
        <HeroCanvasWrapper />

        <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-8">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs sm:text-sm font-medium text-emerald-500 border border-emerald-500/20 shadow-xs backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new projects</span>
          </div>

          {/* Simple, Non-Technical Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I&apos;m <span className="text-gradient-brand">{user.name || 'Karan Thour'}</span>
              <br />I build fast, modern websites.
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
              Full-stack developer focused on clean design, reliable code, and smooth user experiences that work seamlessly on every device.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <PortfolioRedirectButton variant="primary" label="Open Full Portfolio" />
            <a
              href="#projects"
              className="apple-pressable inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/20 apple-focus-ring"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="apple-pressable inline-flex items-center gap-2 px-6 py-2.5 rounded-full apple-glass text-[var(--foreground)] font-semibold text-xs sm:text-sm hover:border-[var(--primary)] apple-focus-ring"
            >
              <span>Contact Me</span>
            </a>
          </div>

          {/* Stats Bento Grid */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="apple-glass rounded-2xl p-4 text-center border border-[var(--glass-border)]">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">
                {user.experience ?? 5}+
              </div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Years Experience</div>
            </div>

            <div className="apple-glass rounded-2xl p-4 text-center border border-[var(--glass-border)]">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                {user.completedProjects ?? 24}+
              </div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Projects Built</div>
            </div>

            <div className="apple-glass rounded-2xl p-4 text-center border border-[var(--glass-border)]">
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                {user.solvedProblems ?? 500}+
              </div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Problems Solved</div>
            </div>

            <div className="apple-glass rounded-2xl p-4 text-center border border-[var(--glass-border)]">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                {user.happyClients ?? 18}+
              </div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cinematic Slow-Moving Tech Marquee (Right to Left, Stops on Hover) ─── */}
      <section id="skills" className="border-t border-b border-[var(--glass-border)] bg-[var(--card)]/30 backdrop-blur-md">
        <TechMarquee />
      </section>

      {/* ─── Services Section ────────────────────────────────────────────── */}
      <section id="services" className="py-20 px-4 max-w-5xl mx-auto w-full border-t border-[var(--glass-border)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-[var(--primary)]">
            <Boxes className="w-5 h-5" />
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Services</h2>
          </div>
          <PortfolioRedirectButton variant="nav" label="All Services" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(services.length > 0 ? services.slice(0, 3) : [
            {
              _id: 's1',
              name: 'Web Development',
              title: 'Web Development',
              description: 'Fast, modern websites and custom web applications built with React and Next.js.',
            },
            {
              _id: 's2',
              name: 'Cloud & Hosting',
              title: 'Cloud & Hosting',
              description: 'Setting up secure cloud infrastructure, databases, and continuous automated deployments.',
            },
            {
              _id: 's3',
              name: 'Clean UI Design',
              title: 'Clean UI Design',
              description: 'Intuitive, glassmorphic interfaces that look great and feel natural on phones and desktops.',
            },
          ]).map((svc) => (
            <div
              key={svc._id}
              className="apple-glass-card rounded-2xl p-6 border border-[var(--glass-border)] flex flex-col justify-between hover:border-[var(--primary)] transition-all"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--foreground)]">
                  {toSafeString(svc.title || svc.name, 'Service')}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {toSafeString(svc.description, 'Tailored professional software development.')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Simple Performance & Quality Chart ─────────────────────────── */}
      <section id="telemetry" className="py-20 px-4 max-w-5xl mx-auto w-full border-t border-[var(--glass-border)]">
        <CinematicPerformanceGraph />
      </section>

      {/* ─── Projects Section ────────────────────────────────────────────── */}
      <section id="projects" className="py-20 px-4 max-w-5xl mx-auto w-full border-t border-[var(--glass-border)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-[var(--primary)]">
            <Briefcase className="w-5 h-5" />
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Recent Projects</h2>
          </div>
          <PortfolioRedirectButton variant="nav" label="View All Projects" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(projects.length > 0 ? projects.slice(0, 4) : ([
            {
              _id: 'p1',
              title: 'Portfolio Management System',
              category: 'Web Application',
              description: 'Modern dashboard system for managing portfolio content, projects, and themes.',
              image: { url: '' },
            },
            {
              _id: 'p2',
              title: 'Interactive Developer Portfolio',
              category: 'Website',
              description: 'Next.js developer portfolio with 3D physics, glassmorphic UI, and instant page loading.',
              image: { url: '' },
            },
          ] as Project[])).map((proj) => {
            // Guarantee category is never an object in JSX
            const categoryName = toSafeString(proj.category, 'Project');
            const projectTitle = toSafeString(proj.title, 'Featured Project');
            const projectDesc = toSafeString(proj.description, 'A modern software engineering project.');
            const rawImg = (proj as any).image;
            const projectImg =
              typeof rawImg === 'object' && rawImg?.url
                ? rawImg.url
                : typeof rawImg === 'string'
                ? rawImg
                : null;

            return (
              <div
                key={proj._id}
                className="apple-glass-card rounded-2xl overflow-hidden border border-[var(--glass-border)] flex flex-col hover:border-[var(--primary)] transition-all group"
              >
                {/* Top hairline highlight */}
                <div
                  aria-hidden="true"
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                {/* Optional Thumbnail */}
                {projectImg && (
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950/40">
                    <img
                      src={projectImg}
                      alt={projectTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--primary)] font-semibold">
                      {categoryName}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{projectTitle}</h3>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{projectDesc}</p>
                  </div>

                  {Array.isArray(proj.techStack) && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.techStack.slice(0, 4).map((tech: any, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--input-background)] text-[var(--muted-foreground)] border border-[var(--glass-border)]"
                        >
                          {toSafeString(tech, 'Tech')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Experience Section ─────────────────────────────────────────── */}
      <section id="experience" className="py-20 px-4 max-w-5xl mx-auto w-full border-t border-[var(--glass-border)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-[var(--primary)]">
            <GraduationCap className="w-5 h-5" />
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Work Experience</h2>
          </div>
          <PortfolioRedirectButton variant="nav" label="Full Timeline" />
        </div>

        <div className="space-y-4">
          {(experiences.length > 0 ? experiences.slice(0, 3) : [
            {
              _id: 'e1',
              companyName: 'Senior Software Engineer',
              position: 'Lead Full-Stack Developer',
              description: 'Led development of high-performance web applications and fluid user interfaces.',
            },
          ]).map((exp) => (
            <div
              key={exp._id}
              className="apple-glass rounded-xl p-5 border border-[var(--glass-border)] flex items-start justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-[var(--foreground)]">
                  {toSafeString(exp.position, 'Software Engineer')}
                </h3>
                <div className="text-xs text-[var(--primary)] font-medium mt-0.5">
                  {toSafeString(exp.companyName, 'Company')}
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
                  {toSafeString(exp.description, 'Built scalable web applications and intuitive interfaces.')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact Section ────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-4 max-w-5xl mx-auto w-full border-t border-[var(--glass-border)] space-y-12">
        {/* Location & Availability Card */}
        <GlobalPresenceCard />

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold">
            <Mail className="w-5 h-5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Let&apos;s Work Together
          </h2>
          <p className="max-w-xl mx-auto text-sm text-[var(--muted-foreground)] leading-relaxed">
            Have a project in mind, need help with your website, or just want to connect? Feel free to reach out anytime.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <PortfolioRedirectButton variant="primary" label="Contact on Portfolio" />
            <a
              href="mailto:contact@thour-portfolio.com"
              className="apple-pressable px-6 py-2.5 rounded-full apple-glass text-xs sm:text-sm font-semibold hover:border-[var(--primary)]"
            >
              Email Me Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
