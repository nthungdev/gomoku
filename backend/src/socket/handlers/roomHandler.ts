import { EVENT_USER_JOINED_ROOM, EVENT_USER_LEFT_ROOM } from '@gomoku/common'
import { Server, Socket } from 'socket.io'

export default function roomHandler(io: Server, socket: Socket) {
  const userId = socket.id

  async function createRoom() {
    // TODO make sure the user hasn't created a room already

    const roomId = await socket.db.createRoom()

    io.to(roomId).emit(EVENT_USER_JOINED_ROOM, { userId: userId })
  }

  // async function joinRoom(roomId: string) {
  async function joinRoom(roomId: string) {
    // TODO validate room exists
    // TODO validate room isn't full

    await socket.db.addUserToRoom(roomId, userId)

    socket.join(roomId)

    io.to(roomId).emit(EVENT_USER_JOINED_ROOM, { userId: userId })
  }


  async function leaveRoom(roomId: string) {
    // TODO validate roomId

    socket.leave(roomId)

    io.to(roomId).emit(EVENT_USER_LEFT_ROOM, { userId })

    // TODO delete room if empty
  }

  return {
    createRoom,
    joinRoom,
    leaveRoom,
  }
}
