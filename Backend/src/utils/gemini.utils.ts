/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from '@google/generative-ai';
import envConstant from '../constants/env.constant';
import chatPromptConstant, { ChatKnowledgeSummary } from '../constants/chatPrompt.constant';

const genAI = new GoogleGenerativeAI(envConstant.GEMINI_API_KEY);

export interface GenerateResumeParams {
  jobDescription: string;
  targetRole?: string;
  selectedProjectIds?: string[];
  developerProfile: {
    name: string;
    email: string;
    phoneNumber: string;
    experienceYears: number;
    hobbies: string[];
    languages: any[];
  };
  projects: any[];
  services: any[];
  technologies: any[];
  education: any[];
  experience: any[];
}

export interface AIResumeResponse {
  selectedProjectIds: string[];
  selectedServiceIds: string[];
  selectedTechnologyIds: string[];
  tailoredSummary: string;
  latexCode: string;
  projectHighlights?: Record<string, string[]>;
  experienceHighlights?: Record<string, string[]>;
}

export interface GenerateChatParams {
  message: string;
  history?: Array<{ role: string; content: string }>;
  name: string;
  email: string;
  knowledgeBase: string;
  knowledgeSummary: ChatKnowledgeSummary;
}

export interface AIChatResult {
  reply: string;
  source: 'gemini-ai' | 'knowledge-base' | 'knowledge-base-fallback';
}

/**
 * Validates Gemini API Key and tests connectivity on server startup
 */
export const verifyGeminiConnection = async (): Promise<boolean> => {
  const apiKey = envConstant.GEMINI_API_KEY;

  if (!apiKey || apiKey.includes('your_gemini_api_key')) {
    console.log(
      '⚠️  [Gemini AI] GEMINI_API_KEY is not set or using placeholder in .env (Smart fallback engine active)',
    );
    return false;
  }

  const modelsToTry = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.6-flash'];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const pingResult = await model.generateContent('ping');
      const response = pingResult.response.text();
      if (response) {
        console.log(
          `✅ [Gemini AI] Connection verified successfully (Model: ${modelName} is online and ready)`,
        );
        return true;
      }
    } catch {
      // try next model
    }
  }

  console.log(
    'ℹ️  [Gemini AI] Smart knowledge-base fallback engine is active and ready to handle incoming chat',
  );
  return false;
};

/**
 * Generates an articulate, comprehensive AI Chatbot response with RAG knowledge injection and fallback
 */
export const generateChatResponseAI = async (params: GenerateChatParams): Promise<AIChatResult> => {
  const { message, history = [], name, email, knowledgeBase, knowledgeSummary } = params;
  const apiKey = envConstant.GEMINI_API_KEY;

  if (!apiKey || apiKey.includes('your_gemini_api_key')) {
    const fallbackReply = chatPromptConstant.buildRuleBasedFallbackReply(message, knowledgeSummary);
    return {
      reply: fallbackReply,
      source: 'knowledge-base',
    };
  }

  const modelsToTry = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.6-flash'];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.75,
          topP: 0.9,
        },
        systemInstruction: chatPromptConstant.buildChatSystemInstruction(
          name,
          email,
          knowledgeBase,
        ),
      });

      const contents = [
        ...history.slice(-8).map((h) => ({
          role: h.role === 'model' || h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })),
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const result = await model.generateContent({ contents });
      const responseText = result.response.text();

      if (responseText && responseText.trim()) {
        return {
          reply: responseText,
          source: 'gemini-ai',
        };
      }
    } catch (modelErr: any) {
      console.warn(
        `[Gemini AI] Model ${modelName} unavailable (${modelErr?.message?.slice(0, 80)}), trying alternative...`,
      );
    }
  }

  const fallbackReply = chatPromptConstant.buildRuleBasedFallbackReply(message, knowledgeSummary);
  return {
    reply: fallbackReply,
    source: 'knowledge-base-fallback',
  };
};

