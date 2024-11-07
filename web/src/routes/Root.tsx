import { Outlet } from "react-router-dom"

function Root() {

  return <div className="flex flex-col w-full min-h-screen">
    <Outlet />
  </div>
}

export default Root
