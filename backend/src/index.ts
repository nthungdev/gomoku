import express, { Express } from 'express'
import dotenv from 'dotenv'
import { Server, createServer } from 'http'
import cors from 'cors'

dotenv.config()

const app: Express = express()
app.use(cors())

const httpServer: Server = createServer(app)
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server!')
})

httpServer.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
