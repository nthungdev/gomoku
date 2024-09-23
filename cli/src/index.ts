import figlet from 'figlet'
import { createInterface } from 'readline'
import * as process from 'process'
import { Engine, Player } from '@gomoku/engine'

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * @param input string contains "row column"
 * @returns null if failed to parse, else { row: number, column: number }
 */
const parseMoveInput = (input: string) => {
  const [row, column] = input.trim().split(' ')
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

const loop = (engine: Engine) => {
  console.log('_'.repeat(20))
  printBoardState(engine.getBoardState())

  const turnPlayer = engine.getTurnPlayer()
  readline.question(
    `${turnPlayer}: Enter your move (row column): `,
    (input) => {
      const move = parseMoveInput(input)
      if (!move) {
        console.log('Invalid input, please try again')
        return loop(engine)
      }
      const { row, column } = move

      try {
        const { winner } = engine.play(turnPlayer, row, column)
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
        return loop(engine)
      }

      return loop(engine)
    }
  )
}

const promptName = async (prompt: string, takenName?: string) => {
  const name = (
    await new Promise<string>((resolve) => {
      readline.question(prompt, resolve)
    })
  ).trim()
  if (name === '') {
    console.log('Name cannot be empty')
    return promptName(prompt, takenName)
  } else if (name === takenName) {
    console.log('Name already taken')
    return promptName(prompt, takenName)
  }
  return name
}

const game = async () => {
  console.log(figlet.textSync('Gomoku'))

  const name1 = await promptName("What is player 1's name? ")
  const name2 = await promptName("What is player 2's name? ", name1)
  const players: Player[] = [
    new Player({ value: 1, name: name1.trim() }),
    new Player({ value: 2, name: name2.trim() }),
  ]

  const engine = new Engine({
    boardSize: { rows: 10, columns: 10 },
    winLength: 5,
    players,
    firstPlayer: players[0],
  })
  engine.start()
  loop(engine)
}

game()
