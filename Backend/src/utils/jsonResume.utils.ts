import { Response } from 'express';
import { ResumePdfData, buildProfessionalSummary } from './pdf.utils';

export const generateResumeJson = (data: ResumePdfData, res: Response): void => {
  const devName = data.developerName || 'Karanveer Thour';
  const devEmail = data.developerEmail || 'karanveerthour76@gmail.com';
  const devPhone = data.developerPhone || '+91 8847009521';
  const resumeTitle = data.name || 'Front-End Developer';
  const summary = buildProfessionalSummary(data.description, resumeTitle);
  const safeFilename = (data.name || 'resume').replace(/[^a-zA-Z0-9-_]/g, '_');

  const jsonResume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: devName,
      label: resumeTitle,
      email: devEmail,
      phone: devPhone,
      url: 'https://karan-thour.com',
      summary,
      location: {
        countryCode: 'IN',
        country: 'India',
      },
      profiles: [
        {
          network: 'GitHub',
          username: 'K-Thour',
          url: 'https://github.com/K-Thour',
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
        'Optimized frontend asset delivery and client caching, significantly improving Core Web Vitals and load times.',
      ],
    })),
    projects: (data.projects || []).slice(0, 3).map((p) => ({
      name: p.title,
      description: p.description,
      highlights: p.features || [p.description],
      keywords: p.techStack || [],
      url: p.workingUrl || '',
    })),
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
