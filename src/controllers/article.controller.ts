import articleModel, { articleDAO, Iarticle } from './../models/article.model'
import { Request, Response } from 'express'
import {
  createArticleDB,
  deleteArticleDB,
  getArticleByIdDB,
  getArticlesDB,
  updateArticleDB,
} from '../services/article.service'
import { response } from '../utils/response'
import { getCategoryBySlug } from '../services/category.service'
import * as Yup from 'yup'

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
    return response.success(res, 'success create article', 201)
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

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await getArticleByIdDB(String(id))

    return response.success(res, 'success get article by id', 200, result)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Yup.object({
      title: Yup.string().min(5, 'Title must be at least 5 characters').max(30),
      description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .max(50),
      body: Yup.string()
        .min(100, 'body must be at least 20 characters')
        .max(10000),
      isHeadline: Yup.boolean(),
      categoryId: Yup.string(),
    }).validate(req.body)

    const article = res.locals.article
    const payload = {
      title: req.body?.title || article.title,
      description: req.body?.description || article.description,
      body: req.body?.body || article.body,
      isHeadline: req.body?.isHeadline || article.isHeadline,
      categoryId: req.body?.categoryId || article.categoryId,
    } as Iarticle

    await updateArticleDB(String(id), payload)

    return response.success(res, 'success updated article', 200)
  } catch (error: any) {
    if (error.errors) {
      return response.requestError(res, error.errors[0])
    }
    return response.serverError(res, error.message)
  }
}

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteArticleDB(String(id))

    return response.success(res, 'success delete article', 200)
  } catch (error: any) {
    return response.serverError(res, error.message)
  }
}
