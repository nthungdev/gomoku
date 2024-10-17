import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.connect()

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  return (
    <div className="h-screen flex flex-col items-center bg-gray-800 text-gray-50 space-y-4">
      Socket Connected: {isConnected ? 'Yes' : 'No'}
    </div>
  )
}

export default App
