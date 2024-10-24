import {
  ACTION_MAKE_MOVE,
  EVENT_GAME_OVER,
  EVENT_USER_SURRENDERED,
} from '@gomoku/common'
import { Server, Socket } from 'socket.io'

export default function gameHandler(io: Server, socket: Socket) {
  const userId = socket.id

  function makeMove(roomId: string) {
    // TODO validate move

    // TODO handle move

    // TODO get new game state
    const gameState = {}

    io.to(roomId).emit(ACTION_MAKE_MOVE, gameState)
  }

  function surrender(roomId: string) {
    // TODO validate this user is in the room

    // TODO handle surrender

    // TODO get new game state
    const gameState = {}

    io.to(roomId).emit(EVENT_USER_SURRENDERED, gameState)
    io.to(roomId).emit(EVENT_GAME_OVER, gameState)
  }

  return {
    makeMove,
    surrender,
  }
}
