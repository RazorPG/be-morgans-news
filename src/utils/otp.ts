import { OTP } from '../models/user.model'

export const generateOTP = (): OTP => {
  const otp: string = String(Math.floor(Math.random() * 900000) + 100000)
  const expireTime = new Date(Date.now() + 5 * 60 * 1000)
  return {
    code: otp,
    isVerify: false,
    expire: expireTime,
  }
}
