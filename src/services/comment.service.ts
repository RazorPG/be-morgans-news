import commentModel from "../models/comment.model"

export const createCommentDB = async (payload: any) => {
  return await commentModel.create(payload)
}

export const getCommentsByArticle = async (id: string) => {
  return await commentModel
    .find({ articleId: id })
    .populate("userId", "username")
    .sort({ createdAt: -1 })
}

export const getCommentsByUserId = async (userId: string) => {
  return await commentModel
    .find({ userId })
    .populate("articleId", "title")
    .sort({ createdAt: -1 })
}

export const getCommentDB = async (id: string) => {
  return await commentModel.findById({ _id: id }).populate("userId", "username")
}

export const getCommentByUser = async (id: string, userId: string) => {
  return await commentModel
    .findOne({ _id: id, userId })
    .populate("userId", "username")
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
