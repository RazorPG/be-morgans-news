import { NextFunction, Request, Response } from 'express'
import { jwtVerify } from '../utils/jwt'

export const decentralizedToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = ''
  if (req?.headers?.authorization) {
    token = req.headers.authorization.split(' ')[1] || ''
  }

  if (token === '') {
    return next()
  }

  try {
    const accessToken: any = jwtVerify(token)
    res.locals.user = accessToken._doc
    return next()
  } catch (error) {
    return next()
  }
}
