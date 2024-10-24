import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import { SocketIoContext } from '../../contexts/SocketIoContext'
import { ACTION_CREATE_ROOM, ACTION_JOIN_ROOM } from '@gomoku/common'

export default function SocketIoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isConnected, setIsConnected] = useState(socket.connected)

  function joinRoom(roomId: string) {
    socket.emit(ACTION_JOIN_ROOM, roomId)
  }

  function createRoom() {
    socket.emit(ACTION_CREATE_ROOM)
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const value = {
    isConnected,
    createRoom,
    joinRoom,
  }

  return (
    <SocketIoContext.Provider value={value}>
      {children}
    </SocketIoContext.Provider>
  )
}
