import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import { SocketIoContext } from '../../contexts/SocketIoContext'
import { ACTION_CREATE_ROOM, ACTION_JOIN_ROOM } from '@gomoku/common'

export default function SocketIoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [id, setId] = useState(socket.id)
  const isConnected = !!id

  function joinRoom(roomId: string) {
    socket.emit(ACTION_JOIN_ROOM, roomId)
  }

  function createRoom() {
    socket.emit(ACTION_CREATE_ROOM)
  }

  useEffect(() => {
    function onConnect() {
      setId(socket.id)
    }

    function onDisconnect() {
      setId(undefined)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const baseValue = {
    joinRoom,
    createRoom,
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
