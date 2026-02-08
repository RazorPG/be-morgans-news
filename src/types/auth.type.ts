import { OTP } from '../models/user.model'

export interface IuserToken {
  username: string
  password: string
  email: string
  isActive: boolean
  activationCode: string
  _id: string
  createdAt: string
  updatedAt: string
  role: string
  profilePicture: string
  OTP: OTP
}
