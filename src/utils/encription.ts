import bcrypt from 'bcrypt'

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const comparePassword = (
  password: string,
  userPassword: string
): boolean => {
  return bcrypt.compareSync(password, userPassword)
}
