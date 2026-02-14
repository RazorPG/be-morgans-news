import { Router } from 'express'
import {
  createReaction,
  deleteReaction,
  getReaction,
  getReactions,
  updateReaction,
} from '../controllers/reaction.controller'
import { isUseSession } from '../middlewares/auth.middleware'
import {
  isFindIdReaction,
  isHasReaction,
  isUseReaction,
} from '../middlewares/reaction.middleware'
import { isFindIdArticle } from '../middlewares/article.middleware'

const reactionRouter = Router()

reactionRouter.route('/').post(isUseSession, isUseReaction, createReaction)
reactionRouter
  .route('/:id')
  .get(getReaction)
  .put(isUseSession, isFindIdReaction, isHasReaction, updateReaction)
  .delete(isUseSession, isFindIdReaction, isHasReaction, deleteReaction)

reactionRouter.route('/article/:id').get(isFindIdArticle, getReactions)

export default reactionRouter
