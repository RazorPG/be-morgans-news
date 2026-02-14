import { NextFunction, Request, Response } from 'express'
import { response } from '../utils/response'
import { getArticleByIdDB } from '../services/article.service'

export const isFindIdArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const article = await getArticleByIdDB(String(id))
    if (article === null) {
      return response.requestError(res, 'id is not found')
    }
    res.locals.article = article
    return next()
  } catch (error) {
    return response.requestError(res, 'id is not found')
  }
}
