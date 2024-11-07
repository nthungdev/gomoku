export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-4">
      <div className="text-center">
        <p className="text-xl">Welcome to the Gomoku!</p>
      </div>

      <div className="py-2 text-center w-full max-w-xs bg-gray-100 rounded-lg">
        <div className="flex flex-col px-2 divide-y">
          <a className="hover:bg-gray-200 py-1 rounded-md" href="/signin">
            Sign In
          </a>
          <a className="hover:bg-gray-200 py-1 rounded-md" href="/signup">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}
