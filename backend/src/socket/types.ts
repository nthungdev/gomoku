import { User } from '@/db/types'
import { BoardData } from '@gomoku/engine/dist/board'

export interface GameState {
  boardState: BoardData
  turnUser: User
  winner: User | null
  winningPicks: number[][] | null
}
