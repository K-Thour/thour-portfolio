import { asyncCommonWrapper } from '../common/asyncCommon.wrapper';
import commonResponse from '../common/commonResponses';
import { STATUS_CODE } from '../constants/statusCode.constant';
import { uploadToCloudinary } from '../utils/cloudinary.utils';

const uploadService = (base64Image: string) => {
  return asyncCommonWrapper(async () => {
    if (!base64Image) {
      throw new Error('Image data is required');
    }
    const result = await uploadToCloudinary(base64Image);
    return commonResponse.success(result, 'Image uploaded successfully', STATUS_CODE.CREATED, 1);
  });
};

const imageServices = {
  uploadService,
};

export default imageServices;
