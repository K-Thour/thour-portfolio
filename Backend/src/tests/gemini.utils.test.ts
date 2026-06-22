import { generateResumeAI, GenerateResumeParams } from '../utils/gemini.utils';

jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn().mockResolvedValue({
    response: {
      text: () =>
        JSON.stringify({
          selectedProjectIds: ['p1'],
          selectedServiceIds: ['s1'],
          selectedTechnologyIds: ['t1'],
          tailoredSummary: 'This is a mocked tailored summary',
          latexCode: '\\documentclass{article}\\begin{document}Mocked LaTeX\\end{document}',
        }),
    },
  });

  const mockGetGenerativeModel = jest.fn().mockReturnValue({
    generateContent: mockGenerateContent,
  });

  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: mockGetGenerativeModel,
    })),
  };
});

describe('generateResumeAI', () => {
  it('should call Gemini API and return a parsed resume response', async () => {
    const params: GenerateResumeParams = {
      jobDescription: 'Looking for a Senior React Developer',
      developerProfile: {
        name: 'Karanveer Thour',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        experienceYears: 5,
        hobbies: ['Gaming'],
        languages: [{ name: 'English', level: 'Fluent' }],
      },
      projects: [
        {
          _id: 'p1',
          title: 'React Project',
          description: 'A great react project',
          techStack: ['React'],
          role: 'Lead',
        },
      ],
      services: [{ _id: 's1', name: 'Frontend Dev', decription: 'Service desc', technologies: [] }],
      technologies: [{ _id: 't1', name: 'React', category: 'Frontend' }],
      education: [
        {
          _id: 'ed1',
          level: 'Bachelor',
          degree: 'CS',
          field_of_study: 'CS',
          institution: 'Univ',
          startYear: '2020',
          endYear: '2024',
          grade: 'A',
        },
      ],
      experience: [
        {
          _id: 'ex1',
          companyName: 'Company',
          position: 'Developer',
          field: 'IT',
          description: 'Work desc',
          dateOfJoining: '2024-01-01',
          stillWorking: true,
        },
      ],
    };

    const result = await generateResumeAI(params);

    expect(result.selectedProjectIds).toEqual(['p1']);
    expect(result.selectedServiceIds).toEqual(['s1']);
    expect(result.selectedTechnologyIds).toEqual(['t1']);
    expect(result.tailoredSummary).toBe('This is a mocked tailored summary');
    expect(result.latexCode).toContain('Mocked LaTeX');
  });
});
