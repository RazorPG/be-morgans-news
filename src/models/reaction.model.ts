import mongoose from 'mongoose'
import * as Yup from 'yup'

const Schema = mongoose.Schema

export interface Ireaction {
  reactionType: string
  articleId: string | mongoose.Schema.Types.ObjectId
  userId: string | mongoose.Schema.Types.ObjectId
}

export const reactionDAO = Yup.object({
  reactionType: Yup.string().required(),
  articleId: Yup.string().required(),
})

const reactionSchema = new Schema<Ireaction>({
  reactionType: {
    require: true,
    type: Schema.Types.String,
    enum: ['like', 'dislike'],
  },
  articleId: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'article',
  },
  userId: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const reactionModel = mongoose.model('reaction', reactionSchema)

export default reactionModel
