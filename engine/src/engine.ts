import Board from './board'
import Player from './player'

interface EngineConfig {
  boardSize: {
    rows: number
    columns: number
  }
  winLength: number
  players: Player[]
  firstPlayer: Player
}

export default class Engine {
  private board: Board
  private turnPlayer: Player
  private config: EngineConfig

  constructor(config: EngineConfig) {
    if (config.players.length !== 2) {
      throw new Error('Invalid number of players')
    } else if (config.players[0].value === config.players[1].value) {
      throw new Error('Players should have different values')
    } else if (
      !config.players.find((player) => player === config.firstPlayer)
    ) {
      throw new Error('First player should be one of the players')
    }

    this.board = new Board()
    this.turnPlayer = config.firstPlayer
    this.config = config
  }

  private init() {
    const { boardSize } = this.config
    this.board.init(boardSize.rows, boardSize.columns)
  }

  public start() {
    this.init()
  }

  public getTurnPlayer() {
    return this.turnPlayer
  }

  public play(player: Player, row: number, column: number) {
    // check if the player is valid
    if (!this.config.players.find((p) => p === player)) {
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
    if (this.getBoardState()[row][column] !== 0) {
      throw new Error('Location is already taken')
    }

    this.board.update(row, column, player.value)

    // update the next turn player
    const nextPlayerIndex = (this.config.players.indexOf(player) + 1) % this.config.players.length
    this.turnPlayer = this.config.players[nextPlayerIndex]

    return this.checkWin()
  }

  public replaceBoard(newBoard: Board) {
    this.board = newBoard
  }

  /**
   * @returns the player who wins the game, else null
   */
  public checkWin() {
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

      for (let i = 0; i < picks.length - winLength - 1; i++) {
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
    const winner = this.config.players.find(
      (player) => player.value === winnerValue
    )
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
          return winningPicks
        }
      }
    }
    return []
  }

  public getBoardState() {
    return this.board.getState()
  }
}
