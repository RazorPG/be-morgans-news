import express from 'express'
import routes from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'
import connection from './utils/database'
import { PORT } from './utils/environments'
import { decentralizedToken } from './middlewares/decentralizedToken'

connection()

const app = express()

app.use(decentralizedToken)
app.use(cors())
app.use(bodyParser.json())

routes(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:3000`)
})
