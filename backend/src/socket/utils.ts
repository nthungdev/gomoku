import { Room } from '@/db/types'
import { GameState } from './types'
import assert from 'assert'

export function getGameStateFromRoom(room: Room): GameState {
  const engine = room.engine

  const turnPlayer = engine.getTurnPlayer()
  const turnUser = room.users.find((user) => user.player === turnPlayer)
  assert(turnUser, 'Turn user not found')

  const { winner, winningPicks } = engine.checkWin()
  const winnerUser = room.users.find((user) => user.player === winner) || null

  return {
    boardState: engine.getBoardState(),
    turnUser: turnUser,
    winner: winnerUser,
    winningPicks,
  }
}
