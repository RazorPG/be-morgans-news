import { NextFunction, Request, Response } from 'express'

export const isSession = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user) {
    return res.status(403).json({
      meta: {
        status: 403,
        message: 'Session already exists',
      },
    })
  }
  return next()
}
export const isUseSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    return res.status(403).json({
      meta: {
        status: 403,
        message: 'No session yet',
      },
    })
  }
  return next()
}
