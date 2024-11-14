import BasePage from '../components/BasePage'
import useAuth from '../hooks/useAuth'

function HomeMenuDivider() {
  return <div className="h-px bg-gray-300 w-3/4 mx-auto my-1"></div>
}

function HomeMenu() {
  const { isAuthenticated } = useAuth()
  const menuItemClasses =
    'py-1 rounded-md disabled:text-gray-400 disabled:pointer-events-none transition-colors hover:bg-gray-300 hover:font-bold'

  return (
    <div className="py-2 w-full max-w-xs flex flex-col px-2 mx-auto text-center rounded-lg bg-gray-200">
      {isAuthenticated ? (
        <>
          <button className={menuItemClasses}>New Game</button>
          <HomeMenuDivider />
          <button className={menuItemClasses}>Join</button>
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
