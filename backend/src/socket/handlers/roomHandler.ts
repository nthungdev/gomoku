import DbError, { DbErrorType } from '@/db/DbError'
import { User } from '@/db/types'
import { EVENT_USER_JOINED_ROOM, EVENT_USER_LEFT_ROOM } from '@gomoku/common'
import { Player } from '@gomoku/engine'
import { Server, Socket } from 'socket.io'
import { SocketErrorMessage } from '../error'
import { SocketCallback } from '../types'
import { Request } from 'express'

const PLAYER_1_VALUE = 1
const PLAYER_2_VALUE = 2
const PLAYER_1_NAME = 'Player 1'
const PLAYER_2_NAME = 'Player 2'

export default function roomHandler(io: Server, socket: Socket) {
  const request = socket.request as Request
  const userId = request.sessionID

  async function createRoom(callback?: SocketCallback) {
    // make sure the user hasn't created a room already
    const room = await socket.db.getRoomHasUser(userId)
    if (room) {
      callback?.({ error: SocketErrorMessage.RoomNotFound })
      return
    }

    const user = {
      id: userId,
      player: new Player({
        value: PLAYER_1_VALUE,
        name: PLAYER_1_NAME,
      }),
    }
    const roomId = await socket.db.createRoom(user)

    console.info(`User ${userId} created room ${roomId}`)

    socket.join(roomId)
    io.to(roomId).emit(EVENT_USER_JOINED_ROOM, { userId })

    callback?.({ ok: true, data: { roomId } })
  }

  async function joinRoom(roomId: string, callback?: SocketCallback) {
    // validate room exists
    const room = await socket.db.getRoomById(roomId)
    if (!room) {
      callback?.({ error: SocketErrorMessage.RoomNotFound })
      return
    }

    // validate room has slot
    if (room.users.length >= 2) {
      callback?.({ error: SocketErrorMessage.RoomNotFound })
      return
    }

    const user: User = {
      id: userId,
      player: new Player({
        value: PLAYER_2_VALUE,
        name: PLAYER_2_NAME,
      }),
    }

    try {
      await socket.db.addUserToRoom(roomId, user)
      socket.join(roomId)
      io.to(roomId).emit(EVENT_USER_JOINED_ROOM, { userId })
      callback?.({ ok: true })
    } catch (error) {
      let errorMessage = ''
      if (error instanceof DbError) {
        if (error.name === DbErrorType.RoomNotFoundError) {
          errorMessage = SocketErrorMessage.RoomNotFound
        } else {
          errorMessage = SocketErrorMessage.Unknown
        }
      } else {
        errorMessage = SocketErrorMessage.Unknown
      }
      callback?.({ error: SocketErrorMessage.RoomNotFound })
    }
  }

  async function leaveRoom(roomId: string, callback?: SocketCallback) {
    // validate room exists
    const room = await socket.db.getRoomById(roomId)
    if (!room) {
      callback?.({ error: SocketErrorMessage.RoomNotFound })
      return
    }

    // validate user is in the room
    if (!room.users.find((user) => user.id === userId)) {
      callback?.({ error: SocketErrorMessage.UserNotInRoom })
      return
    }

    await socket.db.removeUserFromRoom(roomId, userId)

    socket.leave(roomId)

    io.to(roomId).emit(EVENT_USER_LEFT_ROOM, { userId })

    if (room.users.length === 1) {
      await socket.db.removeRoom(roomId)
    }
    callback?.({ ok: true })
  }

  return {
    createRoom,
    joinRoom,
    leaveRoom,
  }
}
