import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'

function App() {
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
    <div className="h-screen flex flex-col items-center bg-gray-800 text-gray-50 space-y-4">
      Socket Connected: {isConnected ? 'Yes' : 'No'}
    </div>
  )
}

export default App
