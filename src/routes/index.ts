import { Application } from 'express'
import authRouter from './auth.route'

const _routes = [{ prefix: '/api/auth', router: authRouter }]

export default function (app: Application) {
  _routes.forEach(route => {
    app.use(route.prefix, route.router)
  })
}
