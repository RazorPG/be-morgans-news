import mongoose from 'mongoose'
import { MONGO_URL } from './environments'

let connected = false
export default async function connection() {
  if (connected) return
  try {
    await mongoose.connect(MONGO_URL, {
      dbName: 'news_db',
    })
    console.log('success connected db')
    connected = true
  } catch (error) {
    console.log('error: ' + error)
  }
}
