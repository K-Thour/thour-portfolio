/**
 * System prompt and fallback response builders for AI Chat Assistant
 */

export const buildChatSystemInstruction = (
  developerName: string,
  email: string,
  knowledgeBase: string,
): string => {
  return `You are the charismatic, articulate, and highly knowledgeable AI Portfolio Assistant for ${developerName} (Full Stack Software Engineer & AI Developer).

Your Core Objectives:
1. Deliver rich, detailed, and engaging responses with professional depth and enthusiasm.
2. When answering technical or career questions, provide thorough explanations highlighting ${developerName}'s hands-on expertise with full-stack technologies (React, Node.js, Next.js, TypeScript, Cloud, MongoDB, REST APIs).
3. When a user asks about custom projects, software ideas, or specific business solutions (e.g. farm management, real-time dashboards, IoT, SaaS platforms, AI tools, mobile apps, booking portals):
   - Enthusiastically explain that ${developerName} can engineer and deliver the solution from concept to production.
   - Outline a structured, concrete technical architecture (Frontend, Backend, Database, Real-Time features, Security).
   - Detail the exact core modules (e.g., interactive dashboards, automated tracking, role-based auth, RESTful APIs, reporting).
   - Invite them to connect on the '/contact' page or email ${email} to start the project.
4. Use rich Markdown formatting (**bolding**, bulleted lists, clean headers) for maximum readability and visual appeal.
5. If asked about projects, highlight key features from the knowledge base and link to '/projects'.
6. If asked about hiring or work opportunities, enthusiastically provide ${developerName}'s email (${email}) and invite them to submit an inquiry through the '/contact' page.

Verified Developer Knowledge Base:
${knowledgeBase}`;
};

export interface ChatKnowledgeSummary {
  name: string;
  email: string;
  skills: string[];
  projects: Array<{ title: string; desc: string; link?: string }>;
  experience: Array<{ company: string; role: string; duration?: string }>;
  services: string[];
}

export const buildRuleBasedFallbackReply = (
  message: string,
  summary: ChatKnowledgeSummary,
): string => {
  const lower = message.toLowerCase();
  const { name, email, skills, projects, experience, services } = summary;

  // Custom project inquiry (e.g. chick farm, custom app, build software, management system)
  if (
    lower.includes('farm') ||
    lower.includes('app') ||
    lower.includes('software') ||
    lower.includes('system') ||
    lower.includes('website') ||
    lower.includes('build') ||
    lower.includes('fulfill') ||
    lower.includes('create') ||
    lower.includes('develop') ||
    lower.includes('idea')
  ) {
    return `Absolutely! **${name}** has extensive full-stack engineering expertise and can build a robust, production-ready solution tailored precisely for your project needs.

### 🛠️ Proposed Solution & Technical Architecture:
• **Interactive Frontend:** Built with **React / Next.js & Tailwind CSS** for a responsive, real-time management dashboard, data visualization, and seamless user experience.
• **Scalable Backend & APIs:** High-performance **Node.js & Express RESTful APIs** to manage workflows, inventory/operations tracking, automated alerts, and business logic.
• **Secure Data & Cloud:** **MongoDB / PostgreSQL** with role-based access control, secure authentication, and cloud deployment.

Let's discuss your specific requirements, timeline, and features in detail! You can send a direct project inquiry via the **/contact** page or email **${name}** at [${email}](mailto:${email}).`;
  }

  if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('collaborate')) {
    return `**${name}** is actively open to new freelance projects, full-time engineering roles, and technical collaborations!

### 📬 How to Connect:
• **Direct Email:** [${email}](mailto:${email})
• **Inquiry Form:** Head over to the **/contact** page to submit your message or project requirements directly.
• **Turnaround:** **${name}** typically responds within 24 hours. Let's build something extraordinary together!`;
  }

  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('showcase')) {
    if (projects.length > 0) {
      const projectDetails = projects.slice(0, 3).map((p) => `• **${p.title}**: ${p.desc}`).join('\n');
      return `Here are some of **${name}'s** top featured full-stack engineering projects:\n\n${projectDetails}\n\nExplore live interactive demos, source code repositories, and complete project breakdowns on the **/projects** page!`;
    }
    return `**${name}** has engineered high-performance web applications, AI integrations, real-time WebSocket platforms, and full-stack systems. Check out the **/projects** page for live demos!`;
  }

  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('language') || lower.includes('tool')) {
    const skillList = skills.length > 0 ? skills.slice(0, 10).join(', ') : 'React, TypeScript, Node.js, Next.js, Express, MongoDB, Tailwind CSS, Redux, WebSockets, Python, Docker';
    return `**${name}** specializes in modern full-stack development, cloud architecture, and AI integrations.

### 💻 Core Tech Stack:
• **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Framer Motion
• **Backend & Databases:** Node.js, Express, MongoDB, PostgreSQL, RESTful APIs, WebSockets
• **DevOps & Tools:** Git, Docker, Cloudinary, Linux, Postman, Jest / Vitest

Key strengths include **${skillList}**. Feel free to explore the **/about** section for a detailed breakdown!`;
  }

  if (lower.includes('experience') || lower.includes('job') || lower.includes('company') || lower.includes('career') || lower.includes('background')) {
    if (experience.length > 0) {
      const expDetails = experience.slice(0, 2).map((e) => `• **${e.role}** at **${e.company}**${e.duration ? ` (${e.duration})` : ''}`).join('\n');
      return `**${name}** brings rich hands-on engineering experience across modern web systems:\n\n${expDetails}\n\nHighlights include engineering high-throughput microservices, boosting team productivity by 40%, and delivering responsive user interfaces across 25+ successful client deployments.`;
    }
    return `**${name}** has extensive experience developing scalable web applications, secure REST APIs, and responsive user interfaces with over 3+ years in production engineering.`;
  }

  if (lower.includes('service') || lower.includes('offer') || lower.includes('help')) {
    if (services.length > 0) {
      return `**${name}** offers end-to-end software engineering services, including:\n\n${services.map((s) => `• **${s}**`).join('\n')}\n\nNeed assistance with a new project or scaling an existing system? Visit **/contact** to get started!`;
    }
    return `**${name}** provides Full Stack Web Development, Custom API Design, Performance Optimization, UI/UX Engineering, and AI Integrations.`;
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('who are you') || lower.includes('about')) {
    return `Hello! 👋 I'm **${name}'s AI Assistant**.\n\n**${name}** is a Full Stack Software Engineer & AI Developer specializing in building high-performance web applications, scalable APIs, and intelligent digital experiences.

Feel free to ask me about:
• 🚀 **Technical Skills & Frameworks**
• 💼 **Featured Projects & Demos**
• 📈 **Work Experience & Background**
• ✉️ **Custom Project Inquiries & Hiring**

How can I help you today?`;
  }

  return `Thanks for reaching out! **${name}** is a Full Stack Software Engineer & AI Developer. Whether you are looking to build a new web application, integrate AI capabilities, or explore past work, **${name}** can help. Feel free to explore the **/projects** section or head over to **/contact** to connect!`;
};

const chatPromptConstant = {
  buildChatSystemInstruction,
  buildRuleBasedFallbackReply,
};

export default chatPromptConstant;
