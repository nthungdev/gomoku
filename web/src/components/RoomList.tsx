import { useQuery } from 'react-query'
import { GetRoomsResponse } from '../../../backend/src/routes/types'

function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async (): Promise<GetRoomsResponse> => {
      const response = await fetch(`${import.meta.env.VITE_API_ORIGIN}/rooms`)
      return response.json()
    },
  })
}

export default function RoomList() {
  const { status, data, error, isFetching } = useRooms()

  function enterRoom() {
    // TODO
  }

  return (
    <div>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {(error as Error).message || ''}</span>
        ) : (
          <>
            <div className="space-y-2">
              {data?.rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-gray-100 rounded-md p-2 space-y-2"
                  onClick={enterRoom}
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
                </div>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  )
}
