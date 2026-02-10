import { Application } from 'express'
import authRouter from './auth.route'
import categoryRouter from './category.route'
import articleRouter from './article.route'

const _routes = [
  { prefix: '/api/auth', router: authRouter },
  { prefix: '/api/categories', router: categoryRouter },
  { prefix: '/api/articles', router: articleRouter },
]

export default function (app: Application) {
  _routes.forEach(route => {
    app.use(route.prefix, route.router)
  })
}
