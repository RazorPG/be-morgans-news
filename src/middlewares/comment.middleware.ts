import { NextFunction, Request, Response } from 'express'
import { getCommentByUser, getCommentDB } from '../services/comment.service'
import { response } from '../utils/response'

export const isFindIdComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const comment = await getCommentDB(String(id))
    if (comment === null) {
      return response.requestError(res, 'id is not found')
    }
    return next()
  } catch (error) {
    return response.requestError(res, 'id is not found')
  }
}

export const isHasComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const user = res.locals.user

    const result = await getCommentByUser(String(id), user._id)

    if (result === null) {
      return response.forbiddenError(res)
    }
    return next()
  } catch (error: any) {
    return response.forbiddenError(res)
  }
}
