import { Router } from "express"
import {
  createCategory,
  getCategories,
  updateCategory,
  getCategoryById,
} from "../controllers/category.controller"
import { isFindIdCategory } from "../middlewares/category.middleware"

const categoryRouter = Router()

categoryRouter.route("/").post(createCategory).get(getCategories)
categoryRouter
  .route("/:id")
  .put(isFindIdCategory, updateCategory)
  .get(isFindIdCategory, getCategoryById)

export default categoryRouter