export const generateResumeAI = async (params: GenerateResumeParams): Promise<AIResumeResponse> => {
  const devName = params.developerProfile?.name || 'Karanveer Thour';
  const devEmail = params.developerProfile?.email || 'karanveerthour76@gmail.com';
  const devPhone = params.developerProfile?.phoneNumber || '+91 8847009521';
  const devExpYears = params.developerProfile?.experienceYears || 3;
  const targetRole = params.targetRole || 'Full Stack Software Engineer';

  const safeExperience = (params.experience || []).map((e) => ({
    id: e._id?.toString() || '',
    companyName: e.companyName || '',
    position: e.position || '',
    field: e.field || '',
    description: e.description || '',
    dateOfJoining: e.dateOfJoining || '',
    dateOfLeaving: e.dateOfLeaving || '',
    stillWorking: Boolean(e.stillWorking),
  }));

  const safeEducation = (params.education || []).map((ed) => ({
    id: ed._id?.toString() || '',
    level: ed.level || '',
    degree: ed.degree || '',
    field_of_study: ed.field_of_study || '',
    institution: ed.institution || '',
    startYear: ed.startYear || '',
    endYear: ed.endYear || '',
    grade: ed.grade || '',
  }));

  const safeProjects = (params.projects || []).map((p) => ({
    id: p._id?.toString() || '',
    title: p.title || '',
    description: p.description || '',
    fullDescription: p.fullDescription || '',
    features: Array.isArray(p.features) ? p.features : [],
    outcome: p.outcome || '',
    techStack: Array.isArray(p.techStack) ? p.techStack : [],
    role: p.role || 'Full Stack Engineer',
  }));

  const safeServices = (params.services || []).map((s) => ({
    id: s._id?.toString() || '',
    name: s.name || '',
    description: s.description || s.decription || '',
    technologies: s.technologies || [],
  }));

  const safeTechnologies = (params.technologies || []).map((t) => ({
    id: t._id?.toString() || '',
    name: t.name || '',
    category: t.category || '',
  }));

  // Intelligent Role & Keyword Scoring for Projects
  const scoreProject = (p: typeof safeProjects[0]): number => {
    let score = 0;
    const roleLower = (targetRole || '').toLowerCase();
    const descLower = (params.jobDescription || '').toLowerCase();
    const projTitle = p.title.toLowerCase();
    const projRole = p.role.toLowerCase();
    const projDesc = (p.description + ' ' + p.fullDescription).toLowerCase();
    const techStrings = p.techStack.map((t: any) => String(t).toLowerCase());

    // Role-specific heuristics
    if (roleLower.includes('front') || roleLower.includes('react') || roleLower.includes('ui') || roleLower.includes('next')) {
      if (techStrings.some((t: string) => ['react', 'next', 'type', 'tail', 'redux', 'css', 'front', 'ui'].some((k) => t.includes(k)))) score += 20;
      if (projRole.includes('front') || projTitle.includes('front') || projTitle.includes('portfolio') || projTitle.includes('web')) score += 15;
    }
    if (roleLower.includes('back') || roleLower.includes('node') || roleLower.includes('cloud') || roleLower.includes('api')) {
      if (techStrings.some((t: string) => ['node', 'express', 'mongo', 'postgre', 'docker', 'redis', 'api', 'back'].some((k) => t.includes(k)))) score += 20;
      if (projRole.includes('back') || projTitle.includes('backend') || projTitle.includes('api') || projTitle.includes('management')) score += 15;
    }
    if (roleLower.includes('full') || roleLower.includes('engineer') || roleLower.includes('developer')) {
      if (techStrings.length >= 3) score += 12;
      if (projRole.includes('full') || projTitle.includes('management') || projTitle.includes('platform')) score += 12;
    }
    if (roleLower.includes('ai') || roleLower.includes('ml') || roleLower.includes('data')) {
      if (techStrings.some((t: string) => ['python', 'ai', 'gemini', 'openai', 'llm', 'ml'].some((k) => t.includes(k)))) score += 25;
    }

    // Job description keyword overlap
    const keywords = descLower.split(/[\s,.-]+/).filter((w) => w.length > 3);
    for (const kw of keywords.slice(0, 30)) {
      if (projTitle.includes(kw)) score += 3;
      if (projDesc.includes(kw)) score += 2;
      if (techStrings.some((t: string) => t.includes(kw))) score += 4;
    }

    return score;
  };

  // Rank projects based on user-provided selections or role score
  const getRankedProjects = () => {
    if (params.selectedProjectIds && params.selectedProjectIds.length > 0) {
      const explicit = safeProjects.filter((p) => params.selectedProjectIds!.includes(p.id));
      const remaining = safeProjects.filter((p) => !params.selectedProjectIds!.includes(p.id))
        .sort((a, b) => scoreProject(b) - scoreProject(a));
      return [...explicit, ...remaining];
    }
    return [...safeProjects].sort((a, b) => scoreProject(b) - scoreProject(a));
  };

  const rankedProjects = getRankedProjects();

  // High quality deterministic fallback matching ATS standards
  const buildFallbackResponse = (): AIResumeResponse => {
    const selectedProjectIds = rankedProjects.slice(0, 3).map((p) => p.id).filter(Boolean);
    const selectedServiceIds = safeServices.slice(0, 2).map((s) => s.id).filter(Boolean);
    const selectedTechnologyIds = safeTechnologies.slice(0, 14).map((t) => t.id).filter(Boolean);
    const techNames = safeTechnologies.slice(0, 14).map((t) => t.name).join(', ') || 'TypeScript, React.js, Node.js, Next.js, Redux, Tailwind CSS, MongoDB, Docker';

    const projectHighlights: Record<string, string[]> = {};
    rankedProjects.slice(0, 4).forEach((p) => {
      const bullets: string[] = [];
      if (p.description) bullets.push(p.description);
      if (p.features?.length) bullets.push(...p.features.slice(0, 2));
      else if (p.fullDescription && p.fullDescription !== p.description) bullets.push(p.fullDescription.slice(0, 120));
      if (p.outcome) bullets.push(`Impact: ${p.outcome}`);
      projectHighlights[p.id] = bullets.slice(0, 2);
    });

    const experienceHighlights: Record<string, string[]> = {};
    safeExperience.forEach((e) => {
      experienceHighlights[e.id] = [
        'Architected and implemented responsive full-stack features using React.js, TypeScript, and Node.js microservices.',
        'Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.',
        'Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.',
      ];
    });

    const fallbackLatex = `\\documentclass[letterpaper,10.5pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ${devName}} \\\\ \\vspace{1pt}
    \\small ${devPhone} $|$ \\href{mailto:${devEmail}}{\\underline{${devEmail}}} $|$ 
    \\href{https://karan-thour.com}{\\underline{karan-thour.com}} $|$
    \\href{https://github.com/K-Thour}{\\underline{github.com/K-Thour}}
\\end{center}

\\section{Professional Summary}
Results-driven and innovative ${targetRole} with extensive experience in architecting scalable web applications, responsive user interfaces, and robust backend workflows. Highly proficient in modern JavaScript/TypeScript ecosystems, RESTful architecture, and cloud deployment pipelines.

\\section{Technical Skills}
\\textbf{Core Technologies:} ${techNames}

\\section{Work Experience}
\\textbf{Associate Full Stack Web Developer} \\hfill Feb 2025 -- Present \\\\
\\textit{Devronins Private Limited} \\hfill \\textit{Remote}
\\begin{itemize}[noitemsep,topsep=0pt]
    \\item Architected and implemented responsive full-stack features using React.js, TypeScript, and Node.js microservices.
    \\item Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40\\%.
    \\item Optimized frontend asset delivery and client-side caching, significantly improving Core Web Vitals and load times.
\\end{itemize}

\\section{Key Projects}
${rankedProjects.slice(0, 3).map((p) => `\\textbf{${p.title}} \\hfill \\textit{${Array.isArray(p.techStack) ? p.techStack.join(', ') : 'TypeScript'}}\\\\
${p.description || 'Engineered scalable system architecture with responsive user interfaces and optimized API endpoints.'}`).join('\\\\\n\\vspace{2pt}\n')}

\\section{Education}
\\textbf{Bachelor of Computer Applications (BCA)} \\hfill \\textit{Indira Gandhi National Open University}

\\end{document}`;

    return {
      selectedProjectIds,
      selectedServiceIds,
      selectedTechnologyIds,
      tailoredSummary: `Results-driven and innovative ${targetRole} with proven expertise in developing high-performance web applications, robust backend workflows, and scalable architectures tailored for this position.`,
      latexCode: fallbackLatex,
      projectHighlights,
      experienceHighlights,
    };
  };

  const apiKey = envConstant.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes('your_gemini_api_key')) {
    return buildFallbackResponse();
  }

  const modelsToTry = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.6-flash'];

  const prompt = `
You are an expert technical resume strategist and ATS optimization specialist.
Analyze the target job description and target role to tailor the developer's resume to achieve a 95+ ATS readability score using their actual database records.

Target Role:
"""
${targetRole}
"""

Target Job Description:
"""
${params.jobDescription}
"""

User Explicitly Selected Project IDs (if any, give these highest priority):
${JSON.stringify(params.selectedProjectIds || [])}

Developer Profile:
- Name: ${devName}
- Email: ${devEmail}
- Phone: ${devPhone}
- Total Years of Experience: ${devExpYears}

Available Work Experience Records from Database:
${JSON.stringify(safeExperience)}

Available Education Records from Database:
${JSON.stringify(safeEducation)}

Available Projects from Database (Ranked by relevance):
${JSON.stringify(rankedProjects)}

Available Technologies from Database:
${JSON.stringify(safeTechnologies)}

Instructions:
1. Select the top 3-4 most relevant project IDs that align best with the target role "${targetRole}" and the job description.
2. Select the top 12-14 most relevant technology IDs matching the job stack.
3. Write an impactful, ATS-optimized 3-4 sentence professional summary tailored to "${targetRole}".
4. For each selected project, write 2 concise, action-verb engineering bullet points (focus on architecture, key features, performance, security, or outcomes).
5. For each experience record, write 3 quantified, professional bullet points tailored to the job keywords.
6. Generate a clean, single-page compilation-ready LaTeX resume.

Return ONLY a valid JSON object matching this schema:
{
  "selectedProjectIds": ["array of at least 3 project ID strings"],
  "selectedServiceIds": ["array of service ID strings"],
  "selectedTechnologyIds": ["array of technology ID strings"],
  "tailoredSummary": "string",
  "projectHighlights": {
    "project_id_1": ["bullet point 1", "bullet point 2"],
    "project_id_2": ["bullet point 1", "bullet point 2"],
    "project_id_3": ["bullet point 1", "bullet point 2"]
  },
  "experienceHighlights": {
    "exp_id_1": ["bullet point 1", "bullet point 2", "bullet point 3"]
  },
  "latexCode": "string"
}
`;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
        },
      });

      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      if (responseText) {
        responseText = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        const parsed = JSON.parse(responseText);
        return {
          selectedProjectIds: Array.isArray(parsed.selectedProjectIds) && parsed.selectedProjectIds.length > 0 ? parsed.selectedProjectIds : rankedProjects.slice(0, 3).map((p) => p.id),
          selectedServiceIds: Array.isArray(parsed.selectedServiceIds) ? parsed.selectedServiceIds : [],
          selectedTechnologyIds: Array.isArray(parsed.selectedTechnologyIds) ? parsed.selectedTechnologyIds : [],
          tailoredSummary: parsed.tailoredSummary || '',
          latexCode: parsed.latexCode || '',
          projectHighlights: parsed.projectHighlights || {},
          experienceHighlights: parsed.experienceHighlights || {},
        };
      }
    } catch (modelErr: any) {
      console.warn(`[Gemini Resume AI] Model ${modelName} failed (${modelErr?.message?.slice(0, 80)}), trying alternative...`);
    }
  }

  return buildFallbackResponse();
};

const geminiUtils = {
  verifyGeminiConnection,
  generateChatResponseAI,
  generateResumeAI,
};

export default geminiUtils;
