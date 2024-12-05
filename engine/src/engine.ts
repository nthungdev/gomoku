import Board from './board'
import Player from './player'
import assert from 'assert'

export type GameMove =
  | { type: 'surrender' }
  | { type: 'move'; row: number; column: number }

export interface EngineConfig {
  boardSize: {
    rows: number
    columns: number
  }
  winLength: number
  /** player1 is the first turn player */
  player1: Player
  player2: Player
}

export default class Engine {
  private board: Board
  private players: Player[]
  private turnPlayer: Player
  private config: EngineConfig
  private winner: Player | null = null
  private winningPicks: number[][] = []

  constructor(config: EngineConfig) {
    assert(
      config.player1.value !== config.player2.value,
      'Players should have different values'
    )

    this.board = new Board(config.boardSize.rows, config.boardSize.columns)
    this.players = [config.player1, config.player2]
    this.turnPlayer = config.player1
    this.config = config
  }

  public getTurnPlayer() {
    return this.turnPlayer
  }

  public play(player: Player, move: GameMove) {
    if (this.winner) {
      throw new Error('Game is over')
    }

    if (move.type === 'surrender') {
      this.winner = this.players.find((p) => p !== player)!
      return { winner: this.winner, winningPicks: [] }
    }

    const { row, column } = move

    // check if the player is valid
    if (!this.players.find((p) => p === player)) {
      throw new Error('Invalid player')
    }

    // check if it's the player's turn
    if (player !== this.turnPlayer) {
      throw new Error('Not the turn player')
    }

    // check if the location is valid
    if (row < 0 || row >= this.config.boardSize.rows) {
      throw new Error('Invalid row')
    }
    if (column < 0 || column >= this.config.boardSize.columns) {
      throw new Error('Invalid column')
    }
    if (this.board.getCell(row, column) !== 0) {
      throw new Error('Location is already taken')
    }

    this.board.updateCell(row, column, player.value)

    // update the next turn player
    const nextPlayerIndex =
      (this.players.indexOf(player) + 1) % this.players.length
    this.turnPlayer = this.players[nextPlayerIndex]

    return this.checkWin()
  }

  public replaceBoard(newBoard: Board) {
    this.board = newBoard
  }

  /**
   * @returns the player who wins the game, else null
   */
  public checkWin() {
    if (this.winner) {
      return {
        winner: this.winner,
        winningPicks: this.winningPicks,
      }
    }

    let winnerValue: number | null = null
    const { winLength } = this.config
    let winningPicks: number[][] = []

    const playerPicks = this.board.getPicksByPlayer()

    for (const p in playerPicks) {
      const playerValue = Number(p)
      const picks = playerPicks[playerValue]

      if (picks.length < winLength) {
        continue
      }

      for (let i = 0; i < picks.length - (winLength - 1); i++) {
        const [x, y] = picks[i]
        const restPicks = picks.slice(i + 1)

        winningPicks = this.checkLine(x, y, restPicks, 'horizontal')
        if (winningPicks.length) {
          winnerValue = playerValue
          break
        }

        winningPicks = this.checkLine(x, y, restPicks, 'vertical')
        if (winningPicks.length) {
          winnerValue = playerValue
          break
        }

        winningPicks = this.checkLine(x, y, restPicks, 'diagonal')
        if (winningPicks.length) {
          winnerValue = playerValue
          break
        }
      }

      if (winnerValue) {
        break
      }
    }
    const winner = this.players.find((player) => player.value === winnerValue)

    if (winner) {
      this.winner = winner
      this.winningPicks = winningPicks
    }

    return { winner, winningPicks }
  }

  private checkLine(
    x: number,
    y: number,
    picks: number[][],
    direction: 'horizontal' | 'vertical' | 'diagonal'
  ) {
    const winningPicks = [[x, y]]
    let streakCount = 1
    const streakMap: Record<string, number[]> = {
      horizontal: [0, 1],
      vertical: [1, 0],
      diagonal1: [1, 1],
      diagonal2: [1, -1],
    }
    const directions = direction === 'diagonal' ? ['diagonal1', 'diagonal2'] : [direction]

    for (const direction of directions) {
      const [dx, dy] = streakMap[direction]
      for (const pick of picks) {
        const [x1, y1] = pick
        if (x1 === x + dx * streakCount && y1 === y + dy * streakCount) {
          streakCount++
          winningPicks.push([x1, y1])
          if (streakCount === this.config.winLength) {
            return winningPicks
          }
        }
      }
    }

    return []
  }

  public getBoardState() {
    return this.board.getState()
  }
}
