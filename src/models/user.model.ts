import mongoose from 'mongoose'
import * as Yup from 'yup'
import { hashText } from '../utils/encription'
import { createContentHtmlSendMail, sendMail } from '../utils/mail/mail'
import { hashSync } from 'bcrypt'
import { IuserToken } from '../types/auth.type'
import { CLIENT_HOST } from '../utils/environments'

const Schema = mongoose.Schema

export interface OTP {
  code: string
  isVerify: boolean
  expire: Date
}

export interface Iuser {
  username: string
  email: string
  password: string
  isActive: boolean
  role: string
  profilePicture: string
  activationCode?: string
  OTP?: OTP
}

export const userDAO = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test({
      name: 'one-number',
      message: 'password must be at least one number',
      test: value => /\d/.test(value),
    })
    .test({
      name: 'one-uppercase',
      message: 'Password must be at least one uppercase',
      test: value => /[A-Z]/.test(value),
    }),
  confirmPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
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
    profilePicture: {
      type: Schema.Types.String,
      default: 'user.png',
    },
    OTP: {
      code: Schema.Types.String,
      isVerify: Schema.Types.Boolean,
      expire: Schema.Types.Date,
    },
    activationCode: Schema.Types.String,
  },
  { timestamps: true }
)

userSchema.pre('save', function () {
  const user = this
  user.password = hashText(user.password)
  user.activationCode = hashSync(`${user.username}-${user._id}`, 10)
})

userSchema.post('save', (doc: IuserToken) => {
  const template = createContentHtmlSendMail('activationCode.ejs', {
    user: doc.username,
    email: doc.email,
    createdAt: doc.createdAt,
    linkActivate: `${CLIENT_HOST}?activationCode=${doc.activationCode}`,
  })
  sendMail('Aktivasi Akun Anda', template, doc)
})

userSchema.post('findOneAndUpdate', async function (doc) {
  const opts = (this as any).getOptions ? (this as any).getOptions() : {}
  const hook = opts.hookType as string | undefined
  if (!hook) return
  const handlers: Record<string, (doc: any) => Promise<void>> = {
    resetPassword: async doc => {
      const template = createContentHtmlSendMail('otp.ejs', {
        user: doc.username,
        OTP: doc.OTP.code,
      })
      sendMail('Reset Password', template, doc)

      await userModel
        .findOneAndUpdate(
          { _id: doc._id },
          {
            $set: {
              'OTP.code': hashText(doc.OTP.code),
            },
          },
          { new: true }
        )
        .exec()
    },
    changePassword: async doc => {
      await userModel.collection.updateOne(
        { _id: doc._id },
        {
          $set: {
            'OTP.isVerify': false,
          },
        }
      )
    },
  }

  const fn = handlers[hook]
  if (fn) {
    try {
      await fn(doc)
    } catch (e: any) {
      console.log(e.message)
    }
  }
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.activationCode
  delete user.OTP
  return user
}

const userModel = mongoose.model('user', userSchema)

export default userModel
