import { Engine, Board, Player } from './index'
import assert from 'assert'

function updateBoardWith(board: Board, sampleBoard: number[][]) {
  for (let i = 0; i < sampleBoard.length; i++) {
    for (let j = 0; j < sampleBoard[i].length; j++) {
      board.updateCell(i, j, sampleBoard[i][j])
    }
  }
}

describe('Check winners', function () {
  const tests = [
    // horizontal win
    {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      winningValue: 1,
      winningPicks: [
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
      ],
    },
    // vertical win
    {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 1, 1, 1, 1, 2, 0, 0, 0],
        [0, 2, 2, 0, 2, 2, 0, 2, 0, 0],
        [0, 2, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      winningValue: 2,
      winningPicks: [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
      ],
    },
    // diagonal win
    {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
        [0, 2, 2, 1, 2, 2, 0, 2, 0, 0],
        [0, 2, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      winningValue: 1,
      winningPicks: [
        [3, 2],
        [4, 3],
        [5, 4],
        [6, 5],
        [7, 6],
      ],
    },
    // diagonal win
    {
      board: [
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
        [2, 0, 2, 1, 2, 2, 0, 2, 0, 0],
        [0, 2, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      winningValue: 2,
      winningPicks: [
        [0, 4],
        [1, 3],
        [2, 2],
        [3, 1],
        [4, 0],
      ],
    },
  ]

  tests.forEach((test, index) => {
    it(`should return the correct winner for test ${index + 1}`, function () {
      const boardSize = {
        rows: test.board.length,
        columns: test.board[0].length,
      }
      const testBoard = new Board(boardSize.rows, boardSize.columns)
      updateBoardWith(testBoard, test.board)
      const player1 = new Player({ value: 1 })
      const player2 = new Player({ value: 2 })
      const engine = new Engine({
        boardSize,
        winLength: 5,
        player1,
        player2,
      })
      engine.replaceBoard(testBoard)
      assert.deepEqual(engine.checkWin(), {
        winner: test.winningValue === 1 ? player1 : player2,
        winningPicks: test.winningPicks,
      })
    })
  })

  it(`should return the correct winner when surrender`, function () {
    const boardSize = {
      rows: 10,
      columns: 10,
    }
    const player1 = new Player({ value: 1 })
    const player2 = new Player({ value: 2 })
    const engine = new Engine({
      boardSize,
      winLength: 5,
      player1,
      player2,
    })
    engine.play(player1, { type: 'surrender' })
    assert.deepEqual(engine.checkWin(), {
      winner: player2,
      winningPicks: [],
    })
  })
})
