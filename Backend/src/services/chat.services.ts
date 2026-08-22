/* eslint-disable @typescript-eslint/no-explicit-any */
import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import constants from '../constants';
import { ChatKnowledgeSummary } from '../constants/chatPrompt.constant';
import models from '../models';
import { generateChatResponseAI } from '../utils/gemini.utils';
import { ChatMessageInput } from '../validations/chat.validations';

interface CachedContext {
  data: string;
  userSummary: ChatKnowledgeSummary;
  timestamp: number;
}

let cachedContext: CachedContext | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Aggregates verified knowledge about the developer from MongoDB models (RAG)
 */
const buildPortfolioKnowledge = async (): Promise<CachedContext> => {
  const now = Date.now();
  if (cachedContext && now - cachedContext.timestamp < CACHE_TTL_MS) {
    return cachedContext;
  }

  try {
    const [users, technologies, projects, experiences, services, educations, contacts] =
      await Promise.all([
        models.user.model.find({ deletedAt: null }).lean(),
        models.technology.model.find({ deletedAt: null }).lean(),
        models.project.model.find({ deletedAt: null }).lean(),
        models.experience.model.find({ deletedAt: null }).lean(),
        models.service.model.find({ deletedAt: null }).lean(),
        models.education.model.find({ deletedAt: null }).lean(),
        models.contact.model.find({ deletedAt: null }).lean(),
      ]);

    const user: any = users[0] || {};
    const name = user.name || 'Karanveer Thour';
    const email = user.email || 'karanveerthour90@gmail.com';
    const phone = user.phoneNumber || user.phone || '+91-XXXXXXXXXX';
    const bio =
      user.bio ||
      `Full Stack Software Engineer & AI Developer with ${user.experience || 3}+ years of experience, specializing in React, Node.js, Next.js, TypeScript, and Cloud Architecture.`;

    const techList = technologies.map((t: any) => t.name || t.title).filter(Boolean).slice(0, 15).join(', ');
    const projectList = projects
      .slice(0, 5)
      .map(
        (p: any) =>
          `• ${p.title}: ${p.description || ''} (Tech: ${Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technology || ''})`,
      )
      .join('\n');

    const expList = experiences
      .slice(0, 3)
      .map(
        (e: any) =>
          `• ${e.position || e.role || 'Developer'} at ${e.companyName || e.company} (${e.duration || `${e.startDate || ''} - ${e.endDate || 'Present'}`})`,
      )
      .join('\n');

    const serviceList = services
      .slice(0, 4)
      .map((s: any) => `• ${s.title || s.name}: ${s.description || ''}`)
      .join('\n');

    const eduList = educations
      .slice(0, 2)
      .map((ed: any) => `• ${ed.degree || 'Degree'} from ${ed.institution || ed.school || ''} (${ed.year || ''})`)
      .join('\n');

    const contactInfo: any = contacts[0] || {};
    const socialLinks = `LinkedIn: ${user.LinkedInURL || contactInfo.linkedin || 'Available'}, GitHub: ${user.GitHubURL || contactInfo.github || 'https://github.com/K-Thour'}`;

    const contextString = `
Developer: ${name} (Full Stack Engineer & AI Developer)
Experience: ${user.experience || 3}+ Years, ${user.completedProjects || 20}+ Projects
Bio: ${bio}
Email: ${email}
Phone: ${phone}
Skills: ${techList || 'React, TypeScript, Node.js, Express, MongoDB, Next.js, Tailwind CSS, Python'}
Projects:\n${projectList}
Experience:\n${expList}
Services:\n${serviceList}
Education:\n${eduList}
Socials: ${socialLinks}
`.trim();

    cachedContext = {
      data: contextString,
      userSummary: {
        name,
        email,
        skills: technologies.map((t: any) => t.name || t.title),
        projects: projects.map((p: any) => ({
          title: p.title,
          desc: p.description || '',
          link: p.liveUrl || p.projectUrl,
        })),
        experience: experiences.map((e: any) => ({
          company: e.companyName || e.company,
          role: e.position || e.role,
          duration: e.duration,
        })),
        services: services.map((s: any) => s.title || s.name),
      },
      timestamp: now,
    };

    return cachedContext;
  } catch (error) {
    console.error('Error compiling portfolio knowledge:', error);
    const fallbackString = `Name: Karanveer Thour\nRole: Full Stack Software Engineer\nEmail: contact@portfolio.com\nSkills: React, Node.js, TypeScript, Next.js, MongoDB`;
    return {
      data: fallbackString,
      userSummary: {
        name: 'Karanveer Thour',
        email: 'contact@portfolio.com',
        skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB'],
        projects: [],
        experience: [],
        services: [],
      },
      timestamp: now,
    };
  }
};

/**
 * Handles incoming chat message orchestration
 */
const processChatMessage = async (input: ChatMessageInput) => {
  return asyncCommonWrapper(async () => {
    const { message, history = [] } = input;
    const context = await buildPortfolioKnowledge();

    const result = await generateChatResponseAI({
      message,
      history,
      name: context.userSummary.name,
      email: context.userSummary.email,
      knowledgeBase: context.data,
      knowledgeSummary: context.userSummary,
    });

    return commonResponse.success(
      result,
      'Message processed successfully',
      constants.STATUS_CODE.OK,
      1,
    );
  });
};

const chatServices = {
  processChatMessage,
  buildPortfolioKnowledge,
};

export default chatServices;
