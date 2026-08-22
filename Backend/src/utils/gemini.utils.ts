/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from '@google/generative-ai';
import envConstant from '../constants/env.constant';
import chatPromptConstant, { ChatKnowledgeSummary } from '../constants/chatPrompt.constant';

const genAI = new GoogleGenerativeAI(envConstant.GEMINI_API_KEY);

export interface GenerateResumeParams {
  jobDescription: string;
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
    console.log('⚠️  [Gemini AI] GEMINI_API_KEY is not set or using placeholder in .env (Smart fallback engine active)');
    return false;
  }

  const modelsToTry = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.6-flash'];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const pingResult = await model.generateContent('ping');
      const response = pingResult.response.text();
      if (response) {
        console.log(`✅ [Gemini AI] Connection verified successfully (Model: ${modelName} is online and ready)`);
        return true;
      }
    } catch {
      // try next model
    }
  }

  console.log('ℹ️  [Gemini AI] Smart knowledge-base fallback engine is active and ready to handle incoming chat');
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

  // Multi-tier model fallback chain (tries 3.7-flash -> 3.5-flash -> 3.6-flash)
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
        systemInstruction: chatPromptConstant.buildChatSystemInstruction(name, email, knowledgeBase),
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
      console.warn(`[Gemini AI] Model ${modelName} unavailable (${modelErr?.message?.slice(0, 80)}), trying alternative...`);
    }
  }

  // If API quotas are exceeded or network fails, use the rich fallback knowledge engine
  const fallbackReply = chatPromptConstant.buildRuleBasedFallbackReply(message, knowledgeSummary);
  return {
    reply: fallbackReply,
    source: 'knowledge-base-fallback',
  };
};

export const generateResumeAI = async (params: GenerateResumeParams): Promise<AIResumeResponse> => {
  if (!envConstant.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in the environment');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-3.7-flash',
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const prompt = `
You are an expert technical resume builder and professional copywriter.
Analyze the target job description or requirements and tailor the developer's resume to match it perfectly.

Target Job/Role Description:
"""
${params.jobDescription}
"""

Developer's Basic Profile:
- Name: ${params.developerProfile.name}
- Email: ${params.developerProfile.email}
- Phone: ${params.developerProfile.phoneNumber}
- Total Years of Experience: ${params.developerProfile.experienceYears}
- Hobbies: ${params.developerProfile.hobbies.join(', ')}
- Languages: ${JSON.stringify(params.developerProfile.languages)}

Available Work Experience Records:
${JSON.stringify(params.experience.map((e) => ({ id: e._id, companyName: e.companyName, position: e.position, field: e.field, description: e.description, dateOfJoining: e.dateOfJoining, dateOfLeaving: e.dateOfLeaving, stillWorking: e.stillWorking })))}

Available Education Records:
${JSON.stringify(params.education.map((ed) => ({ id: ed._id, level: ed.level, degree: ed.degree, field_of_study: ed.field_of_study, institution: ed.institution, startYear: ed.startYear, endYear: ed.endYear, grade: ed.grade })))}

Available Projects to showcase:
${JSON.stringify(params.projects.map((p) => ({ id: p._id, title: p.title, description: p.description, fullDescription: p.fullDescription, techStack: p.techStack, role: p.role })))}

Available Services offered:
${JSON.stringify(params.services.map((s) => ({ id: s._id, name: s.name, description: s.decription, technologies: s.technologies })))}

Available Technologies:
${JSON.stringify(params.technologies.map((t) => ({ id: t._id, name: t.name, category: t.category })))}

Based on the target job requirements:
1. Select the most relevant projects (up to 4) that highlight matching skills.
2. Select the most relevant services (up to 3).
3. Select the most relevant technologies (up to 12).
4. Write a tailored, professional summary (around 3-4 sentences) that highlights the developer's experience and fit for this target role.
5. Write a professionally formatted, compilation-ready LaTeX resume document containing:
   - Header with developer name, email, phone.
   - Professional Summary section.
   - Core Skills section (listing the selected technologies).
   - Professional Experience section (detailing the work experience records).
   - Projects section (detailing the selected projects).
   - Education section (detailing the education records).
   - Use standard packages like 'hyperref', 'geometry', and clean formatting. Make it clean and minimal.

You must return a JSON object containing EXACTLY these keys:
{
  "selectedProjectIds": ["array of project ID strings selected"],
  "selectedServiceIds": ["array of service ID strings selected"],
  "selectedTechnologyIds": ["array of technology ID strings selected"],
  "tailoredSummary": "tailored summary string",
  "latexCode": "complete compilation-ready LaTeX document string"
}
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  return JSON.parse(responseText) as AIResumeResponse;
};

const geminiUtils = {
  verifyGeminiConnection,
  generateChatResponseAI,
  generateResumeAI,
};

export default geminiUtils;
