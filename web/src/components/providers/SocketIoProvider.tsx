import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import { SocketIoContext } from '../../contexts/SocketIoContext'
import {
  ACTION_CREATE_ROOM,
  ACTION_JOIN_ROOM,
  ACTION_MAKE_MOVE,
  ACTION_START_GAME,
  ACTION_SURRENDER,
} from '@gomoku/common'
import { GameMove } from '@gomoku/engine'

export default function SocketIoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [id, setId] = useState(socket.id)
  const isConnected = !!id

  async function joinRoom(roomId: string) {
    const response = await socket.emitWithAck(ACTION_JOIN_ROOM, roomId)
    // TODO: handle ack response
    return response
  }

  async function createRoom() {
    const response = await socket.emitWithAck(ACTION_CREATE_ROOM)
    // TODO: handle ack response not ok
    if (response.ok) {
      return response.data.roomId
    } else {
      console.error('Failed to create room', response)
    }
  }

  async function startGame(roomId: string) {
    const response = await socket.emitWithAck(ACTION_START_GAME, roomId)
    // TODO: handle ack response not ok
    console.log({ response })
    if (response.ok) {
      return response.data
    } else {
      console.error('Failed to start game', response)
    }
  }

  async function makeMove(roomId: string, move: GameMove) {
    const response = await socket.emitWithAck(ACTION_MAKE_MOVE, roomId, move)
    console.log({ response })
    if (response.ok) {
      return response.data
    } else {
      console.error('Failed to make move', response)
    }
  }

  async function surrender(roomId: string) {
    const response = await socket.emitWithAck(ACTION_SURRENDER, roomId)
    console.log({ response })
    if (response.ok) {
      return response.data
    } else {
      console.error('Failed to surrender', response)
    }
  }

  useEffect(() => {
    function onConnect() {}

    function onDisconnect() {
      setId(undefined)
    }

    function onId(id: string) {
      setId(id)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('id', onId)

    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const baseValue = {
    joinRoom,
    createRoom,
    startGame,
    makeMove,
    surrender,
  }

  const value = isConnected
    ? {
        id,
        isConnected,
        ...baseValue,
      }
    : {
        id: undefined,
        isConnected,
        ...baseValue,
      }

  return (
    <SocketIoContext.Provider value={value}>
      {children}
    </SocketIoContext.Provider>
  )
}
