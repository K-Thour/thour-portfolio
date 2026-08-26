import { Response } from 'express';
import { ResumePdfData, buildProfessionalSummary } from './pdf.utils';

export const generateResumeWordDocument = (data: ResumePdfData, res: Response): void => {
  const devName = data.developerName || 'Karanveer Thour';
  const devEmail = data.developerEmail || 'karanveerthour76@gmail.com';
  const devPhone = data.developerPhone || '+91 8847009521';
  const resumeTitle = data.name || 'Front-End Developer';
  const summary = buildProfessionalSummary(data.description, resumeTitle);
  const safeFilename = (data.name || 'resume').replace(/[^a-zA-Z0-9-_]/g, '_');

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

  const devGithub = data.developerGithub || 'github.com/K-Thour';
  const devLinkedin = data.developerLinkedin || 'linkedin.com/in/karanveer-thour';
  const devWebsite = data.developerWebsite || 'karan-thour.com';
  const devAddress = data.developerAddress || 'India';

  const expHtml = (data.experience || [])
    .map(
      (exp) => `
      <div style="margin-bottom: 12px;">
        <table style="width: 100%; border: none;">
          <tr>
            <td style="font-weight: bold; color: #0f172a; font-size: 11pt;">${exp.position}</td>
            <td style="text-align: right; color: #64748b; font-size: 10pt; font-style: italic;">${exp.duration || 'Feb 2025 — Present'}</td>
          </tr>
          <tr>
            <td colspan="2" style="font-weight: bold; color: #2563eb; font-size: 10.5pt;">${exp.companyName}</td>
          </tr>
        </table>
        <ul style="margin: 4px 0 0 18px; padding: 0; color: #334155; font-size: 10pt;">
          ${(exp.bullets && exp.bullets.length > 0
            ? exp.bullets
            : [
                'Architected and implemented responsive full-stack features with React.js, TypeScript, and Node.js microservices.',
                'Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.',
                'Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.',
                'Implemented secure RESTful APIs, JWT authentication, and role-based access control workflows.',
                'Collaborated across agile sprints with cross-functional product, QA, and DevOps teams to ensure seamless CI/CD deployments.',
              ]
          )
            .map((b) => `<li style="margin-bottom: 3px; text-align: justify;">${b}</li>`)
            .join('')}
        </ul>
      </div>`,
    )
    .join('');

  const projHtml = (data.projects || [])
    .map(
      (p) => {
        const bullets: string[] = [];
        if (p.description) bullets.push(p.description);
        if (p.features && p.features.length > 0) {
          p.features.forEach((f) => {
            if (f && f !== p.description && !bullets.includes(f)) {
              bullets.push(f);
            }
          });
        }
        if (p.outcome && p.outcome.trim().length > 0) {
          bullets.push(`Impact: ${p.outcome.trim()}`);
        }

        return `
      <div style="margin-bottom: 10px;">
        <table style="width: 100%; border: none;">
          <tr>
            <td style="font-weight: bold; color: #0f172a; font-size: 10.5pt;">${p.title}</td>
            <td style="text-align: right; color: #64748b; font-size: 9.5pt;">${p.role || 'Full Stack Engineer'}</td>
          </tr>
        </table>
        ${
          p.techStack?.length
            ? `<div style="font-size: 9pt; color: #2563eb; font-style: italic; margin-bottom: 3px;"><strong>Technologies:</strong> ${p.techStack.join(', ')}</div>`
            : ''
        }
        <ul style="margin: 3px 0 0 18px; padding: 0; color: #334155; font-size: 9.5pt;">
          ${bullets.slice(0, 5)
            .map((f) => `<li style="margin-bottom: 3px; text-align: justify;">${f}</li>`)
            .join('')}
        </ul>
      </div>`;
      },
    )
    .join('');

  const eduHtml = (data.education || [])
    .map(
      (ed) => `
      <div style="margin-bottom: 6px;">
        <div style="font-weight: bold; color: #0f172a; font-size: 10pt;">${ed.degree} <span style="font-weight: normal; color: #475569;">— ${ed.institution}</span></div>
        ${ed.details ? `<div style="font-size: 8.5pt; color: #64748b; margin-left: 10px;">${ed.details}</div>` : ''}
      </div>`,
    )
    .join('');

  const contactLine = [
    devPhone,
    devEmail,
    devGithub.replace(/^https?:\/\//, ''),
    devLinkedin.replace(/^https?:\/\//, ''),
    devWebsite.replace(/^https?:\/\//, ''),
    devAddress,
  ].filter(Boolean).join(' &nbsp;|&nbsp; ');

  const docContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${devName} - Resume</title>
  <style>
    body {
      font-family: 'Calibri', 'Helvetica', 'Arial', sans-serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #1e293b;
      margin: 20px;
    }
    h1 {
      font-size: 20pt;
      color: #0f172a;
      text-align: center;
      margin: 0 0 2px 0;
    }
    .title {
      font-size: 11pt;
      color: #2563eb;
      font-weight: bold;
      text-align: center;
      margin: 0 0 6px 0;
    }
    .contact {
      font-size: 9pt;
      color: #64748b;
      text-align: center;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 10.5pt;
      font-weight: bold;
      color: #0f172a;
      border-bottom: 1.5pt solid #2563eb;
      padding-bottom: 2px;
      margin-top: 12px;
      margin-bottom: 6px;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <h1>${devName}</h1>
  <div class="title">${resumeTitle.toUpperCase()}</div>
  <div class="contact">${contactLine}</div>

  <div class="section-title">Professional Summary</div>
  <p style="text-align: justify; margin: 0 0 8px 0;">${summary}</p>

  <div class="section-title">Technical Skills</div>
  <p style="margin: 0 0 3px 0;"><strong>• Frontend Technologies:</strong> ${frontendSkills.join(', ') || 'React.js, TypeScript, Next.js, Redux, Tailwind CSS, HTML5, CSS3'}</p>
  <p style="margin: 0 0 3px 0;"><strong>• Backend & Databases:</strong> ${backendSkills.join(', ') || 'Node.js, Express.js, MongoDB, PostgreSQL, RESTful APIs, WebSockets'}</p>
  ${toolsSkills.length > 0 ? `<p style="margin: 0 0 8px 0;"><strong>• Developer Tools & Cloud:</strong> ${toolsSkills.join(', ')}</p>` : ''}

  <div class="section-title">Professional Experience</div>
  ${expHtml}

  <div class="section-title">Key Projects</div>
  ${projHtml}

  <div class="section-title">Education & Credentials</div>
  ${eduHtml}
</body>
</html>
`;

  res.setHeader('Content-Type', 'application/msword');
  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.doc"`);
  res.send(docContent);
};

export default {
  generateResumeWordDocument,
};
