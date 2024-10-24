export interface User {
  id: string
}

export interface Room {
  id: string
  users: User[]
}

export interface DB {
  /**
   * Create a new room and return its ID
   */
  createRoom(): Promise<string>
  addUserToRoom(roomId: string, userId: string): Promise<void>
  removeUserFromRoom(roomId: string, userId: string): Promise<void>
}