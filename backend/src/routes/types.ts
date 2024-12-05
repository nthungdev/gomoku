import { Room } from '@/db/types'
import { GameState } from '@/socket/types'

export type ErrorResponse = {
  ok: false
  error: string
}

export type SuccessResponse<T> = {
  ok: true
  data: T
}

export type Response<T> = ErrorResponse | SuccessResponse<T>

export type GetRoomsResponse = Response<Room[]>

export type GetRoomByIdResponse = Response<Room | null>

export type GetGameStateResponse = Response<GameState | null>
