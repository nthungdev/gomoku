import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const SOCKET_URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000'

export const socket = io(SOCKET_URL, {
  autoConnect: false,
})
