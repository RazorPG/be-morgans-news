import { Request, Response } from 'express'
import { Iuser, userDAO } from '../models/user.model'
import {
  activationAccount,
  changePasswordUser,
  createAccount,
  sendOTP,
  verifyOTP,
} from '../services/auth.service'
import * as Yup from 'yup'
import { compareText } from '../utils/encription'
import { findUserByUsernameOrEmail } from '../utils/user'
import { jwtAssign } from '../utils/jwt'
import { generateOTP } from '../utils/otp'
import { response } from '../utils/response'

export interface Ilogin {
  identifier: string
  password: string
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
    await userDAO.validate(req.body)

    await createAccount({ username, email, password })

    return response.success(res, 'success register account', 200)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    } else if (error.errorResponse) {
      error.message = 'user is already register'
    }
    return response.serverError(res, error.message)
  }
}

export const activation = async (req: Request, res: Response) => {
  try {
    const activationValidate = Yup.object({
      code: Yup.string().required('Code is required'),
    })
    await activationValidate.validate(req.body)
    await activationAccount(req.body)

    return response.success(res, 'success activation account', 203)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body
    await Yup.object({
      identifier: Yup.string().required('Identifier is required'),
      password: Yup.string().required('Password is required'),
    }).validate(req.body)
    const user = (await findUserByUsernameOrEmail(identifier)) as Iuser

    if (user.isActive === false) {
      return response.error(res, 'account not yet activation!', 401)
    }

    if (!compareText(password, user?.password)) {
      return response.error(res, 'Identifier or password not match!', 401)
    }

    const token = jwtAssign(user)

    return response.success(res, 'success login account!', 203, token)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const me = (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    if (!user) {
      return response.unauthorizedError(res)
    }
    return response.success(res, 'auth me successfully', 200, user)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    await Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('invalid email format!'),
    }).validate(req.body)
    const { email } = req.body
    const codeOTP = generateOTP()
    const user = await sendOTP(email, codeOTP)

    if (!user) {
      return response.error(res, 'user is not found', 404)
    }

    if (user && !user.isActive) {
      return response.unauthorizedError(res)
    }
    const updatedUser = await findUserByUsernameOrEmail(user.email)
    const token = jwtAssign(updatedUser)

    return response.success(res, 'kode otp sending to email!', 203, token)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    await Yup.object({
      code: Yup.string().required('Code is required'),
    }).validate(req.body)
    const { code } = req.body
    console.log('otp: ' + code, 'user otp: ' + user.OTP.code)
    if (!compareText(code, user.OTP.code)) {
      return response.error(res, 'otp not valid!', 403)
    }

    if (new Date(user?.OTP?.expire).getTime() <= Date.now()) {
      return response.error(res, 'OTP is expired!', 401)
    }

    await verifyOTP(user.email)
    return response.success(res, 'success verify otp', 201)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body
    await Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .test({
          name: 'one-number',
          message: 'password must be at least one number',
          test: value => /\d/.test(value),
        })
        .test({
          name: 'one-uppercase',
          message: 'Password must be at least one uppercase',
          test: value => /[A-Z]/.test(value),
        }),
      confirmPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
    }).validate(req.body)

    const user = res.locals.user

    if (!user.OTP.isVerify) {
      return response.forbiddenError(res)
    }
    await changePasswordUser(user.email, password)

    return response.success(res, 'Success change password', 203)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}
