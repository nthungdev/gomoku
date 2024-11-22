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
