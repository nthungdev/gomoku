import BasePage from '@/components/BasePage'
import { useParams } from 'react-router-dom'
import type { Room } from '../../../backend/src/db/types'
import GameBoard from '@/components/GameBoard'
import useRoom from '@/hooks/useRoom'
import GameDetail from '@/components/GameDetail'
import RoomControls from '@/components/RoomControls'
import RoomDetail from '@/components/RoomDetail'

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
              {data?.ok && <RoomControls room={data.data} />}
              {data?.ok && <GameDetail room={data.data} />}
              {data?.ok && <GameBoard room={data.data} />}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </BasePage>
  )
}
