import { Iarticle } from './../models/article.model'
import articleModel from '../models/article.model'

export const createArticleDB = async (
  payload: Omit<Iarticle, 'isHeadline'>
) => {
  await articleModel.create(payload)
}

export const getArticlesDB = async (
  limit: number,
  page: number,
  query: object
) => {
  return await articleModel
    .find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .exec()
}

export const getArticleByIdDB = async (id: string) => {
  return await articleModel.findById({ _id: id })
}

export const updateArticleDB = async (id: string, payload: Iarticle) => {
  return await articleModel.findByIdAndUpdate(
    { _id: id },
    { $set: { ...payload } },
    { new: true }
  )
}

export const deleteArticleDB = async (id: string) => {
  return await articleModel.findByIdAndDelete({ _id: id })
}
