import { Router } from 'express'
import {
  createCategory,
  getCategories,
  updateCategory,
} from '../controllers/category.controller'
import { isFindIdCategory } from '../middlewares/category.middleware'

const categoryRouter = Router()

categoryRouter.route('/').post(createCategory).get(getCategories)
categoryRouter.route('/:id').put(isFindIdCategory, updateCategory)

export default categoryRouter
