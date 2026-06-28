import userServices from '../services/user.services';
import models from '../models';
import { Types } from 'mongoose';
import { comparePassword, hashPassword } from '../utils/bcrypt.utils';
import { sendOtpEmail } from '../utils/mail.utils';
import { generateRandomToken } from '../utils/jwt.utils';

jest.mock('../models');
jest.mock('../utils/bcrypt.utils');
jest.mock('../utils/mail.utils');
jest.mock('../utils/jwt.utils');

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
    (models.user.repo.update as jest.Mock).mockResolvedValue({
      ...mockUser,
      passwordHash: 'hashed_new_password',
    });

    const response = await userServices.changePassword(userId, currentPassword, newPassword);

    expect(response.statusCode).toBe(200);
    expect(response.message).toContain('Updated successfully Password');
    expect(models.user.repo.getOne).toHaveBeenCalledWith({
      filter: [{ _id: new Types.ObjectId(userId) }],
      select: 'passwordHash',
    });
    expect(comparePassword).toHaveBeenCalledWith(currentPassword, 'hashed_current_password');
    expect(hashPassword).toHaveBeenCalledWith(newPassword);
    expect(models.user.repo.update).toHaveBeenCalledWith(
      userId,
      { passwordHash: 'hashed_new_password' },
      new Types.ObjectId(userId),
    );
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

describe('userServices.forgotPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate OTP and send email on success', async () => {
    const email = 'admin@portfolio.com';
    const mockUser = {
      _id: new Types.ObjectId(),
      email,
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);
    (models.user.repo.update as jest.Mock).mockResolvedValue(mockUser);
    (sendOtpEmail as jest.Mock).mockResolvedValue(true);

    const response = await userServices.forgotPassword(email);

    expect(response.statusCode).toBe(200);
    expect(response.message).toContain('OTP sent successfully');
    expect(models.user.repo.getOne).toHaveBeenCalledWith({
      filter: [{ email: expect.any(RegExp) }],
    });
    expect(models.user.repo.update).toHaveBeenCalled();
    expect(sendOtpEmail).toHaveBeenCalledWith(email, expect.any(String));
  });

  it('should return 404 if email does not exist', async () => {
    const email = 'unknown@portfolio.com';
    (models.user.repo.getOne as jest.Mock).mockResolvedValue(null);

    const response = await userServices.forgotPassword(email);

    expect(response.statusCode).toBe(404);
    expect(response.message).toContain('Not found User');
  });
});

describe('userServices.verifyOtp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should verify OTP and return reset token on success', async () => {
    const email = 'admin@portfolio.com';
    const otp = '123456';
    const mockUser = {
      _id: new Types.ObjectId(),
      email,
      otp,
      otpExpiry: new Date(Date.now() + 50000),
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);
    (generateRandomToken as jest.Mock).mockReturnValue('mocked_reset_token');
    (models.user.repo.update as jest.Mock).mockResolvedValue(mockUser);

    const response = await userServices.verifyOtp(email, otp);

    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual({ resetToken: 'mocked_reset_token' });
    expect(models.user.repo.update).toHaveBeenCalledWith(
      mockUser._id.toString(),
      expect.objectContaining({ resetToken: 'mocked_reset_token' }),
      mockUser._id,
    );
  });

  it('should return 400 for incorrect OTP', async () => {
    const email = 'admin@portfolio.com';
    const otp = '123456';
    const mockUser = {
      _id: new Types.ObjectId(),
      email,
      otp: '654321', // mismatch
      otpExpiry: new Date(Date.now() + 50000),
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);

    const response = await userServices.verifyOtp(email, otp);

    expect(response.statusCode).toBe(400);
    expect(response.message).toContain('Invalid or expired OTP');
  });

  it('should return 400 for expired OTP', async () => {
    const email = 'admin@portfolio.com';
    const otp = '123456';
    const mockUser = {
      _id: new Types.ObjectId(),
      email,
      otp,
      otpExpiry: new Date(Date.now() - 50000), // expired
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);

    const response = await userServices.verifyOtp(email, otp);

    expect(response.statusCode).toBe(400);
    expect(response.message).toContain('Invalid or expired OTP');
  });
});

describe('userServices.resetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reset password on valid reset token', async () => {
    const email = 'admin@portfolio.com';
    const resetToken = 'mocked_reset_token';
    const newPassword = 'NewPassword123!';
    const mockUser = {
      _id: new Types.ObjectId(),
      email,
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 50000),
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);
    (hashPassword as jest.Mock).mockResolvedValue('hashed_new_password');
    (models.user.repo.update as jest.Mock).mockResolvedValue(mockUser);

    const response = await userServices.resetPassword(email, resetToken, newPassword);

    expect(response.statusCode).toBe(200);
    expect(response.message).toContain('Updated successfully Password');
    expect(hashPassword).toHaveBeenCalledWith(newPassword);
    expect(models.user.repo.update).toHaveBeenCalledWith(
      mockUser._id.toString(),
      expect.objectContaining({ passwordHash: 'hashed_new_password' }),
      mockUser._id,
    );
  });

  it('should return 400 for mismatched reset token', async () => {
    const email = 'admin@portfolio.com';
    const resetToken = 'wrong_reset_token';
    const mockUser = {
      _id: new Types.ObjectId(),
      email,
      resetToken: 'mocked_reset_token',
      resetTokenExpiry: new Date(Date.now() + 50000),
    };

    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);

    const response = await userServices.resetPassword(email, resetToken, 'NewPassword123!');

    expect(response.statusCode).toBe(400);
    expect(response.message).toContain('Invalid or expired password reset token');
  });
});
