import ejs from 'ejs'
import nodemailer from 'nodemailer'
import path from 'path'

import {
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_PASS,
  EMAIL_SMTP_SECURE,
  EMAIL_SMTP_SERVICE_NAME,
  EMAIL_SMTP_USER,
  CLIENT_HOST,
} from '../environments'

const transporter = nodemailer.createTransport({
  port: EMAIL_SMTP_PORT,
  host: EMAIL_SMTP_HOST,
  secure: EMAIL_SMTP_SECURE,
  service: EMAIL_SMTP_SERVICE_NAME,
  auth: {
    user: EMAIL_SMTP_USER,
    pass: EMAIL_SMTP_PASS,
  },
})

export function sendMail(data: any) {
  let contentHtml
  ejs.renderFile(
    path.join(__dirname, 'messageSendMail.ejs'),
    {
      user: data.username,
      email: data.email,
      createdAt: data.createdAt,
      linkActivate: `${CLIENT_HOST}?activationCode=${data.activationCode}`,
    },
    (err, template) => {
      if (err) {
        throw err
      } else {
        contentHtml = template
      }
    }
  )

  transporter.sendMail(
    {
      from: EMAIL_SMTP_USER,
      to: data.email,
      subject: 'Aktivasi Akun Anda',
      html: contentHtml,
    },
    (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email send: ' + info.response)
      }
    }
  )
}
