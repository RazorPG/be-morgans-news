import userModel, { Iuser, OTP } from '../models/user.model'
import { hashText } from '../utils/encription'

export const createAccount = async (
  payload: Omit<
    Iuser,
    'role' | 'profilePicture' | 'isActive' | 'OTP' | 'activationCode'
  >
) => {
  return await userModel.create(payload)
}

export const activationAccount = async (payload: { code: string }) => {
  return await userModel.findOneAndUpdate(
    { activationCode: payload.code },
    {
      $set: {
        isActive: true,
      },
    },
    { new: true }
  )
}

export const sendOTP = async (email: string, otp: OTP) => {
  return await userModel.findOneAndUpdate(
    { email },
    { $set: { OTP: otp } },
    { new: true, hookType: 'resetPassword' }
  )
}

export const verifyOTP = async (email: string) => {
  return await userModel.findOneAndUpdate(
    { email },
    {
      $set: {
        'OTP.isVerify': true,
      },
    },
    { new: true }
  )
}

export const changePasswordUser = async (email: string, password: string) => {
  return await userModel.findOneAndUpdate(
    { email },
    {
      $set: {
        password: hashText(password),
      },
    },
    { new: true, hookType: 'changePassword' }
  )
}
