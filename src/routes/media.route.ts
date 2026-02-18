import { Router } from 'express'
import { deleteFile, uploadFile } from '../controllers/media.controller'
import { upload } from '../utils/uploader'

const mediaRouter = Router()

mediaRouter.route('/upload-single').post(upload.single('file'), uploadFile)
mediaRouter.route('/remove').delete(deleteFile)

export default mediaRouter
