import { NextFunction, Request, Response } from 'express'
import { getCategoryByIdDB } from '../services/category.service'
import { response } from '../utils/response'

export const isFindIdCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    const category = await getCategoryByIdDB(String(id))
    if (category === null) {
      return response.requestError(res, 'id is not found')
    }
    res.locals.category = category
    return next()
  } catch (error) {
    return response.requestError(res, 'id is not found')
  }
}
