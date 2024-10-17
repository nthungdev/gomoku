import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'

export function startSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  })
  io.on('connection', (socket) => {
    console.log('New connection:', socket.id)

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })
  return io
}
