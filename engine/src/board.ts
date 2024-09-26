  export default class Board {
  private board: number[][]

  constructor(rows: number, columns: number) {
    this.board = new Array(rows).fill(0).map(() => new Array(columns).fill(0))
  }

  public updateCell(row: number, column: number, value: number) {
    this.board[row][column] = value
  }

  public getCell(row: number, column: number) {
    return this.board[row][column]
  }

  public getState() {
    return this.board
  }

  public getBoardSize() {
    return {
      rows: this.board.length,
      columns: this.board[0].length,
    }
  }

  /**
   * @returns Record of <player value, array of picks>. Picks are represented as a 2 element array [row, column]
   */
  public getPicksByPlayer() {
    const { rows, columns } = this.getBoardSize()
    const playerPicks: Record<number, number[][]> = {}
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const value = this.board[row][column]
        if (value === 0) {
          continue
        }
        if (!playerPicks[value]) {
          playerPicks[value] = []
        }
        playerPicks[value].push([row, column])
      }
    }
    return playerPicks;
  }
}
