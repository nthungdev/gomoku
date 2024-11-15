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
import { sessionMiddleware } from '@/session'
import { Request } from 'express'

export function startSocket(server: HttpServer, db: DB) {
  const io = new Server(server, {
    cors: {
      // TODO whitelist production domain
      origin: /.*/,
      // for session to work, make sure to also allow credentials on the client
      credentials: true,
    },
  })

  // Share session middleware with Socket.io
  io.engine.use(sessionMiddleware)

  // Attach DB to socket
  io.use(function (socket, next) {
    socket.db = db
    next()
  })

  io.on('connection', function (socket) {
    const request = socket.request as Request
    const userId = request.sessionID

    const { createRoom, joinRoom, leaveRoom } = roomHandler(io, socket)
    const { makeMove, surrender } = gameHandler(io, socket)

    console.log('New connection:', userId)

    socket.join(userId)

    socket.emit('id', userId)

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
