import { Request, Response } from 'express'
import { categoryDAO } from '../models/category.model'
import { createCategoryDB, getCategoriesDB } from '../services/category.service'
import { response } from '../utils/response'

export const createCategory = async (req: Request, res: Response) => {
  try {
    await categoryDAO.validate(req.body)
    const { name } = req.body as unknown as { name: string }
    const slug = name.toLowerCase().split(' ').join('-')
    const payload = {
      name,
      slug,
    }
    await createCategoryDB(payload)

    return response.success(res, 'success create category', 200)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await getCategoriesDB()

    //    return response.pagination(res, "success get categories", result, {MaxPerPage: })
  } catch (error) {
    return
  }
}
