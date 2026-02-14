import reactionModel from '../models/reaction.model'

export const createReactionDB = async (payload: any) => {
  return await reactionModel.create(payload)
}

export const getReactionByUserAndArticle = async (
  userId: string,
  articleId: string
) => {
  return await reactionModel.findOne({ userId, articleId })
}

export const getReactionByUser = async (id: string, userId: string) => {
  return await reactionModel.findOne({ _id: id, userId })
}

export const getReactionDB = async (id: string) => {
  return await reactionModel.findOne({ _id: id })
}

export const getReactionsByArticle = async (id: string) => {
  return await reactionModel.find({ articleId: id })
}

export const updateReactionDB = async (id: string, reaction: string) => {
  return await reactionModel.findByIdAndUpdate(
    { _id: id },
    { $set: { reactionType: reaction } },
    { new: true }
  )
}

export const deleteReactionDB = async (id: string) => {
  return await reactionModel.findByIdAndDelete({ _id: id })
}
