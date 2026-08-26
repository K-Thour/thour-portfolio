import { Request, Response } from 'express';
import { createResumeInput, IResume } from '../interface/models/resume/resume.interface';
import services from '../services';
import { Types } from 'mongoose';
import timeZone from '../utils/date.utils';
import models from '../models';
import { generateResumePdfStream, ResumePdfData } from '../utils/pdf.utils';
import { generateResumeWordDocument } from '../utils/word.utils';
import { generateResumeJson } from '../utils/jsonResume.utils';

const create = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const resumeDetails: createResumeInput = req.body;
  const result = await services.resumeServices.createService(resumeDetails, userId);
  res.status(result.statusCode).json(result);
};

const update = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const resumeDetails: IResume = req.body;
  const id: string = req.params.id as string;
  const result = await services.resumeServices.updateService(id, resumeDetails, userId);
  res.status(result.statusCode).json(result);
};

const softDelete = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const id: string = req.params.id as string;
  const result = await services.resumeServices.softDeleteService(
    id,
    new Date(timeZone.utc.dateTime() + 'Z'),
    userId,
  );
  res.status(result.statusCode).json(result);
};

const deleteOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.resumeServices.deleteOneService(id);
  res.status(result.statusCode).json(result);
};

const get = async (req: Request, res: Response) => {
  const result = await services.resumeServices.getService(req.query);
  res.status(result.statusCode).json(result);
};

const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const result = await services.resumeServices.getOneService({
    filter: [{ _id: new Types.ObjectId(id) }],
  });
  res.status(result.statusCode).json(result);
};

const generate = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const {
    name,
    description,
    jobLink,
    designType,
    latexCode,
    designFileUrl,
    targetRole,
    selectedProjectIds,
    selectedExperienceIds,
  } = req.body;
  const result = await services.resumeServices.generateService(
    name,
    description,
    jobLink,
    designType,
    latexCode,
    designFileUrl,
    userId,
    targetRole,
    selectedProjectIds,
    selectedExperienceIds,
  );
  res.status(result.statusCode).json(result);
};

