import { useState } from 'react'
import { Modal } from 'flowbite-react'
import { useSocketIoContext } from '@/contexts/SocketIoContext'
import useAuth from '@/hooks/useAuth'
import RoomList from '@/components/RoomList'
import BasePage from '@/components/BasePage'

function HomeMenuDivider() {
  return <div className="h-px bg-gray-300 w-3/4 mx-auto my-1"></div>
}

const menuItemClasses =
  'py-1 rounded-md disabled:text-gray-400 disabled:pointer-events-none transition-colors hover:bg-gray-300 hover:font-bold'

function HomeMenu() {
  const { isAuthenticated } = useAuth()
  const { createRoom } = useSocketIoContext()
  const [showRooms, setShowRooms] = useState(false)

  function handleJoinGameClick() {
    setShowRooms(true)
  }

  function handleNewGame() {
    createRoom()
    // TODO: Redirect to the game page
  }

  return (
    <div className="py-2 w-full max-w-xs flex flex-col px-2 mx-auto text-center rounded-lg bg-gray-200">
      {isAuthenticated ? (
        <>
          <button className={menuItemClasses} onClick={handleNewGame}>
            New Game
          </button>
          <HomeMenuDivider />
          <button className={menuItemClasses} onClick={handleJoinGameClick}>
            Join
          </button>

          <div></div>
          <Modal show={showRooms} onClose={() => setShowRooms(false)}>
            <Modal.Header>Rooms</Modal.Header>
            <Modal.Body>
              <RoomList />
            </Modal.Body>
          </Modal>
          <HomeMenuDivider />
          <button disabled className={menuItemClasses}>
            Settings
          </button>
        </>
      ) : (
        <>
          <a className={menuItemClasses} href="/signin">
            Sign In
          </a>
          <HomeMenuDivider />
          <a className={menuItemClasses} href="/signup">
            Sign Up
          </a>
        </>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <BasePage className="flex flex-col justify-center">
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-xl font-bold">Welcome to Gomoku!</p>
        </div>

        <HomeMenu />
      </div>
    </BasePage>
  )
}
