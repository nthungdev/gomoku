import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function Root() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}

export default Root
