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
} from '../environments'

const transporter = nodemailer.createTransport({
  port: EMAIL_SMTP_PORT,
  host: EMAIL_SMTP_HOST,
  auth: {
    user: EMAIL_SMTP_USER,
    pass: EMAIL_SMTP_PASS,
  },
})

export function createContentHtmlSendMail(sourceContent: string, data: any) {
  console.log(path.join(__dirname, `templates/${sourceContent}`))
  let htmlContent
  ejs.renderFile(
    path.join(__dirname, `templates/${sourceContent}`),
    data,
    (err, template) => {
      if (err) {
        throw err
      } else {
        htmlContent = template
      }
    }
  )

  return htmlContent
}

export function sendMail(subject: string, html: any, data: any) {
  console.log(subject, data, html)
  transporter.sendMail(
    {
      from: EMAIL_SMTP_USER,
      to: data.email,
      subject,
      html,
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
