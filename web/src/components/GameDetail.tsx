import useGame from '@/hooks/useGame'
import { Room } from '../../../backend/src/db/types'
import clsx from 'clsx'

function GameDetail({ room }: { room: Room }) {
  const { myTurn, game } = useGame(room.id)

  const hasWinner = game?.winner
  const winnerName = game?.winner.player.name

  return (
    <div>
      {!hasWinner && (
        <div
          className={clsx(
            game?.turnUser.player.value === 1 ? 'text-blue-500' : 'text-red-500'
          )}
        >
          {myTurn ? 'Your turn' : "Opponent's turn"}
        </div>
      )}

      {hasWinner && (
        <div>
          Game Over
          <p>
            <span
              className={clsx(
                game.winner.player.value === 1
                  ? 'text-blue-500'
                  : 'text-red-500'
              )}
            >
              {winnerName}
            </span>{' '}
            won!
          </p>
        </div>
      )}
    </div>
  )
}

export default GameDetail
