import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_SECRET_KEY,
} from './environments'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
})

// Konfigurasi Multer untuk menyimpan file di memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

const toDataURL = (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString('base64')
  const dataURL = `data:${file.mimetype};base64,${b64}`
  return dataURL
}

const getPublicIdFromFileUrl = (fileUrl: string) => {
  const fileNameUsingSubstring = fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
  const publicId = fileNameUsingSubstring.substring(
    0,
    fileNameUsingSubstring.lastIndexOf('.')
  )
  return publicId
}

export { upload }

export default {
  async uploadSingle(file: Express.Multer.File) {
    const fileDataURL = toDataURL(file)
    const result = await cloudinary.uploader.upload(fileDataURL, {
      resource_type: 'auto',
    })
    return result
  },
  async remove(fileUrl: string) {
    const publicId = getPublicIdFromFileUrl(fileUrl)
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  },
}
