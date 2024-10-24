import { DB, Room } from './types'

export default class MemoryDB implements DB {
  private rooms: Room[] = []

  private generateUniqueRoomId() {
    let roomId = ''
    do {
      roomId = Math.random().toString(36).substring(7)
    } while (this.rooms.find(({ id }) => roomId === id))
    return roomId
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms
  }

  async getRoom(roomId: string): Promise<Room | null> {
    return this.rooms.find(({ id }) => id === roomId) || null
  }

  async createRoom(): Promise<string> {
    const roomId = this.generateUniqueRoomId()
    this.rooms.push({
      id: roomId,
      users: [],
    })
    return roomId
  }

  async addUserToRoom(roomId: string, userId: string): Promise<void> {
    const room = this.rooms.find(({ id }) => id === roomId)
    if (!room) {
      throw new Error(`Room ${roomId} not found`)
    }
    room.users.push({ id: userId })
  }

  async removeUserFromRoom(roomId: string, userId: string): Promise<void> {
    const room = this.rooms.find(({ id }) => id === roomId)
    if (!room) {
      throw new Error(`Room ${roomId} not found`)
    }
    const userIndex = room.users.findIndex(({ id }) => id === userId)
    if (userIndex === -1) {
      throw new Error(`User ${userId} not found in room ${roomId}`)
    }
    room.users.splice(userIndex, 1)
  }
}
