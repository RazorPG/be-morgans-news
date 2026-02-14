import mongoose from 'mongoose'
import * as Yup from 'yup'

export interface Icategory {
  name: string
  slug: string
  isActive: boolean
}

const Schema = mongoose.Schema

export const categoryDAO = Yup.object({
  name: Yup.string().required(),
})

const categorySchema = new Schema<Icategory>({
  name: {
    type: Schema.Types.String,
    require: true,
  },
  slug: {
    type: Schema.Types.String,
    require: true,
  },
  isActive: {
    type: Schema.Types.Boolean,
    require: true,
    default: true,
  },
})

const categoryModel = mongoose.model('category', categorySchema)

export default categoryModel
