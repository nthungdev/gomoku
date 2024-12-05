import useGame from '@/hooks/useGame'
import { Room } from '../../../backend/src/db/types'
import clsx from 'clsx'
import { useSocketIoContext } from '@/contexts/SocketIoContext'

function GameBoard({ room }: { room: Room }) {
  const { makeMove } = useSocketIoContext()
  const { game, over, myTurn } = useGame(room.id)

  if (!game) {
    return null
  }

  const winningPicks = game.winningPicks

  function handleMove(row: number, col: number) {
    if (over) return
    console.log('handleMove', { row, col })
    makeMove(room.id, { type: 'move', row, column: col })
  }

  return (
    <div>
      <div>
        <div className="inline-block border border-gray-300">
          {game.boardState.map((row, i) => (
            <div key={i} className="flex">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={clsx(
                    'flex items-center justify-center w-6 h-6 border border-gray-300 ',
                    winningPicks?.find(
                      ([row, col]) => row === i && col === j
                    ) &&
                      (cell === 1
                        ? 'bg-blue-200 border-blue-400'
                        : 'bg-red-200 border-red-400'),
                    cell === 1 ? 'text-blue-500' : 'text-red-500',
                    !over &&
                      (myTurn
                        ? 'hover:cursor-pointer hover:bg-primary-100'
                        : 'hover:cursor-not-allowed')
                  )}
                  onClick={() => handleMove(i, j)}
                >
                  {cell === 1 ? 'X' : cell === 2 ? 'O' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameBoard
