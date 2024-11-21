import BasePage from '@/components/BasePage'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { GetRoomByIdResponse } from '../../../backend/src/routes/types'
import type { Room } from '../../../backend/src/db/types'

function useRoom(roomId: string) {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: async (): Promise<GetRoomByIdResponse> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ORIGIN}/rooms/${roomId}`
      )
      return response.json()
    },
  })
}

export default function Room() {
  const { roomId } = useParams()

  const { status, data, error, isFetching } = useRoom(roomId || '')

  return (
    <BasePage>
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
              {data?.ok && <RoomDetail room={data.data} />}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </BasePage>
  )
}

function RoomDetail({ room }: { room: Room }) {
  console.log({ room })

  const player1 = room.users.find((user) => user.player.value === 1)
  const player2 = room.users.find((user) => user.player.value === 2)

  return (
    <div className="space-y-2">
      <div key={room.id} className="bg-gray-100 rounded-md p-2 space-y-2">
        <p>Room {room.id}</p>
        <div className="flex flex-col">
          {player1 && (
            <div className="">
              {player1.player.name} {player1.id}
            </div>
          )}

          {player2 && (
            <div className="">
              {player2.player.name} {player2.id}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
