import { useSocketIoContext } from '../contexts/SocketIoContext'

export default function useAuth() {
  const { isConnected, id } = useSocketIoContext()

  // TODO this is a fake implementation
  const isAuthenticated = isConnected

  return isAuthenticated
    ? {
        id,
        isAuthenticated,
      }
    : {
        id: undefined,
        isAuthenticated,
      }
}
