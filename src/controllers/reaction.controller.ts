import { Request, Response } from 'express'
import {
  createReactionDB,
  deleteReactionDB,
  getReactionDB,
  getReactionsByArticle,
  updateReactionDB,
} from '../services/reaction.service'
import { reactionDAO } from '../models/reaction.model'
import { response } from '../utils/response'
import * as Yup from 'yup'

export const createReaction = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    await reactionDAO.validate(req.body)

    const result = await createReactionDB({ ...req.body, userId: user._id })

    return response.success(res, 'success create reaction', 201, result)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }

    return response.serverError(res, error.message)
  }
}

export const getReaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await getReactionDB(String(id))

    return response.success(res, 'success get reaction', 200, result)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const getReactions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await getReactionsByArticle(String(id))
    const likes =
      result.filter(react => react.reactionType === 'like').length || 0
    const dislikes =
      result.filter(react => react.reactionType === 'dislike').length || 0

    return response.success(res, 'success get all reaction by article', 201, {
      likes,
      dislikes,
    })
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const updateReaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Yup.object({
      reactionType: Yup.string().required(),
    }).validate(req.body)

    await updateReactionDB(String(id), req.body.reactionType)

    return response.success(res, 'success update reaction', 200)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await deleteReactionDB(String(id))

    return response.success(res, 'success delete reaction', 200)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}
