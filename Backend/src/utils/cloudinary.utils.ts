/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import { Types } from 'mongoose';
import envConstant from '../constants/env.constant';

const isCloudinaryConfigured =
  envConstant.CLOUDINARY_CLOUD_NAME &&
  envConstant.CLOUDINARY_API_KEY &&
  envConstant.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: envConstant.CLOUDINARY_CLOUD_NAME,
    api_key: envConstant.CLOUDINARY_API_KEY,
    api_secret: envConstant.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn(
    'Cloudinary is not fully configured. Image uploads will fall back to original strings.',
  );
}

export const uploadBase64ImageDetails = async (
  base64String: string,
  folder: string = 'portfolio',
): Promise<{ url: string; publicId: string }> => {
  if (!isCloudinaryConfigured) {
    return { url: base64String, publicId: 'local' };
  }

  // If it is already a Cloudinary or external URL, do not re-upload
  if (base64String.startsWith('http://') || base64String.startsWith('https://')) {
    return { url: base64String, publicId: 'remote' };
  }

  try {
    const result = await cloudinary.uploader.upload(base64String, {
      folder: `portfolio-cms/${folder}`,
      resource_type: 'auto',
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary', { cause: error });
  }
};

export const uploadBase64Image = async (
  base64String: string,
  folder: string = 'portfolio',
): Promise<string> => {
  const details = await uploadBase64ImageDetails(base64String, folder);
  return details.url;
};

export const deleteCloudinaryImage = async (imageUrl: string): Promise<void> => {
  if (!isCloudinaryConfigured || !imageUrl.includes('cloudinary.com')) {
    return;
  }

  try {
    const parts = imageUrl.split('/');
    const fileWithExt = parts.slice(-2).join('/');
    const publicId = fileWithExt.substring(0, fileWithExt.lastIndexOf('.'));
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

export const uploadToCloudinary = uploadBase64Image;
export const deleteFromCloudinary = deleteCloudinaryImage;

export const uploadBase64ImagesInObject = async (
  obj: any,
  folder: string = 'portfolio',
): Promise<any> => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // Preserve Mongoose ObjectId, Dates, Buffers, BSON types without mutating them
  if (
    obj instanceof Types.ObjectId ||
    obj?._bsontype === 'ObjectID' ||
    obj?._bsontype === 'ObjectId' ||
    obj instanceof Date ||
    Buffer.isBuffer(obj)
  ) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const results = await Promise.all(
      obj.map((item) => uploadBase64ImagesInObject(item, folder)),
    );
    for (let i = 0; i < results.length; i++) {
      obj[i] = results[i];
    }
    return obj;
  }

  const updatedObj = { ...obj };
  const keys = Object.keys(updatedObj);
  await Promise.all(
    keys.map(async (key) => {
      const value = updatedObj[key];
      if (typeof value === 'string' && value.startsWith('data:image/')) {
        updatedObj[key] = await uploadBase64Image(value, folder);
      } else if (value && typeof value === 'object') {
        updatedObj[key] = await uploadBase64ImagesInObject(value, folder);
      }
    }),
  );
  return updatedObj;
};

