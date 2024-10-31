import { User } from '@/db/types'
import { EVENT_USER_JOINED_ROOM, EVENT_USER_LEFT_ROOM } from '@gomoku/common'
import { Player } from '@gomoku/engine'
import { Server, Socket } from 'socket.io'

const PLAYER_1_VALUE = 1
const PLAYER_2_VALUE = 2
const PLAYER_1_NAME = 'Player 1'
const PLAYER_2_NAME = 'Player 2'

export default function roomHandler(io: Server, socket: Socket) {
  const userId = socket.id

  async function createRoom() {
    // make sure the user hasn't created a room already
    const room = await socket.db.getRoomHasUser(userId)
    if (room) {
      // TODO send error message
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

    await joinRoom(roomId)
  }

  async function joinRoom(roomId: string) {
    // validate room exists
    const room = await socket.db.getRoomById(roomId)
    if (!room) {
      // TODO send error message
      return
    }

    // validate room isn't full
    if (room.users.length >= 2) {
      // TODO send error message
      return
    }

    const user: User = {
      id: userId,
      player: new Player({
        value: PLAYER_2_VALUE,
        name: PLAYER_2_NAME,
      }),
    }

    await socket.db.addUserToRoom(roomId, user)

    socket.join(roomId)

    io.to(roomId).emit(EVENT_USER_JOINED_ROOM, { userId })
  }

  async function leaveRoom(roomId: string) {
    // validate room exists
    const room = await socket.db.getRoomById(roomId)
    if (!room) {
      // TODO send error message
      return
    }

    // validate user is in the room
    if (!room.users.find((user) => user.id === userId)) {
      // TODO send error message
      return
    }

    await socket.db.removeUserFromRoom(roomId, userId)

    socket.leave(roomId)

    io.to(roomId).emit(EVENT_USER_LEFT_ROOM, { userId })

    // TODO delete room if empty

    if (room.users.length === 1) {
      await socket.db.removeRoom(roomId)
    }
  }

  return {
    createRoom,
    joinRoom,
    leaveRoom,
  }
}
