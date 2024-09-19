import figlet from 'figlet'
import { createInterface } from 'readline'
import * as process from 'process'
import { Engine, Player } from '@gomoku/engine'

console.log(figlet.textSync('Gomoku'))

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const players = [new Player({ value: 1 }), new Player({ value: 2 })]
const engine = new Engine({
  boardSize: { rows: 10, columns: 10 },
  winLength: 5,
  players,
  firstPlayer: players[0],
})
engine.start()

const parseMoveInput = (input: string) => {
  const [row, column] = input.split(' ')
  const parsedRow = parseInt(row)
  const parsedColumn = parseInt(column)
  if (isNaN(parsedRow) || isNaN(parsedColumn)) {
    return null
  }
  return {
    row: parsedRow,
    column: parsedColumn,
  }
}

const printBoardState = (boardState: number[][]) => {
  const boardString = boardState
    .map((row) => row.map((cell) => (cell === 0 ? '.' : cell)).join(' '))
    .join('\n')
  console.log(boardString)
}

const loop = () => {
  console.log('_'.repeat(20))
  const turnPlayer = engine.getTurnPlayer()
  printBoardState(engine.getBoardState())
  readline.question(
    `${turnPlayer}: Enter your move (row column): `,
    (input) => {
      const move = parseMoveInput(input)
      if (!move) {
        console.log('Invalid input, please try again')
        return loop()
      }

      const { row, column } = move
      try {
        const { winner, winningPicks } = engine.play(turnPlayer, row, column)
        if (winner) {
          console.log(`${winner} wins!`)
          printBoardState(engine.getBoardState())
          process.exit(0)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
        } else {
          console.log('An error occurred')
        }
        return loop()
      }
      // printBoardState(engine.getBoardState())
      return loop()
    }
  )
}

loop()
