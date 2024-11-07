import {
  EVENT_GAME_OVER,
  EVENT_GAME_STARTED,
  EVENT_USER_MADE_MOVE,
  EVENT_USER_SURRENDERED,
} from '@gomoku/common'
import { Engine, GameMove } from '@gomoku/engine'
import { Server, Socket } from 'socket.io'
import { getGameStateFromRoom } from '../utils'
import { SocketCallback } from '../types'
import { SocketErrorMessage } from '../error'

export default function gameHandler(io: Server, socket: Socket) {
  const userId = socket.id

  async function makeMove(
    roomId: string,
    move: GameMove,
    callback?: SocketCallback
  ) {
    if (move.type === 'move') {
      const room = await socket.db.getRoomById(roomId)
      if (!room) {
        callback?.({ error: SocketErrorMessage.RoomNotFound })
        return
      }

      const player = room.users.find((user) => user.id === userId)?.player
      if (!player) {
        callback?.({ error: SocketErrorMessage.PlayerNotFound })
        return
      }
      // TODO handle invalid move error thrown by engine
      const { winner } = room.engine.play(player, move)
      const gameState = getGameStateFromRoom(room)
      if (winner) {
        io.to(roomId).emit(EVENT_GAME_OVER, gameState)
      } else {
        io.to(roomId).emit(EVENT_USER_MADE_MOVE, gameState)
      }
      callback?.({ ok: true })
    } else if (move.type === 'surrender') {
      surrender(roomId)
      return
    } else {
      callback?.({ error: SocketErrorMessage.InvalidMove })
      return
    }
  }

  async function surrender(roomId: string, callback?: SocketCallback) {
    // validate the user is in the room
    const room = await socket.db.getRoomById(roomId)
    if (!room) {
      callback?.({ error: SocketErrorMessage.RoomNotFound })
      return
    }

    const player = room.users.find((user) => user.id === userId)?.player
    if (!player) {
      callback?.({ error: SocketErrorMessage.PlayerNotFound })
      return
    }

    const move: GameMove = { type: 'surrender' }
    room.engine.play(player, move)

    const gameState = getGameStateFromRoom(room)

    io.to(roomId).emit(EVENT_USER_SURRENDERED, gameState)
    io.to(roomId).emit(EVENT_GAME_OVER, gameState)
    callback?.({ ok: true })
  }

  async function startGame(roomId: string, callback?: SocketCallback) {
    // validate this user is the room owner
    const room = await socket.db.getRoomById(roomId)
    if (room?.owner.id !== userId) {
      callback?.({ error: SocketErrorMessage.PlayerNotRoomOwner })
      return
    }

    const engine = new Engine(
      // TODO make these configurable
      {
        player1: room.users[0].player,
        player2: room.users[1].player,
        boardSize: {
          rows: 15,
          columns: 15,
        },
        winLength: 5,
      }
    )
    await socket.db.setEngine(roomId, engine)

    const gameState = getGameStateFromRoom(room)

    io.to(roomId).emit(EVENT_GAME_STARTED, gameState)
    callback?.({ ok: true })
  }

  return {
    startGame,
    makeMove,
    surrender,
  }
}
