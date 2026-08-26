import { Response } from 'express';
import { ResumePdfData, buildProfessionalSummary } from './pdf.utils';

export const generateResumeJson = (data: ResumePdfData, res: Response): void => {
  const devName = data.developerName || 'Karanveer Thour';
  const devEmail = data.developerEmail || 'karanveerthour76@gmail.com';
  const devPhone = data.developerPhone || '+91 8847009521';
  const resumeTitle = data.name || 'Front-End Developer';
  const summary = buildProfessionalSummary(data.description, resumeTitle);
  const safeFilename = (data.name || 'resume').replace(/[^a-zA-Z0-9-_]/g, '_');

  const devGithub = data.developerGithub || 'github.com/K-Thour';
  const devLinkedin = data.developerLinkedin || 'linkedin.com/in/karanveer-thour';
  const devWebsite = data.developerWebsite || 'https://karan-thour.com';
  const devAddress = data.developerAddress || 'India';

  const jsonResume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: devName,
      label: resumeTitle,
      email: devEmail,
      phone: devPhone,
      url: devWebsite.startsWith('http') ? devWebsite : `https://${devWebsite}`,
      summary,
      location: {
        address: devAddress,
        countryCode: 'IN',
        country: 'India',
      },
      profiles: [
        {
          network: 'GitHub',
          username: devGithub.replace(/^https?:\/\/github\.com\//, ''),
          url: devGithub.startsWith('http') ? devGithub : `https://${devGithub}`,
        },
        {
          network: 'LinkedIn',
          username: devLinkedin.replace(/^https?:\/\/linkedin\.com\/in\//, ''),
          url: devLinkedin.startsWith('http') ? devLinkedin : `https://${devLinkedin}`,
        },
      ],
    },
    skills: (data.technologies || []).map((t) => ({
      name: t,
      level: 'Proficient',
    })),
    work: (data.experience || []).map((exp) => ({
      name: exp.companyName,
      position: exp.position,
      startDate: exp.duration?.split('—')[0]?.trim() || '2025-02',
      endDate: exp.duration?.split('—')[1]?.trim() || 'Present',
      summary: exp.description || 'Full stack engineering and architecture',
      highlights: exp.bullets || [
        'Architected and implemented responsive full-stack features with React.js, TypeScript, and Node.js microservices.',
        'Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.',
        'Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.',
        'Implemented secure RESTful APIs, JWT authentication, and role-based access control workflows.',
        'Collaborated across agile sprints with cross-functional product, QA, and DevOps teams to ensure seamless CI/CD deployments.',
      ],
    })),
    projects: (data.projects || []).map((p) => {
      const bullets: string[] = [];
      if (p.description) bullets.push(p.description);
      if (p.features && p.features.length > 0) {
        p.features.forEach((f) => {
          if (f && f !== p.description && !bullets.includes(f)) {
            bullets.push(f);
          }
        });
      }
      if (p.outcome) bullets.push(`Impact: ${p.outcome}`);

      return {
        name: p.title,
        role: p.role,
        description: p.description,
        highlights: bullets.slice(0, 5),
        keywords: p.techStack || [],
        url: p.workingUrl || p.githubUrl || '',
      };
    }),
    education: (data.education || []).map((ed) => ({
      institution: ed.institution,
      area: ed.degree,
      studyType: 'Degree',
      startDate: '2020',
      endDate: '2023',
      courses: ed.details ? [ed.details] : [],
    })),
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.json"`);
  res.json(jsonResume);
};

export default {
  generateResumeJson,
};
