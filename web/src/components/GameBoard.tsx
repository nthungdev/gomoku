import useGame from '@/hooks/useGame'
import { Room } from '../../../backend/src/db/types'
import clsx from 'clsx'
import { useSocketIoContext } from '@/contexts/SocketIoContext'
import useGameState from '@/hooks/useGameState'

function GameBoard({ room }: { room: Room }) {
  const { status, data, error, isFetching, refetch } = useGameState(room.id)
  const { makeMove } = useSocketIoContext()
  const { game, over ,myTurn } = useGame(room.id)

  if (!game) {
    return null
  }

  if (data?.ok) {
    console.log('game data', data)
  }

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
                    cell === 1 ? 'text-blue-500' : 'text-red-500',
                    !over && 'hover:cursor-pointer hover:bg-primary-100',
                    !myTurn  && 'hover:cursor-not-allowed'
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
