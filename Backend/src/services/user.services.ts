import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { IUserRepoParams } from '../interface/models/user/userRepo.interface';
import models from '../models';
import { STATUS_CODE } from '../constants/statusCode.constant';
import { Types } from 'mongoose';
import IUserModel, { createUserInput } from '../interface/models/user/user.interface';
import { comparePassword, hashPassword } from '../utils/bcrypt.utils';
import { generateToken } from '../utils/jwt.utils';
import { uploadBase64ImagesInObject, deleteFromCloudinary } from '../utils/cloudinary.utils';

const escapeRegex = (string: string) => string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

const getAll = (params: IUserRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.user.repo.get(params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('Users'),
      STATUS_CODE.OK,
      result.length,
    );
  });
};

const getById = (id: string, params: IUserRepoParams) => {
  return asyncCommonWrapper(async () => {
    const result = await models.user.repo.getOne({
      ...params,
      filter: [{ _id: new Types.ObjectId(id) }],
    });
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('User'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const register = (data: createUserInput) => {
  return asyncCommonWrapper(async () => {
    const emailStr = data.email.trim();
    const emailRegex = new RegExp(`^${escapeRegex(emailStr)}$`, 'i');
    const isUserExist = await models.user.repo.get({
      filter: [{ email: emailRegex as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
      select: 'email',
    });
    data.email = emailStr.toLowerCase();
    if (isUserExist.length > 0) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.alreadyExist('User'),
        STATUS_CODE.BAD_REQUEST,
        0,
      );
    }
    await uploadBase64ImagesInObject(data, 'profiles');
    const password = await hashPassword(data.passwordHash);
    const result = await models.user.repo.create({ ...data, passwordHash: password });
    const token = generateToken({ id: result._id.toString() });
    return commonResponse.success(
      { token },
      MESSAGES_COMMON_UTIL.registeredSuccessfully('User'),
      STATUS_CODE.CREATED,
      1,
    );
  });
};

const update = (id: string, data: Partial<IUserModel>, updatedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const currentUser = await models.user.repo.getOne({
      filter: [{ _id: new Types.ObjectId(id) }],
    });

    if (data.email) {
      const emailStr = data.email.trim();
      const emailRegex = new RegExp(`^${escapeRegex(emailStr)}$`, 'i');
      const isEmailExist = await models.user.repo.getOne({
        filter: [{ email: emailRegex as any, _id: { $ne: new Types.ObjectId(id) } as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
      });
      data.email = emailStr.toLowerCase();
      if (isEmailExist) {
        return commonResponse.error(
          null,
          MESSAGES_COMMON_UTIL.alreadyExist('User email'),
          STATUS_CODE.BAD_REQUEST,
          0,
        );
      }
    }

    await uploadBase64ImagesInObject(data, 'profiles');

    if (
      currentUser &&
      currentUser.image &&
      currentUser.image.publicId &&
      data.image &&
      data.image.url
    ) {
      if (currentUser.image.url !== data.image.url) {
        await deleteFromCloudinary(currentUser.image.publicId);
      }
    }

    const result = await models.user.repo.update(id, data, updatedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('User'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const softDelete = (id: string, date: Date, deletedBy: Types.ObjectId) => {
  return asyncCommonWrapper(async () => {
    const result = await models.user.repo.softDelete(id, date, deletedBy);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('User'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const deleteOne = (id: string) => {
  return asyncCommonWrapper(async () => {
    const result = await models.user.repo.deleteOne(id);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.deletedSuccessfully('User'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const login = (email: string, password: string) => {
  return asyncCommonWrapper(async () => {
    const emailRegex = new RegExp(`^${escapeRegex(email.trim())}$`, 'i');
    const result = await models.user.repo.get({
      filter: [{ email: emailRegex as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
      select: 'email passwordHash',
    });
    if (result.length === 0) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.invalidCredentials('User'),
        STATUS_CODE.NOT_FOUND,
        0,
      );
    }
    const user = result[0];
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.invalidCredentials('User'),
        STATUS_CODE.NOT_FOUND,
        0,
      );
    }
    const token = generateToken({ id: user._id.toString() });
    return commonResponse.success(
      { token },
      MESSAGES_COMMON_UTIL.loggedInSuccessfully('User'),
      STATUS_CODE.OK,
      1,
    );
  });
};

const changePassword = (id: string, currentPassword: string, newPassword: string) => {
  return asyncCommonWrapper(async () => {
    const user = await models.user.repo.getOne({
      filter: [{ _id: new Types.ObjectId(id) }],
      select: 'passwordHash',
    });

    if (!user) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.notFound('User'),
        STATUS_CODE.NOT_FOUND,
        0,
      );
    }

    const isPasswordValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.invalidCredentials('User'),
        STATUS_CODE.BAD_REQUEST,
        0,
      );
    }

    const newHashedPassword = await hashPassword(newPassword);
    const result = await models.user.repo.update(
      id,
      { passwordHash: newHashedPassword },
      new Types.ObjectId(id),
    );

    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Password'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const forgotPassword = (email: string) => {
  return asyncCommonWrapper(async () => {
    const emailRegex = new RegExp(`^${escapeRegex(email.trim())}$`, 'i');
    const result = await models.user.repo.getOne({ filter: [{ email: emailRegex as any }] }); // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!result) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.notFound('User'),
        STATUS_CODE.NOT_FOUND,
        0,
      );
    }

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save to user
    await models.user.repo.update(result._id.toString(), { otp, otpExpiry }, result._id);

    // Send email
    const { sendOtpEmail } = await import('../utils/mail.utils');
    await sendOtpEmail(result.email || email.trim(), otp);

    return commonResponse.success(null, 'OTP sent successfully', STATUS_CODE.OK, 1);
  });
};

const verifyOtp = (email: string, otp: string) => {
  return asyncCommonWrapper(async () => {
    const emailRegex = new RegExp(`^${escapeRegex(email.trim())}$`, 'i');
    const user = await models.user.repo.getOne({
      filter: [{ email: emailRegex as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
      select: 'otp otpExpiry',
    });

    if (!user) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.notFound('User'),
        STATUS_CODE.NOT_FOUND,
        0,
      );
    }

    if (!user.otp || user.otp !== otp || !user.otpExpiry || new Date() > user.otpExpiry) {
      return commonResponse.error(null, 'Invalid or expired OTP', STATUS_CODE.BAD_REQUEST, 0);
    }

    // Generate a temporary reset token valid for 5 minutes
    const { generateRandomToken } = await import('../utils/jwt.utils');
    const resetToken = generateRandomToken('5m');
    const resetTokenExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // Save resetToken to user
    await models.user.repo.update(user._id.toString(), { resetToken, resetTokenExpiry }, user._id);

    return commonResponse.success({ resetToken }, 'OTP verified successfully', STATUS_CODE.OK, 1);
  });
};

const resetPassword = (email: string, resetToken: string, passwordHash: string) => {
  return asyncCommonWrapper(async () => {
    const emailRegex = new RegExp(`^${escapeRegex(email.trim())}$`, 'i');
    const user = await models.user.repo.getOne({
      filter: [{ email: emailRegex as any }], // eslint-disable-line @typescript-eslint/no-explicit-any
      select: 'resetToken resetTokenExpiry',
    });

    if (!user) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.notFound('User'),
        STATUS_CODE.NOT_FOUND,
        0,
      );
    }

    if (
      !user.resetToken ||
      user.resetToken !== resetToken ||
      !user.resetTokenExpiry ||
      new Date() > user.resetTokenExpiry
    ) {
      return commonResponse.error(
        null,
        'Invalid or expired password reset token',
        STATUS_CODE.BAD_REQUEST,
        0,
      );
    }

    // Hash the new password
    const hashed = await hashPassword(passwordHash);

    // Update password and clear OTP/resetToken fields
    const result = await models.user.repo.update(
      user._id.toString(),
      {
        passwordHash: hashed,
        otp: undefined,
        otpExpiry: undefined,
        resetToken: undefined,
        resetTokenExpiry: undefined,
      },
      user._id,
    );

    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.updatedSuccessfully('Password'),
      STATUS_CODE.OK,
      1,
    );
  });
};

const userServices = {
  getAll,
  getById,
  register,
  update,
  softDelete,
  deleteOne,
  login,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
};

export default userServices;
