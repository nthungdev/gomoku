import { Engine, Player } from '@gomoku/engine'

export interface User {
  id: string
  player: Player
}

export interface Room {
  id: string
  owner: User
  users: User[]
  engine: Engine
}

export interface DB {
  getRooms(): Promise<Room[]>
  getRoomById(roomId: string): Promise<Room | null>
  getRoomHasUser(userId: string): Promise<Room | null>
  /**
   * Create a new room and return its ID
   */
  createRoom(user: User): Promise<string>
  /**
   * @throws
   * - RoomNotFoundError
   */
  removeRoom(roomId: string): Promise<void>
  /**
   * @throws
   * - RoomNotFoundError
   */
  addUserToRoom(roomId: string, user: User): Promise<void>
  /**
   * @throws
   * - RoomNotFoundError
   * - UserNotFoundError
   */
  removeUserFromRoom(roomId: string, userId: string): Promise<void>
  /**
   * @throws
   * - RoomNotFoundError
   */
  setEngine(roomId: string, engine: Engine): Promise<void>
}
