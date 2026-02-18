import { Request, Response } from 'express'
import { response } from '../utils/response'
import upload from '../utils/uploader'

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return response.requestError(res, 'file not found')
    }
    await upload.uploadSingle(req.file)
    return response.success(res, 'success upload file', 201)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const deleteFile = async (req: Request, res: Response) => {
  const { fileUrl } = req.body

  if (!fileUrl) {
    return response.requestError(res, 'url file not found')
  }
  try {
    await upload.remove(fileUrl)

    return response.success(res, 'success delete file', 201)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}
