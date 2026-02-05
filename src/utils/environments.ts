import dotenv from 'dotenv'

dotenv.config()

export const PORT: number = Number(process.env.PORT) || 3000
export const MONGO_URL: string = process.env.MONGO_URL || ''
export const EMAIL_SMTP_SECURE: boolean =
  Boolean(process.env.SMPTP_SECURE) || false
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || ''
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || ''
export const EMAIL_SMTP_PORT: number =
  Number(process.env.EMAIL_SMTP_PORT) || 465
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || ''
export const EMAIL_SMTP_SERVICE_NAME: string =
  process.env.EMAIL_SMTP_SERVICE_NAME || ''
export const CLIENT_HOST: string = process.env.CLIENT_HOST || ''
export const CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || ''
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || ''
export const CLOUDINARY_SECRET_KEY: string =
  process.env.CLOUDINARY_SECRET_KEY || ''
export const SECRET_JWT: string = process.env.SECRET_JWT || ''
