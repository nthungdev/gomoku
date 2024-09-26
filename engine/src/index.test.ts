import { Engine, Board, Player } from './index'
import assert from 'assert'

function updateBoardWith(board: Board, sampleBoard: number[][]) {
  for (let i = 0; i < sampleBoard.length; i++) {
    for (let j = 0; j < sampleBoard[i].length; j++) {
      board.update(i, j, sampleBoard[i][j])
    }
  }
}

describe('Engine', function () {
  it('should return the correct winner', function () {
    const sampleBoard1 = [
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
    ]
    const size = { rows: sampleBoard1[0].length, columns: sampleBoard1.length }
    const board1 = new Board()
    board1.init(size.rows, size.columns)
    updateBoardWith(board1, sampleBoard1)
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
    engine.replaceBoard(board1)
    console.log(engine.checkWin())
    assert.deepEqual(engine.checkWin(), {
      winner: players[0],
      winningPicks: [
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6]
      ]
    })
  })
})

function test1() {
  const board1 = new Board()
  board1.init(10, 10)
  const sampleBoard1 = [
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
  ]
  updateBoardWith(board1, sampleBoard1)
  const board2 = new Board()
  board2.init(10, 10)
  const sampleBoard2 = [
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
  ]
  updateBoardWith(board2, sampleBoard2)

  const players = [new Player({ value: 1 }), new Player({ value: 2 })]
  const engine = new Engine({
    boardSize: {
      rows: 10,
      columns: 10,
    },
    winLength: 5,
    players,
    firstPlayer: players[0],
  })

  engine.start()
  engine.replaceBoard(board1)
  console.log(engine.checkWin())

  engine.replaceBoard(board2)
  console.log(engine.checkWin())
}

// test1()
