import mongoose from 'mongoose'
import * as Yup from 'yup'

const Schema = mongoose.Schema

export interface Iarticle {
  title: string
  description: string
  body: string
  image: string
  isHeadline: boolean
  categoryId: string
  authorId: string
}

export const articleDAO = Yup.object({
  title: Yup.string()
    .required()
    .min(5, 'Title must be at least 5 characters')
    .max(30),
  description: Yup.string()
    .required()
    .min(10, 'Description must be at least 10 characters')
    .max(30),
  body: Yup.string()
    .required()
    .min(100, 'body must be at least 20 characters')
    .max(10000),
  image: Yup.string().required(),
  category: Yup.string().required(),
  isHeadline: Yup.boolean(),
})

const articleSchema = new Schema(
  {
    title: {
      require: true,
      type: Schema.Types.String,
    },
    description: {
      require: true,
      type: Schema.Types.String,
    },
    body: {
      require: true,
      type: Schema.Types.String,
    },
    image: {
      require: true,
      type: Schema.Types.String,
    },
    isHeadline: {
      require: true,
      type: Schema.Types.Boolean,
      default: false,
    },
    categoryId: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    authorId: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
)

const articleModel = mongoose.model('article', articleSchema)

export default articleModel
