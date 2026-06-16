import leadServices from '../services/lead.services';
import models from '../models';
import { Types } from 'mongoose';

jest.mock('../models');

describe('leadServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createService', () => {
    it('should create a lead successfully', async () => {
      const mockLeadData = {
        name: 'Karanveer',
        email: 'karan@example.com',
        description: 'Need a custom resume builder integrations',
      };

      const mockCreatedLead = {
        _id: new Types.ObjectId(),
        ...mockLeadData,
        createdAt: new Date(),
      };

      (models.lead.repo.create as jest.Mock).mockResolvedValue(mockCreatedLead);

      const response = await leadServices.createService(mockLeadData);

      expect(response.statusCode).toBe(201);
      expect(response.message).toContain('Created successfully Lead');
      expect(response.data).toEqual(mockCreatedLead);
      expect(models.lead.repo.create).toHaveBeenCalledWith(mockLeadData);
    });
  });

  describe('updateService', () => {
    it('should update a lead successfully', async () => {
      const leadId = new Types.ObjectId().toString();
      const userId = new Types.ObjectId();
      const mockUpdateData = { name: 'Karanveer Refactored' };
      const mockUpdatedLead = { _id: leadId, name: 'Karanveer Refactored' };

      (models.lead.repo.update as jest.Mock).mockResolvedValue(mockUpdatedLead);

      const response = await leadServices.updateService(leadId, mockUpdateData, userId);

      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual(mockUpdatedLead);
      expect(models.lead.repo.update).toHaveBeenCalledWith(leadId, mockUpdateData, userId);
    });
  });
});
