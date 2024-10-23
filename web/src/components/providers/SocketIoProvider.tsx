import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import { SocketIoContext } from '../../contexts/socketIoContext'

export default function SocketIoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isConnected, setIsConnected] = useState(socket.connected)

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

  return (
    <SocketIoContext.Provider value={{ isConnected }}>
      {children}
    </SocketIoContext.Provider>
  )
}
