import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function Root() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}

export default Root
