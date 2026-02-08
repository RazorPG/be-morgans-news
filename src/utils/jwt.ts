import jwt from 'jsonwebtoken'
import { SECRET_JWT } from './environments'

export const jwtAssign = (payload: any) => {
  return jwt.sign({ ...payload }, SECRET_JWT, {
    expiresIn: '1d',
  })
}

export const jwtVerify = (token: string): any => {
  return jwt.verify(token, SECRET_JWT)
}
