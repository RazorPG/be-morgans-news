import mongoose from 'mongoose'
import * as Yup from 'yup'

const Schema = mongoose.Schema

export interface Icomment {
  content: string
  articleId: string | mongoose.Schema.Types.ObjectId
  userId: string | mongoose.Schema.Types.ObjectId
}

export const commentDAO = Yup.object({
  content: Yup.string().required(),
  articleId: Yup.string().required(),
})

const commentSchema = new Schema<Icomment>(
  {
    content: {
      type: Schema.Types.String,
      require: true,
    },
    articleId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'article',
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'user',
    },
  },
  { timestamps: true }
)

const commentModel = mongoose.model('comment', commentSchema)

export default commentModel
