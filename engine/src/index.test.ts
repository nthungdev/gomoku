import { Engine, Board, Player } from './index'
import assert from 'assert'

function updateBoardWith(board: Board, sampleBoard: number[][]) {
  for (let i = 0; i < sampleBoard.length; i++) {
    for (let j = 0; j < sampleBoard[i].length; j++) {
      board.update(i, j, sampleBoard[i][j])
    }
  }
}

describe('Check winners', function () {
  const tests = [
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
      winnerValue: 1,
      winningPicks: [
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
      ],
    },
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
  ]

  tests.forEach((test, index) => {
    it(`should return the correct winner for test ${index + 1}`, function () {
      const size = { rows: test.board[0].length, columns: test.board.length }
      const board = new Board()
      board.init(size.rows, size.columns)
      updateBoardWith(board, test.board)
      const players = [new Player({ value: 1 }), new Player({ value: 2 })]
      const engine = new Engine({
        boardSize: {
          rows: size.rows,
          columns: size.columns,
        },
        winLength: 5,
        players,
        firstPlayer: players[0],
      })
      engine.start()
      engine.replaceBoard(board)
      assert.deepEqual(engine.checkWin(), {
        winner: players[0],
        winningPicks: test.winningPicks,
      })
    })
  })
})
