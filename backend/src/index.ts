import dotenv from 'dotenv'
import { Server, createServer } from 'http'
import app from './app'

dotenv.config()

const port = process.env.PORT || 8000
const server: Server = createServer(app)

app.get('/', (req, res) => {
  res.send('Gomoku Server!')
})

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
