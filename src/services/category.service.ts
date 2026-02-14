import categoryModel, { Icategory } from '../models/category.model'

export const createCategoryDB = async (
  payload: Omit<Icategory, 'isActive'>
) => {
  return await categoryModel.create(payload)
}

export const getCategoriesDB = async () => {
  return await categoryModel.find()
}

export const updateCategoryDB = async (
  id: string,
  name: string,
  isActive: boolean
) => {
  return await categoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: name.toLowerCase().split(' ').join('-'), isActive },
    { new: true }
  )
}

export const getCategoryByIdDB = async (id: string) => {
  return await categoryModel.findById({ _id: id })
}
export const getCategoryBySlug = async (slug: string) => {
  return await categoryModel.findOne({ slug })
}
