import { useQuery } from 'react-query'
import { GetRoomsResponse } from '../../../backend/src/routes/types'
import { useNavigate } from 'react-router-dom'
import { useSocketIoContext } from '@/contexts/SocketIoContext'

function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async (): Promise<GetRoomsResponse> => {
      const response = await fetch(`${import.meta.env.VITE_API_ORIGIN}/rooms`)
      return await response.json()
    },
  })
}

export default function RoomList() {
  const { status, data, error, isFetching } = useRooms()
  const navigate = useNavigate()
  const {  joinRoom } = useSocketIoContext()

  async function enterRoom(roomId: string) {
    await joinRoom(roomId)
    navigate(`/room/${roomId}`)
  }

  return (
    <div>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {(error as Error).message || ''}</span>
        ) : data?.ok === false ? (
          <span>Error: {data?.error}</span>
        ) : (
          <>
            <div className="space-y-2">
              {data?.ok && data.data.length ? (
                data.data.map((room) => (
                  <button
                    key={room.id}
                    className="w-full bg-gray-100 rounded-md p-2 space-y-2"
                    onClick={() => enterRoom(room.id)}
                  >
                    <p>Room {room.id}</p>
                    <div className="flex flex-row justify-center">
                      {room.users.map((user, index) => (
                        <div
                          key={`${user.id}-${index}`}
                          className="rounded-full bg-yellow-400 text-white px-3 py-0.5"
                        >
                          Player {index + 1}
                        </div>
                      ))}
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center">No room available</div>
              )}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  )
}
