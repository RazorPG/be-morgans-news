import mongoose from 'mongoose'
import * as Yup from 'yup'
import { hashPassword } from '../utils/encription'
import { sendMail } from '../utils/mail/mail'
import { hashSync } from 'bcrypt'

const Schema = mongoose.Schema

export interface Iuser {
  username: string
  email: string
  password: string
  isActive: boolean
  role: string
  profilePicture: string
  activationCode?: string
}

export const userDAO = Yup.object({
  username: Yup.string().required().min(6),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string()
    .min(8)
    .required()
    .oneOf([Yup.ref('password'), '']),
})

const userSchema = new Schema<Iuser>(
  {
    username: {
      type: Schema.Types.String,
      require: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      require: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      require: true,
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    role: {
      type: Schema.Types.String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profilePicture: Schema.Types.String,
    activationCode: Schema.Types.String,
  },
  { timestamps: true }
)

userSchema.pre('save', function () {
  const user = this
  user.password = hashPassword(user.password)
  user.activationCode = hashSync(`${user.username}-${user._id}`, 10)
})

userSchema.post('save', doc => {
  sendMail(doc)
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.activationCode
  return user
}

const userModel = mongoose.model('user', userSchema)

export default userModel
