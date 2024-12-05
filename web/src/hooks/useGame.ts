import { socket } from '@/socket'
import { EVENT_GAME_OVER, EVENT_GAME_STARTED, EVENT_USER_MADE_MOVE, EVENT_USER_SURRENDERED } from '@gomoku/common'
import { useEffect, useState } from 'react'
import { GameState } from '../../../backend/src/socket/types'
import useGameState from '@/hooks/useGameState'
import useAuth from '@/hooks/useAuth'

function useGame(roomId: string) {
  const {id } = useAuth()
  const { status, data, error, isFetching, refetch,   } = useGameState(roomId)

  const [game, setGame] = useState<GameState | null>(null)

  const started = !!game?.turnUser
  const over = !!game?.winner
  const myTurn = game?.turnUser?.id === id

  console.log('useGame gameState', {data})
  console.log('useGame game', {game})

  useEffect(() => {
    function onGameStarted(data: any) {
      console.log('onGameStarted', data)
      setGame(data)
    }

    function onGameOver(data: any) {
      console.log('onGameOver', data)
      setGame(data)
    }

    function onUserMadeMove(data: any) {
      console.log('onUserMadeMove', data)
      setGame(data)
    }

    function onUserSurrounded(data: any) {
      console.log('onUserSurrounded', data)
      setGame(data)
    }

    async function fetchInitialGameState() {
      const res = await refetch()
      console.log('refetch res', {data: res.data})
      if (res.data && res.data.ok) {
        setGame(res.data.data)
      }
    }

    fetchInitialGameState()

    // socket.on(roomId, onRoomEvent)

    socket.on(EVENT_GAME_STARTED, onGameStarted)

    socket.on(EVENT_GAME_OVER, onGameOver)

    socket.on(EVENT_USER_MADE_MOVE, onUserMadeMove)

    socket.on(EVENT_USER_SURRENDERED, onUserSurrounded)

    return () => {
      // socket.off(roomId, onRoomEvent)
      socket.off(EVENT_GAME_STARTED, onGameStarted)
      socket.off(EVENT_GAME_OVER, onGameOver)
      socket.off(EVENT_USER_MADE_MOVE, onUserMadeMove)
      socket.off(EVENT_USER_SURRENDERED, onUserSurrounded)
    }
  }, [roomId])

  return { game, started, myTurn, over }
}

export default useGame