import Board from './board'
import Player from './player'

interface EngineConfig {
  boardSize: {
    rows: number
    columns: number
  }
  winLength: number
}

export default class Engine {
  private board: Board
  private playerA: Player
  private playerB: Player
  private turnPlayer: Player
  private config: EngineConfig

  constructor(config: EngineConfig) {
    this.board = new Board()
    this.playerA = new Player()
    this.playerB = new Player()
    this.turnPlayer = this.playerA
    this.config = config
  }

  private init() {
    const { boardSize } = this.config
    this.board.init(boardSize.rows, boardSize.columns)
    this.playerA.init()
    this.playerB.init()
  }

  public start() {
    this.init()
  }

  public getTurnPlayer() {
    return this.turnPlayer
  }

  public play(player: Player, x: number, y: number) {
    // TODO check if the player is valid
    // TODO check if the player is the turn player
    // TODO check if the location is valid to play on
    // TODO update the board
    // TODO update the turn player
    // TODO check if the player wins
  }

  public updateBoard(newBoard: Board) {
    this.board = newBoard
  }

  /**
   * @returns the player who wins the game, else null
   */
  public checkWin() {
    let winner = null
    const winLength = 5

    // group the picks by player
    const playerPicks: Record<number, number[][]> = {}
    for (let row = 0; row < this.config.boardSize.rows; row++) {
      for (let column = 0; column < this.config.boardSize.columns; column++) {
        const value = this.board.getState()[row][column]
        if (value === 0) {
          continue
        }
        if (!playerPicks[value]) {
          playerPicks[value] = []
        }
        playerPicks[value].push([row, column])
      }
    }

    for (const player in playerPicks) {
      const picks = playerPicks[player]
      if (picks.length < winLength) {
        continue
      }
      for (let i = 0; i < picks.length - 4; i++) {
        const [x, y] = picks[i]
        const restPicks = picks.slice(i + 1)
        if (this.checkLine(x, y, restPicks, 'horizontal')) {
          winner = player
        } else if (this.checkLine(x, y, restPicks, 'vertical')) {
          winner = player
        } else if (this.checkLine(x, y, restPicks, 'diagonal')) {
          winner = player
        }
      }
    }
    return { winner }
  }

  private checkLine(
    x: number,
    y: number,
    picks: number[][],
    direction: 'horizontal' | 'vertical' | 'diagonal'
  ) {
    const winningPicks = [[x, y]]
    let streakCount = 1
    const streakMap = {
      horizontal: [0, 1],
      vertical: [1, 0],
      diagonal: [1, 1],
    }
    const [dx, dy] = streakMap[direction]
    for (const pick of picks) {
      const [x1, y1] = pick
      if (x1 === x + dx * streakCount && y1 === y + dy * streakCount) {
        streakCount++
        winningPicks.push([x1, y1])
        if (streakCount === this.config.winLength) {
          return true
        }
      }
    }
    return false
  }
}
