import projectServices from '../services/project.services';
import models from '../models';

jest.mock('../models');

describe('projectServices.getService and getOneService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('includes subtitle in select projection and returns normalized subtitle', async () => {
    const mockProject = {
      _id: '6a44ad83fad535e161ed4dae',
      title: 'News Monkey',
      features: ['Feature 1'],
    };

    (models.project.repo.get as jest.Mock).mockResolvedValue([mockProject]);

    const res = await projectServices.getService({});

    expect(models.project.repo.get).toHaveBeenCalledWith(
      expect.objectContaining({
        select: expect.stringContaining('subtitle'),
      }),
    );

    expect(res.data[0]).toHaveProperty('subtitle', '');
  });

  it('returns custom subtitle when project has subtitle in DB', async () => {
    const mockProject = {
      _id: '6a44ad83fad535e161ed4dae',
      title: 'News Monkey',
      subtitle: 'React News Application',
      features: [],
    };

    (models.project.repo.get as jest.Mock).mockResolvedValue([mockProject]);

    const res = await projectServices.getService({});
    expect(res.data[0].subtitle).toBe('React News Application');
  });
});
