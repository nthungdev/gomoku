import useGame from '@/hooks/useGame'
import { Room } from '../../../backend/src/db/types'
import clsx from 'clsx'

function GameDetail({ room }: { room: Room }) {
  const { myTurn, game, started } = useGame(room.id)

  const hasWinner = game?.winner
  const winnerName = game?.winner?.player.name
  const roomNotFull = room.users.length < 2

  return (
    <div>
      {roomNotFull && <div>Waiting for an opponent to join...</div>}

      {started &&
        (hasWinner ? (
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
        ) : (
          <div
            className={clsx(
              game?.turnUser.player.value === 1
                ? 'text-blue-500'
                : 'text-red-500'
            )}
          >
            {myTurn ? 'Your turn' : "Opponent's turn"}
          </div>
        ))}
    </div>
  )
}

export default GameDetail
