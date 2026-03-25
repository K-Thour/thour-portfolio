import type { Project } from "../types";

export const projectData: Project[] = [
  {
    id: 1,
    title: "AI Code Assistant",
    subtitle: "AI-powered development tool",
    category: "AI & Automation",
    description: "An intelligent code completion and generation tool",
    longDescription:
      "Advanced AI-powered development assistant that helps developers write better code faster with intelligent suggestions and automated refactoring.",
    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=400",
    technologies: ["React", "TypeScript", "OpenAI API", "Node.js"],
    features: [
      "Smart code completion",
      "Real-time suggestions",
      "Multi-language support",
    ],
    github: "https://github.com/example/ai-code-assistant",
    liveUrl: "https://ai-code-assistant.com",
    status: "Completed",
    views: 1245,
  },
  {
    id: 2,
    title: "Dev Workspace Pro",
    subtitle: "Professional development environment",
    category: "Web Application",
    description: "Collaborative development workspace for teams",
    longDescription:
      "A comprehensive web-based development environment that enables teams to collaborate on projects in real-time with integrated tools and workflows.",
    image: "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?w=400",
    technologies: ["Vue.js", "Firebase", "WebRTC", "Docker"],
    features: [
      "Real-time collaboration",
      "Integrated terminal",
      "Cloud storage",
    ],
    github: "https://github.com/example/dev-workspace",
    liveUrl: "https://dev-workspace-pro.com",
    status: "In Progress",
    views: 892,
  },
  {
    id: 3,
    title: "Terminal Dashboard",
    subtitle: "System monitoring dashboard",
    category: "DevOps & Monitoring",
    description: "Real-time system monitoring and analytics",
    longDescription:
      "A powerful terminal-based dashboard for monitoring system performance, tracking metrics, and managing infrastructure from the command line.",
    image: "https://images.unsplash.com/photo-1738255654134-1877cb984a8f?w=400",
    technologies: ["Go", "React", "WebSocket", "Prometheus"],
    features: ["Real-time metrics", "Custom widgets", "Alert system"],
    github: "https://github.com/example/terminal-dashboard",
    liveUrl: "https://terminal-dashboard.com",
    status: "Completed",
    views: 2156,
  },
];