// Helper to assemble and rank resume data matching target job keywords completely from Database
const prepareResumeData = async (resumeIdOrFilename: string): Promise<ResumePdfData> => {
  let resume = null;
  if (resumeIdOrFilename && Types.ObjectId.isValid(resumeIdOrFilename)) {
    resume = await models.resume.repo.getOne({
      filter: [{ _id: new Types.ObjectId(resumeIdOrFilename) }],
    });
  }

  let user = null;
  if (resume?.createdBy) {
    user = await models.user.repo.getOne({ filter: [{ _id: resume.createdBy }] });
  }
  if (!user) {
    user = await models.user.repo.getOne();
  }

  // Fetch live collections from database
  const projects = await models.project.repo.get({ filter: [{ isDeleted: false }] });
  const experience = await models.experience.repo.get({ filter: [{ isDeleted: false }] });
  const education = await models.education.repo.get({ filter: [{ isDeleted: false }] });
  const technologies = await models.technology.repo.get({ filter: [{ isDeleted: false }] });

  const techMap = new Map<string, string>();
  technologies.forEach((t: any) => {
    techMap.set(t._id.toString(), t.name);
  });

  const formatExpDuration = (joining: any, leaving: any, stillWorking: boolean) => {
    const formatDate = (d: any) => {
      if (!d) return '';
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return String(d).split('T')[0];
      return dt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };
    const start = formatDate(joining) || 'Feb 2025';
    const end = stillWorking ? 'Present' : formatDate(leaving) || 'Present';
    return `${start} — ${end}`;
  };

  const formatEduDegree = (ed: any) => {
    const degreeName = ed.degree || ed.field_of_study || '';
    if (ed.level?.toLowerCase() === 'graduation' || degreeName.toLowerCase().includes('bachelor')) {
      return degreeName || 'Bachelor of Computer Applications (BCA)';
    }
    if (ed.level?.toLowerCase() === 'seniorsecondary' || ed.level?.toLowerCase() === '12th') {
      return 'Senior Secondary (12th Grade)';
    }
    if (ed.level?.toLowerCase() === 'matriculation' || ed.level?.toLowerCase() === '10th') {
      return 'Matriculation (10th Grade)';
    }
    return `${ed.level ? ed.level.toUpperCase() : 'Degree'} — ${degreeName}`;
  };

  // Higher Education Filter: Filter out 10th and 12th school education when higher degrees exist
  const higherEducation = education.filter((ed: any) => {
    const lvl = (ed.level || '').toLowerCase();
    const deg = (ed.degree || '').toLowerCase();
    return (
      !['10th', '12th', 'matriculation', 'seniorsecondary'].includes(lvl) &&
      !deg.includes('matriculation') &&
      !deg.includes('senior secondary') &&
      !deg.includes('10th') &&
      !deg.includes('12th')
    );
  });

  const filteredEducation = higherEducation.length > 0 ? higherEducation : education;

  // Sort education in reverse chronological order (Graduation / BCA first)
  const sortedEducation = [...filteredEducation].sort((a: any, b: any) => {
    const isGradA = a.level?.toLowerCase() === 'graduation' || (a.degree && a.degree.toLowerCase().includes('bachelor'));
    const isGradB = b.level?.toLowerCase() === 'graduation' || (b.degree && b.degree.toLowerCase().includes('bachelor'));
    if (isGradA && !isGradB) return -1;
    if (!isGradA && isGradB) return 1;
    return 0;
  });

  // Extract job keywords for intelligent role-based tailoring
  const jobText = `${resume?.name || ''} ${resume?.description || ''}`.toLowerCase();
  const keywords = jobText
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  // 1. Role-Tailored Technologies Filter
  const selectedTechIds = (resume?.technologiesUsed || []).map((id: any) => id.toString());
  const scoredTechnologies = technologies.map((t: any) => {
    let score = 0;
    const tId = t._id.toString();
    if (selectedTechIds.includes(tId)) score += 10;
    if (jobText.includes(t.name.toLowerCase())) score += 5;
    return { tech: t, score };
  });

  scoredTechnologies.sort((a, b) => b.score - a.score);
  // Pick only top 10-14 relevant technologies matching the job
  const tailoredTechnologies = (
    scoredTechnologies.filter((st) => st.score > 0).length >= 8
      ? scoredTechnologies.filter((st) => st.score > 0).slice(0, 14)
      : scoredTechnologies.slice(0, 12)
  ).map((st) => st.tech.name);

  // 2. Role-Tailored Projects Filter (>3 projects support)
  const selectedProjIds = (resume?.projectsUsed || []).map((id: any) => id.toString());
  const scoredProjects = projects.map((p: any) => {
    let score = 0;
    const pId = p._id.toString();
    if (selectedProjIds.includes(pId)) score += 10;

    const pText = `${p.title} ${p.description} ${p.fullDescription || ''} ${(p.features || []).join(' ')}`.toLowerCase();
    keywords.forEach((kw) => {
      if (pText.includes(kw)) score += 2;
    });

    const stackNames = (p.techStack || [])
      .map((item: any) => {
        const id = item?._id?.toString() || item?.toString() || '';
        return techMap.get(id) || (typeof item === 'string' && !/^[0-9a-fA-F]{24}$/.test(item) ? item : null);
      })
      .filter(Boolean);

    stackNames.forEach((st: string) => {
      if (jobText.includes(st.toLowerCase())) score += 3;
    });

    return {
      project: p,
      score,
      resolvedStack: stackNames.length > 0 ? stackNames : ['React.js', 'JavaScript', 'TailwindCSS'],
    };
  });

  scoredProjects.sort((a, b) => b.score - a.score);

  // If user explicitly picked projects, include all of them. Otherwise take top 3 best matching.
  const chosenProjects =
    selectedProjIds.length > 0
      ? scoredProjects.filter((sp) => selectedProjIds.includes(sp.project._id.toString()))
      : scoredProjects.slice(0, Math.min(projects.length, Math.max(3, scoredProjects.length >= 3 ? 3 : scoredProjects.length)));

  // 3. Role-Tailored Experience (Auto 2 Latest / User Selected, 5 Points Each)
  const selectedExpIds = (resume?.experiencesUsed || []).map((id: any) => id.toString());
  
  // Sort experience: stillWorking first, then dateOfJoining desc
  const sortedExp = [...experience].sort((a: any, b: any) => {
    if (a.stillWorking && !b.stillWorking) return -1;
    if (!a.stillWorking && b.stillWorking) return 1;
    const dateA = new Date(a.dateOfJoining).getTime() || 0;
    const dateB = new Date(b.dateOfJoining).getTime() || 0;
    return dateB - dateA;
  });

  const chosenExp =
    selectedExpIds.length > 0
      ? experience.filter((e: any) => selectedExpIds.includes(e._id.toString()))
      : sortedExp.slice(0, 2);

  const relevantExperience = chosenExp.map((e: any) => {
    const expBullets: string[] = [];
    if (e.description) {
      const parts = e.description
        .split(/(?<=[.!?])\s+/)
        .filter((s: string) => s.trim().length > 10);
      expBullets.push(...parts);
    }

    const defaultExpPoints = [
      'Architected and implemented responsive full-stack features with React.js, TypeScript, and Node.js microservices.',
      'Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.',
      'Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.',
      'Implemented secure RESTful APIs, JWT authentication, and role-based access control workflows.',
      'Collaborated across agile sprints with cross-functional product, QA, and DevOps teams to ensure seamless CI/CD deployments.',
    ];

    defaultExpPoints.forEach((point) => {
      if (expBullets.length < 5 && !expBullets.includes(point)) {
        expBullets.push(point);
      }
    });

    return {
      position: e.position,
      companyName: e.companyName,
      duration: formatExpDuration(e.dateOfJoining, e.dateOfLeaving, Boolean(e.stillWorking)),
      bullets: expBullets.slice(0, 5),
      description: e.description || '',
    };
  });

  return {
    name: resume?.name || 'React.js Developer Resume',
    description: resume?.description,
    developerName: user?.name || 'Karanveer Thour',
    developerEmail: user?.email || 'karanveerthour76@gmail.com',
    developerPhone: user?.phoneNumber || '+91 8847009521',
    developerGithub: user?.GitHubURL || 'https://github.com/K-Thour',
    developerLinkedin: user?.LinkedInURL || 'https://linkedin.com/in/karanveer-thour',
    developerWebsite: 'https://karan-thour.com',
    developerAddress: 'India',
    technologies: tailoredTechnologies,
    projects: chosenProjects.map(({ project: p, resolvedStack }) => {
      const bulletList: string[] = [];

      if (p.description) {
        bulletList.push(p.description);
      }

      if (p.features && Array.isArray(p.features) && p.features.length > 0) {
        p.features.forEach((feat: string) => {
          if (feat && feat.trim().length > 10 && !bulletList.includes(feat.trim())) {
            bulletList.push(feat.trim());
          }
        });
      }

      if (bulletList.length < 3 && p.fullDescription && p.fullDescription !== p.description) {
        const sentences = p.fullDescription
          .split(/(?<=[.!?])\s+/)
          .filter((s: string) => s.trim().length > 15);
        sentences.forEach((s: string) => {
          if (!bulletList.includes(s.trim())) {
            bulletList.push(s.trim());
          }
        });
      }

      if (p.outcome && p.outcome.trim().length > 0) {
        bulletList.push(`Impact: ${p.outcome.trim()}`);
      }

      const mainDescription = p.description || p.fullDescription || `Full-featured ${p.title} engineered for high performance and responsiveness.`;

      return {
        title: p.title,
        role: p.role || 'Full Stack Engineer',
        description: mainDescription,
        fullDescription: p.fullDescription || '',
        features: bulletList.slice(0, 5),
        outcome: p.outcome || '',
        workingUrl: p.workingUrl || '',
        githubUrl: p.githubUrl || '',
        techStack: resolvedStack,
      };
    }),
    experience: relevantExperience,
    education: sortedEducation.map((ed: any) => {
      let details = '';
      if (ed.level?.toLowerCase() === 'graduation' || (ed.degree && ed.degree.toLowerCase().includes('bachelor'))) {
        details = 'Core Coursework: Data Structures, Algorithms, Web Engineering, Database Management Systems';
      }
      return {
        degree: formatEduDegree(ed),
        institution: ed.institution,
        year: ed.endYear || ed.startYear || '',
        details,
      };
    }),
  };
};

