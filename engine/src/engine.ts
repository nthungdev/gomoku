import Board from './board'
import Player from './player'

interface EngineConfig {
  boardSize: {
    width: number;
    height: number
  }
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

  public init() {
    const { boardSize } = this.config
    this.board.init(boardSize.width, boardSize.height)
    this.playerA.init()
    this.playerB.init()
  }

  public start() {
    this.init()
  }

  public restart() {
    this.init()
  }

  public getTurnPlayer() {
    return this.turnPlayer
  }

  /**
   * @returns the player who wins the game, else null
   */
  public checkWin() {

  }

  public play(player: Player, x: number, y: number) {
    // TODO check if the player is valid
    // TODO check if the player is the turn player
    // TODO check if the location is valid to play on
    // TODO update the board
    // TODO update the turn player
    // TODO check if the player wins
  }
}
