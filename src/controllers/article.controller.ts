import articleModel, { articleDAO } from './../models/article.model'
import { Request, Response } from 'express'
import { createArticleDB, getArticlesDB } from '../services/article.service'
import { response } from '../utils/response'
import { getCategoryBySlug } from '../services/category.service'

export const createArticle = async (req: Request, res: Response) => {
  try {
    await articleDAO.validate(req.body)
    const { category } = req.body as unknown as { category: string }

    const categoryDB = await getCategoryBySlug(category)

    if (!categoryDB?.slug) {
      return response.error(res, 'categories is not available', 403)
    }
    const user = res.locals.user
    await createArticleDB({
      ...req.body,
      authorId: user._id,
      categoryId: categoryDB._id,
    })
    return response.success(res, 'success create article', 200)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 2, search } = req.query

    const query = {}
    if (search) {
      Object.assign(query, {
        $or: [
          {
            title: { $regex: search, $options: 'i' },
          },
          {
            description: { $regex: search, $options: 'i' },
          },
          {
            body: { $regex: search, $options: 'i' },
          },
        ],
      })
    }
    const articles = (await getArticlesDB(
      Number(limit),
      Number(page),
      query
    )) as any
    console.log(articles)
    const countData = await articleModel.countDocuments()
    return response.pagination(res, 'success get articles', articles, {
      current: Number(page),
      totalPages: Math.ceil(countData / Number(limit)),
      total: countData,
    })
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}
