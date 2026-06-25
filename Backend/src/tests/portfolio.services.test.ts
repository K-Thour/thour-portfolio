import portfolioServices from '../services/portfolio.services';
import models from '../models';

jest.mock('../models');

describe('portfolioServices.getService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('populates createdBy so the public portfolio UI can read the owner name', async () => {
    (models.portfolio.repo.get as jest.Mock).mockResolvedValue([]);

    await portfolioServices.getService({});

    expect(models.portfolio.repo.get).toHaveBeenCalledWith(
      expect.objectContaining({
        populate: [
          {
            path: 'createdBy',
            select: 'name username fullName firstName lastName',
          },
        ],
      }),
    );
  });
});
