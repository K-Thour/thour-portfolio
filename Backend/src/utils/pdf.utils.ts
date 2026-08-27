import PDFDocument from 'pdfkit';
import { Response } from 'express';

export interface ProjectDetail {
  title: string;
  role?: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  outcome?: string;
  workingUrl?: string;
  githubUrl?: string;
  techStack?: string[];
}

export interface ExperienceDetail {
  position: string;
  companyName: string;
  duration?: string;
  location?: string;
  description?: string;
  bullets?: string[];
}

export interface EducationDetail {
  degree: string;
  institution: string;
  year?: string;
  details?: string;
}

export interface LanguageDetail {
  name: string;
  proficiency: string;
}

export interface ResumePdfData {
  name: string;
  description?: string;
  developerName?: string;
  developerEmail?: string;
  developerPhone?: string;
  developerGithub?: string;
  developerLinkedin?: string;
  developerWebsite?: string;
  developerAddress?: string;
  technologies?: string[];
  projects?: ProjectDetail[];
  experience?: ExperienceDetail[];
  education?: EducationDetail[];
  languages?: LanguageDetail[];
}

export const buildProfessionalSummary = (
  text: string | undefined,
  title: string,
  _devName?: string,
): string => {
  const roleTitle = title || 'React.js / Full-Stack Software Engineer';
  const defaultSummary = `Results-driven and innovative ${roleTitle} with 3+ years of experience building scalable web applications, modern responsive interfaces, and robust backend architectures. Highly proficient in React.js, TypeScript, Next.js, Redux, Node.js, and modern CSS frameworks, with proven expertise in RESTful API integration, real-time state management, and performance optimization. Adept at delivering clean, maintainable code within agile cross-functional teams to build high-impact, user-centric software solutions.`;

  if (!text || typeof text !== 'string') {
    return defaultSummary;
  }

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // If text contains ANY company job description keywords, it is a job posting, NOT a candidate summary!
  const isJobPosting = [
    'about the role',
    'about the job',
    'about us',
    'we are seeking',
    'we are looking',
    'looking for a',
    'ideal candidate',
    'responsibilities',
    'key responsibilities',
    'accountabilities',
    'requirements',
    'qualifications',
    'preferred qualifications',
    'job types',
    'application question',
    'work location',
    'share resume',
    'contact at',
    'equal-opportunity',
    'benefits',
    'compensation',
    'jobgether',
    'partner company',
    'this position',
    'you will collaborate',
    'candidate should',
    'in person',
    'full-time',
    'part-time',
    'contract',
    'apply',
    'hiring',
    'sector 82',
    'mohali',
  ].some((phrase) => lower.includes(phrase));

  // If it is a job posting or excessively long raw text, discard it and return the clean tailored candidate summary
  if (isJobPosting || trimmed.length > 500) {
    return defaultSummary;
  }

  // If it's a valid candidate summary of reasonable length
  if (trimmed.length >= 30) {
    return trimmed;
  }

  return defaultSummary;
};

