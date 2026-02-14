import { Router } from 'express'
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/article.controller'
import { isRoleAdmin, isUseSession } from '../middlewares/auth.middleware'
import { isFindIdArticle } from '../middlewares/article.middleware'

const articleRouter = Router()

articleRouter
  .route('/')
  .get(getArticles)
  .post(isUseSession, isRoleAdmin, createArticle)

articleRouter
  .route('/:id')
  .get(isFindIdArticle, getArticleById)
  .put(isUseSession, isRoleAdmin, isFindIdArticle, updateArticle)
  .delete(isUseSession, isRoleAdmin, isFindIdArticle, deleteArticle)

export default articleRouter
