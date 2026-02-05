import userModel, { Iuser } from '../models/user.model'

export const findUserByUsernameOrEmail = async (
  identifier: string
): Promise<Iuser | null> => {
  return await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  })
}
