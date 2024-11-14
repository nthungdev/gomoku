import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import {
  ACTION_CREATE_ROOM,
  ACTION_JOIN_ROOM,
  ACTION_LEAVE_ROOM,
  ACTION_MAKE_MOVE,
  ACTION_SURRENDER,
} from '@gomoku/common'
import roomHandler from './handlers/roomHandler'
import gameHandler from './handlers/gameHandler'
import { DB } from '@/db/types'

export function startSocket(server: HttpServer, db: DB) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
    },
  })

  // Attach DB to socket
  io.use(function (socket, next) {
    socket.db = db
    next()
  })

  io.on('connection', function (socket) {
    const userId = socket.id

    const { createRoom, joinRoom, leaveRoom } = roomHandler(io, socket)
    const { makeMove, surrender } = gameHandler(io, socket)

    console.log('New connection:', userId)

    socket.on('disconnect', () => {
      console.log('User disconnected', userId)
    })

    socket.on(ACTION_CREATE_ROOM, createRoom)
    socket.on(ACTION_JOIN_ROOM, joinRoom)
    socket.on(ACTION_LEAVE_ROOM, leaveRoom)

    socket.on(ACTION_MAKE_MOVE, makeMove)
    socket.on(ACTION_SURRENDER, surrender)
  })

  return io
}
