import { Router } from 'express'
import { register, login, activation, me } from '../controllers/auth.route'
const authRouter = Router()

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/activation').post(activation)
authRouter.route('/me').get(me)

export default authRouter
