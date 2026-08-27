import { generateResumePdfStream, buildProfessionalSummary, ResumePdfData } from '../utils/pdf.utils';
import { Response } from 'express';

describe('pdf.utils', () => {
  describe('buildProfessionalSummary', () => {
    it('should return custom text when clean description provided', () => {
      const summary = buildProfessionalSummary('Passionate software engineer building web systems.', 'Engineer');
      expect(summary).toBe('Passionate software engineer building web systems.');
    });

    it('should fallback to default summary when text contains job posting markers', () => {
      const summary = buildProfessionalSummary('This position is open at partner company. Requirements: React.', 'Full Stack Software Engineer');
      expect(summary).toContain('Results-driven and innovative');
      expect(summary).toContain('Full Stack Software Engineer');
    });
  });

  describe('generateResumePdfStream', () => {
    it('should generate PDF stream including Languages section without throwing', () => {
      const mockRes = {
        setHeader: jest.fn(),
        write: jest.fn(),
        end: jest.fn(),
        on: jest.fn(),
        once: jest.fn(),
        emit: jest.fn(),
      } as unknown as Response;

      const mockData: ResumePdfData = {
        name: 'React.js Developer',
        developerName: 'Karanveer Thour',
        developerEmail: 'karanveerthour76@gmail.com',
        developerPhone: '+91 8847009521',
        developerGithub: 'github.com/K-Thour',
        developerLinkedin: 'linkedin.com/in/karanveer-thour',
        description: 'Passionate full stack developer with experience in React and Node.',
        technologies: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
        experience: [
          {
            position: 'Associate Full Stack Developer',
            companyName: 'Devronins Private Limited',
            duration: 'Feb 2025 — Present',
            bullets: ['Built scalable full stack web apps.'],
          },
        ],
        projects: [
          {
            title: 'THOUR — AI-Powered Portfolio',
            role: 'Full Stack Engineer',
            description: 'AI powered portfolio system.',
            features: ['Live resume generation', 'AI chatbot integration'],
            outcome: 'High performance',
            techStack: ['React', 'TypeScript', 'Node.js'],
          },
        ],
        education: [
          {
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'Indira Gandhi National Open University',
            details: 'Core Focus: Data Structures, Algorithms, Web Engineering',
          },
        ],
        languages: [
          { name: 'Punjabi', proficiency: 'Mother tongue' },
          { name: 'Hindi', proficiency: 'Conversationally fluent' },
          { name: 'English', proficiency: 'Business knowledge' },
        ],
      };

      expect(() => generateResumePdfStream(mockData, mockRes)).not.toThrow();
      expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    });
  });
});
