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
