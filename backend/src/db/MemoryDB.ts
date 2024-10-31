import { Engine } from '@gomoku/engine'
import { DB, Room, User } from './types'

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

  async getRoomById(roomId: string): Promise<Room | null> {
    return this.rooms.find(({ id }) => id === roomId) || null
  }

  async getRoomHasUser(userId: string): Promise<Room | null> {
    return (
      this.rooms.find(({ users }) => users.find(({ id }) => id === userId)) ||
      null
    )
  }

  async createRoom(user: User): Promise<string> {
    const roomId = this.generateUniqueRoomId()
    this.rooms.push({
      id: roomId,
      owner: user,
      users: [user],
      // we will set engine later when we have both players
      engine: null as unknown as Engine,
    })
    return roomId
  }

  async removeRoom(roomId: string): Promise<void> {
    const roomIndex = this.rooms.findIndex(({ id }) => id === roomId)
    if (roomIndex === -1) {
      throw new Error(`Room ${roomId} not found`)
    }
    this.rooms.splice(roomIndex, 1)
  }

  async addUserToRoom(roomId: string, user: User): Promise<void> {
    const room = this.rooms.find(({ id }) => id === roomId)
    if (!room) {
      throw new Error(`Room ${roomId} not found`)
    }

    room.users.push(user)
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

  async setEngine(roomId: string, engine: Engine): Promise<void> {
    const room = this.rooms.find(({ id }) => id === roomId)
    if (!room) {
      throw new Error(`Room ${roomId} not found`)
    }
    room.engine = engine
  }
}
