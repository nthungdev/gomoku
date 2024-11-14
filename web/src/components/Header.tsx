import { Navbar } from 'flowbite-react'
import useAuth from '../hooks/useAuth'

export default function Header() {
  const { isAuthenticated, id } = useAuth()

  return (
    <Navbar fluid className="bg-primary py-2 shadow-sm">
      <div className="w-full max-w-screen-lg mx-auto px-2 flex flex-row justify-between">
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Gomoku
          </span>
        </Navbar.Brand>

        <div className="flex">{isAuthenticated ? `ID: ${id}` : null}</div>
      </div>
    </Navbar>
  )
}
