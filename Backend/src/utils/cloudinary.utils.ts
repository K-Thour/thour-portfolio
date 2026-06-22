import { v2 as cloudinary } from 'cloudinary';
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
    'Cloudinary credentials not set in .env. Falling back to local/dataURL image storage.',
  );
}

export const uploadToCloudinary = async (
  base64String: string,
  folder: string = 'portfolio',
): Promise<{ url: string; publicId: string }> => {
  if (!isCloudinaryConfigured) {
    // If not configured, return the base64 string directly so it displays fine locally
    return {
      url: base64String,
      publicId: `local_fallback_${Date.now()}`,
    };
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(base64String, {
      folder,
      resource_type: 'image',
    });
    return {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary', { cause: error });
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  if (!isCloudinaryConfigured || !publicId || publicId.startsWith('local_fallback_')) {
    return;
  }
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadBase64ImagesInObject = async (
  obj: any,
  folder: string = 'portfolio',
): Promise<any> => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = await uploadBase64ImagesInObject(obj[i], folder);
    }
    return obj;
  }

  // If the object matches imageDataSchema and has a base64 URL
  if (obj.url && typeof obj.url === 'string' && obj.url.startsWith('data:image/')) {
    try {
      const uploadRes = await uploadToCloudinary(obj.url, folder);
      obj.url = uploadRes.url;
      obj.publicId = uploadRes.publicId;
    } catch (err) {
      console.error('Failed to auto-upload base64 image in object:', err);
    }
    return obj;
  }

  for (const key of Object.keys(obj)) {
    obj[key] = await uploadBase64ImagesInObject(obj[key], folder);
  }

  return obj;
};
