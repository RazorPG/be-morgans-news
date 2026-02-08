import { Router } from 'express'
import {
  register,
  login,
  activation,
  me,
  forgetPassword,
  verifyOtp,
  changePassword,
} from '../controllers/auth.route'
import { isSession, isUseSession } from '../middlewares/auth.middleware'
const authRouter = Router()

authRouter.route('/register').post(isSession, register)
authRouter.route('/login').post(isSession, login)
authRouter.route('/activation').post(activation)
authRouter.route('/me').get(isUseSession, me)
authRouter.route('/forget-password').post(isSession, forgetPassword)
authRouter.route('/verify-otp').post(isUseSession, verifyOtp)
authRouter.route('/change-password').post(isUseSession, changePassword)

export default authRouter
