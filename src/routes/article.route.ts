import { Router } from 'express'
import { createArticle, getArticles } from '../controllers/article.controller'
import { isRoleAdmin, isUseSession } from '../middlewares/auth.middleware'

const articleRouter = Router()

articleRouter
  .route('/')
  .get(getArticles)
  .post(isUseSession, isRoleAdmin, createArticle)

export default articleRouter
