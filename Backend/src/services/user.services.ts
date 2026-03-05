import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import MESSAGES_COMMON_UTIL from '../common/messages.common';
import { IUserRepoParams } from '../interface/models/user/userRepo.interface';
import models from '../models';
import { STATUS_CODE } from '../constants/statusCode.constant';
import { Types } from 'mongoose';
import IUserModel from '../interface/models/user/user.interface';
import { comparePassword, hashPassword } from '../utils/bcrypt.utils';
import { generateToken } from '../utils/jwt.utils';

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
    const result = await models.user.repo.getById(id, params);
    return commonResponse.success(
      result,
      MESSAGES_COMMON_UTIL.fetchedSuccessfully('User'),
      STATUS_CODE.OK,
      result ? 1 : 0,
    );
  });
};

const register = (data: IUserModel) => {
  return asyncCommonWrapper(async () => {
    const isUserExist = await models.user.repo.get({
      filter: [{ email: data.email }],
      select: ['email'],
    });
    if (isUserExist.length > 0) {
      return commonResponse.error(
        null,
        MESSAGES_COMMON_UTIL.alreadyExist('User'),
        STATUS_CODE.BAD_REQUEST,
        0,
      );
    }
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
    const result = await models.user.repo.get({
      filter: [{ email }],
      select: ['email', 'passwordHash'],
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

const userServices = {
  getAll,
  getById,
  register,
  update,
  softDelete,
  deleteOne,
  login,
};

export default userServices;
