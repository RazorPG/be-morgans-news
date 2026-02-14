import { Request, Response } from 'express'
import {
  createCommentDB,
  deleteCommentDB,
  getCommentDB,
  getCommentsByArticle,
  updateCommentDB,
} from '../services/comment.service'
import { commentDAO } from '../models/comment.model'
import { response } from '../utils/response'
import * as Yup from 'yup'

export const createComment = async (req: Request, res: Response) => {
  try {
    await commentDAO.validate(req.body)
    const { _id: userId } = res.locals.user
    await createCommentDB({ userId, ...req.body })

    return response.success(res, 'success create comment', 201)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await getCommentsByArticle(String(id))
    return response.success(res, 'success get comments by article', 200, result)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await getCommentDB(String(id))

    return response.success(res, 'success get comment', 200, result)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Yup.object({
      content: Yup.string().required(),
    }).validate(req.body)

    await updateCommentDB(String(id), req.body.content)
    return response.success(res, 'success update comment', 200)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteCommentDB(String(id))

    return response.success(res, 'success delete comment', 200)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}
