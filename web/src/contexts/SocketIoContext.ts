import { GameMove } from '@gomoku/engine'
import { createContext, useContext } from 'react'

interface SocketIoContextBase {
  isConnected: boolean
  joinRoom: (roomId: string) => Promise<any>
  createRoom: () => Promise<string>
  startGame: (roomId: string) => Promise<any>
  makeMove: (roomId: string, move: GameMove) => Promise<any>
  surrender: (roomId: string) => Promise<any>
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
