import { Request, Response } from 'express'
import { Iuser, userDAO } from '../models/user.model'
import {
  activationAccount,
  createAccount,
  createSession,
} from '../services/auth.service'
import * as Yup from 'yup'
import { comparePassword } from '../utils/encription'
import { findUserByUsernameOrEmail } from '../utils/user'
import { jwtAssign } from '../utils/jwt'

export interface Ilogin {
  identifier: string
  password: string
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
    await userDAO.validate(req.body)

    const result = await createAccount({ username, email, password })

    return res.status(200).json({
      meta: {
        status: 200,
        message: 'success register account',
      },
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      meta: {
        status: 500,
        message: 'failed register account: ' + error.message,
      },
      data: null,
    })
  }
}

export const activation = async (req: Request, res: Response) => {
  try {
    const activationValidate = Yup.object({
      code: Yup.string().required(),
    })

    await activationValidate.validate(req.body)
    const result = await activationAccount(req.body)

    return res.status(203).json({
      meta: {
        status: 203,
        message: 'success activation account!',
      },
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      meta: {
        status: 500,
        message: 'failed activation account: ' + error.message,
      },
      data: null,
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body
    const loginValidate = Yup.object({
      identifier: Yup.string().required(),
      password: Yup.string().required(),
    })

    await loginValidate.validate(req.body)
    const user = (await findUserByUsernameOrEmail(identifier)) as Iuser

    if (user.isActive === false) {
      return res.status(401).json({
        meta: {
          status: 401,
          message: 'account not yet activation!',
        },
        data: null,
      })
    }

    if (!comparePassword(password, user?.password)) {
      return res.status(401).json({
        meta: {
          status: 401,
          message: 'Identifier or password not match!',
        },
      })
    }

    const token = jwtAssign(user)

    return res.status(203).json({
      meta: {
        status: 203,
        message: 'success login account!',
      },
      data: token,
    })
  } catch (error: any) {
    return res.status(500).json({
      meta: {
        status: 500,
        message: 'failed login account: ' + error.message,
      },
      data: null,
    })
  }
}

export const me = (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    if (!user) {
      return res.status(404).json({
        meta: {
          status: 404,
          message: 'failed auth me token not valid',
        },
        data: null,
      })
    }
    return res.status(200).json({
      meta: {
        status: 200,
        message: 'auth me successfully',
      },
      data: user,
    })
  } catch (error: any) {
    return res.status(500).json({
      meta: {
        status: 500,
        message: 'failed auth me: ' + error.message,
      },
      data: null,
    })
  }
}
