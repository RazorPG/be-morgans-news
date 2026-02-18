import { Application } from 'express'
import authRouter from './auth.route'
import categoryRouter from './category.route'
import articleRouter from './article.route'
import reactionRouter from './reaction.route'
import commentRouter from './comment.route'
import mediaRouter from './media.route'

const _routes = [
  { prefix: '/api/auth', router: authRouter },
  { prefix: '/api/categories', router: categoryRouter },
  { prefix: '/api/articles', router: articleRouter },
  { prefix: '/api/reactions', router: reactionRouter },
  { prefix: '/api/comments', router: commentRouter },
  { prefix: '/api/media', router: mediaRouter },
]

export default function (app: Application) {
  _routes.forEach(route => {
    app.use(route.prefix, route.router)
  })
}
