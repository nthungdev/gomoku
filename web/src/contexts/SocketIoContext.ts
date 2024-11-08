import { createContext, useContext } from 'react'

interface SocketIoContextBase {
  isConnected: boolean
  joinRoom: (roomId: string) => void
  createRoom: () => void
}

interface ConnectedSocketIoContext extends SocketIoContextBase {
  isConnected: true
  id: string
}

interface DisconnectedSocketIoContext extends SocketIoContextBase {
  isConnected: false
  id?: undefined
}

type SocketIoContext = ConnectedSocketIoContext | DisconnectedSocketIoContext

export const SocketIoContext = createContext<SocketIoContext>(
  // proper properties are set in SocketIoProvider
  {} as SocketIoContext
)

export const useSocketIoContext = () => useContext(SocketIoContext)
