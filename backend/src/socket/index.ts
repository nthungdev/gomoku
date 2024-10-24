import { Server } from 'socket.io'
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

export function startSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
    },
  })

  const db = new MemoryDB()

  io.on('connection', function (socket) {
    const userId = socket.id

    console.log('New connection:', userId)

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on(ACTION_CREATE_ROOM, async function () {
      // TODO make sure the user hasn't created a room already

      const roomId = await db.createRoom()

      io.to(roomId).emit(EVENT_USER_JOINED_ROOM, { userId: userId })
    })

    socket.on(ACTION_JOIN_ROOM, async function (roomId) {
      // TODO validate room exists
      // TODO validate room isn't full

      await db.addUserToRoom(roomId, userId)

      socket.join(roomId)

      io.to(roomId).emit(EVENT_USER_JOINED_ROOM, { userId: userId })
    })

    socket.on(ACTION_LEAVE_ROOM, function (roomId) {
      // TODO validate roomId

      socket.leave(roomId)

      io.to(roomId).emit(EVENT_USER_LEFT_ROOM, { userId: userId })

      // TODO delete room if empty
    })

    socket.on(ACTION_MAKE_MOVE, function ({ roomId }) {
      // TODO validate move

      // TODO handle move

      // TODO get new game state
      const gameState = {}

      io.to(roomId).emit(ACTION_MAKE_MOVE, gameState)
    })

    socket.on(ACTION_SURRENDER, function ({ roomId }) {
      // TODO validate this user is in the room

      // TODO handle surrender

      // TODO get new game state
      const gameState = {}

      io.to(roomId).emit(EVENT_USER_SURRENDERED, gameState)
      io.to(roomId).emit(EVENT_GAME_OVER, gameState)
    })
  })

  return io
}
