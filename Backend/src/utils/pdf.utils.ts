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

export interface ResumePdfData {
  name: string;
  description?: string;
  developerName?: string;
  developerEmail?: string;
  developerPhone?: string;
  technologies?: string[];
  projects?: ProjectDetail[];
  experience?: ExperienceDetail[];
  education?: EducationDetail[];
}

export const buildProfessionalSummary = (text: string | undefined, title: string): string => {
  if (text && text.trim().length > 30 && !text.includes('Role Description') && !text.includes('Compensation')) {
    return text.trim();
  }
  const roleTitle = title || 'React.js / Full-Stack Developer';
  return `Results-driven and innovative ${roleTitle} with extensive experience in architecting scalable web applications, responsive user interfaces, and robust client-side workflows. Highly proficient in React.js, TypeScript, Next.js, Redux, and modern CSS architectures, with demonstrated expertise in integrating RESTful APIs and real-time WebSocket communication. Adept at optimizing web performance, ensuring cross-browser compatibility, and collaborating with cross-functional teams in agile environments to deliver high-quality, user-centric software products.`;
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
  const resumeTitle = data.name || 'React.js Developer';
  const summary = buildProfessionalSummary(data.description, resumeTitle);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${(data.name || 'resume').replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf"`,
  );

  doc.pipe(res);

  const leftMargin = 28;
  const contentWidth = 539; // 595.28 - 56

  // --- HEADER ---
  doc.fontSize(20).font('Helvetica-Bold').fillColor('#0f172a').text(devName, { align: 'center' });
  doc.moveDown(0.12);
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor('#2563eb').text(resumeTitle.toUpperCase(), { align: 'center' });
  doc.moveDown(0.2);

  doc
    .fontSize(8.5)
    .font('Helvetica')
    .fillColor('#475569')
    .text(
      `${devPhone}   |   ${devEmail}   |   github.com/K-Thour   |   karan-thour.com   |   India`,
      { align: 'center' },
    );

  doc.moveDown(0.25);
  doc.strokeColor('#cbd5e1').lineWidth(0.8).moveTo(leftMargin, doc.y).lineTo(leftMargin + contentWidth, doc.y).stroke();
  doc.moveDown(0.35);

  const drawSectionHeading = (title: string) => {
    doc.moveDown(0.25);
    doc.fontSize(9.8).font('Helvetica-Bold').fillColor('#0f172a').text(title.toUpperCase());
    doc.strokeColor('#2563eb').lineWidth(1.2).moveTo(leftMargin, doc.y + 1).lineTo(leftMargin + contentWidth, doc.y + 1).stroke();
    doc.moveDown(0.28);
  };

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeading('Professional Summary');
  doc.fontSize(8.7).font('Helvetica').fillColor('#334155').text(summary, {
    lineGap: 1.8,
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
    ['react', 'next', 'type', 'java', 'html', 'css', 'tail', 'redux', 'boot', 'front', 'ui'].some((k) =>
      s.toLowerCase().includes(k),
    ),
  );
  const backendSkills = allSkills.filter((s) =>
    ['node', 'express', 'python', 'mongo', 'postgre', 'nest', 'sql', 'django', 'api', 'socket', 'back'].some((k) =>
      s.toLowerCase().includes(k),
    ),
  );
  const toolsSkills = allSkills.filter((s) => !frontendSkills.includes(s) && !backendSkills.includes(s));

  doc.fontSize(8.7).font('Helvetica-Bold').fillColor('#0f172a').text('•  Frontend Technologies: ', { continued: true });
  doc.font('Helvetica').fillColor('#334155').text(frontendSkills.join(', ') || 'React.js, TypeScript, Next.js, Redux, Tailwind CSS, HTML5, CSS3', { lineGap: 1.5 });

  doc.fontSize(8.7).font('Helvetica-Bold').fillColor('#0f172a').text('•  Backend & Databases: ', { continued: true });
  doc.font('Helvetica').fillColor('#334155').text(backendSkills.join(', ') || 'Node.js, Express.js, MongoDB, PostgreSQL, RESTful APIs, WebSockets', { lineGap: 1.5 });

  if (toolsSkills.length > 0) {
    doc.fontSize(8.7).font('Helvetica-Bold').fillColor('#0f172a').text('•  Developer Tools & Cloud: ', { continued: true });
    doc.font('Helvetica').fillColor('#334155').text(toolsSkills.join(', '), { lineGap: 1.5 });
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
            'Architected and implemented responsive full-stack web features using React.js, TypeScript, and Node.js microservices.',
            'Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.',
            'Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.',
          ],
        },
      ];

  expList.forEach((exp) => {
    doc.fontSize(9.3).font('Helvetica-Bold').fillColor('#0f172a').text(exp.position, { continued: true });
    doc.fontSize(9).font('Helvetica-Bold').fillColor('#2563eb').text(`  |  ${exp.companyName}`, { continued: true });
    const rightText = exp.duration || 'Feb 2025 — Present';
    doc.fontSize(8.3).font('Helvetica-Oblique').fillColor('#64748b').text(`   (${rightText})`);

    doc.moveDown(0.12);

    const bullets = exp.bullets || [
      'Developed modular, accessible UI components with TypeScript and React adhering to strict design standards.',
      'Implemented robust validation, error handling, and API integration workflows across core features.',
    ];

    bullets.forEach((bullet) => {
      doc.fontSize(8.5).font('Helvetica').fillColor('#334155').text(`•   ${bullet}`, {
        indent: 8,
        lineGap: 1.5,
        align: 'justify',
      });
    });

    doc.moveDown(0.2);
  });

  // --- KEY PROJECTS (Minimum 3 Projects from Database) ---
  drawSectionHeading('Key Projects');
  const projList: ProjectDetail[] = (data.projects || []).slice(0, 3);

  projList.forEach((proj) => {
    doc.fontSize(9.3).font('Helvetica-Bold').fillColor('#0f172a').text(proj.title, { continued: true });
    if (proj.role) {
      doc.fontSize(8.3).font('Helvetica').fillColor('#475569').text(`  —  ${proj.role}`);
    } else {
      doc.text('');
    }

    if (proj.techStack?.length) {
      const cleanStack = proj.techStack
        .filter((t) => typeof t === 'string' && !/^[0-9a-fA-F]{24}$/.test(t))
        .join(', ');
      if (cleanStack) {
        doc.moveDown(0.06);
        doc.fontSize(8).font('Helvetica-Bold').fillColor('#2563eb').text('Technologies: ', { continued: true });
        doc.font('Helvetica-Oblique').fillColor('#475569').text(cleanStack);
      }
    }

    doc.moveDown(0.08);

    if (proj.description) {
      doc.fontSize(8.5).font('Helvetica').fillColor('#334155').text(`•   ${proj.description}`, {
        indent: 8,
        lineGap: 1.4,
        align: 'justify',
      });
    }

    if (proj.features && proj.features.length > 0) {
      proj.features.slice(0, 2).forEach((feat) => {
        if (feat && feat !== proj.description) {
          doc.fontSize(8.5).font('Helvetica').fillColor('#334155').text(`•   ${feat}`, {
            indent: 8,
            lineGap: 1.4,
            align: 'justify',
          });
        }
      });
    }

    doc.moveDown(0.18);
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
    doc.fontSize(8.8).font('Helvetica-Bold').fillColor('#0f172a').text(edu.degree, { continued: true });
    doc.fontSize(8.5).font('Helvetica').fillColor('#475569').text(`   —   ${edu.institution}`);
    if (edu.details) {
      doc.moveDown(0.06);
      doc.fontSize(8).font('Helvetica').fillColor('#64748b').text(edu.details, { indent: 8 });
    }
    doc.moveDown(0.1);
  });

  doc.end();
};

export default {
  generateResumePdfStream,
  buildProfessionalSummary,
};
