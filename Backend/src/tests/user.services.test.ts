import userServices from '../services/user.services';
import models from '../models';
import { Types } from 'mongoose';
import { comparePassword, hashPassword } from '../utils/bcrypt.utils';

jest.mock('../models');
jest.mock('../utils/bcrypt.utils');

describe('userServices.changePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should change password successfully when current password matches', async () => {
    const userId = new Types.ObjectId().toString();
    const currentPassword = 'CurrentPassword123!';
    const newPassword = 'NewPassword123!';
    const mockUser = {
      _id: new Types.ObjectId(userId),
      passwordHash: 'hashed_current_password',
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (hashPassword as jest.Mock).mockResolvedValue('hashed_new_password');
    (models.user.repo.update as jest.Mock).mockResolvedValue({ ...mockUser, passwordHash: 'hashed_new_password' });

    const response = await userServices.changePassword(userId, currentPassword, newPassword);

    expect(response.statusCode).toBe(200);
    expect(response.message).toContain('Updated successfully Password');
    expect(models.user.repo.getOne).toHaveBeenCalledWith({
      filter: [{ _id: new Types.ObjectId(userId) }],
      select: ['passwordHash'],
    });
    expect(comparePassword).toHaveBeenCalledWith(currentPassword, 'hashed_current_password');
    expect(hashPassword).toHaveBeenCalledWith(newPassword);
    expect(models.user.repo.update).toHaveBeenCalledWith(userId, { passwordHash: 'hashed_new_password' }, new Types.ObjectId(userId));
  });

  it('should return 400 when current password is invalid', async () => {
    const userId = new Types.ObjectId().toString();
    const currentPassword = 'WrongPassword123!';
    const newPassword = 'NewPassword123!';
    const mockUser = {
      _id: new Types.ObjectId(userId),
      passwordHash: 'hashed_current_password',
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);
    (comparePassword as jest.Mock).mockResolvedValue(false);

    const response = await userServices.changePassword(userId, currentPassword, newPassword);

    expect(response.statusCode).toBe(400);
    expect(response.message).toContain('Invalid credentials');
    expect(models.user.repo.update).not.toHaveBeenCalled();
  });

  it('should return 404 when user is not found', async () => {
    const userId = new Types.ObjectId().toString();
    const currentPassword = 'CurrentPassword123!';
    const newPassword = 'NewPassword123!';

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(null);

    const response = await userServices.changePassword(userId, currentPassword, newPassword);

    expect(response.statusCode).toBe(404);
    expect(response.message).toContain('Not found User');
    expect(models.user.repo.update).not.toHaveBeenCalled();
  });
});
