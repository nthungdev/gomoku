import { createContext, useContext } from 'react'

interface SocketIoContext {
  isConnected: boolean
  joinRoom: (roomId: string) => void
  createRoom: () => void
}

export const SocketIoContext = createContext<SocketIoContext>(
  // proper properties are set in SocketIoProvider
  {} as SocketIoContext
)

export const useSocketIoContext = () => useContext(SocketIoContext)
