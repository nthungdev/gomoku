import { createContext, useContext } from "react"

interface SocketIoContext {
  isConnected: boolean
}

export const SocketIoContext = createContext<SocketIoContext>({
  isConnected: false
})

export const useSocketIoContext = () => useContext(SocketIoContext)