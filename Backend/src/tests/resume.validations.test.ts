import {
  resumeCreateSchema,
  resumeGenerateSchema,
  resumeUpdateSchema,
} from '../validations/resume.validations';

describe('Resume Validations', () => {
  describe('resumeGenerateSchema', () => {
    it('should validate successfully with designType "ats" and no jobLink', () => {
      const payload = {
        name: 'Full-Stack Developer (MERN)',
        description: 'MERN stack developer role focus',
        designType: 'ats',
        targetRole: 'AI & Full Stack Specialist',
        selectedProjectIds: [],
      };

      const result = resumeGenerateSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.designType).toBe('ats');
        expect(result.data.name).toBe('Full-Stack Developer (MERN)');
        expect(result.data.targetRole).toBe('AI & Full Stack Specialist');
      }
    });

    it('should validate successfully with empty string jobLink', () => {
      const payload = {
        name: 'Full-Stack Developer (MERN)',
        description: 'Focus description',
        jobLink: '',
        designType: 'ats',
      };

      const result = resumeGenerateSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it('should validate successfully with valid URL jobLink', () => {
      const payload = {
        name: 'Full-Stack Developer (MERN)',
        description: 'Focus description',
        jobLink: 'https://www.linkedin.com/jobs/view/4436059036',
        designType: 'ats',
      };

      const result = resumeGenerateSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.jobLink).toBe('https://www.linkedin.com/jobs/view/4436059036');
      }
    });

    it('should fail when jobLink is an invalid non-empty URL', () => {
      const payload = {
        name: 'Full-Stack Developer (MERN)',
        description: 'Focus description',
        jobLink: 'invalid-not-a-url',
        designType: 'ats',
      };

      const result = resumeGenerateSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    it('should support all designTypes: ats, latex, pdf, image, modern', () => {
      const designTypes = ['ats', 'latex', 'pdf', 'image', 'modern'] as const;

      for (const designType of designTypes) {
        const payload = {
          name: 'Developer',
          description: 'Focus',
          designType,
        };
        const result = resumeGenerateSchema.safeParse(payload);
        expect(result.success).toBe(true);
      }
    });

    it('should fail when name or description are missing', () => {
      const payloadMissingName = {
        name: '',
        description: 'Valid description',
      };
      const resultName = resumeGenerateSchema.safeParse(payloadMissingName);
      expect(resultName.success).toBe(false);

      const payloadMissingDesc = {
        name: 'Valid Name',
        description: '',
      };
      const resultDesc = resumeGenerateSchema.safeParse(payloadMissingDesc);
      expect(resultDesc.success).toBe(false);
    });
  });

  describe('resumeCreateSchema', () => {
    it('should validate successfully with designType "ats" and empty/null jobUrl', () => {
      const payload = {
        name: 'ATS Resume',
        projectCount: 3,
        serviceCount: 2,
        technologyCount: 10,
        projectsUsed: ['60d5ec4934d47d2b2c8b4567'],
        servicesUsed: ['60d5ec4934d47d2b2c8b4568'],
        technologiesUsed: ['60d5ec4934d47d2b2c8b4569'],
        resumeUrl: 'http://localhost:3000/api/resume/download/pdf/123',
        designType: 'ats',
        jobUrl: '',
        isActive: true,
      };

      const result = resumeCreateSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });
  });

  describe('resumeUpdateSchema', () => {
    it('should validate successfully with isActive: true', () => {
      const result = resumeUpdateSchema.safeParse({ isActive: true });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isActive).toBe(true);
      }
    });

    it('should validate successfully with isActive: false', () => {
      const result = resumeUpdateSchema.safeParse({ isActive: false });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isActive).toBe(false);
      }
    });

    it('should fail when an empty object is provided', () => {
      const result = resumeUpdateSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });
});
