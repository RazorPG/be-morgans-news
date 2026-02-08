import bcrypt from 'bcrypt'

export const hashText = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const compareText = (
  password: string,
  userPassword: string
): boolean => {
  return bcrypt.compareSync(password, userPassword)
}
