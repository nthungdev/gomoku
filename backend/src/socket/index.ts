import { Server, Socket } from 'socket.io'
import { Server as HttpServer } from 'http'
import {
  ACTION_CREATE_ROOM,
  ACTION_JOIN_ROOM,
  ACTION_LEAVE_ROOM,
  ACTION_MAKE_MOVE,
  ACTION_SURRENDER,
  EVENT_GAME_OVER,
  EVENT_USER_JOINED_ROOM,
  EVENT_USER_LEFT_ROOM,
  EVENT_USER_SURRENDERED,
} from '@gomoku/common'
import MemoryDB from '@/db/MemoryDB'
import { DB } from '@/db/types'
import roomHandler from './handlers/roomHandler'
import gameHandler from './handlers/gameHandler'

interface SocketWithDB extends Socket {
  db: DB
}

export function startSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
    },
  })

  // Attach DB to socket
  io.use(function (socket, next) {
    socket.db = new MemoryDB()
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