const downloadPdf = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await prepareResumeData(id);
    generateResumePdfStream(data, res);
  } catch (err: any) {
    console.error('Error generating PDF stream:', err);
    res.status(500).send(err?.message || 'Error generating PDF');
  }
};

const downloadWord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await prepareResumeData(id);
    generateResumeWordDocument(data, res);
  } catch (err: any) {
    console.error('Error generating Word document:', err);
    res.status(500).send(err?.message || 'Error generating Word document');
  }
};

const downloadJson = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await prepareResumeData(id);
    generateResumeJson(data, res);
  } catch (err: any) {
    console.error('Error generating JSON document:', err);
    res.status(500).send(err?.message || 'Error generating JSON document');
  }
};

const downloadFile = async (req: Request, res: Response) => {
  const filename = (req.params.filename as string) || 'resume.pdf';
  if (filename.endsWith('.tex')) {
    downloadTex(req, res);
    return;
  }
  if (filename.endsWith('.doc') || filename.endsWith('.docx')) {
    downloadWord(req, res);
    return;
  }
  if (filename.endsWith('.json')) {
    downloadJson(req, res);
    return;
  }

  downloadPdf(req, res);
};

const downloadTex = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    let resume = null;
    if (id && Types.ObjectId.isValid(id)) {
      resume = await models.resume.repo.getOne({
        filter: [{ _id: new Types.ObjectId(id) }],
      });
    }

    const latex = resume?.latexCode || `\\documentclass[11pt]{article}\n\\begin{document}\n\\section{Resume}\nGenerated Resume Document\n\\end{document}`;
    const safeName = (resume?.name || 'resume').replace(/[^a-zA-Z0-9-_]/g, '_');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}.tex"`);
    res.send(latex);
  } catch (err: any) {
    res.status(500).send(err?.message || 'Error downloading LaTeX');
  }
};

const resumeControllers = {
  create,
  update,
  softDelete,
  deleteOne,
  get,
  getOne,
  generate,
  downloadFile,
  downloadPdf,
  downloadWord,
  downloadJson,
  downloadTex,
};

export default resumeControllers;
