import categoryModel, { ICategory } from '../models/category.model'

export const createCategoryDB = async (
  payload: Omit<ICategory, 'isActive'>
) => {
  return await categoryModel.create(payload)
}

export const getCategoriesDB = async () => {
  return await categoryModel.find()
}

export const getCategoryBySlug = async (slug: string) => {
  return await categoryModel.findOne({ slug })
}
