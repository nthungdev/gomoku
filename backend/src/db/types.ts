export interface User {
  id: string
}

export interface Room {
  id: string
  users: User[]
}

export interface DB {
  getRooms(): Promise<Room[]>
  getRoom(roomId: string): Promise<Room | null>
  /**
   * Create a new room and return its ID
   */
  createRoom(): Promise<string>
  addUserToRoom(roomId: string, userId: string): Promise<void>
  removeUserFromRoom(roomId: string, userId: string): Promise<void>
}