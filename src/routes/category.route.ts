import { Router } from 'express'
import { createCategory } from '../controllers/category.controller'

const categoryRouter = Router()

categoryRouter.route('/').post(createCategory)

export default categoryRouter
