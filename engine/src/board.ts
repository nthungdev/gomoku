export default class Board {
  private board: number[][]

  constructor() {
    this.board = []
  }

  public init(rows: number, columns: number) {
    this.board = new Array(rows).fill(0).map(() => new Array(columns).fill(0))
  }

  public update(row: number, column: number, value: number) {
    this.board[row][column] = value
  }

  public getState() {
    return this.board
  }
}
