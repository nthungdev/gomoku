const EMPTY_CELL_VALUE = 0

export default class Board {
  private board: number[][]

  constructor(rows: number, columns: number) {
    console.assert(rows > 0, 'Rows should be greater than 0')
    console.assert(columns > 0, 'Columns should be greater than 0')

    this.board = new Array(rows)
      .fill(EMPTY_CELL_VALUE)
      .map(() => new Array(columns).fill(EMPTY_CELL_VALUE))
  }

  public updateCell(row: number, column: number, value: number) {
    this.board[row][column] = value
  }

  public getCell(row: number, column: number) {
    return this.board[row][column]
  }

  public getState() {
    return this.board.map((row) => row.slice())
  }

  public getSize() {
    return {
      rows: this.board.length,
      columns: this.board[0].length,
    }
  }

  /**
   * @returns Record of <player value, array of picks>. Picks are represented as a 2 element array [row, column]
   */
  public getPicksByPlayer() {
    const { rows, columns } = this.getSize()
    const playerPicks: Record<number, number[][]> = {}
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const value = this.getCell(row, column)
        if (value === 0) {
          continue
        }
        if (!playerPicks[value]) {
          playerPicks[value] = []
        }
        playerPicks[value].push([row, column])
      }
    }
    return playerPicks
  }
}
