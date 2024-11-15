import dotenv from 'dotenv'
import { Server, createServer } from 'http'
import app from './app'
import { startSocket } from './socket'

dotenv.config()

const port = process.env.PORT || 8000
const server: Server = createServer(app)

startSocket(server, app.locals.db)

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
