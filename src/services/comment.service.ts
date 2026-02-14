import commentModel from '../models/comment.model'

export const createCommentDB = async (payload: any) => {
  return await commentModel.create(payload)
}

export const getCommentsByArticle = async (id: string) => {
  return await commentModel.find({ articleId: id })
}

export const getCommentDB = async (id: string) => {
  return await commentModel.findById({ _id: id })
}

export const getCommentByUser = async (id: string, userId: string) => {
  return await commentModel.findOne({ _id: id, userId })
}

export const updateCommentDB = async (id: string, content: string) => {
  return await commentModel.findByIdAndUpdate(
    { _id: id },
    { $set: { content } },
    { new: true }
  )
}

export const deleteCommentDB = async (id: string) => {
  return await commentModel.findByIdAndDelete({ _id: id })
}
