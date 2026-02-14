import { Router } from 'express'
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from '../controllers/comment.controller'
import { isFindIdArticle } from '../middlewares/article.middleware'
import {
  isFindIdComment,
  isHasComment,
} from '../middlewares/comment.middleware'
import { isUseSession } from '../middlewares/auth.middleware'

const commentRouter = Router()

commentRouter.route('/').post(createComment)
commentRouter
  .route('/:id')
  .get(isFindIdComment, getComment)
  .put(isUseSession, isFindIdComment, isHasComment, updateComment)
  .delete(isUseSession, isFindIdComment, isHasComment, deleteComment)
commentRouter.route('/article/:id').get(isFindIdArticle, getComments)

export default commentRouter
