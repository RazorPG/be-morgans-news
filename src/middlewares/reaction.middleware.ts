import { NextFunction, Request, Response } from 'express'
import {
  getReactionByUser,
  getReactionByUserAndArticle,
  getReactionDB,
} from '../services/reaction.service'
import { response } from '../utils/response'

export const isFindIdReaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const result = await getReactionDB(String(id))
    if (result === null) {
      return response.requestError(res, 'id is not found')
    }
    return next()
  } catch (error: any) {
    return response.requestError(res, 'id is not found')
  }
}

export const isUseReaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { articleId } = req.body
    const userId = res.locals.user._id

    const reaction = await getReactionByUserAndArticle(
      userId,
      String(articleId)
    )

    if (reaction) {
      return response.forbiddenError(res)
    }

    return next()
  } catch (error: any) {
    return response.forbiddenError(res)
  }
}

export const isHasReaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const user = res.locals.user

    const result = await getReactionByUser(String(id), user._id)

    if (result === null) {
      return response.forbiddenError(res)
    }
    return next()
  } catch (error: any) {
    return response.forbiddenError(res)
  }
}
