import { Response } from 'express'

interface Pagination {
  total: number
  totalPages: number
  current: number
}

export const response = {
  success: (res: Response, message: string, status: number, data?: any) => {
    return res.status(status).json({
      meta: {
        status,
        message,
      },
      data,
    })
  },
  pagination: (
    res: Response,
    message: string,
    data: [],
    pagination: Pagination
  ) => {
    return res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    })
  },
  unauthorizedError: (res: Response) => {
    return res.status(401).json({
      meta: {
        status: 401,
        message: 'Unauthorized: Invalid or missing authentication credentials',
      },
    })
  },
  forbiddenError: (res: Response) => {
    return res.status(403).json({
      meta: {
        status: 403,
        messsage:
          'Forbidden: You do not have permission to access this resource',
      },
    })
  },
  requestError: (res: Response, message?: string) => {
    return res.status(400).json({
      meta: {
        status: 400,
        message: message ? `Bad request: ${message}` : 'Bad request',
      },
    })
  },
  serverError: (res: Response, message: string) => {
    return res.status(500).json({
      meta: {
        status: 500,
        message: 'server is crashed: ' + message,
      },
    })
  },
  error: (res: Response, message: string, status: number) => {
    return res.status(status).json({
      meta: {
        status,
        message,
      },
    })
  },
}