export const generateResumePdfStream = (data: ResumePdfData, res: Response): void => {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 28,
    info: {
      Title: `${data.developerName || 'Karanveer Thour'} - Resume`,
      Author: data.developerName || 'Karanveer Thour',
      Subject: data.name || 'Software Engineer Resume',
    },
  });

  const devName = data.developerName || 'Karanveer Thour';
  const devEmail = data.developerEmail || 'karanveerthour76@gmail.com';
  const devPhone = data.developerPhone || '+91 8847009521';
  const devGithub = data.developerGithub || 'github.com/K-Thour';
  const devLinkedin = data.developerLinkedin || 'linkedin.com/in/karanveer-thour';
  const devWebsite = data.developerWebsite || 'karan-thour.com';
  const devAddress = data.developerAddress || 'India';
  const resumeTitle = data.name || 'React.js Developer';
  const summary = buildProfessionalSummary(data.description, resumeTitle, devName);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${(data.name || 'resume').replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf"`,
  );

  doc.pipe(res);

  const leftMargin = 28;
  const contentWidth = 539; // 595.28 - 56

  // --- HEADER ---
  doc.fontSize(22).font('Helvetica-Bold').fillColor('#0f172a').text(devName, { align: 'center' });
  doc.moveDown(0.16);
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor('#2563eb')
    .text(resumeTitle.toUpperCase(), { align: 'center' });
  doc.moveDown(0.26);

  const formatDisplayUrl = (url?: string): string => {
    if (!url) return '';
    let clean = url
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/+$/, '');
    if (!clean) return '';
    if (!clean.startsWith('www.')) {
      clean = `www.${clean}`;
    }
    return clean;
  };

  const formatLocation = (loc?: string): string => {
    if (!loc) return '';
    return loc
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => part.replace(/\b\w/g, (c) => c.toUpperCase()))
      .join(', ');
  };

  const formattedGithub = formatDisplayUrl(devGithub);
  const formattedLinkedin = formatDisplayUrl(devLinkedin);
  const formattedWebsite = formatDisplayUrl(devWebsite);
  const formattedAddress = formatLocation(devAddress);

  const contactLine1 = [
    devPhone,
    devEmail,
    formattedGithub,
    formattedLinkedin,
    formattedWebsite,
  ].filter(Boolean);

  doc
    .fontSize(7.5)
    .font('Helvetica')
    .fillColor('#475569')
    .text(contactLine1.join('   |   '), { align: 'center' });

  if (formattedAddress) {
    doc.moveDown(0.18);
    doc
      .fontSize(7.5)
      .font('Helvetica')
      .fillColor('#475569')
      .text(formattedAddress, { align: 'center' });
  }

  doc.moveDown(0.28);
  doc
    .strokeColor('#cbd5e1')
    .lineWidth(0.8)
    .moveTo(leftMargin, doc.y)
    .lineTo(leftMargin + contentWidth, doc.y)
    .stroke();
  doc.moveDown(0.28);

  const drawSectionHeading = (title: string) => {
    doc.moveDown(0.42);
    doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#0f172a').text(title.toUpperCase());
    doc
      .strokeColor('#2563eb')
      .lineWidth(1.2)
      .moveTo(leftMargin, doc.y + 1)
      .lineTo(leftMargin + contentWidth, doc.y + 1)
      .stroke();
    doc.moveDown(0.28);
  };

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeading('Professional Summary');
  doc.fontSize(8.5).font('Helvetica').fillColor('#334155').text(summary, {
    lineGap: 2.0,
    align: 'justify',
  });
  doc.moveDown(0.25);

  // --- TECHNICAL SKILLS ---
  drawSectionHeading('Technical Skills');
  const allSkills = data.technologies?.length
    ? data.technologies
    : [
        'React.js',
        'TypeScript',
        'JavaScript (ES6+)',
        'Next.js',
        'Redux Toolkit',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'Python',
        'MongoDB',
        'PostgreSQL',
        'REST APIs',
        'WebSockets',
        'Docker',
        'AWS',
        'Git',
      ];

  const frontendSkills = allSkills.filter((s) =>
    ['react', 'next', 'type', 'java', 'html', 'css', 'tail', 'redux', 'boot', 'front', 'ui'].some(
      (k) => s.toLowerCase().includes(k),
    ),
  );
  const backendSkills = allSkills.filter((s) =>
    [
      'node',
      'express',
      'python',
      'mongo',
      'postgre',
      'nest',
      'sql',
      'django',
      'api',
      'socket',
      'back',
    ].some((k) => s.toLowerCase().includes(k)),
  );
  const toolsSkills = allSkills.filter(
    (s) => !frontendSkills.includes(s) && !backendSkills.includes(s),
  );

  doc
    .fontSize(8.5)
    .font('Helvetica-Bold')
    .fillColor('#0f172a')
    .text('•  Frontend Technologies: ', { continued: true });
  doc
    .font('Helvetica')
    .fillColor('#334155')
    .text(
      frontendSkills.join(', ') ||
        'React.js, TypeScript, Next.js, Redux, Tailwind CSS, HTML5, CSS3',
      { lineGap: 1.8 },
    );

  doc
    .fontSize(8.5)
    .font('Helvetica-Bold')
    .fillColor('#0f172a')
    .text('•  Backend & Databases: ', { continued: true });
  doc
    .font('Helvetica')
    .fillColor('#334155')
    .text(
      backendSkills.join(', ') ||
        'Node.js, Express.js, MongoDB, PostgreSQL, RESTful APIs, WebSockets',
      { lineGap: 1.8 },
    );

  if (toolsSkills.length > 0) {
    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor('#0f172a')
      .text('•  Developer Tools & Cloud: ', { continued: true });
    doc.font('Helvetica').fillColor('#334155').text(toolsSkills.join(', '), { lineGap: 1.8 });
  }
  doc.moveDown(0.25);

  // --- PROFESSIONAL EXPERIENCE ---
  drawSectionHeading('Professional Experience');
  const expList: ExperienceDetail[] = data.experience?.length
    ? data.experience
    : [
        {
          position: 'Associate Full Stack Web Developer',
          companyName: 'Devronins Private Limited',
          duration: 'Feb 2025 — Present',
          bullets: [
            'Architected and implemented responsive full-stack features with React.js, TypeScript, and Node.js microservices.',
            'Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.',
            'Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.',
            'Implemented secure RESTful APIs, JWT authentication, and role-based access control workflows.',
            'Collaborated across agile sprints with cross-functional product, QA, and DevOps teams to ensure seamless CI/CD deployments.',
          ],
        },
      ];

  expList.forEach((exp) => {
    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor('#0f172a')
      .text(exp.position, { continued: true });
    doc
      .fontSize(8.8)
      .font('Helvetica-Bold')
      .fillColor('#2563eb')
      .text(`  |  ${exp.companyName}`, { continued: true });
    const rightText = exp.duration || 'Feb 2025 — Present';
    doc.fontSize(8).font('Helvetica-Oblique').fillColor('#64748b').text(`   (${rightText})`);

    doc.moveDown(0.12);

    const bullets =
      exp.bullets && exp.bullets.length > 0
        ? exp.bullets
        : [
            'Architected and implemented responsive full-stack features with React.js, TypeScript, and Node.js microservices.',
            'Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.',
            'Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.',
            'Implemented secure RESTful APIs, JWT authentication, and role-based access control workflows.',
            'Collaborated across agile sprints with cross-functional product, QA, and DevOps teams to ensure seamless CI/CD deployments.',
          ];

    bullets.forEach((bullet) => {
      doc.fontSize(8.2).font('Helvetica').fillColor('#334155').text(`•   ${bullet}`, {
        indent: 8,
        lineGap: 1.6,
        align: 'justify',
      });
    });

    doc.moveDown(0.24);
  });

  // --- KEY PROJECTS (Up to 5 Points Each) ---
  drawSectionHeading('Key Projects');
  const projList: ProjectDetail[] = data.projects || [];

  projList.forEach((proj) => {
    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor('#0f172a')
      .text(proj.title, { continued: true });
    if (proj.role) {
      doc.fontSize(8).font('Helvetica').fillColor('#475569').text(`  —  ${proj.role}`);
    } else {
      doc.text('');
    }

    if (proj.techStack?.length) {
      const cleanStack = proj.techStack
        .filter((t) => typeof t === 'string' && !/^[0-9a-fA-F]{24}$/.test(t))
        .join(', ');
      if (cleanStack) {
        doc.moveDown(0.06);
        doc
          .fontSize(7.8)
          .font('Helvetica-Bold')
          .fillColor('#2563eb')
          .text('Technologies: ', { continued: true });
        doc.font('Helvetica-Oblique').fillColor('#475569').text(cleanStack);
      }
    }

    doc.moveDown(0.08);

    const projectBullets: string[] = [];
    if (proj.description) projectBullets.push(proj.description);
    if (proj.features && proj.features.length > 0) {
      proj.features.forEach((feat) => {
        if (feat && feat !== proj.description && !projectBullets.includes(feat)) {
          projectBullets.push(feat);
        }
      });
    }
    if (proj.outcome && proj.outcome.trim().length > 0) {
      projectBullets.push(`Impact: ${proj.outcome.trim()}`);
    }

    projectBullets.slice(0, 5).forEach((bullet) => {
      doc.fontSize(8.2).font('Helvetica').fillColor('#334155').text(`•   ${bullet}`, {
        indent: 8,
        lineGap: 1.6,
        align: 'justify',
      });
    });

    doc.moveDown(0.24);
  });

  // --- EDUCATION ---
  drawSectionHeading('Education & Credentials');
  const eduList: EducationDetail[] = data.education?.length
    ? data.education
    : [
        {
          degree: 'Bachelor of Computer Applications (BCA)',
          institution: 'Indira Gandhi National Open University',
          details: 'Core Focus: Data Structures, Algorithms, Web Engineering, Database Systems',
        },
      ];

  eduList.forEach((edu) => {
    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor('#0f172a')
      .text(edu.degree, { continued: true });
    doc.fontSize(8.2).font('Helvetica').fillColor('#475569').text(`   —   ${edu.institution}`);
    if (edu.details) {
      doc.moveDown(0.06);
      doc
        .fontSize(7.8)
        .font('Helvetica')
        .fillColor('#64748b')
        .text(edu.details, { indent: 8, lineGap: 1.6 });
    }
    doc.moveDown(0.2);
  });

  // --- LANGUAGES ---
  drawSectionHeading('Languages');
  const langList: LanguageDetail[] = data.languages?.length
    ? data.languages
    : [
        { name: 'Punjabi', proficiency: 'Mother tongue' },
        { name: 'Hindi', proficiency: 'Conversationally fluent' },
        { name: 'English', proficiency: 'Business knowledge' },
      ];

  const langItems = langList.map((l) => `${l.name} (${l.proficiency})`).join('   |   ');
  doc
    .fontSize(8.5)
    .font('Helvetica-Bold')
    .fillColor('#0f172a')
    .text('•  Languages: ', { continued: true });
  doc.font('Helvetica').fillColor('#334155').text(langItems, { lineGap: 1.8 });
  doc.moveDown(0.2);

  doc.end();
};

export default {
  generateResumePdfStream,
  buildProfessionalSummary,
};
