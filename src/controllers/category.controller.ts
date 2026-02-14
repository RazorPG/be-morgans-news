import { Request, Response } from 'express'
import { categoryDAO } from '../models/category.model'
import {
  createCategoryDB,
  getCategoriesDB,
  updateCategoryDB,
} from '../services/category.service'
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

    return response.success(res, 'success create category', 201)
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

    return response.success(res, 'success get categories!', 200, result)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const category = res.locals.category
    const { name = category.name, isActive = category.isActive } = req.body

    await updateCategoryDB(String(id), name, isActive)
    return response.success(res, 'success update category', 200)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}
