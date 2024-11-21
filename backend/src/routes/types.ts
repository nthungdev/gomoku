import { Room } from '@/db/types'

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
