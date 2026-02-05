import userModel, { Iuser } from '../models/user.model'

export const createAccount = async (
  payload: Omit<Iuser, 'role' | 'profilePicture' | 'isActive'>
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

export const createSession = async (payload: {
  identifier: string
  password: string
}) => {
  await userModel.find()
}
