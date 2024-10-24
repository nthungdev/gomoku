import './App.css'
import { useSocketIoContext } from './contexts/SocketIoContext'

function App() {
  const { isConnected } = useSocketIoContext()

  return (
    <div className="h-screen flex flex-col items-center bg-gray-800 text-gray-50 space-y-4">
      Socket Connected: {isConnected ? 'Yes' : 'No'}
    </div>
  )
}

export default App
